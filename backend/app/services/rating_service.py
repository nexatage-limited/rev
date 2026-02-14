# app/services/rating_service.py
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import List, Optional

from ..database import Rating, RepairJob, User, TechnicianProfile
from ..models import RatingCreate

class RatingService:
    @staticmethod
    async def create_rating(db: Session, job_id: int, reviewer_id: int, rating_data: RatingCreate) -> Rating:
        job = db.query(RepairJob).filter(RepairJob.id == job_id).first()
        if not job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
        
        # Authorization: Only the customer who owns the job can leave a rating
        if job.customer_id != reviewer_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only the customer of this job can leave a rating")
        
        # Ensure job is completed before rating
        if job.status != "completed":
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot rate an uncompleted job")
        
        # Ensure technician was assigned
        if job.technician_id is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot rate a job without an assigned technician")
        
        # Check if a rating already exists for this job
        existing_rating = db.query(Rating).filter(Rating.job_id == job_id).first()
        if existing_rating:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Job has already been rated")

        # Create new rating
        new_rating = Rating(
            job_id=job_id,
            reviewer_id=reviewer_id,
            technician_id=job.technician_id,
            rating=rating_data.rating,
            review_text=rating_data.review_text
        )
        db.add(new_rating)
        db.commit()
        db.refresh(new_rating)

        # Update technician's aggregated rating
        RatingService._update_technician_rating(db, job.technician_id)
        
        return new_rating

    @staticmethod
    def _update_technician_rating(db: Session, technician_profile_id: int):
        technician = db.query(TechnicianProfile).filter(TechnicianProfile.id == technician_profile_id).first()
        if technician:
            all_ratings = db.query(Rating).filter(Rating.technician_id == technician_profile_id).all()
            if all_ratings:
                total_score = sum([r.rating for r in all_ratings])
                technician.total_reviews = len(all_ratings)
                technician.rating = total_score / technician.total_reviews
            else:
                technician.total_reviews = 0
                technician.rating = 0.0
            db.commit()
            db.refresh(technician)

    @staticmethod
    def get_ratings_for_technician(db: Session, technician_profile_id: int) -> List[Rating]:
        # Note: We return raw Rating objects here, the API endpoint will convert to RatingResponse
        return db.query(Rating).filter(Rating.technician_id == technician_profile_id).order_by(Rating.created_at.desc()).all()

    @staticmethod
    def get_rating_by_job(db: Session, job_id: int) -> Optional[Rating]:
        return db.query(Rating).filter(Rating.job_id == job_id).first()