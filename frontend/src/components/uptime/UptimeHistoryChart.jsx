"use client";

import Card from "@/components/ui/Card";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function UptimeHistoryChart({
  logs = [],
}) {
  const chartData = logs
    .slice()
    .reverse()
    .map((log) => ({
      time: new Date(
        log.createdAt
      ).toLocaleTimeString(),
      status:
        log.status === "UP"
          ? 1
          : 0,
    }));

  return (
    <Card>
      <div className="mb-5">
        <h2
          className="
          text-xl
          font-semibold
          text-white
          "
        >
          Uptime History
        </h2>

        <p
          className="
          mt-1
          text-sm
          text-slate-400
          "
        >
          Historical service
          availability over time.
        </p>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
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
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={{
                stroke: "#334155",
              }}
            />

            <YAxis
              domain={[0, 1]}
              ticks={[0, 1]}
              tickFormatter={(
                value
              ) =>
                value === 1
                  ? "UP"
                  : "DOWN"
              }
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={{
                stroke: "#334155",
              }}
            />

            <Tooltip
              formatter={(
                value
              ) => [
                value === 1
                  ? "UP"
                  : "DOWN",
                "Status",
              ]}
              contentStyle={{
                background:
                  "#0f172a",
                border:
                  "1px solid #334155",
                borderRadius:
                  "12px",
                color: "#fff",
              }}
            />

            <Area
              type="stepAfter"
              dataKey="status"
              stroke="#22c55e"
              fill="#22c55e33"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}