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

import {
  TrendingUp,
  Activity,
} from "lucide-react";

export default function RequestsTimelineChart({
  data = [],
}) {
  const chartData = data.map(
    (item) => ({
      time: item._id.time,
      requests: item.requests,
    })
  );

  if (!chartData.length) {
    return (
      <Card>
        <div
          className="
          flex
          flex-col
          items-center
          justify-center
          h-[320px]
          text-center
          "
        >
          <Activity
            size={40}
            className="
            text-slate-600
            mb-3
            "
          />

          <h3
            className="
            text-white
            font-medium
            "
          >
            No Timeline Data
          </h3>

          <p
            className="
            text-slate-500
            mt-2
            text-sm
            "
          >
            Traffic trends will appear
            once requests are received.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      {/* Header */}

      <div
        className="
        flex
        items-center
        justify-between
        mb-6
        "
      >
        <div>
          <h2
            className="
            text-xl
            font-semibold
            text-white
            "
          >
            Requests Timeline
          </h2>

          <p
            className="
            text-sm
            text-slate-400
            mt-1
            "
          >
            Incoming API traffic over
            time.
          </p>
        </div>

        <div
          className="
          hidden
          sm:flex
          items-center
          gap-2
          text-orange-400
          "
        >
          <TrendingUp size={18} />
          <span className="text-sm">
            Traffic Trend
          </span>
        </div>
      </div>

      {/* Chart */}

      <div className="h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
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
              axisLine={{
                stroke: "#334155",
              }}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              axisLine={{
                stroke: "#334155",
              }}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background:
                  "#0f172a",
                border:
                  "1px solid #334155",
                borderRadius:
                  "12px",
                color: "#fff",
              }}
              labelStyle={{
                color: "#f59e0b",
              }}
            />

            <Line
              type="monotone"
              dataKey="requests"
              stroke="#f97316"
              strokeWidth={3}
              dot={{
                fill: "#f97316",
                r: 4,
              }}
              activeDot={{
                r: 6,
                fill: "#fb923c",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}