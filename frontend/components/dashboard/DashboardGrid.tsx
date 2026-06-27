import StatCard from "./StatCard";
import { DashboardStats } from "@/types/dashboard";

interface Props {
  stats: DashboardStats;
}

export default function DashboardGrid({
  stats,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Controls"
        value={stats.total_controls}
      />

      <StatCard
        title="Evidence"
        value={stats.total_evidence}
      />

      <StatCard
        title="Pending Evidence"
        value={stats.pending_evidence}
      />

      <StatCard
        title="Approved Evidence"
        value={stats.approved_evidence}
      />

      <StatCard
        title="Audit Requests"
        value={stats.total_audit_requests}
      />

      <StatCard
        title="Open Findings"
        value={stats.open_findings}
      />

      <StatCard
        title="Closed Findings"
        value={stats.closed_findings}
      />

    </div>
  );
}