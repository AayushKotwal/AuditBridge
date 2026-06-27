from pydantic import BaseModel
from typing import Optional


class ControlCreate(BaseModel):
    control_id: str
    title: str
    description: Optional[str] = None
    framework: str
    status: str = "Active"
    review_frequency: str = "Quarterly"
    owner_id: Optional[int] = None


class ControlResponse(BaseModel):
    id: int
    control_id: str
    title: str
    description: Optional[str]
    framework: str
    status: str
    review_frequency: str
    owner_id: Optional[int]

    class Config:
        from_attributes = True