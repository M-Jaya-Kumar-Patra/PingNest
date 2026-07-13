"use client";

import Card from "@/components/ui/Card";
import CodeBlock from "@/components/ui/CodeBlock";

import {
  BookOpen,
  Terminal,
  Rocket,
  Settings,
  Activity,
} from "lucide-react";

export default function DocsPage() {
  return (
    <div
      className="
      max-w-6xl
      mx-auto

      space-y-8
      "
    >
      {/* Hero */}

      <div
        className="
        relative

        overflow-hidden

        rounded-3xl

        border
        border-slate-800

        bg-gradient-to-br
        from-slate-900
        via-slate-950
        to-slate-950

        p-6
        md:p-8
        "
      >
        <div
          className="
          absolute

          top-0
          right-0

          h-48
          w-48

          rounded-full

          bg-orange-500/10

          blur-3xl
          "
        />

        <div className="relative">
          <p
            className="
            text-sm
            font-medium

            text-orange-400
            "
          >
            Documentation
          </p>

          <h1
            className="
            mt-2

            text-4xl
            md:text-5xl

            font-bold

            text-white
            "
          >
            PingNest Docs
          </h1>

          <p
            className="
            mt-4

            max-w-2xl

            text-slate-400
            "
          >
            Monitor API traffic,
            response times, failures,
            and health metrics with a
            single middleware.
          </p>
        </div>
      </div>

      {/* Installation */}

      <Card>
        <div className="flex items-center gap-3 mb-5">
          <Terminal
            size={22}
            className="text-orange-400"
          />

          <h2
            className="
            text-2xl
            font-semibold
            text-white
            "
          >
            Installation
          </h2>
        </div>

        
          <CodeBlock
  language="bash"
  code={`npm install pingnest`}
/>
      </Card>

      {/* Quick Start */}

      <Card>
        <div className="flex items-center gap-3 mb-5">
          <Rocket
            size={22}
            className="text-orange-400"
          />

          <h2
            className="
            text-2xl
            font-semibold
            text-white
            "
          >
            Quick Start
          </h2>
        </div>

        <CodeBlock
  language="javascript"
  code={`import express from "express";
import pingNest from "pingnest";

const app = express();

app.use(
  pingNest({
    apiKey: "pn_live_xxxxxxxxx",
    service: "user-service"
  })
);

app.listen(5000);`}
/>
      </Card>

      {/* Configuration */}

      <Card>
        <div className="flex items-center gap-3 mb-5">
          <Settings
            size={22}
            className="text-orange-400"
          />

          <h2
            className="
            text-2xl
            font-semibold
            text-white
            "
          >
            Configuration Options
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table
            className="
            w-full

            border-collapse
            "
          >
            <thead>
              <tr
                className="
                border-b
                border-slate-800
                "
              >
                <th className="py-3 text-left text-slate-300">
                  Option
                </th>

                <th className="py-3 text-left text-slate-300">
                  Type
                </th>

                <th className="py-3 text-left text-slate-300">
                  Required
                </th>

                <th className="py-3 text-left text-slate-300">
                  Description
                </th>
              </tr>
            </thead>

            <tbody>
              {[
                [
                  "apiKey",
                  "string",
                  "Yes",
                  "Project API Key",
                ],
                [
                  "service",
                  "string",
                  "Yes",
                  "Service Name",
                ],
                [
                  "endpoint",
                  "string",
                  "No",
                  "Custom ingestion endpoint",
                ],
                [
                  "ignoreRoutes",
                  "string[]",
                  "No",
                  "Routes to ignore",
                ],
              ].map((row) => (
                <tr
                  key={row[0]}
                  className="
                  border-b
                  border-slate-800
                  "
                >
                  <td className="py-4 text-orange-400">
                    {row[0]}
                  </td>

                  <td className="py-4 text-slate-300">
                    {row[1]}
                  </td>

                  <td className="py-4 text-slate-300">
                    {row[2]}
                  </td>

                  <td className="py-4 text-slate-400">
                    {row[3]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Ignore Routes */}

      <Card>
        <h2
          className="
          text-2xl
          font-semibold

          text-white

          mb-5
          "
        >
          Ignore Routes
        </h2>

        <CodeBlock
  language="javascript"
  code={`app.use(
  pingNest({
    apiKey: "pn_live_xxx",
    service: "auth-service",

    ignoreRoutes: [
      "/health",
      "/favicon.ico"
    ]
  })
);`}
/>
      </Card>

      {/* Dashboard Features */}

      <Card>
        <div className="flex items-center gap-3 mb-5">
          <Activity
            size={22}
            className="text-orange-400"
          />

          <h2
            className="
            text-2xl
            font-semibold

            text-white
            "
          >
            Dashboard Features
          </h2>
        </div>

        <div
          className="
          grid

          gap-4

          md:grid-cols-2
          "
        >
          {[
            "Real-Time Telemetry",
            "Response Time Tracking",
            "Error Analytics",
            "Endpoint Monitoring",
            "Health Score",
            "Live Updates",
          ].map((feature) => (
            <div
              key={feature}
              className="
              rounded-xl

              border
              border-slate-800

              bg-slate-950

              p-4

              text-slate-300
              "
            >
              {feature}
            </div>
          ))}
        </div>
      </Card>

      {/* Example Telemetry */}

      <Card>
        <div className="flex items-center gap-3 mb-5">
          <BookOpen
            size={22}
            className="text-orange-400"
          />

          <h2
            className="
            text-2xl
            font-semibold

            text-white
            "
          >
            Example Telemetry
          </h2>
        </div>

        <pre
          className="
          overflow-x-auto

          rounded-2xl

          border
          border-slate-800

          bg-slate-950

          p-5

          text-sm
          text-orange-400
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