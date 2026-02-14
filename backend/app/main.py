# main.py
from fastapi import FastAPI, Depends, HTTPException, status, Form, UploadFile, File, Header, WebSocket, WebSocketDisconnect, Query, Request
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
from typing import Union

from .database import get_db, create_tables, User, TechnicianProfile
from .models import (
    UserCreate, UserResponse, Token, LoginRequest,
    TechnicianProfileCreate, TechnicianProfileResponse,
    DocumentResponse, TechnicianVerificationRequest,
    JobCreate, JobResponse, JobStatusUpdate, MessageCreate, MessageResponse,
    PaymentCreate, PaymentResponse, PaymentStatusUpdate,
    RatingCreate, RatingResponse,
    DisputeCreate, DisputeResponse, DisputeUpdate,
    PaymentInitializationResponse # Imported PaymentInitializationResponse
)
from .services.auth import AuthService, get_current_user, get_current_admin_user, get_user_from_token_ws
from .services.document_upload import DocumentService
from .services.notifications import notification_manager
from .services.job_service import JobService
from .services.message_service import MessageService
from .services.payment_service import PaymentService
from .services.rating_service import RatingService
from .services.dispute_service import DisputeService

# Create tables
create_tables()

app = FastAPI(title="Rev API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login", auto_error=False)

