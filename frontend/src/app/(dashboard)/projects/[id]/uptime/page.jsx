"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  getMonitors,
  getUptimeSummary,
  deleteMonitor,
} from "@/services/uptime.service";

import Loader from "@/components/ui/Loader";
import Card from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";
import CreateMonitorModal from "@/components/uptime/CreateMonitorModal";
import { getSocket } from "@/lib/socket";

import {
  Plus,
  Globe,
  Clock3,
  Trash2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import toast from "react-hot-toast";
import Link from "next/link";

export default function UptimePage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState(null);

  const [monitors, setMonitors] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const loadData = async () => {
    try {
      const [summaryRes, monitorsRes] = await Promise.all([
        getUptimeSummary(id),
        getMonitors(id),
      ]);

      setSummary(summaryRes.data.data);

      setMonitors(monitorsRes.data.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load uptime data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  useEffect(() => {
  if (!id) return;

  const socket = getSocket();

  socket.emit("join-project", id);

  socket.on(
    "monitor:update",
    (data) => {
      setMonitors((prev) =>
        prev.map((m) =>
          m._id === data.monitorId
            ? {
                ...m,
                status: data.status,
                lastResponseTime:
                  data.responseTime,
              }
            : m
        )
      );
    }
  );

  return () => {
    socket.off(
      "monitor:update"
    );
  };
}, [id]);

  const handleDelete = async (monitorId) => {
    const confirmed = window.confirm("Delete monitor?");

    if (!confirmed) return;

    try {
      await deleteMonitor(monitorId);

      setMonitors((prev) =>
        prev.filter((monitor) => monitor._id !== monitorId),
      );

      toast.success("Monitor deleted");
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete monitor");
    }
  };

  if (loading || !summary) {
    return <Loader text="Loading uptime monitors..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div
        className="
        flex
        flex-col
        gap-4

        md:flex-row
        md:items-center
        md:justify-between
        "
      >
        <div>
          <h1
            className="
            text-3xl
            font-bold
            text-white
            "
          >
            Uptime Monitoring
          </h1>

          <p
            className="
            mt-2
            text-slate-400
            "
          >
            Monitor service availability and latency.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="
          inline-flex
          items-center
          gap-2

          rounded-xl

          bg-orange-500

          px-5
          py-3

          font-medium
          text-white

          hover:bg-orange-400

          transition
          "
        >
          <Plus size={18} />
          Create Monitor
        </button>
      </div>

      {/* Summary */}

      <div
  className="
  grid
  gap-4

  md:grid-cols-2
  xl:grid-cols-6
  "
>
  <StatCard
    title="Monitors"
    value={summary.totalMonitors}
  />

  <StatCard
    title="Online"
    value={summary.onlineMonitors}
  />

  <StatCard
    title="Offline"
    value={summary.offlineMonitors}
  />

  <StatCard
    title="Latency"
    value={`${summary.avgLatency || 0}ms`}
  />

  <StatCard
    title="Uptime"
    value={`${summary.uptimePercentage || 0}%`}
  />

  <StatCard
    title="Checks"
    value={summary.totalChecks || 0}
  />
</div>

      {/* Monitors */}

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
              Active Monitors
            </h2>

            <p
              className="
              mt-1
              text-sm
              text-slate-400
              "
            >
              Monitor uptime, latency and service health.
            </p>
          </div>
        </div>

        {monitors.length === 0 ? (
          <div
            className="
            py-16

            text-center
            "
          >
            <Globe
              size={42}
              className="
              mx-auto
              mb-4
              text-slate-600
              "
            />

            <h3
              className="
              text-lg
              font-medium
              text-white
              "
            >
              No Monitors Yet
            </h3>

            <p
              className="
              mt-2
              text-slate-500
              "
            >
              Create your first uptime monitor.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {monitors.map((monitor) => (
              <div
                key={monitor._id}
                className="
                  rounded-2xl

                  border
                  border-slate-800

                  bg-slate-950

                  p-5

                  hover:border-orange-500/20

                  transition
                  "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-5

                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                    "
                >
                  {/* Left */}

                  <div>
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        "
                    >
                      <h3
                        className="
                          text-lg
                          font-semibold
                          text-white
                          "
                      >
                        {monitor.name}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          monitor.status === "UP"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {monitor.status === "UP" ? (
                          <span
                            className="
                              flex
                              items-center
                              gap-1
                              "
                          >
                            <CheckCircle2 size={12} />
                            UP
                          </span>
                        ) : (
                          <span
                            className="
                              flex
                              items-center
                              gap-1
                              "
                          >
                            <XCircle size={12} />
                            DOWN
                          </span>
                        )}
                      </span>
                    </div>

                    <p
                      className="
                        mt-2

                        text-sm
                        text-slate-400
                        "
                    >
                      {monitor.url}
                    </p>
                  </div>

                  {/* Middle */}
                  <Link
  href={`/projects/${id}/uptime/${monitor._id}`}
  className="
  inline-flex
  items-center

  rounded-lg

  border
  border-orange-500/20

  px-4
  py-2

  text-orange-400

  hover:bg-orange-500/10

  transition
  "
>
  View Details
</Link>

                  {/* Right */}

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-6
                      "
                  >
                    <div>
                      <p
                        className="
                          text-xs
                          text-slate-500
                          "
                      >
                        Response
                      </p>

                      <p
                        className="
                          mt-1
                          text-white
                          font-medium
                          "
                      >
                        {monitor.lastResponseTime}
                        ms
                      </p>
                    </div>

                    <div>
                      <p
                        className="
                          text-xs
                          text-slate-500
                          "
                      >
                        Interval
                      </p>

                      <p
                        className="
                          mt-1
                          text-white
                          font-medium
                          "
                      >
                        {monitor.interval}m
                      </p>
                    </div>

                    <div>
                      <p
                        className="
                          text-xs
                          text-slate-500
                          "
                      >
                        Last Check
                      </p>

                      <p
                        className="
                          mt-1
                          text-white
                          font-medium
                          "
                      >
                        {monitor.lastCheckedAt
                          ? new Date(monitor.lastCheckedAt).toLocaleString()
                          : "Never"}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(monitor._id)}
                      className="
                        flex
                        items-center
                        gap-2

                        text-red-400

                        hover:text-red-300
                        "
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Modal */}

      {showModal && (
        <CreateMonitorModal
          projectId={id}
          onClose={() => setShowModal(false)}
          onCreated={async () => {
            await loadData();

            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
