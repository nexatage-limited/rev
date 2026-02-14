# app/database.py
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, Float, Text, ForeignKey, Enum, Date, Time
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

class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"

class PaymentMethod(str, enum.Enum):
    CARD = "card"
    PAY_ON_DELIVERY = "pay_on_delivery"
    BANK_TRANSFER = "bank_transfer"

class DisputeStatus(str, enum.Enum):
    OPEN = "open"
    IN_REVIEW = "in_review"
    RESOLVED = "resolved"
    REJECTED = "rejected"

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

    refresh_tokens = relationship("RefreshToken", back_populates="user") # Add relationship to refresh tokens

class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    token = Column(String, unique=True, index=True, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_revoked = Column(Boolean, default=False)

    user = relationship("User", back_populates="refresh_tokens")

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
    location_lat = Column(Float, nullable=True)
    location_long = Column(Float, nullable=True)
    response_time_minutes = Column(Integer, nullable=True) # New field for response time
    
    user = relationship("User")
    ratings = relationship("Rating", back_populates="rated_technician") # Add relationship to ratings

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

class ServiceType(Base):
    __tablename__ = "service_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    base_cost = Column(Float, nullable=False)
    estimated_duration_minutes = Column(Integer, nullable=False)

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("repair_jobs.id"), nullable=False)
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    is_read = Column(Boolean, default=False)

    job = relationship("RepairJob")
    sender = relationship("User")

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("repair_jobs.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False) # Customer who made the payment
    technician_id = Column(Integer, ForeignKey("technician_profiles.id"), nullable=True) # Technician receiving payment
    amount = Column(Float, nullable=False)
    currency = Column(String, default="USD")
    payment_method = Column(Enum(PaymentMethod), nullable=False)
    transaction_id = Column(String, nullable=True, unique=True)
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    job = relationship("RepairJob", back_populates="payments")
    payer = relationship("User", foreign_keys=[user_id])
    payee_technician = relationship("TechnicianProfile", foreign_keys=[technician_id])

class Rating(Base):
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("repair_jobs.id"), unique=True, nullable=False) # One rating per job
    reviewer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    technician_id = Column(Integer, ForeignKey("technician_profiles.id"), nullable=False)
    rating = Column(Integer, nullable=False) # e.g., 1-5
    review_text = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    job = relationship("RepairJob")
    reviewer = relationship("User")
    rated_technician = relationship("TechnicianProfile", back_populates="ratings")

class Dispute(Base):
    __tablename__ = "disputes"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("repair_jobs.id"), unique=True, nullable=False) # One dispute per job for now
    reported_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    against_user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # User against whom the dispute is
    reason = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    status = Column(Enum(DisputeStatus), default=DisputeStatus.OPEN)
    resolution_notes = Column(Text, nullable=True)
    resolved_by_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Admin who resolved it
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    job = relationship("RepairJob", back_populates="dispute_entry")
    reported_by = relationship("User", foreign_keys=[reported_by_id])
    against_user = relationship("User", foreign_keys=[against_user_id])
    resolved_by = relationship("User", foreign_keys=[resolved_by_id])

class RepairJob(Base):
    __tablename__ = "repair_jobs"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("users.id"))
    technician_id = Column(Integer, ForeignKey("technician_profiles.id"), nullable=True)
    service_type_id = Column(Integer, ForeignKey("service_types.id"), nullable=False)
    
    device_name = Column(String, nullable=False)
    issue_description = Column(Text, nullable=False)
    
    status = Column(Enum(JobStatus), default=JobStatus.PENDING)
    
    location_lat = Column(Float, nullable=True)
    location_long = Column(Float, nullable=True)
    address = Column(String, nullable=True)

    scheduled_date = Column(Date, nullable=False)
    scheduled_time = Column(Time, nullable=False)
    pickup_option = Column(String, nullable=True)
    dropoff_option = Column(String, nullable=True)

    estimated_cost = Column(Float, nullable=True)
    estimated_completion_time = Column(Integer, nullable=True) # In minutes
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    customer = relationship("User", foreign_keys=[customer_id])
    technician = relationship("TechnicianProfile", foreign_keys=[technician_id])
    service_type = relationship("ServiceType")
    messages = relationship("Message", back_populates="job", order_by="Message.timestamp") # Add relationship to messages
    payments = relationship("Payment", back_populates="job")
    rating_entry = relationship("Rating", back_populates="job", uselist=False) # One-to-one with rating
    dispute_entry = relationship("Dispute", back_populates="job", uselist=False) # One-to-one with dispute