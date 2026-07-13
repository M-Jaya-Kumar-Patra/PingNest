"use client";

import Card from "@/components/ui/Card";

import {
  HeartPulse,
  ShieldCheck,
  AlertTriangle,
  Siren,
} from "lucide-react";

export default function HealthScoreCard({
  score = 0,
}) {
  const getStatus = () => {
    if (score >= 90)
      return {
        label: "Excellent",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border:
          "border-emerald-500/20",
        icon: ShieldCheck,
      };

    if (score >= 70)
      return {
        label: "Good",
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border:
          "border-orange-500/20",
        icon: HeartPulse,
      };

    if (score >= 50)
      return {
        label: "Warning",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border:
          "border-amber-500/20",
        icon: AlertTriangle,
      };

    return {
      label: "Critical",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border:
        "border-red-500/20",
      icon: Siren,
    };
  };

  const status = getStatus();

  const StatusIcon =
    status.icon;

  return (
    <Card
      className="
      relative

      overflow-hidden
      "
    >
      <div
        className="
        absolute

        top-0
        right-0

        h-32
        w-32

        rounded-full

        bg-orange-500/5

        blur-3xl
        "
      />

      <div className="relative">
        <div
          className="
          flex
          items-center
          justify-between
          "
        >
          <div>
            <h2
              className="
              text-lg
              font-semibold

              text-white
              "
            >
              Health Score
            </h2>

            <p
              className="
              mt-1

              text-sm

              text-slate-400
              "
            >
              Overall service
              reliability score.
            </p>
          </div>

          <div
            className={`
              flex
              h-12
              w-12

              items-center
              justify-center

              rounded-xl

              border

              ${status.bg}
              ${status.border}
            `}
          >
            <StatusIcon
              size={22}
              className={
                status.color
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <div
            className="
            flex
            items-end
            gap-2
            "
          >
            <span
              className="
              text-5xl
              font-bold

              text-white
              "
            >
              {score}
            </span>

            <span
              className="
              mb-2

              text-slate-500
              "
            >
              /100
            </span>
          </div>

          <div
            className="
            mt-4

            h-3

            overflow-hidden

            rounded-full

            bg-slate-800
            "
          >
            <div
              className={`
                h-full

                rounded-full

                transition-all
                duration-700

                ${
                  score >= 90
                    ? "bg-emerald-500"
                    : score >= 70
                    ? "bg-orange-500"
                    : score >= 50
                    ? "bg-amber-500"
                    : "bg-red-500"
                }
              `}
              style={{
                width: `${Math.min(
                  score,
                  100
                )}%`,
              }}
            />
          </div>

          <div
            className={`
              mt-4

              inline-flex
              items-center

              rounded-full

              px-3
              py-1.5

              text-sm
              font-medium

              ${status.bg}
              ${status.color}
            `}
          >
            {status.label}
          </div>
        </div>
      </div>
    </Card>
  );
}