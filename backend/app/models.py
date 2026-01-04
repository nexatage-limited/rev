from pydantic import BaseModel, EmailStr, validator
from typing import Optional, List
from datetime import datetime
from enum import Enum

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

# Job Models
class JobCreate(BaseModel):
    device_name: str
    issue_description: str
    location_lat: float
    location_long: float
    address: str

class JobResponse(BaseModel):
    id: int
    customer_id: int
    technician_id: Optional[int]
    device_name: str
    issue_description: str
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True