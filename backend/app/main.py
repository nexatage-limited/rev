# main.py
from fastapi import FastAPI, Depends, HTTPException, status, Form, UploadFile, File, Header, WebSocket, WebSocketDisconnect, Query
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os

from .database import get_db, create_tables, User, TechnicianProfile
from .models import (
    UserCreate, UserResponse, Token, LoginRequest,
    TechnicianProfileCreate, TechnicianProfileResponse,
    DocumentResponse, TechnicianVerificationRequest,
    JobCreate, JobResponse
)
from .services.auth import AuthService, get_current_user, get_current_admin_user, get_user_from_token_ws
from .services.document_upload import DocumentService
from .services.notifications import notification_manager
from .services.job_service import JobService

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