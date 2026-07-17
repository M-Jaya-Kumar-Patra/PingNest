"use client";

import Card from "@/components/ui/Card";

export default function ErrorTable({
  errors,
}) {
  return (
    <Card>
      <div
        className="
        overflow-x-auto
        "
      >
        <table
          className="
          w-full
          "
        >
          <thead>
            <tr
              className="
              border-b
              border-slate-800
              "
            >
              <th className="py-3 text-left">
                Status
              </th>

              <th className="py-3 text-left">
                Count
              </th>

              <th className="py-3 text-left">
                Avg Response
              </th>

              <th className="py-3 text-left">
                Last Seen
              </th>
            </tr>
          </thead>

          <tbody>
            {errors.map(
              (error) => (
                <tr
                  key={error._id}
                  className="
                  border-b
                  border-slate-800/50
                  "
                >
                  <td className="py-4">
                    {error._id}
                  </td>

                  <td className="py-4">
                    {error.count}
                  </td>

                  <td className="py-4">
                    {Math.round(
                      error.avgResponseTime
                    )}
                    ms
                  </td>

                  <td className="py-4">
                    {new Date(
                      error.lastSeen
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