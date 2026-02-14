# settings.py
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite:///./rev.db"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 10080 # 7 days
    
    # File Upload
    MAX_FILE_SIZE: int = 5 * 1024 * 1024  # 5MB
    ALLOWED_FILE_TYPES: list = ["image/jpeg", "image/png", "application/pdf"]
    UPLOAD_DIR: str = "./uploads"
    
    # OTP
    OTP_EXPIRE_MINUTES: int = 10

    # Paystack
    PAYSTACK_SECRET_KEY: str
    PAYSTACK_BASE_URL: str = "https://api.paystack.co"
    PAYSTACK_CALLBACK_URL: str = "http://localhost:3000/verify-payment" # Frontend URL to redirect to after payment
    PAYSTACK_WEBHOOK_SECRET: str
    
    class Config:
        env_file = ".env"

settings = Settings()