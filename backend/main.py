from fastapi import FastAPI

from app.database.database import Base
from app.database.database import engine
from app.api.auth import router as auth_router
from app.api.controls import router as controls_router
from app.api import evidence
from app.api import audit_requests
from app.api.finding import router as finding_router
from app.api.remediations import router as remediations_router

from app.api.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware
import app.models

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AuditBridge API",
    version="1.0.0",
    description="Compliance Evidence Collection and Audit Readiness Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)


app.include_router(
    controls_router
)

app.include_router(
    evidence.router
)


app.include_router(
    audit_requests.router
)

app.include_router(finding_router)


app.include_router(remediations_router)
app.include_router(dashboard_router)

@app.get("/")
def root():
    return {
        "application": "AuditBridge",
        "status": "running",
        "version": "1.0.0"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

