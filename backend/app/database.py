# app/database.py
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, Float, Text, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func
import enum
from .settings import settings

# Use SQLite for development
DATABASE_URL = "sqlite:///./rev.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # This is only for SQLite!
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Enums and models remain the same...
class UserRole(str, enum.Enum):
    USER = "user"
    TECHNICIAN = "technician"
    ADMIN = "admin"

class VerificationStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class DocumentType(str, enum.Enum):
    ID_CARD = "id_card"
    CERTIFICATE = "certificate"
    PORTFOLIO = "portfolio"
    OTHER = "other"

class JobStatus(str, enum.Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    DISPUTED = "disputed"

# Models (copy from your existing file)
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, unique=True, index=True)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String)
    role = Column(Enum(UserRole), default=UserRole.USER)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class TechnicianProfile(Base):
    __tablename__ = "technician_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    business_name = Column(String)
    years_experience = Column(Integer)
    specialization = Column(String)
    service_radius_km = Column(Integer, default=10)
    rating = Column(Float, default=0.0)
    total_reviews = Column(Integer, default=0)
    is_verified = Column(Boolean, default=False)
    verification_status = Column(Enum(VerificationStatus), default=VerificationStatus.PENDING)
    verification_notes = Column(Text)
    
    user = relationship("User")

class TechnicianDocument(Base):
    __tablename__ = "technician_documents"
    
    id = Column(Integer, primary_key=True, index=True)
    technician_id = Column(Integer, ForeignKey("technician_profiles.id"))
    document_type = Column(Enum(DocumentType))
    file_url = Column(String, nullable=False)
    file_name = Column(String, nullable=False)
    file_size = Column(Integer)
    mime_type = Column(String)
    is_verified = Column(Boolean, default=False)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    technician = relationship("TechnicianProfile")

class OTP(Base):
    __tablename__ = "otps"

    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String, index=True, nullable=False)
    code = Column(String, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    is_used = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RepairJob(Base):
    __tablename__ = "repair_jobs"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("users.id"))
    technician_id = Column(Integer, ForeignKey("technician_profiles.id"), nullable=True)
    
    device_name = Column(String, nullable=False)
    issue_description = Column(Text, nullable=False)
    
    status = Column(Enum(JobStatus), default=JobStatus.PENDING)
    
    location_lat = Column(Float, nullable=True)
    location_long = Column(Float, nullable=True)
    address = Column(String, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    customer = relationship("User", foreign_keys=[customer_id])
    technician = relationship("TechnicianProfile", foreign_keys=[technician_id])

# Create tables
def create_tables():
    Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()