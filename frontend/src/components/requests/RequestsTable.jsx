"use client";

import Card from "@/components/ui/Card";

export default function RequestsTable({
  requests,
}) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table
          className="
          w-full
          min-w-[800px]
          "
        >
          <thead>
            <tr
              className="
              border-b
              border-slate-800
              "
            >
              <th className="text-left py-4">
                Method
              </th>

              <th className="text-left py-4">
                Route
              </th>

              <th className="text-left py-4">
                Status
              </th>

              <th className="text-left py-4">
                Response Time
              </th>

              <th className="text-left py-4">
                Timestamp
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
                  border-slate-800/50

                  hover:bg-slate-900/50
                  "
                >
                  <td className="py-4">
                    {request.method}
                  </td>

                  <td className="py-4">
                    <code
                      className="
                      text-orange-400
                      "
                    >
                      {request.route}
                    </code>
                  </td>

                  <td className="py-4">
                    {request.statusCode}
                  </td>

                  <td className="py-4">
                    {
                      request.responseTime
                    }
                    ms
                  </td>

                  <td className="py-4">
                    {new Date(
                      request.createdAt
                    ).toLocaleString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}