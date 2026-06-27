from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from app.database.database import Base


class Control(Base):
    __tablename__ = "controls"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    control_id = Column(
        String,
        unique=True,
        nullable=False
    )

    title = Column(
        String,
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    framework = Column(
        String,
        nullable=False
    )

    status = Column(
        String,
        default="Active"
    )

    review_frequency = Column(
        String,
        default="Quarterly"
    )

    owner_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    owner = relationship(
    "User"
    )

    evidences = relationship(
    "Evidence",
    back_populates="control"
    )

    audit_requests = relationship(
    "AuditRequest",
    back_populates="control"
)