# Auth Endpoints
@app.post("/auth/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    """User registration"""
    user = AuthService.register_user(db, user_data)
    return user

@app.post("/auth/login", response_model=Token)
async def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    """User login"""
    return AuthService.login_user(db, login_data)

@app.post("/auth/otp/send")
async def send_otp(
    phone: str,
    db: Session = Depends(get_db)
):
    """Send OTP to phone (Persistent)"""
    otp = AuthService.generate_otp(db, phone)
    return {"message": "OTP sent successfully"}

@app.post("/auth/otp/verify")
async def verify_otp(
    phone: str,
    otp: str,
    db: Session = Depends(get_db)
):
    """Verify OTP (Persistent)"""
    is_valid = AuthService.verify_otp(db, phone, otp)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired OTP"
        )
    
    return {"message": "OTP verified successfully"}

@app.post("/auth/refresh", response_model=Token)
async def refresh_token(
    refresh_request: TokenRefreshRequest,
    db: Session = Depends(get_db)
):
    """Refresh access token using refresh token"""
    new_tokens = AuthService.refresh_access_token(db, refresh_request.refresh_token)
    return new_tokens

@app.post("/auth/logout")
async def logout(
    refresh_request: TokenRefreshRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Revoke refresh token on logout"""
    AuthService.revoke_refresh_token(db, refresh_request.refresh_token, current_user.id)
    return {"message": "Successfully logged out"}

# User Endpoints
@app.get("/users/me", response_model=UserResponse)
async def get_me(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Get current user info"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    user = get_current_user(token, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    return user

# Technician Endpoints
@app.post("/technicians/profile", response_model=TechnicianProfileResponse, status_code=status.HTTP_201_CREATED)
async def create_technician_profile(
    profile_data: TechnicianProfileCreate,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Create or update technician profile"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    user = get_current_user(token, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    # Check if user already has technician profile
    existing_profile = db.query(TechnicianProfile).filter(
        TechnicianProfile.user_id == user.id
    ).first()
    
    if existing_profile:
        # Update existing profile
        for key, value in profile_data.dict().items():
            setattr(existing_profile, key, value)
    else:
        # Create new profile
        existing_profile = TechnicianProfile(
            user_id=user.id,
            **profile_data.dict()
        )
        db.add(existing_profile)
    
    db.commit()
    db.refresh(existing_profile)
    return existing_profile

@app.post("/technicians/documents", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
async def upload_document(
    document_type: str = Form(...),
    file: UploadFile = File(...),
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Upload KYC/document for technician"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    user = get_current_user(token, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    # Get technician profile
    profile = db.query(TechnicianProfile).filter(
        TechnicianProfile.user_id == user.id
    ).first()
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User doesn't have a technician profile"
        )
    
    # Save file
    filename, file_size = DocumentService.save_upload_file(file, profile.id)
    
    # Create document record
    document = DocumentService.create_document_record(
        db=db,
        technician_id=profile.id,
        document_type=document_type,
        filename=filename,
        file_size=file_size,
        mime_type=file.content_type
    )
    
    return document

@app.get("/technicians/documents", response_model=list[DocumentResponse])
async def get_my_documents(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Get technician's uploaded documents"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    user = get_current_user(token, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    profile = db.query(TechnicianProfile).filter(
        TechnicianProfile.user_id == user.id
    ).first()
    
    if not profile:
        return []
    
    documents = DocumentService.get_technician_documents(db, profile.id)
    return documents

# Admin Endpoints
@app.get("/admin/technicians/pending")
async def get_pending_technicians(
    authorization: str = Header(None),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100
):
    """Get technicians pending verification (Admin only)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    admin = get_current_admin_user(token, db)
    if not admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    
    pending_techs = db.query(TechnicianProfile).filter(
        TechnicianProfile.verification_status == "pending"
    ).offset(skip).limit(limit).all()
    
    # Include user info
    result = []
    for tech in pending_techs:
        user = db.query(User).filter(User.id == tech.user_id).first()
        result.append({
            **tech.__dict__,
            "user_email": user.email,
            "user_phone": user.phone,
            "user_name": user.full_name
        })
    
    return result

@app.post("/admin/technicians/{technician_id}/verify")
async def verify_technician(
    technician_id: int,
    verification_data: TechnicianVerificationRequest,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Approve/reject technician verification (Admin only)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    admin = get_current_admin_user(token, db)
    if not admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    
    technician = db.query(TechnicianProfile).filter(
        TechnicianProfile.id == technician_id
    ).first()
    
    if not technician:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Technician not found"
        )
    
    if verification_data.action not in ["approve", "reject"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Action must be 'approve' or 'reject'"
        )
    
    technician.verification_status = verification_data.action
    technician.verification_notes = verification_data.notes
    technician.is_verified = (verification_data.action == "approve")
    
    db.commit()
    
    return {"message": f"Technician {verification_data.action}d successfully"}

@app.get("/admin/technicians/{technician_id}/documents")
async def get_technician_documents_admin(
    technician_id: int,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Get documents for a specific technician (Admin only)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    admin = get_current_admin_user(token, db)
    if not admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    
    documents = DocumentService.get_technician_documents(db, technician_id)
    return documents

# Job Endpoints
@app.post("/jobs", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
async def request_repair(
    job_data: JobCreate,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """User requests a repair"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    user = get_current_user(token, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    return await JobService.create_job(db, job_data, user.id)

@app.post("/jobs/{job_id}/accept", response_model=JobResponse)
async def accept_repair_job(
    job_id: int,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Technician accepts a repair"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    user = get_current_user(token, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    return await JobService.accept_job(db, job_id, user.id)

@app.patch("/jobs/{job_id}/status", response_model=JobResponse)
async def update_job_status(
    job_id: int,
    status_update: JobStatusUpdate,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Update a job's status (Technician or Admin only)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    current_user = get_current_user(token, db)
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    updated_job = await JobService.update_job_status(
        db, job_id, status_update.status, status_update.notes, current_user
    )
    return updated_job

@app.post("/jobs/{job_id}/messages", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def send_message(
    job_id: int,
    message_data: MessageCreate,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Send a message for a specific job (Customer or Technician)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    current_user = get_current_user(token, db)
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    new_message = await MessageService.create_message(
        db, job_id, current_user.id, message_data
    )
    return new_message

@app.get("/jobs/{job_id}/messages", response_model=List[MessageResponse])
async def get_messages(
    job_id: int,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Get messages for a specific job (Customer, Technician, or Admin)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    current_user = get_current_user(token, db)
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    messages = MessageService.get_messages_for_job(db, job_id, current_user.id)
    # To include sender details in the response, we need to manually map or eager load
    # For now, let's keep it simple and ensure the service returns Message objects
    # and Pydantic's from_attributes=True will handle the basic conversion.
    # If full sender details (name, email) are needed,
    # the get_messages_for_job service method or the endpoint itself
    # would need to fetch sender User objects and construct the MessageResponse.
    return messages

@app.post("/jobs/{job_id}/payments", response_model=Union[PaymentResponse, PaymentInitializationResponse], status_code=status.HTTP_201_CREATED)
async def initiate_payment(
    job_id: int,
    payment_data: PaymentCreate,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Initiate a payment for a specific job (Customer only)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    current_user = get_current_user(token, db)
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    result = await PaymentService.initiate_payment(db, job_id, current_user.id, payment_data)
    
    if "authorization_url" in result:
        return PaymentInitializationResponse(**result)
    else:
        # If it's pay on delivery, PaymentService.initiate_payment returns a dict
        # with "message", "payment_id", "status". We need to fetch the actual Payment object
        # to convert it to PaymentResponse.
        payment_id = result.get("payment_id")
        if payment_id:
            payment_obj = db.query(Payment).filter(Payment.id == payment_id).first()
            if payment_obj:
                return PaymentResponse.model_validate(payment_obj)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to initiate payment")

@app.get("/jobs/{job_id}/payments", response_model=List[PaymentResponse])
async def get_job_payments(
    job_id: int,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Get payments for a specific job (Customer, Technician, or Admin)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    current_user = get_current_user(token, db)
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    payments = PaymentService.get_job_payments(db, job_id, current_user)
    return payments

@app.patch("/payments/{payment_id}/status", response_model=PaymentResponse)
async def update_payment_status(
    payment_id: int,
    status_update: PaymentStatusUpdate,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Update a payment's status (Admin or Webhook)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    admin_user = get_current_admin_user(token, db) # Only admin can call this directly
    if not admin_user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    
    payment = await PaymentService.update_payment_status(db, payment_id, status_update)
    return payment

@app.post("/jobs/{job_id}/ratings", response_model=RatingResponse, status_code=status.HTTP_201_CREATED)
async def create_rating_for_job(
    job_id: int,
    rating_data: RatingCreate,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Leave a rating for a completed job (Customer only)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    current_user = get_current_user(token, db)
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    # Ensure the job_id in path matches the job_id in the payload
    if job_id != rating_data.job_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Job ID mismatch")

    new_rating = await RatingService.create_rating(db, job_id, current_user.id, rating_data)
    return new_rating

@app.get("/technicians/{technician_id}/ratings", response_model=List[RatingResponse])
async def get_technician_ratings(
    technician_id: int,
    db: Session = Depends(get_db)
):
    """Get all ratings for a specific technician"""
    ratings = RatingService.get_ratings_for_technician(db, technician_id)
    return ratings

@app.post("/jobs/{job_id}/disputes", response_model=DisputeResponse, status_code=status.HTTP_201_CREATED)
async def create_dispute_for_job(
    job_id: int,
    dispute_data: DisputeCreate,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Create a dispute for a specific job (Customer or Technician)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    current_user = get_current_user(token, db)
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    # Ensure the job_id in path matches the job_id in the payload
    if job_id != dispute_data.job_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Job ID mismatch")
    
    new_dispute = await DisputeService.create_dispute(db, job_id, current_user.id, dispute_data)
    return new_dispute

@app.get("/jobs/{job_id}/dispute", response_model=DisputeResponse)
async def get_dispute_details_by_job(
    job_id: int,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Get dispute details for a specific job (Job participants or Admin)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    current_user = get_current_user(token, db)
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    dispute = DisputeService.get_dispute_by_job(db, job_id, current_user.id)
    if not dispute:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Dispute not found for this job")
    return dispute

@app.get("/admin/disputes", response_model=List[DisputeResponse])
async def get_all_disputes(
    authorization: str = Header(None),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100
):
    """Get all disputes (Admin only)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    admin_user = get_current_admin_user(token, db)
    if not admin_user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    
    disputes = DisputeService.get_all_disputes(db, skip, limit)
    return disputes

@app.patch("/admin/disputes/{dispute_id}", response_model=DisputeResponse)
async def update_dispute_status_admin(
    dispute_id: int,
    dispute_update: DisputeUpdate,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Update dispute status and resolution notes (Admin only)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    admin_user = get_current_admin_user(token, db)
    if not admin_user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    
    updated_dispute = await DisputeService.update_dispute(db, dispute_id, dispute_update, admin_user.id)
    return updated_dispute

@app.post("/payments/webhook")
async def paystack_webhook(
    request: Request,
    paystack_signature: str = Header(..., alias="x-paystack-signature"),
    db: Session = Depends(get_db)
):
    """Handles incoming Paystack webhook events for transaction verification."""
    request_body = await request.body() # Get raw request body
    
    await PaymentService.verify_and_process_webhook(db, request_body, paystack_signature)
    
    return {"status": "success"} # Paystack expects a 200 OK response

# Health Check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "rev-backend"}

# WebSocket Endpoint for Notifications
@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    token: str = Query(...),
    db: Session = Depends(get_db)
):
    """Real-time connection for Users and Technicians"""
    user = get_user_from_token_ws(token, db)
    if not user:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    await notification_manager.connect(websocket, user.id)
    try:
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        notification_manager.disconnect(user.id)

@app.post("/internal/notify/{user_id}")
async def send_notification(
    user_id: int, 
    message: dict,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """Send notification to specific user (Admin only)"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = authorization.split(" ")[1]
    admin = get_current_admin_user(token, db)
    if not admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
         
    await notification_manager.send_personal_message(message, user_id)
    return {"status": "sent"}

# Serve uploaded files
@app.get("/uploads/{filename}")
async def get_uploaded_file(filename: str):
    file_path = os.path.join("uploads", filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)