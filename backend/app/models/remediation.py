from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from app.database.database import Base


class Remediation(Base):
    __tablename__ = "remediations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    finding_id = Column(
        Integer,
        ForeignKey("findings.id"),
        nullable=False
    )

    action_plan = Column(
        Text,
        nullable=False
    )

    target_date = Column(
        String,
        nullable=True
    )

    owner_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    status = Column(
        String,
        default="Open"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    finding = relationship(
        "Finding",
        back_populates="remediations"
    )

    owner = relationship(
        "User"
    )