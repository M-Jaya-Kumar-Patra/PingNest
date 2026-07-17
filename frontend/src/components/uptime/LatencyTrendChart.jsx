"use client";

import Card from "@/components/ui/Card";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function LatencyTrendChart({
  logs = [],
}) {
  const chartData =
    logs
      .slice()
      .reverse()
      .map((log) => ({
        time:
          new Date(
            log.createdAt
          ).toLocaleTimeString(),
        latency:
          log.responseTime,
      }));

  return (
    <Card>
      <h2
        className="
        text-xl
        font-semibold
        text-white
        mb-5
        "
      >
        Latency Trend
      </h2>

      <div className="h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={chartData}
          >
            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="time"
              tick={{
                fill: "#94a3b8",
              }}
            />

            <YAxis
              tick={{
                fill: "#94a3b8",
              }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="latency"
              stroke="#f97316"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}