from typing import Optional, List, Dict, Any # Added Dict, Any
from datetime import datetime, date, time
from enum import Enum
from ..database import PaymentMethod, PaymentStatus, DisputeStatus

# Request/Response Models
class UserCreate(BaseModel):
    email: EmailStr
    phone: str
    full_name: str
    password: str
    role: str = "user"
    
    @validator('phone')
    def validate_phone(cls, v):
        if not v.startswith('+'):
            raise ValueError('Phone number must start with +')
        return v

class LoginRequest(BaseModel):
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    refresh_token: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    phone: str
    full_name: str
    role: str
    is_verified: bool
    
    class Config:
        from_attributes = True

class TechnicianProfileCreate(BaseModel):
    business_name: str
    years_experience: int
    specialization: str
    service_radius_km: int = 10
    location_lat: Optional[float] = None
    location_long: Optional[float] = None
    response_time_minutes: Optional[int] = None

class TechnicianProfileResponse(BaseModel):
    id: int
    user_id: int
    business_name: str
    years_experience: int
    specialization: str
    verification_status: str
    is_verified: bool
    
    class Config:
        from_attributes = True

class DocumentUploadRequest(BaseModel):
    document_type: str

class DocumentResponse(BaseModel):
    id: int
    document_type: str
    file_name: str
    file_url: str
    uploaded_at: datetime
    
    class Config:
        from_attributes = True

# Admin Models
class TechnicianVerificationRequest(BaseModel):
    action: str  # "approve" or "reject"
    notes: Optional[str] = None

# Service Type Models
class ServiceTypeResponse(BaseModel):
    id: int
    name: str
    base_cost: float
    estimated_duration_minutes: int

    class Config:
        from_attributes = True

# Job Models
class JobCreate(BaseModel):
    device_name: str
    issue_description: str
    service_type_id: int
    location_lat: float
    location_long: float
    address: str
    scheduled_date: date
    scheduled_time: time
    pickup_option: Optional[str] = None
    dropoff_option: Optional[str] = None

class JobResponse(BaseModel):
    id: int
    customer_id: int
    technician_id: Optional[int]
    service_type_id: int
    device_name: str
    issue_description: str
    status: str
    created_at: datetime
    scheduled_date: date
    scheduled_time: time
    pickup_option: Optional[str] = None
    dropoff_option: Optional[str] = None
    estimated_cost: Optional[float] = None
    estimated_completion_time: Optional[int] = None
    
    class Config:
        from_attributes = True

class JobStatusUpdate(BaseModel):
    status: str
    notes: Optional[str] = None

# Message Models
class MessageCreate(BaseModel):
    content: str

class MessageResponse(BaseModel):
    id: int
    job_id: int
    sender_id: int
    content: str
    timestamp: datetime
    is_read: bool
    sender: UserResponse # Nested Pydantic model for sender details

    class Config:
        from_attributes = True

# Payment Models
class PaymentCreate(BaseModel):
    job_id: int
    amount: float
    currency: str = "USD"
    payment_method: PaymentMethod

class PaymentResponse(BaseModel):
    id: int
    job_id: int
    user_id: int
    technician_id: Optional[int]
    amount: float
    currency: str
    payment_method: PaymentMethod
    transaction_id: Optional[str] = None
    status: PaymentStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PaymentStatusUpdate(BaseModel):
    status: PaymentStatus
    transaction_id: Optional[str] = None

# Rating Models
class RatingCreate(BaseModel):
    job_id: int
    rating: int # 1-5
    review_text: Optional[str] = None

class RatingResponse(BaseModel):
    id: int
    job_id: int
    reviewer_id: int
    technician_id: int
    rating: int
    review_text: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    reviewer: UserResponse
    rated_technician: TechnicianProfileResponse # No nested UserResponse to avoid circular dependency
    
    class Config:
        from_attributes = True

# Dispute Models
class DisputeCreate(BaseModel):
    job_id: int
    against_user_id: Optional[int] = None
    reason: str
    description: Optional[str] = None

class DisputeResponse(BaseModel):
    id: int
    job_id: int
    reported_by_id: int
    against_user_id: Optional[int] = None
    reason: str
    description: Optional[str] = None
    status: DisputeStatus
    resolution_notes: Optional[str] = None
    resolved_by_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime
    reported_by: UserResponse
    against_user: Optional[UserResponse] = None
    resolved_by: Optional[UserResponse] = None

    class Config:
        from_attributes = True

class DisputeUpdate(BaseModel):
    status: DisputeStatus
    resolution_notes: Optional[str] = None

# Refresh Token Models
class RefreshTokenResponse(BaseModel):
    refresh_token: str

class TokenRefreshRequest(BaseModel):
    refresh_token: str

# New Payment Models for Paystack Integration
class PaymentInitializationResponse(BaseModel):
    authorization_url: str
    reference: str

class PaystackWebhookEvent(BaseModel):
    event: str
    data: Dict[str, Any]