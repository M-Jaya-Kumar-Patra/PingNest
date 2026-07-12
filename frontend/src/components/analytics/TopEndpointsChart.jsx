"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function TopEndpointsChart({ data }) {
  return (
    <div
      className="
      bg-white
      p-6
      rounded-xl
      shadow
      border
    "
    >
      <h2
        className="
        text-xl
        font-semibold
        mb-4
      "
      >
        Top Endpoints
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="requests" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
