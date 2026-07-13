"use client";

import Card from "@/components/ui/Card";

import {
  Activity,
  Clock3,
  Route,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function RecentRequestsTable({
  requests = [],
}) {
  const getStatusColor = (
    statusCode
  ) => {
    if (statusCode >= 500)
      return "text-red-400 bg-red-500/10";

    if (statusCode >= 400)
      return "text-orange-400 bg-orange-500/10";

    if (statusCode >= 300)
      return "text-yellow-400 bg-yellow-500/10";

    return "text-emerald-400 bg-emerald-500/10";
  };

  const getMethodColor = (
    method
  ) => {
    switch (
      method?.toUpperCase()
    ) {
      case "GET":
        return "bg-emerald-500/10 text-emerald-400";

      case "POST":
        return "bg-orange-500/10 text-orange-400";

      case "PUT":
        return "bg-blue-500/10 text-blue-400";

      case "PATCH":
        return "bg-purple-500/10 text-purple-400";

      case "DELETE":
        return "bg-red-500/10 text-red-400";

      default:
        return "bg-slate-700 text-slate-300";
    }
  };

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
            Recent Requests
          </h2>

          <p
            className="
            text-sm
            text-slate-400
            mt-1
            "
          >
            Latest telemetry received
            from your APIs.
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
          <Activity size={18} />
          <span className="text-sm">
            Live
          </span>
        </div>
      </div>

      {requests.length === 0 ? (
        <div
          className="
          h-48
          flex
          flex-col
          items-center
          justify-center
          text-center
          "
        >
          <AlertTriangle
            size={40}
            className="text-slate-600 mb-3"
          />

          <h3
            className="
            text-white
            font-medium
            "
          >
            No Requests Yet
          </h3>

          <p
            className="
            text-slate-500
            mt-2
            text-sm
            "
          >
            Requests will appear here
            once your SDK starts
            sending telemetry.
          </p>
        </div>
      ) : (
        <div
          className="
          overflow-x-auto
          "
        >
          <table
            className="
            w-full
            min-w-[700px]
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
                  Method
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
                  Status
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
                  Response Time
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map(
                (request) => (
                  <tr
                    key={request._id}
                    className="
                    border-b
                    border-slate-800/60
                    hover:bg-slate-800/30
                    transition-colors
                    "
                  >
                    <td className="py-4">
                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        "
                      >
                        <Route
                          size={15}
                          className="text-slate-500"
                        />

                        <code
                          className="
                          text-orange-400
                          text-sm
                          "
                        >
                          {request.route}
                        </code>
                      </div>
                    </td>

                    <td className="py-4">
                      <span
                        className={`
                          px-3
                          py-1

                          rounded-full

                          text-xs
                          font-semibold

                          ${getMethodColor(
                            request.method
                          )}
                        `}
                      >
                        {request.method}
                      </span>
                    </td>

                    <td className="py-4">
                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-2

                          px-3
                          py-1

                          rounded-full

                          text-xs
                          font-semibold

                          ${getStatusColor(
                            request.statusCode
                          )}
                        `}
                      >
                        <CheckCircle2
                          size={12}
                        />

                        {
                          request.statusCode
                        }
                      </span>
                    </td>

                    <td className="py-4">
                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        text-white
                        "
                      >
                        <Clock3
                          size={15}
                          className="text-slate-500"
                        />

                        {
                          request.responseTime
                        }
                        ms
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}