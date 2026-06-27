from sqlalchemy.orm import Session

from app.models.audit_request import AuditRequest


def create_audit_request(
    db: Session,
    request_data
):
    request = AuditRequest(
        title=request_data.title,
        description=request_data.description,
        control_id=request_data.control_id,
        requested_by=request_data.requested_by,
        assigned_to=request_data.assigned_to
    )

    db.add(request)
    db.commit()
    db.refresh(request)

    return request


def get_all_audit_requests(
    db: Session
):
    return db.query(AuditRequest).all()

def update_audit_request_status(
    db: Session,
    request_id: int,
    new_status: str
):
    request = (
        db.query(AuditRequest)
        .filter(AuditRequest.id == request_id)
        .first()
    )

    if not request:
        return None

    request.status = new_status

    db.commit()
    db.refresh(request)

    return request

def get_audit_request_by_id(
    db: Session,
    request_id: int
):
    return (
        db.query(AuditRequest)
        .filter(AuditRequest.id == request_id)
        .first()
    )