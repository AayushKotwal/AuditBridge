from pydantic import BaseModel
from typing import Optional


class AuditRequestCreate(BaseModel):
    title: str
    description: Optional[str] = None
    control_id: int
    requested_by: int
    assigned_to: int


class AuditRequestResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    control_id: int
    requested_by: int
    assigned_to: int

    class Config:
        from_attributes = True