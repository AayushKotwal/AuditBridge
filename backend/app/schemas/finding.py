from pydantic import BaseModel
from typing import Optional


class FindingCreate(BaseModel):
    title: str
    description: Optional[str] = None
    severity: str
    control_id: int
    audit_request_id: int


class FindingResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    severity: str
    status: str
    control_id: int
    audit_request_id: int

    class Config:
        from_attributes = True

class FindingStatusUpdate(BaseModel):
    status: str