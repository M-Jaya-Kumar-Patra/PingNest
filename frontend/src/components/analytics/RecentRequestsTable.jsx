import Card from "@/components/ui/Card";

export default function RecentRequestsTable({ requests }) {
  return (
    <Card>
      <h2
        className="
        text-xl
        font-semibold
        mb-4
      "
      >
        Recent Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Route</th>

              <th className="text-left py-2">Method</th>

              <th className="text-left py-2">Status</th>

              <th className="text-left py-2">Response Time</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="border-b">
                <td className="py-2">{request.route}</td>
                <td className="py-2">{request.method}</td>
                <td className="py-2">{request.statusCode}</td>
                <td className="py-2">{request.responseTime} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
