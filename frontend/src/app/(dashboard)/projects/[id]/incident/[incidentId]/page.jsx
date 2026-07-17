"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Server,
  ShieldAlert,
} from "lucide-react";

import Loader from "@/components/ui/Loader";
import Card from "@/components/ui/Card";

import { getIncidentById } from "@/services/incident.service";
import { useMemo } from "react";

import { useRouter } from "next/navigation";


export default function IncidentDetailsPage() {
  const { incidentId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [incident, setIncident] = useState(null);

  useEffect(() => {
    const loadIncident = async () => {
      try {
        const res = await getIncidentById(incidentId);

        setIncident(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (incidentId) {
      loadIncident();
    }
  }, [incidentId]);


  const duration = useMemo(() => {
  if (!incident) return 0;

  if (incident.resolvedAt) {
    return Math.round(
      (new Date(incident.resolvedAt) -
        new Date(incident.createdAt)) /
        60000
    );
  }

  return Math.round(
    (new Date().getTime() -
      new Date(incident.createdAt).getTime()) /
      60000
  );
}, [incident]);


  if (loading || !incident) {
    return <Loader text="Loading incident..." />;
  } 

  return (
    <div className="space-y-6">
      {/* Header */}

      <Card>
        <div
          className="
          flex
          items-start
          gap-4
          "
        >
          <div
            className="
            h-12
            w-12

            rounded-xl

            bg-red-500/10

            flex
            items-center
            justify-center
            "
          >
            <AlertTriangle size={24} className="text-red-400" />
          </div>

          <div>
            <h1
              className="
              text-3xl
              font-bold
              text-white
              "
            >
              {incident.title}
            </h1>

            <p
              className="
              mt-2
              text-slate-400
              "
            >
              {incident.description}
            </p>
          </div>
        </div>
      </Card>

      {/* Status */}

      <div
        className="
        grid
        gap-4

        md:grid-cols-2
        "
      >
        <Card>
          <div
            className="
            flex
            items-center
            gap-3
            mb-3
            "
          >
            <ShieldAlert
              size={18}
              className="
              text-orange-400
              "
            />

            <h2
              className="
              text-lg
              font-semibold
              text-white
              "
            >
              Incident Status
            </h2>
          </div>

          <div className="space-y-3">
            <div>
              <span
                className="
                text-slate-500
                text-sm
                "
              >
                Severity
              </span>

              <div
                className="
                mt-1
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
              </div>
            </div>

            <div>
              <span
                className="
                text-slate-500
                text-sm
                "
              >
                Status
              </span>

              <div
                className="
                mt-1
                "
              >
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
          </div>
        </Card>

        <Card
  className="
  cursor-pointer
  hover:border-orange-500
  transition
  "
>
  <div
    onClick={() =>
      router.push(
        `/projects/${incident.project}/uptime/${incident.monitor?._id}`
      )
    }
  >
    <div
      className="
      flex
      items-center
      gap-3
      mb-3
      "
    >
      <Server
        size={18}
        className="text-orange-400"
      />

      <h2
        className="
        text-lg
        font-semibold
        text-white
        "
      >
        Monitor
      </h2>
    </div>

    <div className="space-y-3">
      <div>
        <p
          className="
          text-slate-500
          text-sm
          "
        >
          Name
        </p>

        <p className="text-white">
          {incident.monitor?.name}
        </p>
      </div>

      <div>
        <p
          className="
          text-slate-500
          text-sm
          "
        >
          URL
        </p>

        <p
          className="
          text-slate-300
          break-all
          "
        >
          {incident.monitor?.url}
        </p>
      </div>

      <div
        className="
        pt-2
        text-sm
        text-orange-400
        "
      >
        View Monitor →
      </div>
    </div>
  </div>
</Card>
      </div>

      {/* Timeline */}

      <Card>
        <h2
          className="
          text-xl
          font-semibold
          text-white
          mb-5
          "
        >
          Timeline
        </h2>

        <div className="space-y-5">
          <div
            className="
            flex
            gap-3
            "
          >
            <Clock3
              size={18}
              className="
              text-orange-400
              "
            />

            <div>
              <p className="text-white">Incident Created</p>

              <p
                className="
                text-slate-400
                text-sm
                "
              >
                {new Date(incident.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {incident.resolvedAt && (
            <div
              className="
              flex
              gap-3
              "
            >
              <CheckCircle2
                size={18}
                className="
                text-green-400
                "
              />

              <div>
                <p className="text-white">Incident Resolved</p>

                <p
                  className="
                  text-slate-400
                  text-sm
                  "
                >
                  {new Date(incident.resolvedAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Downtime */}

      <Card>
        <h2
          className="
          text-xl
          font-semibold
          text-white
          mb-4
          "
        >
          Downtime
        </h2>

        <p
          className="
          text-4xl
          font-bold
          text-orange-400
          "
        >
          {duration} min
        </p>

        <p
          className="
          mt-2
          text-slate-400
          "
        >
          Total outage duration.
        </p>
      </Card>
    </div>
  );
}
