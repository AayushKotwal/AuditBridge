from sqlalchemy.orm import Session
from datetime import datetime
from app.models.evidence import Evidence


def create_evidence(
    db: Session,
    evidence_data
):
    evidence = Evidence(
        title=evidence_data.title,
        description=evidence_data.description,
        file_path=evidence_data.file_path,
        status=evidence_data.status,
        control_id=evidence_data.control_id,
        uploaded_by=evidence_data.uploaded_by
    )

    db.add(evidence)
    db.commit()
    db.refresh(evidence)

    return evidence


def get_all_evidence(
    db: Session
):
    return db.query(Evidence).all()


def get_evidence_by_id(
    db: Session,
    evidence_id: int
):
    return (
        db.query(Evidence)
        .filter(Evidence.id == evidence_id)
        .first()
    )


def review_evidence(
    db: Session,
    evidence_id: int,
    review_data
):
    evidence = (
        db.query(Evidence)
        .filter(Evidence.id == evidence_id)
        .first()
    )

    if not evidence:
        return None

    evidence.review_status = review_data.review_status

    evidence.review_comments = (
        review_data.review_comments
    )

    evidence.reviewed_by = (
        review_data.reviewed_by
    )

    evidence.reviewed_at = datetime.utcnow()

    db.commit()
    db.refresh(evidence)

    return evidence