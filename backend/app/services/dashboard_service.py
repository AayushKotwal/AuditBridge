from sqlalchemy.orm import Session

from app.models.control import Control
from app.models.evidence import Evidence
from app.models.audit_request import AuditRequest
from app.models.finding import Finding


def get_dashboard_stats(
    db: Session
):
    return {
        "total_controls":
            db.query(Control).count(),

        "total_evidence":
            db.query(Evidence).count(),

        "pending_evidence":
            db.query(Evidence)
            .filter(
                Evidence.review_status == "Pending"
            )
            .count(),

        "approved_evidence":
            db.query(Evidence)
            .filter(
                Evidence.review_status == "Approved"
            )
            .count(),

        "total_audit_requests":
            db.query(AuditRequest).count(),

        "open_findings":
            db.query(Finding)
            .filter(
                Finding.status == "Open"
            )
            .count(),

        "closed_findings":
            db.query(Finding)
            .filter(
                Finding.status == "Closed"
            )
            .count()
    }