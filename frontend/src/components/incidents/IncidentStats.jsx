import StatCard from "../ui/StatCard";

export default function IncidentStats({
  summary,
}) {
  return (
    <div
      className="
      grid
      gap-4

      md:grid-cols-2
      xl:grid-cols-4
      "
    >
      <StatCard
        title="Open Incidents"
        value={
          summary.openIncidents
        }
      />

      <StatCard
        title="Resolved"
        value={
          summary.resolvedIncidents
        }
      />

      <StatCard
        title="Critical"
        value={
          summary.criticalIncidents
        }
      />

      <StatCard
        title="Downtime"
        value={`${summary.totalDowntimeMinutes} min`}
      />
    </div>
  );
}