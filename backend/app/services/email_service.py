# app/services/email_service.py
from typing import Dict, Any

class EmailService:
    @staticmethod
    def send_job_status_update_email(recipient_email: str, job_id: int, old_status: str, new_status: str):
        print(f"[EMAIL SERVICE] Sending job status update email to {recipient_email}")
        print(f"  Job ID: {job_id}")
        print(f"  Status changed from '{old_status}' to '{new_status}'")
        # In a real application, integrate with an email sending library/service (e.g., SendGrid, Mailgun)

    @staticmethod
    def send_job_accepted_email(recipient_email: str, job_id: int, technician_name: str):
        print(f"[EMAIL SERVICE] Sending job accepted email to {recipient_email}")
        print(f"  Job ID: {job_id}")
        print(f"  Technician '{technician_name}' has accepted your job.")

    @staticmethod
    def send_payment_receipt_email(recipient_email: str, job_id: int, amount: float, currency: str, transaction_id: str):
        print(f"[EMAIL SERVICE] Sending payment receipt email to {recipient_email}")
        print(f"  Job ID: {job_id}")
        print(f"  Amount Paid: {currency} {amount}")
        print(f"  Transaction ID: {transaction_id}")

    @staticmethod
    def send_admin_notification_email(admin_email: str, subject: str, message_body: str):
        print(f"[EMAIL SERVICE] Sending admin notification email to {admin_email}")
        print(f"  Subject: {subject}")
        print(f"  Message: {message_body}")
    
    # Add other email types as needed