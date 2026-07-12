"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function RequestsTimelineChart({ data }) {
  const chartData = data.map((item) => ({
    hour: `${item._id.hour}:00`,
    requests: item.requests,
  }));

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Requests Timeline</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="hour" />

          <YAxis />

          <Tooltip />

          <Line type="monotone" dataKey="requests" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
