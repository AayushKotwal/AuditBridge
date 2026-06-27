from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.database.database import get_db


from app.schemas.finding import FindingStatusUpdate
from app.services.finding_service import update_finding_status

from app.schemas.finding import (
    FindingCreate,
    FindingResponse
)

from app.services.finding_service import (
    create_finding,
    get_all_findings
)

router = APIRouter(
    prefix="/findings",
    tags=["Findings"]
)


@router.post(
    "/",
    response_model=FindingResponse
)
def create_new_finding(
    finding: FindingCreate,
    db: Session = Depends(get_db)
):
    return create_finding(
        db,
        finding
    )


@router.get(
    "/",
    response_model=list[FindingResponse]
)
def list_findings(
    db: Session = Depends(get_db)
):
    return get_all_findings(db)

@router.get(
    "/{finding_id}",
    response_model=FindingResponse
)
def get_finding(
    finding_id: int,
    db: Session = Depends(get_db)
):
    finding = get_finding_by_id(
        db,
        finding_id
    )

    if not finding:
        raise HTTPException(
            status_code=404,
            detail="Finding not found"
        )

    return finding

@router.put(
    "/{finding_id}/status",
    response_model=FindingResponse
)
def update_status(
    finding_id: int,
    data: FindingStatusUpdate,
    db: Session = Depends(get_db)
):
    finding = update_finding_status(
        db,
        finding_id,
        data.status
    )

    if not finding:
        raise HTTPException(
            status_code=404,
            detail="Finding not found"
        )

    return finding
