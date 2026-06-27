from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.database.database import get_db

from app.schemas.audit_request import (
    AuditRequestCreate,
    AuditRequestResponse
)

from app.services.audit_request_service import (
    create_audit_request,
    get_all_audit_requests
)

from app.services.audit_request_service import (
    create_audit_request,
    get_all_audit_requests,
    update_audit_request_status,
    get_audit_request_by_id
)

router = APIRouter(
    prefix="/audit-requests",
    tags=["Audit Requests"]
)


@router.post(
    "/",
    response_model=AuditRequestResponse
)
def create_request(
    request: AuditRequestCreate,
    db: Session = Depends(get_db)
):
    return create_audit_request(
        db,
        request
    )


@router.get(
    "/",
    response_model=list[AuditRequestResponse]
)
def list_requests(
    db: Session = Depends(get_db)
):
    return get_all_audit_requests(db)

@router.get(
    "/{request_id}",
    response_model=AuditRequestResponse
)
def get_request(
    request_id: int,
    db: Session = Depends(get_db)
):
    request = get_audit_request_by_id(
        db,
        request_id
    )

    if not request:
        raise HTTPException(
            status_code=404,
            detail="Audit request not found"
        )

    return request

@router.put(
    "/{request_id}/status",
    response_model=AuditRequestResponse
)
def update_status(
    request_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    request = update_audit_request_status(
        db,
        request_id,
        status
    )

    if not request:
        raise HTTPException(
            status_code=404,
            detail="Audit request not found"
        )

    return request