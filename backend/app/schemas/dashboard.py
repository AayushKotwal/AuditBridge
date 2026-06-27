from pydantic import BaseModel


class DashboardStatsResponse(BaseModel):
    total_controls: int
    total_evidence: int
    pending_evidence: int
    approved_evidence: int
    total_audit_requests: int
    open_findings: int
    closed_findings: int