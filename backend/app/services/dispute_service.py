# app/services/dispute_service.py
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import List, Optional

from ..database import Dispute, RepairJob, User, DisputeStatus, JobStatus
from ..models import DisputeCreate, DisputeUpdate

class DisputeService:
    @staticmethod
    async def create_dispute(db: Session, job_id: int, reported_by_id: int, dispute_data: DisputeCreate) -> Dispute:
        job = db.query(RepairJob).filter(RepairJob.id == job_id).first()
        if not job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

        # Authorization: Only job customer or assigned technician can report a dispute
        if job.customer_id != reported_by_id and 
           (job.technician_id is None or job.technician.user_id != reported_by_id): # Assuming job.technician is eager loaded or available
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to create a dispute for this job")
        
        # Ensure job has a technician if it's a technician reporting
        if reported_by_id == job.technician.user_id and job.technician_id is None:
             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Technician cannot report dispute for unassigned job")

        # Check if a dispute already exists for this job
        existing_dispute = db.query(Dispute).filter(Dispute.job_id == job_id).first()
        if existing_dispute:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A dispute already exists for this job")
        
        # Create new dispute
        new_dispute = Dispute(
            job_id=job_id,
            reported_by_id=reported_by_id,
            against_user_id=dispute_data.against_user_id,
            reason=dispute_data.reason,
            description=dispute_data.description,
            status=DisputeStatus.OPEN # New disputes are open by default
        )
        db.add(new_dispute)
        
        # Set job status to DISPUTED
        job.status = JobStatus.DISPUTED
        
        db.commit()
        db.refresh(new_dispute)
        db.refresh(job) # Refresh job to show updated status
        
        # TODO: Send notification to involved parties and admin
        
        return new_dispute

    @staticmethod
    def get_dispute_by_job(db: Session, job_id: int, current_user_id: int) -> Optional[Dispute]:
        job = db.query(RepairJob).filter(RepairJob.id == job_id).first()
        if not job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
        
        # Authorization: Only job customer, assigned technician, or admin can view disputes for this job
        is_technician_assigned = (job.technician_id is not None and
                                  db.query(User).join(TechnicianProfile).filter(TechnicianProfile.id == job.technician_id, User.id == current_user_id).first())
        is_admin = db.query(User).filter(User.id == current_user_id, User.role == "admin").first()

        if job.customer_id != current_user_id and not is_technician_assigned and not is_admin:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to view this dispute")
            
        return db.query(Dispute).filter(Dispute.job_id == job_id).first()

    @staticmethod
    def get_all_disputes(db: Session, skip: int = 0, limit: int = 100) -> List[Dispute]:
        return db.query(Dispute).offset(skip).limit(limit).all()

    @staticmethod
    async def update_dispute(db: Session, dispute_id: int, status_update: DisputeUpdate, resolved_by_id: int) -> Dispute:
        dispute = db.query(Dispute).filter(Dispute.id == dispute_id).first()
        if not dispute:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Dispute not found")
        
        dispute.status = status_update.status
        dispute.resolution_notes = status_update.resolution_notes
        dispute.resolved_by_id = resolved_by_id # Admin user ID
        
        db.commit()
        db.refresh(dispute)

        # TODO: Send notifications to reported_by and against_user about resolution
        
        return dispute