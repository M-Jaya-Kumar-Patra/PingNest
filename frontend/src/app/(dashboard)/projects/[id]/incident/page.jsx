"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { AlertTriangle, CheckCircle2, Clock3 } from "lucide-react";

import Loader from "@/components/ui/Loader";
import Card from "@/components/ui/Card";

import { getIncidents } from "@/services/incident.service";

import IncidentStats from "@/components/incidents/IncidentStats";
import { getIncidentSummary } from "@/services/incident.service";
import Link from "next/link";
import { getSocket } from "@/lib/socket";


export default function IncidentsPage() {
  const { id } = useParams();


  const [loading, setLoading] = useState(true);

  const [incidents, setIncidents] = useState([]);

  const [summary, setSummary] = useState(null);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const [incidentsRes, summaryRes] = await Promise.all([
          getIncidents(id),
          getIncidentSummary(id),
        ]);

        setIncidents(incidentsRes.data.data);

        setSummary(summaryRes.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadIncidents();
    }
  }, [id]);

  useEffect(() => {
  if (!id) return;

  const socket = getSocket();

  socket.emit("join-project", id);

  socket.on(
    "incident:created",
    (incident) => {
      setIncidents((prev) => [
        incident,
        ...prev,
      ]);
    }
  );

  socket.on(
    "incident:resolved",
    (incident) => {
      setIncidents((prev) =>
        prev.map((i) =>
          i._id === incident._id
            ? incident
            : i
        )
      );
    }
  );

  return () => {
    socket.off(
      "incident:created"
    );

    socket.off(
      "incident:resolved"
    );
  };
}, [id]);

  const filteredIncidents =
  filter === "ALL"
    ? incidents
    : incidents.filter(
        (incident) =>
          incident.status ===
          filter,
      );

  if (loading) {
    return <Loader text="Loading incidents..." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="
          text-3xl
          font-bold
          text-white
          "
        >
          Incident Center
        </h1>

        <p
          className="
          mt-2
          text-slate-400
          "
        >
          Monitor outages and reliability issues.
        </p>
      </div>

      {summary && (
  <IncidentStats
    summary={summary}
  />
)}

<div
  className="
  flex
  gap-3
  "
>
  {[
    "ALL",
    "OPEN",
    "RESOLVED",
  ].map((item) => (
    <button
      key={item}
      onClick={() =>
        setFilter(item)
      }
      className={`
        px-4
        py-2

        rounded-xl

        text-sm

        transition

        ${
          filter === item
            ? "bg-orange-500 text-white"
            : "bg-slate-900 text-slate-400"
        }
      `}
    >
      {item}
    </button>
  ))}
</div>

      {filteredIncidents.length === 0 ? (
        <Card>
          <div
            className="
            py-16
            text-center
            "
          >
            <CheckCircle2
              size={48}
              className="
              mx-auto
              mb-4
              text-green-400
              "
            />

            <h2
              className="
              text-xl
              font-semibold
              text-white
              "
            >
              No Incidents
            </h2>

            <p
              className="
              mt-2
              text-slate-400
              "
            >
              Everything looks healthy right now.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredIncidents.map((incident) => (
            <Link
  href={`/projects/${id}/incident/${incident._id}`}
   key={incident._id}
>
  <Card>
              <div
                className="
                  flex
                  justify-between
                  items-start
                  "
              >
                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      "
                  >
                    <AlertTriangle
                      size={18}
                      className="
                        text-red-400
                        "
                    />

                    <h3
                      className="
                        text-lg
                        font-semibold
                        text-white
                        "
                    >
                      {incident.title}
                    </h3>
                  </div>

                  <p
                    className="
                      mt-2
                      text-slate-400
                      "
                  >
                    {incident.description}
                  </p>

                  <div
                    className="
                      mt-4
                      flex
                      gap-3
                      flex-wrap
                      "
                  >
                    <span
                      className="
                        px-3
                        py-1
                        rounded-full

                        bg-red-500/10
                        text-red-400

                        text-xs
                        font-semibold
                        "
                    >
                      {incident.severity}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        incident.status === "OPEN"
                          ? "bg-orange-500/10 text-orange-400"
                          : "bg-green-500/10 text-green-400"
                      }`}
                    >
                      {incident.status}
                    </span>
                  </div>
                </div>

                <div
                  className="
                    text-right
                    text-sm
                    text-slate-500
                    "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      "
                  >
                    <Clock3 size={14} />

                    {new Date(incident.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
