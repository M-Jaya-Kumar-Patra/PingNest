"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { getMonitor, getMonitorLogs, getMonitorStats } from "@/services/uptime.service";

import Loader from "@/components/ui/Loader";
import Card from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";

import { CheckCircle2, XCircle, Clock3, Activity } from "lucide-react";

import LatencyTrendChart from "@/components/uptime/LatencyTrendChart";
import UptimeHistoryChart from "@/components/uptime/UptimeHistoryChart";
import MonitorInfoCard from "@/components/uptime/MonitorInfoCard";

export default function MonitorDetailsPage() {
  const { monitorId, id } = useParams();

  const [loading, setLoading] = useState(true);

  const [logs, setLogs] = useState([]);

  const [stats, setStats] = useState(null);

  const [monitor, setMonitor] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsRes, logsRes, monitorRes] = await Promise.all([
          getMonitorStats(monitorId),
          getMonitorLogs(monitorId),
          getMonitor(monitorId),
        ]);

        setMonitor(monitorRes.data.data);

        setStats(statsRes.data.data);

        setLogs(logsRes.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (monitorId) {
      loadData();

      const interval = setInterval(loadData, 30000);

      return () => clearInterval(interval);
    }
  }, [monitorId]);

  if (loading || !stats) {
    return <Loader text="Loading monitor details..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-white
            "
        >
          Monitor Details
        </h1>

        <p
          className="
            mt-2
            text-slate-400
            "
        >
          Uptime history and health metrics.
        </p>
      </div>

      

      {/* Stats */}

      <div
        className="
            grid
            gap-4

            md:grid-cols-4
            "
      >
        <StatCard title="Uptime %" value={`${stats.uptime}%`} />

        <StatCard title="Avg Latency" value={`${stats.avgLatency}ms`} />

        <StatCard title="Checks" value={stats.totalChecks} />
        <StatCard title="Status" value={logs[0]?.status || "UNKNOWN"} />
      </div>

      {/* Recent Checks */}
      <MonitorInfoCard
  monitor={monitor}
  projectId={id}
  onMonitorUpdate={setMonitor}
/>
      <LatencyTrendChart logs={logs} />

      <UptimeHistoryChart logs={logs} />
      <Card>
        <div
          className="
            flex
            items-center
            justify-between

            mb-6
            "
        >
          <div>
            <h2
              className="
                text-xl
                font-semibold
                text-white
                "
            >
              Recent Checks
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-400
                "
            >
              Latest uptime verification results.
            </p>
          </div>

          <Activity
            size={20}
            className="
                text-orange-400
                "
          />
        </div>

        {!logs.length ? (
          <div
            className="
                py-16

                text-center

                text-slate-500
                "
          >
            No logs found.
          </div>
        ) : (
          <div
            className="
                overflow-x-auto
                "
          >
            <table
              className="
                w-full
                min-w-[700px]
                "
            >
              <thead>
                <tr
                  className="
                    border-b
                    border-slate-800
                    "
                >
                  <th
                    className="
                        text-left
                        py-3

                        text-sm
                        font-medium

                        text-slate-400
                        "
                  >
                    Status
                  </th>

                  <th
                    className="
                        text-left
                        py-3

                        text-sm
                        font-medium

                        text-slate-400
                        "
                  >
                    Response Time
                  </th>

                  <th
                    className="
                        text-left
                        py-3

                        text-sm
                        font-medium

                        text-slate-400
                        "
                  >
                    Timestamp
                  </th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log._id}
                    className="
                        border-b
                        border-slate-800/50

                        hover:bg-slate-900

                        transition
                        "
                  >
                    <td className="py-4">
                      <span
                        className={`
                                inline-flex
                                items-center
                                gap-2

                                px-3
                                py-1

                                rounded-full

                                text-xs
                                font-semibold

                                ${
                                  log.status === "UP"
                                    ? "bg-green-500/10 text-green-400"
                                    : "bg-red-500/10 text-red-400"
                                }
                            `}
                      >
                        {log.status === "UP" ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}

                        {log.status}
                      </span>
                    </td>

                    <td className="py-4">
                      <div
                        className="
                            flex
                            items-center
                            gap-2
                            "
                      >
                        <Clock3
                          size={14}
                          className="
                                text-slate-500
                                "
                        />

                        <span className="text-white">
                          {log.responseTime}
                          ms
                        </span>
                      </div>
                    </td>

                    <td className="py-4 text-slate-400 text-sm">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
