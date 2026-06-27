from pydantic import BaseModel
from typing import Optional


class RemediationCreate(BaseModel):
    finding_id: int
    action_plan: str
    target_date: Optional[str] = None
    owner_id: Optional[int] = None
    status: str = "Open"


class RemediationResponse(BaseModel):
    id: int
    finding_id: int
    action_plan: str
    target_date: Optional[str]
    owner_id: Optional[int]
    status: str

    class Config:
        from_attributes = True