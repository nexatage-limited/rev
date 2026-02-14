from datetime import datetime, timedelta
from typing import Optional
import jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
import random
import string
import uuid # For generating UUIDs for refresh tokens

from ..database import User, TechnicianProfile, OTP, RefreshToken
from ..models import UserCreate, LoginRequest, Token
from ..settings import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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
    def _create_refresh_token(db: Session, user_id: int) -> str:
        refresh_token_string = str(uuid.uuid4())
        expires_at = datetime.utcnow() + timedelta(minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES)
        
        refresh_token_db = RefreshToken(
            user_id=user_id,
            token=refresh_token_string,
            expires_at=expires_at
        )
        db.add(refresh_token_db)
        db.commit()
        db.refresh(refresh_token_db)
        return refresh_token_string
    
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
        
        # Generate access token
        access_token = AuthService.create_access_token(
            data={"sub": str(user.id), "role": user.role}
        )

        # Generate refresh token
        refresh_token = AuthService._create_refresh_token(db, user.id)
        
        return Token(access_token=access_token, token_type="bearer", role=user.role, refresh_token=refresh_token)
    
    @staticmethod
    def refresh_access_token(db: Session, refresh_token_string: str) -> Token:
        refresh_token_db = db.query(RefreshToken).filter(
            RefreshToken.token == refresh_token_string,
            RefreshToken.is_revoked == False,
            RefreshToken.expires_at > datetime.utcnow()
        ).first()

        if not refresh_token_db:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired refresh token")

        # Invalidate the used refresh token (for one-time use / rotation)
        refresh_token_db.is_revoked = True
        db.add(refresh_token_db)
        db.commit()

        user = db.query(User).filter(User.id == refresh_token_db.user_id).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found for refresh token")

        # Generate new access token
        new_access_token = AuthService.create_access_token(
            data={"sub": str(user.id), "role": user.role}
        )
        # Generate new refresh token
        new_refresh_token = AuthService._create_refresh_token(db, user.id)

        return Token(access_token=new_access_token, token_type="bearer", role=user.role, refresh_token=new_refresh_token)

    @staticmethod
    def revoke_refresh_token(db: Session, refresh_token_string: str, user_id: int):
        refresh_token_db = db.query(RefreshToken).filter(
            RefreshToken.token == refresh_token_string,
            RefreshToken.user_id == user_id,
            RefreshToken.is_revoked == False
        ).first()

        if not refresh_token_db:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
        
        refresh_token_db.is_revoked = True
        db.add(refresh_token_db)
        db.commit()
    
    @staticmethod
    def generate_otp(db: Session, phone: str) -> str:
        # Invalidate previous OTPs
        db.query(OTP).filter(OTP.phone == phone, OTP.is_used == False).update({"is_used": True})
        
        otp_code = ''.join(random.choices(string.digits, k=6))
        expires_at = datetime.utcnow() + timedelta(minutes=settings.OTP_EXPIRE_MINUTES)
        
        otp_entry = OTP(phone=phone, code=otp_code, expires_at=expires_at)
        db.add(otp_entry)
        db.commit()
        
        print(f"[SMS GATEWAY] OTP for {phone}: {otp_code}")
        return otp_code
    
    @staticmethod
    def verify_otp(db: Session, phone: str, otp: str) -> bool:
        otp_record = db.query(OTP).filter(
            OTP.phone == phone,
            OTP.code == otp,
            OTP.is_used == False,
            OTP.expires_at > datetime.utcnow()
        ).first()
        
        if not otp_record:
            return False
            
        otp_record.is_used = True
        db.commit()
        return True

def get_user_from_token_ws(token: str, db: Session):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
    except jwt.PyJWTError:
        return None
    return db.query(User).filter(User.id == int(user_id)).first()

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