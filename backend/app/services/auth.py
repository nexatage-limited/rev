from datetime import datetime, timedelta
from typing import Optional, Dict
import jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
import random
import string

from ..database import User, TechnicianProfile
from ..models import UserCreate, LoginRequest, Token
from ..settings import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In-memory OTP store (use Redis in production)
otp_store: Dict[str, dict] = {}

class AuthService:
    
    @staticmethod
    def hash_password(password: str) -> str:
        return pwd_context.hash(password)
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)
    
    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        return encoded_jwt
    
    @staticmethod
    def register_user(db: Session, user_data: UserCreate):
        # Check if user exists
        existing_user = db.query(User).filter(
            (User.email == user_data.email) | (User.phone == user_data.phone)
        ).first()
        
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email or phone already exists"
            )
        
        # Create user
        hashed_password = AuthService.hash_password(user_data.password)
        user = User(
            email=user_data.email,
            phone=user_data.phone,
            full_name=user_data.full_name,
            hashed_password=hashed_password,
            role=user_data.role
        )
        
        db.add(user)
        db.commit()
        db.refresh(user)
        
        # If registering as technician, create profile
        if user_data.role == "technician":
            technician = TechnicianProfile(user_id=user.id)
            db.add(technician)
            db.commit()
        
        return user
    
    @staticmethod
    def login_user(db: Session, login_data: LoginRequest):
        # Find user by email or phone
        if login_data.email:
            user = db.query(User).filter(User.email == login_data.email).first()
        elif login_data.phone:
            user = db.query(User).filter(User.phone == login_data.phone).first()
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email or phone required"
            )
        
        if not user or not AuthService.verify_password(login_data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Account is disabled"
            )
        
        # Generate token
        access_token = AuthService.create_access_token(
            data={"sub": str(user.id), "role": user.role}
        )
        
        return Token(access_token=access_token, role=user.role)
    
    @staticmethod
    def generate_otp(phone: str) -> str:
        otp = ''.join(random.choices(string.digits, k=6))
        otp_store[phone] = {
            "otp": otp,
            "expires_at": datetime.utcnow() + timedelta(minutes=settings.OTP_EXPIRE_MINUTES)
        }
        # In production: Send OTP via SMS service
        print(f"OTP for {phone}: {otp}")  # Remove in production
        return otp
    
    @staticmethod
    def verify_otp(phone: str, otp: str) -> bool:
        if phone not in otp_store:
            return False
        
        otp_data = otp_store[phone]
        if datetime.utcnow() > otp_data["expires_at"]:
            del otp_store[phone]
            return False
        
        if otp_data["otp"] != otp:
            return False
        
        del otp_store[phone]
        return True

def get_current_user(token: str, db: Session):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
    except jwt.PyJWTError:
        return None
    
    user = db.query(User).filter(User.id == int(user_id)).first()
    return user

def get_current_admin_user(token: str, db: Session):
    user = get_current_user(token, db)
    if not user or user.role != "admin":
        return None
    return user