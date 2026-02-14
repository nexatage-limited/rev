# app/services/message_service.py
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import List, Optional

from ..database import Message, RepairJob, User
from ..models import MessageCreate, MessageResponse
from .notifications import notification_manager

class MessageService:
    @staticmethod
    async def create_message(db: Session, job_id: int, sender_id: int, message_data: MessageCreate) -> Message:
        job = db.query(RepairJob).filter(RepairJob.id == job_id).first()
        if not job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

        # Authorization: Only participants of the job (customer or assigned technician) can send messages
        if job.customer_id != sender_id and 
           (job.technician_id is None or db.query(User).join(TechnicianProfile).filter(TechnicianProfile.id == job.technician_id, User.id == sender_id).first() is None):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to send messages for this job")
        
        new_message = Message(
            job_id=job_id,
            sender_id=sender_id,
            content=message_data.content,
            is_read=False # Always false initially
        )
        db.add(new_message)
        db.commit()
        db.refresh(new_message)
        
        # Determine recipient for real-time notification
        recipient_id = None
        if sender_id == job.customer_id and job.technician_id:
            # Customer sent message, notify technician
            technician_user = db.query(User).join(TechnicianProfile).filter(TechnicianProfile.id == job.technician_id).first()
            if technician_user:
                recipient_id = technician_user.id
        elif job.technician_id and db.query(User).join(TechnicianProfile).filter(TechnicianProfile.id == job.technician_id, User.id == sender_id).first():
            # Technician sent message, notify customer
            recipient_id = job.customer_id
        
        if recipient_id:
            # Send real-time notification
            message_payload = {
                "type": "NEW_MESSAGE",
                "job_id": job_id,
                "sender_id": sender_id,
                "content": new_message.content,
                "timestamp": new_message.timestamp.isoformat(),
                "id": new_message.id
            }
            await notification_manager.send_personal_message(message_payload, recipient_id)
            
        return new_message

    @staticmethod
    def get_messages_for_job(db: Session, job_id: int, current_user_id: int) -> List[Message]:
        job = db.query(RepairJob).filter(RepairJob.id == job_id).first()
        if not job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
        
        # Authorization: Only participants of the job (customer, assigned technician, or admin) can view messages
        is_technician_assigned = (job.technician_id is not None and
                                  db.query(User).join(TechnicianProfile).filter(TechnicianProfile.id == job.technician_id, User.id == current_user_id).first())
        is_admin = db.query(User).filter(User.id == current_user_id, User.role == "admin").first()

        if job.customer_id != current_user_id and not is_technician_assigned and not is_admin:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to view messages for this job")
        
        messages = db.query(Message).filter(Message.job_id == job_id).order_by(Message.timestamp).all()

        # Mark messages as read for the current user if they are the recipient
        for msg in messages:
            if msg.sender_id != current_user_id and not msg.is_read:
                msg.is_read = True
        db.commit() # Commit changes to mark messages as read
        
        return messages