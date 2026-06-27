from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

from app.models.control import Control
from app.models.evidence import Evidence
from app.models.user import User
from app.models.audit_request import AuditRequest
from app.models.finding import Finding
from app.models.remediation import Remediation



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

