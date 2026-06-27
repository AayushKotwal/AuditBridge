from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from app.database.database import Base


class AuditRequest(Base):
    __tablename__ = "audit_requests"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    status = Column(
        String,
        default="Open"
    )

    control_id = Column(
        Integer,
        ForeignKey("controls.id"),
        nullable=False
    )

    requested_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    assigned_to = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    control = relationship(
    "Control",
    back_populates="audit_requests"
    )

    requester = relationship(
        "User",
        foreign_keys=[requested_by]
    )

    assignee = relationship(
        "User",
        foreign_keys=[assigned_to]
    )

    findings = relationship(
    "Finding",
    back_populates="audit_request"
    )