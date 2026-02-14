# app/services/job_service.py
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from ..database import RepairJob, JobStatus, TechnicianProfile, ServiceType, User
from ..models import JobCreate
from .notifications import notification_manager
from .matching_service import MatchingService
from .email_service import EmailService # Import EmailService

class JobService:
    
    @staticmethod
    async def create_job(db: Session, job_data: JobCreate, user_id: int):
        service_type = db.query(ServiceType).filter(ServiceType.id == job_data.service_type_id).first()
        if not service_type:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Service type not found"
            )

        new_job = RepairJob(
            customer_id=user_id,
            device_name=job_data.device_name,
            issue_description=job_data.issue_description,
            service_type_id=job_data.service_type_id,
            location_lat=job_data.location_lat,
            location_long=job_data.location_long,
            address=job_data.address,
            scheduled_date=job_data.scheduled_date,
            scheduled_time=job_data.scheduled_time,
            pickup_option=job_data.pickup_option,
            dropoff_option=job_data.dropoff_option,
            estimated_cost=service_type.base_cost,
            estimated_completion_time=service_type.estimated_duration_minutes,
            status=JobStatus.PENDING
        )
        db.add(new_job)
        db.commit()
        db.refresh(new_job)
        
        # Use matching service to find top 3 technicians
        matched_techs = MatchingService.find_matches(
            db, job_data.location_lat, job_data.location_long, service_type.name
        )
        
        notification_payload = {
            "type": "NEW_JOB_OPPORTUNITY",
            "job_id": new_job.id,
            "device": new_job.device_name,
            "issue": new_job.issue_description
        }
        
        for tech in matched_techs:
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
            
        old_status = job.status.value # Capture old status before update
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

        # Send email to customer
        customer_user = db.query(User).filter(User.id == job.customer_id).first()
        if customer_user and customer_user.email:
            EmailService.send_job_accepted_email(customer_user.email, job.id, tech_profile.business_name)
        
        return job

    @staticmethod
    async def update_job_status(db: Session, job_id: int, new_status_str: str, notes: Optional[str], current_user: User):
        job = db.query(RepairJob).filter(RepairJob.id == job_id).first()
        if not job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

        old_status = job.status.value # Capture old status before update
        try:
            new_status = JobStatus(new_status_str)
        except ValueError:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid job status")

        # Authorization check
        is_technician_assigned = (current_user.role == "technician" and job.technician_id is not None and
                                  db.query(TechnicianProfile).filter(TechnicianProfile.id == job.technician_id,
                                                                      TechnicianProfile.user_id == current_user.id).first())
        is_admin = (current_user.role == "admin")

        if not is_admin and not is_technician_assigned:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update this job")
        
        # Prevent customer from updating status (customer_id == current_user.id for customer role)
        if current_user.role == "user":
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Customers cannot update job status directly")


        job.status = new_status
        # if notes: # Currently RepairJob does not have a notes field for status updates
        #     job.status_notes = notes 
        
        db.commit()
        db.refresh(job)

        # Send real-time notification about status change
        notification_payload = {
            "type": "JOB_STATUS_UPDATE",
            "job_id": job.id,
            "old_status": old_status,
            "new_status": new_status.value,
            "notes": notes
        }
        
        # Send email notifications
        customer_user = db.query(User).filter(User.id == job.customer_id).first()
        if customer_user and customer_user.email:
            EmailService.send_job_status_update_email(customer_user.email, job.id, old_status, new_status.value)
        
        if job.technician_id:
            tech_user = db.query(User).join(TechnicianProfile).filter(TechnicianProfile.id == job.technician_id).first()
            if tech_user: # Notify technician if assigned, regardless of who made the change
                if tech_user.email:
                    EmailService.send_job_status_update_email(tech_user.email, job.id, old_status, new_status.value)
                
                # Also send real-time notification to technician (if not the current user)
                if tech_user.id != current_user.id:
                    await notification_manager.send_personal_message(notification_payload, tech_user.id)
        
        # Always notify customer via real-time
        await notification_manager.send_personal_message(notification_payload, job.customer_id)

        return job