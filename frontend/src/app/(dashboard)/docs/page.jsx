"use client";

import Card from "@/components/ui/Card";
import CodeBlock from "@/components/ui/CodeBlock";

import {
  Terminal,
  Rocket,
  Settings,
  Activity,
  BookOpen,
  Server,
  ShieldAlert,
  Database,
} from "lucide-react";

const sections = [
  {
    id: "installation",
    label: "Installation",
  },
  {
    id: "quick-start",
    label: "Quick Start",
  },
  {
    id: "architecture",
    label: "Architecture",
  },
  {
    id: "configuration",
    label: "Configuration",
  },
  {
    id: "telemetry",
    label: "Telemetry",
  },
  {
    id: "monitoring",
    label: "Monitoring",
  },
  {
    id: "api",
    label: "API Reference",
  },
  {
    id: "faq",
    label: "FAQ",
  },
];

export default function DocsPage() {
  return (
    <div className="flex gap-8">
      {/* Sidebar */}

      <aside
        className="
        hidden
        lg:block

        sticky
        top-24

        h-fit
        w-64
        shrink-0
        "
      >
        <Card>
          <p
            className="
            mb-4

            text-xs
            uppercase
            tracking-wider

            text-slate-500
            "
          >
            Documentation
          </p>

          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  document.getElementById(section.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="
  block
  w-full

  rounded-xl

  px-3
  py-2

  text-left
  text-sm

  text-slate-400

  transition

  hover:bg-slate-900
  hover:text-orange-400
  "
              >
                {section.label}
              </button>
            ))}
          </div>
        </Card>
      </aside>

      {/* Content */}

      <div className="flex-1 space-y-8">
        {/* Hero */}

        <section
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

          p-8
          "
        >
          <div
            className="
            absolute

            right-0
            top-0

            h-60
            w-60

            rounded-full

            bg-orange-500/10

            blur-3xl
            "
          />

          <div className="relative">
            <p className="text-sm font-medium text-orange-400">
              PingNest Documentation
            </p>

            <h1
              className="
              mt-3

              text-5xl

              font-bold

              text-white
              "
            >
              Observe every request.
            </h1>

            <p
              className="
              mt-5

              max-w-3xl

              text-lg

              text-slate-400
              "
            >
              Monitor APIs, collect telemetry, track uptime, manage incidents,
              and visualize application health in real time.
            </p>
          </div>
        </section>

        {/* Installation */}

        <Card id="installation" className="scroll-mt-24">
          <div className="mb-5 flex items-center gap-3">
            <Terminal size={22} className="text-orange-400" />

            <h2 className="text-2xl font-semibold text-white">Installation</h2>
          </div>

          <CodeBlock language="bash" code={`npm install pingnest`} />
        </Card>

        {/* Quick Start */}

        <Card id="quick-start" className="scroll-mt-24">
          <div className="mb-5 flex items-center gap-3">
            <Rocket size={22} className="text-orange-400" />

            <h2 className="text-2xl font-semibold text-white">Quick Start</h2>
          </div>

          <CodeBlock
            language="javascript"
            code={`import express from "express";
import pingNest from "pingnest";

const app = express();

app.use(
  pingNest({
    apiKey: "pn_live_xxxxx",
    service: "auth-service",
  })
);

app.listen(5000);`}
          />
        </Card>

        {/* Architecture */}

        <Card id="architecture" className="scroll-mt-24">
          <div className="mb-5 flex items-center gap-3">
            <Database size={22} className="text-orange-400" />

            <h2 className="text-2xl font-semibold text-white">Architecture</h2>
          </div>

          <pre
            className="
            overflow-x-auto

            rounded-xl

            bg-slate-950

            p-6

            text-orange-400
            "
          >
            {`Application
      |
      v
PingNest SDK
      |
      v
Telemetry API
      |
      v
MongoDB
      |
      v
Realtime Dashboard`}
          </pre>
        </Card>

        {/* Configuration */}

        <Card id="configuration" className="scroll-mt-24">
          <div className="mb-5 flex items-center gap-3">
            <Settings size={22} className="text-orange-400" />

            <h2 className="text-2xl font-semibold text-white">Configuration</h2>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="py-3 text-left text-slate-300">Option</th>

                <th className="py-3 text-left text-slate-300">Type</th>

                <th className="py-3 text-left text-slate-300">Required</th>

                <th className="py-3 text-left text-slate-300">Description</th>
              </tr>
            </thead>

            <tbody>
              {[
                ["apiKey", "string", "Yes", "Project API Key"],
                ["service", "string", "Yes", "Service Name"],
                ["endpoint", "string", "No", "Custom endpoint"],
                ["ignoreRoutes", "string[]", "No", "Ignored routes"],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-slate-800">
                  <td className="py-4 text-orange-400">{row[0]}</td>

                  <td className="py-4 text-slate-300">{row[1]}</td>

                  <td className="py-4 text-slate-300">{row[2]}</td>

                  <td className="py-4 text-slate-400">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Telemetry */}

        <Card id="telemetry" className="scroll-mt-24">
          <div className="mb-5 flex items-center gap-3">
            <Activity size={22} className="text-orange-400" />

            <h2 className="text-2xl font-semibold text-white">
              Example Telemetry
            </h2>
          </div>

          <CodeBlock
            language="json"
            code={`{
  "route": "/users",
  "method": "GET",
  "statusCode": 200,
  "responseTime": 142,
  "service": "user-service",
  "timestamp": "2026-07-13T10:00:00Z"
}`}
          />
        </Card>

        {/* Monitoring */}

        <Card id="monitoring" className="scroll-mt-24">
          <div className="mb-5 flex items-center gap-3">
            <ShieldAlert size={22} className="text-orange-400" />

            <h2 className="text-2xl font-semibold text-white">
              Monitoring & Incidents
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Uptime Monitoring",
              "Incident Creation",
              "Incident Resolution",
              "Latency Tracking",
              "Health Metrics",
              "Realtime Updates",
            ].map((item) => (
              <div
                key={item}
                className="
                rounded-xl

                border
                border-slate-800

                bg-slate-950

                p-4

                text-slate-300
                "
              >
                {item}
              </div>
            ))}
          </div>
        </Card>

        {/* API */}

        <Card id="api" className="scroll-mt-24">
          <div className="mb-5 flex items-center gap-3">
            <Server size={22} className="text-orange-400" />

            <h2 className="text-2xl font-semibold text-white">API Reference</h2>
          </div>

          <CodeBlock
            language="http"
            code={`POST /api/v1/telemetry

Headers:
Authorization: Bearer API_KEY

Content-Type: application/json`}
          />
        </Card>

        {/* FAQ */}

        <Card id="faq" className="scroll-mt-24">
          <div className="mb-5 flex items-center gap-3">
            <BookOpen size={22} className="text-orange-400" />

            <h2 className="text-2xl font-semibold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="font-medium text-white">
                Does PingNest support realtime updates?
              </h3>

              <p className="mt-2 text-slate-400">
                Yes. Telemetry and monitoring updates are streamed via
                Socket.IO.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white">
                Can I monitor external APIs?
              </h3>

              <p className="mt-2 text-slate-400">
                Yes. Create uptime monitors using any public URL.
              </p>
            </div>
          </div>
        </Card>

        {/* CTA */}

        <Card>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to get started?
            </h2>

            <p className="mt-3 text-slate-400">
              Create a project, copy your API key and start collecting telemetry
              in minutes.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
