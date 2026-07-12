"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
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
    "#ef4444",
    "#f97316",
    "#eab308",
    "#8b5cf6",
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4">
        Error Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="code"
            outerRadius={100}
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

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}