from sqlalchemy.orm import Session

from app.models.remediation import Remediation


def create_remediation(
    db: Session,
    remediation_data
):
    remediation = Remediation(
        finding_id=remediation_data.finding_id,
        action_plan=remediation_data.action_plan,
        target_date=remediation_data.target_date,
        owner_id=remediation_data.owner_id,
        status=remediation_data.status
    )

    db.add(remediation)
    db.commit()
    db.refresh(remediation)

    return remediation


def get_all_remediations(
    db: Session
):
    return db.query(Remediation).all()


def get_remediation_by_id(
    db: Session,
    remediation_id: int
):
    return (
        db.query(Remediation)
        .filter(Remediation.id == remediation_id)
        .first()
    )


def update_remediation_status(
    db: Session,
    remediation_id: int,
    status: str
):
    remediation = (
        db.query(Remediation)
        .filter(Remediation.id == remediation_id)
        .first()
    )

    if not remediation:
        return None

    remediation.status = status

    db.commit()
    db.refresh(remediation)

    return remediation