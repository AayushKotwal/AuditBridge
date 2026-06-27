from pydantic import BaseModel
from typing import Optional


class EvidenceCreate(BaseModel):
    title: str
    description: Optional[str] = None
    file_path: Optional[str] = None
    status: str = "Pending"
    control_id: int
    uploaded_by: Optional[int] = None


class EvidenceResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    file_path: Optional[str]
    status: str
    control_id: int
    uploaded_by: Optional[int]

    review_status: Optional[str] = None
    review_comments: Optional[str] = None
    reviewed_by: Optional[int] = None

    class Config:
        from_attributes = True

class EvidenceReview(BaseModel):
    review_status: str
    review_comments: Optional[str] = None
    reviewed_by: int