"use client";

import { useState } from "react";

import Card from "@/components/ui/Card";

import {
  Copy,
  Check,
  Terminal,
  Package,
} from "lucide-react";

export default function QuickStartCard({
  apiKey,
}) {
  const [copiedItem, setCopiedItem] =
    useState(null);

  const installCommand =
    "npm install pingnest";

  const snippet = `import pingNest from "pingnest";

app.use(
  pingNest({
    apiKey: "${apiKey}",
    service: "my-service",
  })
);`;

  const handleCopy = async (
    text,
    type
  ) => {
    try {
      await navigator.clipboard.writeText(
        text
      );

      setCopiedItem(type);

      setTimeout(() => {
        setCopiedItem(null);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <div className="mb-6">
        <h2
          className="
          text-xl
          font-semibold
          text-white
          "
        >
          Quick Start
        </h2>

        <p
          className="
          text-sm
          text-slate-400
          mt-1
          "
        >
          Connect your application
          to PingNest in under
          2 minutes.
        </p>
      </div>

      <div className="space-y-5">

        {/* Step 1 */}

        <div>
          <div
            className="
            flex
            items-center
            justify-between
            mb-2
            "
          >
            <div
              className="
              flex
              items-center
              gap-2
              "
            >
              <Package
                size={16}
                className="text-orange-400"
              />

              <span
                className="
                text-sm
                font-medium
                text-white
                "
              >
                Step 1 • Install SDK
              </span>
            </div>

            <button
              onClick={() =>
                handleCopy(
                  installCommand,
                  "install"
                )
              }
              className="
              flex
              items-center
              gap-1
              text-sm
              text-slate-400
              hover:text-orange-400
              "
            >
              {copiedItem ===
              "install" ? (
                <>
                  <Check size={15} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={15} />
                  Copy
                </>
              )}
            </button>
          </div>

          <pre
            className="
            bg-slate-950
            border
            border-slate-800
            rounded-xl
            p-4
            overflow-x-auto
            text-orange-400
            text-sm
            "
          >
            {installCommand}
          </pre>
        </div>

        {/* Step 2 */}

        <div>
          <div
            className="
            flex
            items-center
            justify-between
            mb-2
            "
          >
            <div
              className="
              flex
              items-center
              gap-2
              "
            >
              <Terminal
                size={16}
                className="text-orange-400"
              />

              <span
                className="
                text-sm
                font-medium
                text-white
                "
              >
                Step 2 • Add Middleware
              </span>
            </div>

            <button
              onClick={() =>
                handleCopy(
                  snippet,
                  "snippet"
                )
              }
              className="
              flex
              items-center
              gap-1
              text-sm
              text-slate-400
              hover:text-orange-400
              "
            >
              {copiedItem ===
              "snippet" ? (
                <>
                  <Check size={15} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={15} />
                  Copy
                </>
              )}
            </button>
          </div>

          <pre
            className="
            bg-slate-950
            border
            border-slate-800
            rounded-xl
            p-4
            overflow-x-auto
            text-sm
            text-slate-300
            "
          >
            {snippet}
          </pre>
        </div>

        {/* Step 3 */}

        <div
          className="
          rounded-2xl
          border
          border-orange-500/20
          bg-orange-500/5
          p-4
          "
        >
          <p
            className="
            text-sm
            text-orange-300
            "
          >
            After installation,
            send a few requests to
            your API and watch
            telemetry appear in
            realtime on this
            dashboard.
          </p>
        </div>
      </div>
    </Card>
  );
}