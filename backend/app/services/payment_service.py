# app/services/payment_service.py
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import List, Optional, Dict, Any
import uuid
import requests
import hmac # For webhook signature verification
import hashlib # For webhook signature verification
import json # For parsing webhook body

from ..database import Payment, RepairJob, User, TechnicianProfile, PaymentStatus, PaymentMethod
from ..models import PaymentCreate, PaymentStatusUpdate
from .email_service import EmailService # Import EmailService
from ..settings import settings # Import settings

class PaymentService:
    @staticmethod
    async def initiate_payment(db: Session, job_id: int, payer_id: int, payment_data: PaymentCreate) -> Dict[str, Any]: # Changed return type
        job = db.query(RepairJob).filter(RepairJob.id == job_id).first()
        if not job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
        
        if job.customer_id != payer_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only the job customer can initiate payment")

        if job.technician_id is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Job has no assigned technician to receive payment")

        if job.status != PaymentService._get_job_status_for_payment_initiation(): # Ensure job is in a state where payment can be initiated
             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Payment can only be initiated for completed jobs")
        
        customer_user = db.query(User).filter(User.id == payer_id).first()
        if not customer_user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payer user not found")

        amount_to_pay = int(job.estimated_cost * 100) if job.estimated_cost else int(payment_data.amount * 100) # Paystack expects amount in kobo/cents

        new_payment_db_record = Payment(
            job_id=job_id,
            user_id=payer_id,
            technician_id=job.technician_id,
            amount=amount_to_pay / 100, # Store actual amount
            currency=payment_data.currency,
            payment_method=payment_data.payment_method,
            status=PaymentStatus.PENDING
        )
        db.add(new_payment_db_record)
        db.commit()
        db.refresh(new_payment_db_record)

        if payment_data.payment_method != PaymentMethod.PAY_ON_DELIVERY:
            # Integrate with Paystack
            paystack_headers = {
                "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
                "Content-Type": "application/json"
            }
            paystack_payload = {
                "email": customer_user.email,
                "amount": amount_to_pay, # in kobo/cents
                "callback_url": settings.PAYSTACK_CALLBACK_URL,
                "metadata": {
                    "job_id": job_id,
                    "payment_id": new_payment_db_record.id,
                    "customer_id": payer_id
                }
            }

            try:
                response = requests.post(f"{settings.PAYSTACK_BASE_URL}/transaction/initialize",
                                         headers=paystack_headers,
                                         json=paystack_payload)
                response.raise_for_status() # Raise HTTPError for bad responses (4xx or 5xx)
                paystack_response_data = response.json()

                if paystack_response_data.get("status"):
                    authorization_url = paystack_response_data["data"]["authorization_url"]
                    reference = paystack_response_data["data"]["reference"]
                    
                    # Update our payment record with Paystack's reference
                    new_payment_db_record.transaction_id = reference
                    db.commit()
                    db.refresh(new_payment_db_record)

                    return {
                        "authorization_url": authorization_url,
                        "reference": reference,
                        "payment_id": new_payment_db_record.id # Return our payment ID as well
                    }
                else:
                    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=paystack_response_data.get("message", "Paystack initialization failed"))
            except requests.exceptions.RequestException as e:
                db.rollback() # Rollback payment record creation
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to connect to Paystack: {e}")
        else:
            # For PAY_ON_DELIVERY, return success for internal record
            return {
                "message": "Payment initiated as Pay on Delivery",
                "payment_id": new_payment_db_record.id,
                "status": new_payment_db_record.status.value
            }

    @staticmethod
    async def update_payment_status(db: Session, payment_id: int, status_update: PaymentStatusUpdate) -> Payment:
        payment = db.query(Payment).filter(Payment.id == payment_id).first()
        if not payment:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payment not found")
        
        old_status = payment.status # Capture old status
        payment.status = status_update.status
        if status_update.transaction_id:
            payment.transaction_id = status_update.transaction_id
        
        db.commit()
        db.refresh(payment)

        if old_status != PaymentStatus.COMPLETED and payment.status == PaymentStatus.COMPLETED:
            # Send payment receipt email to customer
            customer_user = db.query(User).filter(User.id == payment.user_id).first()
            if customer_user and customer_user.email and payment.transaction_id:
                EmailService.send_payment_receipt_email(
                    customer_user.email,
                    payment.job_id,
                    payment.amount,
                    payment.currency,
                    payment.transaction_id
                )
        
        return payment

    @staticmethod
    async def verify_and_process_webhook(db: Session, request_body: bytes, paystack_signature: str):
        # 1. Verify the webhook signature
        hashed_secret = hmac.new(
            settings.PAYSTACK_WEBHOOK_SECRET.encode('utf-8'),
            request_body,
            hashlib.sha512
        ).hexdigest()

        if not hmac.compare_digest(hashed_secret, paystack_signature):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Paystack signature")

        # 2. Parse the webhook event data
        event_data = json.loads(request_body)
        event_type = event_data.get("event")
        transaction_data = event_data.get("data")

        if not event_type or not transaction_data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid webhook payload")

        if event_type == "charge.success":
            reference = transaction_data.get("reference")
            status_paystack = transaction_data.get("status")

            if not reference or status_paystack != "success":
                # Log or handle cases where charge is not successful despite event type
                return {"message": "Charge event not successful, no action taken"}

            # 3. Verify transaction with Paystack (recommended for security)
            verification_headers = {
                "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"
            }
            try:
                verification_response = requests.get(
                    f"{settings.PAYSTACK_BASE_URL}/transaction/verify/{reference}",
                    headers=verification_headers
                )
                verification_response.raise_for_status()
                verified_data = verification_response.json()

                if verified_data.get("data", {}).get("status") == "success":
                    # 4. Update the corresponding Payment record
                    payment = db.query(Payment).filter(Payment.transaction_id == reference).first()
                    if payment:
                        old_status = payment.status
                        if payment.status != PaymentStatus.COMPLETED:
                            payment.status = PaymentStatus.COMPLETED
                            db.commit()
                            db.refresh(payment)

                            # Send payment receipt email if status changed to completed
                            if old_status != PaymentStatus.COMPLETED:
                                customer_user = db.query(User).filter(User.id == payment.user_id).first()
                                if customer_user and customer_user.email and payment.transaction_id:
                                    EmailService.send_payment_receipt_email(
                                        customer_user.email,
                                        payment.job_id,
                                        payment.amount,
                                        payment.currency,
                                        payment.transaction_id
                                    )
                        return {"message": "Payment status updated successfully"}
                    else:
                        return {"message": "Payment record not found for this reference"}
                else:
                    # Log or handle failed verification
                    return {"message": "Paystack transaction verification failed"}
            except requests.exceptions.RequestException as e:
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Paystack verification API error: {e}")
        
        # Handle other Paystack event types if necessary (e.g., "transfer.success")
        return {"message": f"Webhook event '{event_type}' received and processed (no action for non-'charge.success' events)"}

    @staticmethod
    def get_job_payments(db: Session, job_id: int, current_user: User) -> List[Payment]:
        job = db.query(RepairJob).filter(RepairJob.id == job_id).first()
        if not job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

        # Authorization: Only job customer, assigned technician, or admin can view payments
        is_technician_assigned = (job.technician_id is not None and
                                  db.query(TechnicianProfile).filter(TechnicianProfile.id == job.technician_id, User.id == current_user.id).first())
        is_admin = (current_user.role == "admin")

        if job.customer_id != current_user.id and not is_technician_assigned and not is_admin:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to view payments for this job")
        
        payments = db.query(Payment).filter(Payment.job_id == job_id).order_by(Payment.created_at).all()
        return payments

    @staticmethod
    def _get_job_status_for_payment_initiation() -> str:
        # Define the job status at which payment can be initiated
        # For example, payment can only be initiated when the job is 'COMPLETED' or 'READY'
        return "completed" # Example, adjust as per PRD logic