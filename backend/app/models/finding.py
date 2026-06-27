from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from app.database.database import Base


class Finding(Base):
    __tablename__ = "findings"

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

    severity = Column(
        String,
        default="Medium"
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

    audit_request_id = Column(
        Integer,
        ForeignKey("audit_requests.id"),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    control = relationship("Control")

    audit_request = relationship("AuditRequest")

    remediations = relationship(
    "Remediation",
    back_populates="finding"
)