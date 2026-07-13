"use client";

import Card from "@/components/ui/Card";

export default function DocsPage() {
  return (
    <div className="max-w-5xl">

      <div className="mb-8">

        <h1
          className="
          text-4xl
          font-bold
          "
        >
          PingNest Documentation
        </h1>

        <p
          className="
          text-gray-500
          mt-2
          "
        >
          Monitor API performance,
          response times and errors
          in real-time.
        </p>

      </div>

      {/* Installation */}

      <Card className="mb-6">

        <h2
          className="
          text-2xl
          font-semibold
          mb-4
          "
        >
          Installation
        </h2>

        <pre
          className="
          bg-gray-100
          p-4
          rounded-lg
          overflow-x-auto
          "
        >
{`npm install pingnest`}
        </pre>

      </Card>

      {/* Quick Start */}

      <Card className="mb-6">

        <h2
          className="
          text-2xl
          font-semibold
          mb-4
          "
        >
          Quick Start
        </h2>

        <pre
          className="
          bg-gray-100
          p-4
          rounded-lg
          overflow-x-auto
          text-sm
          "
        >
{`import express from "express";
import pingNest from "pingnest";

const app = express();

app.use(
  pingNest({
    apiKey:
      "pn_live_xxxxxxxxx",

    service:
      "user-service",

    endpoint:
      "https://api.pingnest.com/api/v1/telemetry/ingest",
  })
);

app.listen(5000);`}
        </pre>

      </Card>

      {/* Configuration */}

      <Card className="mb-6">

        <h2
          className="
          text-2xl
          font-semibold
          mb-4
          "
        >
          Configuration Options
        </h2>

        <div className="overflow-x-auto">

          <table
            className="
            w-full
            text-left
            "
          >
            <thead>
              <tr className="border-b">
                <th className="py-2">
                  Option
                </th>

                <th className="py-2">
                  Type
                </th>

                <th className="py-2">
                  Required
                </th>

                <th className="py-2">
                  Description
                </th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b">
                <td className="py-3">
                  apiKey
                </td>

                <td>string</td>

                <td>Yes</td>

                <td>
                  Project API Key
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3">
                  service
                </td>

                <td>string</td>

                <td>Yes</td>

                <td>
                  Service Name
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3">
                  endpoint
                </td>

                <td>string</td>

                <td>Yes</td>

                <td>
                  PingNest API URL
                </td>
              </tr>

              <tr>
                <td className="py-3">
                  ignoreRoutes
                </td>

                <td>string[]</td>

                <td>No</td>

                <td>
                  Routes to ignore
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </Card>

      {/* Ignore Routes */}

      <Card className="mb-6">

        <h2
          className="
          text-2xl
          font-semibold
          mb-4
          "
        >
          Ignore Routes
        </h2>

        <pre
          className="
          bg-gray-100
          p-4
          rounded-lg
          overflow-x-auto
          "
        >
{`app.use(
  pingNest({
    apiKey:
      "pn_live_xxx",

    service:
      "auth-service",

    endpoint:
      "https://api.pingnest.com",

    ignoreRoutes: [
      "/health",
      "/favicon.ico"
    ],
  })
);`}
        </pre>

      </Card>

      {/* Dashboard */}

      <Card className="mb-6">

        <h2
          className="
          text-2xl
          font-semibold
          mb-4
          "
        >
          Dashboard Features
        </h2>

        <ul
          className="
          list-disc
          pl-6
          space-y-2
          "
        >
          <li>
            Real-time telemetry
          </li>

          <li>
            Response time tracking
          </li>

          <li>
            Error analytics
          </li>

          <li>
            Endpoint performance
          </li>

          <li>
            Health score
          </li>

          <li>
            Socket.IO live updates
          </li>
        </ul>

      </Card>

      {/* Example Telemetry */}

      <Card>

        <h2
          className="
          text-2xl
          font-semibold
          mb-4
          "
        >
          Example Telemetry
        </h2>

        <pre
          className="
          bg-gray-100
          p-4
          rounded-lg
          overflow-x-auto
          text-sm
          "
        >
{`{
  route: "/users",
  method: "GET",
  statusCode: 200,
  responseTime: 142,
  service: "user-service",
  timestamp:
    "2026-07-13T10:00:00Z"
}`}
        </pre>

      </Card>

    </div>
  );
}