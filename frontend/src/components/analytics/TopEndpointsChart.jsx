"use client";

import Card from "@/components/ui/Card";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  Route,
  TrendingUp,
} from "lucide-react";

export default function TopEndpointsChart({
  data = [],
}) {
  const chartData = data.map(
    (item) => ({
      endpoint: item._id,
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
          <Route
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
            No Endpoint Data
          </h3>

          <p
            className="
            text-slate-500
            mt-2
            text-sm
            "
          >
            Endpoint analytics will
            appear once telemetry
            starts arriving.
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
            Top Endpoints
          </h2>

          <p
            className="
            text-sm
            text-slate-400
            mt-1
            "
          >
            Most requested API
            endpoints across your
            service.
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
            Traffic Ranking
          </span>
        </div>
      </div>

      {/* Chart */}

      <div className="h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="endpoint"
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              axisLine={{
                stroke: "#334155",
              }}
              tickLine={false}
              angle={-20}
              textAnchor="end"
              height={60}
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
              formatter={(value) => [
                `${value} requests`,
                "Traffic",
              ]}
            />

            <Bar
              dataKey="requests"
              radius={[8, 8, 0, 0]}
              fill="#f97316"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}