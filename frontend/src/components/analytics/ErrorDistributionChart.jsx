"use client";

import Card from "@/components/ui/Card";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

export default function ErrorDistributionChart({
  data,
}) {
  const chartData = data.map(
    (item) => ({
      code: item._id,
      count: item.count,
    })
  );

  const colors = [
    "#ef4444", // red
    "#f97316", // orange
    "#f59e0b", // amber
    "#8b5cf6", // purple
    "#06b6d4", // cyan
  ];

  if (!chartData.length) {
    return (
      <Card>
        <h2
          className="
          text-lg
          font-semibold
          text-white
          mb-4
          "
        >
          Error Distribution
        </h2>

        <div
          className="
          h-[300px]

          flex
          items-center
          justify-center

          text-slate-500
          "
        >
          No error data available
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div
        className="
        flex
        items-center
        justify-between

        mb-5
        "
      >
        <div>
          <h2
            className="
            text-lg
            font-semibold
            text-white
            "
          >
            Error Distribution
          </h2>

          <p
            className="
            text-sm
            text-slate-400
            mt-1
            "
          >
            Breakdown of failed requests
            by status code.
          </p>
        </div>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="code"
              outerRadius={110}
              innerRadius={55}
              paddingAngle={3}
              label
            >
              {chartData.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      colors[
                        index %
                          colors.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

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
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}