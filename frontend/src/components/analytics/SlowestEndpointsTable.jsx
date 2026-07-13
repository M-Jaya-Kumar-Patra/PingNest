"use client";

import Card from "@/components/ui/Card";

import {
  Timer,
  AlertTriangle,
  Gauge,
} from "lucide-react";

export default function SlowestEndpointsTable({
  data = [],
}) {
  const getLatencyColor = (
    latency
  ) => {
    if (latency >= 1000)
      return "text-red-400 bg-red-500/10";

    if (latency >= 500)
      return "text-orange-400 bg-orange-500/10";

    if (latency >= 250)
      return "text-yellow-400 bg-yellow-500/10";

    return "text-emerald-400 bg-emerald-500/10";
  };

  if (!data.length) {
    return (
      <Card>
        <div
          className="
          flex
          flex-col
          items-center
          justify-center
          h-[280px]
          text-center
          "
        >
          <AlertTriangle
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
            Slow endpoint analytics
            will appear once traffic
            is received.
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
            Slowest Endpoints
          </h2>

          <p
            className="
            text-sm
            text-slate-400
            mt-1
            "
          >
            Endpoints with the
            highest average response
            times.
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
          <Gauge size={18} />
          <span className="text-sm">
            Performance
          </span>
        </div>
      </div>

      {/* Table */}

      <div
        className="
        overflow-x-auto
        "
      >
        <table
          className="
          w-full
          min-w-[500px]
          "
        >
          <thead>
            <tr
              className="
              border-b
              border-slate-800
              "
            >
              <th
                className="
                text-left
                py-3
                text-sm
                font-medium
                text-slate-400
                "
              >
                Route
              </th>

              <th
                className="
                text-left
                py-3
                text-sm
                font-medium
                text-slate-400
                "
              >
                Avg Response Time
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map(
              (endpoint) => {
                const latency =
                  Math.round(
                    endpoint.avgResponseTime
                  );

                return (
                  <tr
                    key={endpoint._id}
                    className="
                    border-b
                    border-slate-800/50
                    hover:bg-slate-800/30
                    transition-colors
                    "
                  >
                    <td className="py-4">
                      <code
                        className="
                        text-orange-400
                        text-sm
                        "
                      >
                        {endpoint._id}
                      </code>
                    </td>

                    <td className="py-4">
                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-2

                          px-3
                          py-1.5

                          rounded-full

                          text-xs
                          font-semibold

                          ${getLatencyColor(
                            latency
                          )}
                        `}
                      >
                        <Timer
                          size={12}
                        />

                        {latency} ms
                      </span>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}