# app/services/job_service.py
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from ..database import RepairJob, JobStatus, TechnicianProfile
from ..models import JobCreate
from .notifications import notification_manager

class JobService:
    
    @staticmethod
    async def create_job(db: Session, job_data: JobCreate, user_id: int):
        new_job = RepairJob(
            customer_id=user_id,
            device_name=job_data.device_name,
            issue_description=job_data.issue_description,
            location_lat=job_data.location_lat,
            location_long=job_data.location_long,
            address=job_data.address,
            status=JobStatus.PENDING
        )
        db.add(new_job)
        db.commit()
        db.refresh(new_job)
        
        # Notify all verified technicians
        available_techs = db.query(TechnicianProfile).filter(
            TechnicianProfile.is_verified == True
        ).all()
        
        notification_payload = {
            "type": "NEW_JOB_OPPORTUNITY",
            "job_id": new_job.id,
            "device": new_job.device_name,
            "issue": new_job.issue_description
        }
        
        for tech in available_techs:
            await notification_manager.send_personal_message(
                notification_payload, 
                tech.user_id
            )
            
        return new_job

    @staticmethod
    async def accept_job(db: Session, job_id: int, technician_user_id: int):
        tech_profile = db.query(TechnicianProfile).filter(
            TechnicianProfile.user_id == technician_user_id
        ).first()
        
        if not tech_profile:
             raise HTTPException(status_code=400, detail="Not a technician")

        job = db.query(RepairJob).filter(RepairJob.id == job_id).first()
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        
        if job.status != JobStatus.PENDING:
            raise HTTPException(status_code=400, detail="Job already taken")
            
        job.status = JobStatus.ACCEPTED
        job.technician_id = tech_profile.id
        db.commit()
        db.refresh(job)
        
        # Notify customer
        await notification_manager.send_personal_message(
            {
                "type": "JOB_ACCEPTED",
                "job_id": job.id,
                "technician_name": tech_profile.business_name
            },
            job.customer_id
        )
        
        return job