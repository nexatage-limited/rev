# validators.py
from fastapi import HTTPException, status
from fastapi import UploadFile

from .settings import settings

def validate_file(file: UploadFile):
    # Check file size
    file.file.seek(0, 2)  # Seek to end
    file_size = file.file.tell()
    file.file.seek(0)  # Reset pointer
    
    if file_size > settings.MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File size exceeds {settings.MAX_FILE_SIZE} bytes limit"
        )
    
    # Check file type
    if file.content_type not in settings.ALLOWED_FILE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type not allowed. Allowed types: {settings.ALLOWED_FILE_TYPES}"
        )
    
    return True

def validate_phone_number(phone: str) -> bool:
    # Basic phone validation
    if not phone.startswith('+'):
        return False
    # Add more validation as needed
    return True