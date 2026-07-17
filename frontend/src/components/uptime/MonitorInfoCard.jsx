"use client";

import Card from "@/components/ui/Card";
import { toggleMonitor } from "@/services/uptime.service";

import {
  Globe,
  Clock3,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function MonitorInfoCard({
  monitor, projectId, onMonitorUpdate
}) {
  if (!monitor) return null;

  return (
    <Card>
      <div className="mb-6 flex justify-between items-start">

      <div className="">
        <h2
          className="
          text-xl
          font-semibold
          text-white
          "
          >
          Monitor Information
        </h2>

        <p
          className="
          mt-1
          text-sm
          text-slate-400
          "
          >
          Configuration and current
          monitoring details.
        </p>
      </div>

      <div className="flex gap-2">
  <Link
    href={`/projects/${projectId}/uptime/${monitor._id}/edit`}
    className="
    rounded-lg

    border
    border-slate-700

    px-4
    py-2

    text-sm
    text-slate-300

    hover:border-orange-500
    hover:text-orange-400

    transition
    "
  >
    Edit
  </Link>

  <button
    onClick={async () => {
      try {
        const res =
          await toggleMonitor(
            monitor._id,
          );

        onMonitorUpdate(
          res.data.data,
        );

        toast.success(
          "Monitor updated",
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Update failed",
        );
      }
    }}
    className="
    rounded-lg

    border
    border-orange-500

    px-4
    py-2

    text-sm
    text-orange-400
    "
  >
    {monitor.isActive
      ? "Pause"
      : "Resume"}
  </button>
</div>
      
          </div>

      <div
        className="
        grid
        gap-6

        md:grid-cols-2
        "
      >
        <div>
          <p className="text-slate-500 text-sm">
            Monitor Name
          </p>

          <p className="text-white font-medium mt-1">
            {monitor.name}
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Method
          </p>

          <p className="text-white font-medium mt-1">
            {monitor.method}
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            URL
          </p>

          <div className="flex items-center gap-2 mt-1">
            <Globe
              size={15}
              className="text-slate-500"
            />

            <span className="text-white break-all">
              {monitor.url}
            </span>
          </div>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Interval
          </p>

          <div className="flex items-center gap-2 mt-1">
            <Clock3
              size={15}
              className="text-slate-500"
            />

            <span className="text-white">
              {monitor.interval} min
            </span>
          </div>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Last Checked
          </p>

          <div className="flex items-center gap-2 mt-1">
            <Calendar
              size={15}
              className="text-slate-500"
            />

            <span className="text-white">
              {monitor.lastCheckedAt
                ? new Date(
                    monitor.lastCheckedAt
                  ).toLocaleString()
                : "Never"}
            </span>
          </div>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Consecutive Failures
          </p>

          <div className="flex items-center gap-2 mt-1">
            <AlertTriangle
              size={15}
              className="text-orange-400"
            />

            <span className="text-white">
              {
                monitor.consecutiveFailures
              }
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}