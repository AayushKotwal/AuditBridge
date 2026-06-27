from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime

from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from app.database.database import Base


class Evidence(Base):
    __tablename__ = "evidences"

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

    file_path = Column(
        String,
        nullable=True
    )

    status = Column(
        String,
        default="Pending"
    )

    control_id = Column(
        Integer,
        ForeignKey("controls.id"),
        nullable=False
    )

    uploaded_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    review_status = Column(
        String,
        default="Pending"
    )

    review_comments = Column(
        Text,
        nullable=True
    )

    reviewed_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    reviewed_at = Column(
        DateTime(timezone=True),
        nullable=True
    )

    control = relationship(
        "Control",
        back_populates="evidences"
    )

    uploaded_user = relationship(
        "User",
        foreign_keys=[uploaded_by]
    )

    reviewed_user = relationship(
        "User",
        foreign_keys=[reviewed_by]
    )