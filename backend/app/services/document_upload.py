# services/document_upload.py
import os
import uuid
from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session

from ..database import TechnicianDocument
from ..settings import settings
from ..validators import validate_file

class DocumentService:
    
    @staticmethod
    def save_upload_file(file: UploadFile, technician_id: int) -> str:
        # Validate file
        validate_file(file)
        
        # Create upload directory if not exists
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
        
        # Generate unique filename
        file_extension = file.filename.split('.')[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = os.path.join(settings.UPLOAD_DIR, unique_filename)
        
        # Save file
        with open(file_path, "wb") as buffer:
            content = file.file.read()
            buffer.write(content)
        
        return unique_filename, len(content)
    
    @staticmethod
    def create_document_record(
        db: Session,
        technician_id: int,
        document_type: str,
        filename: str,
        file_size: int,
        mime_type: str
    ):
        # In production, upload to S3 and get URL
        file_url = f"/uploads/{filename}"  # Local storage URL
        
        document = TechnicianDocument(
            technician_id=technician_id,
            document_type=document_type,
            file_name=filename,
            file_url=file_url,
            file_size=file_size,
            mime_type=mime_type
        )
        
        db.add(document)
        db.commit()
        db.refresh(document)
        return document
    
    @staticmethod
    def get_technician_documents(db: Session, technician_id: int):
        return db.query(TechnicianDocument).filter(
            TechnicianDocument.technician_id == technician_id
        ).all()
    
    @staticmethod
    def delete_document(db: Session, document_id: int, technician_id: int):
        document = db.query(TechnicianDocument).filter(
            TechnicianDocument.id == document_id,
            TechnicianDocument.technician_id == technician_id
        ).first()
        
        if not document:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Document not found"
            )
        
        # Delete file from storage
        try:
            file_path = os.path.join(settings.UPLOAD_DIR, document.file_name)
            if os.path.exists(file_path):
                os.remove(file_path)
        except:
            pass
        
        db.delete(document)
        db.commit()