from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.remediation import (
    RemediationCreate,
    RemediationResponse,
    RemediationStatusUpdate
)

from app.services.remediation_service import (
    create_remediation,
    get_all_remediations,
    get_remediation_by_id,
    update_remediation_status
)

router = APIRouter(
    prefix="/remediations",
    tags=["Remediations"]
)


@router.post(
    "/",
    response_model=RemediationResponse
)
def create_new_remediation(
    remediation: RemediationCreate,
    db: Session = Depends(get_db)
):
    return create_remediation(
        db,
        remediation
    )


@router.get(
    "/",
    response_model=list[RemediationResponse]
)
def list_remediations(
    db: Session = Depends(get_db)
):
    return get_all_remediations(db)


@router.get(
    "/{remediation_id}",
    response_model=RemediationResponse
)
def get_remediation(
    remediation_id: int,
    db: Session = Depends(get_db)
):
    remediation = get_remediation_by_id(
        db,
        remediation_id
    )

    if not remediation:
        raise HTTPException(
            status_code=404,
            detail="Remediation not found"
        )

    return remediation


@router.put(
    "/{remediation_id}/status",
    response_model=RemediationResponse
)
def update_status(
    remediation_id: int,
    update: RemediationStatusUpdate,
    db: Session = Depends(get_db)
):
    remediation = update_remediation_status(
        db,
        remediation_id,
        update.status
    )

    if not remediation:
        raise HTTPException(
            status_code=404,
            detail="Remediation not found"
        )

    return remediation