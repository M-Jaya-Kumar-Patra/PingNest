"use client";

import StatCard from "@/components/ui/StatCard";

export default function ErrorSummaryCards({
  errors,
}) {
  const totalErrors =
    errors.reduce(
      (sum, item) =>
        sum + item.count,
      0
    );

  const mostCommon =
    errors[0]?._id || "-";

  return (
    <div
      className="
      grid
      md:grid-cols-2
      gap-4
      "
    >
      <StatCard
        title="Total Errors"
        value={totalErrors}
      />

      <StatCard
        title="Top Error"
        value={mostCommon}
      />
    </div>
  );
}