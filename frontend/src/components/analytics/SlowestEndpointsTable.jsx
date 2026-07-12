export default function SlowestEndpointsTable({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold mb-4">Slowest Endpoints</h2>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Route</th>

            <th className="text-left">Avg Response</th>
          </tr>
        </thead>

        <tbody>
          {data.map((endpoint) => (
            <tr key={endpoint._id} className="border-t">
              <td className="py-2">{endpoint._id}</td>

              <td className="py-2">
                {Math.round(endpoint.avgResponseTime)} ms
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
