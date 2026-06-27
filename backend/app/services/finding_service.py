from sqlalchemy.orm import Session

from app.models.finding import Finding


def create_finding(
    db: Session,
    finding_data
):
    finding = Finding(
        title=finding_data.title,
        description=finding_data.description,
        severity=finding_data.severity,
        control_id=finding_data.control_id,
        audit_request_id=finding_data.audit_request_id
    )

    db.add(finding)
    db.commit()
    db.refresh(finding)

    return finding


def get_all_findings(
    db: Session
):
    return db.query(Finding).all()

def get_finding_by_id(
    db: Session,
    finding_id: int
):
    return (
        db.query(Finding)
        .filter(Finding.id == finding_id)
        .first()
    )

def update_finding_status(
    db: Session,
    finding_id: int,
    status: str
):
    finding = (
        db.query(Finding)
        .filter(Finding.id == finding_id)
        .first()
    )

    if not finding:
        return None

    finding.status = status

    db.commit()
    db.refresh(finding)

    return finding