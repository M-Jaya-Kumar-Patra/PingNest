"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import {
  deleteProject,
  getProject,
  regenerateApiKey,
} from "@/services/project.service";

import {
  getDashboardSummary,
  getErrorDistribution,
  getHealthScore,
  getRecentRequests,
  getRequestsTimeline,
  getTopEndpoints,
  getSlowestEndpoints,
} from "@/services/analytics.service";

import Loader from "@/components/ui/Loader";
import Card from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";
import RecentRequestsTable from "@/components/analytics/RecentRequestsTable";
import TopEndpointsChart from "@/components/analytics/TopEndpointsChart";
import HealthScoreCard from "@/components/analytics/HealthScoreCard";
import { getSocket } from "@/lib/socket";
import RequestsTimelineChart from "@/components/analytics/RequestsTimelineChart";
import ErrorDistributionChart from "@/components/analytics/ErrorDistributionChart";
import SlowestEndpointsTable from "@/components/analytics/SlowestEndpointsTable";
import QuickStartCard from "@/components/projects/QuickStartCard";

import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [topEndpoints, setTopEndpoints] = useState([]);
  const [healthScore, setHealthScore] = useState(0);
  const [timeline, setTimeline] = useState([]);
  const [errorData, setErrorData] = useState([]);
  const [slowestEndpoints, setSlowestEndpoints] = useState([]);
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          projectRes,
          summaryRes,
          requestsRes,
          endpointsRes,
          healthRes,
          timelineRes,
          errorRes,
          slowestRes,
        ] = await Promise.all([
          getProject(id),
          getDashboardSummary(id),
          getRecentRequests(id),
          getTopEndpoints(id),
          getHealthScore(id),
          getRequestsTimeline(id),
          getErrorDistribution(id),
          getSlowestEndpoints(id),
        ]);

        setProject(projectRes.data.data);

        setSummary(summaryRes.data.data);

        setRequests(requestsRes.data.data);

        setTopEndpoints(endpointsRes.data.data);

        setHealthScore(healthRes.data.data.score);

        setTimeline(timelineRes.data.data);

        setErrorData(errorRes.data.data);

        setSlowestEndpoints(slowestRes.data.data);
      } catch (error) {
        toast.error("Failed to load project data");

        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const socket = getSocket();

    socket.emit("join-project", id);
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const socket = getSocket();

    const handleTelemetry = async (telemetry) => {
      setRequests((prev) => [telemetry, ...prev].slice(0, 20));

      try {
        const [
          summaryRes,
          healthRes,
          endpointsRes,
          timelineRes,
          errorRes,
          slowestRes,
        ] = await Promise.all([
          getDashboardSummary(id),
          getHealthScore(id),
          getTopEndpoints(id),
          getRequestsTimeline(id),
          getErrorDistribution(id),
          getSlowestEndpoints(id),
        ]);

        setSummary(summaryRes.data.data);
        setHealthScore(healthRes.data.data.score);
        setTopEndpoints(endpointsRes.data.data);
        setTimeline(timelineRes.data.data);
        setErrorData(errorRes.data.data);
        setSlowestEndpoints(slowestRes.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    socket.on("telemetry:new", handleTelemetry);

    return () => {
      socket.off("telemetry:new", handleTelemetry);
    };
  }, [id]);

  const handleCopyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(project.apiKey);
      toast.success("API Key copied");

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy API Key");

      console.error(error);
    }
  };

  const handleRegenerateApiKey = async () => {
    const confirmed = window.confirm(
      "Are you sure? Existing SDK integrations will stop working.",
    );

    if (!confirmed) return;

    try {
      setRegenerating(true);

      const res = await regenerateApiKey(id);

      setProject((prev) => ({
        ...prev,
        apiKey: res.data.data.apiKey,
      }));
      toast.success("API key regenerated");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to regenerate API key",
      );

      console.error(error);
    } finally {
      setRegenerating(false);
    }
  };

  const handleDeleteProject = async () => {
    const confirmed = window.confirm("Delete this project permanently?");

    if (!confirmed) return;

    try {
      await deleteProject(id);
      toast.success("Project deleted");

      router.push("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete project");

      console.error(error);
    }
  };

  if (loading || !project || !summary) {
    return <Loader />;
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{project.name}</h1>

        <p className="text-gray-500">{project.description}</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <StatCard title="Total Requests" value={summary.totalRequests} />

        <StatCard
          title="Avg Response"
          value={Math.round(summary.averageResponseTime) + " ms"}
        />

        <StatCard
          title="Success Rate"
          value={summary.successRate.toFixed(1) + "%"}
        />

        <StatCard
          title="Error Rate"
          value={summary.errorRate.toFixed(1) + "%"}
        />
      </div>

      <Card>
        <div
          className="
    flex
    items-center
    justify-between
    mb-3
  "
        >
          <h2
            className="
      text-lg
      font-semibold
      "
          >
            API Key
          </h2>

          <div className="flex gap-2">
            <button
              onClick={handleCopyApiKey}
              className="flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy
                </>
              )}
            </button>

            <button onClick={handleRegenerateApiKey} disabled={regenerating}>
              {regenerating ? "Generating..." : "Regenerate"}
            </button>
          </div>
        </div>

        <code
          className="
    text-sm
    break-all
    block
    "
        >
          {project.apiKey}
        </code>
      </Card>

      {requests.length === 0 ? (

  <Card>

    <h2
      className="
      text-lg
      font-semibold
      mb-2
      "
    >
      No Telemetry Yet
    </h2>

    <p
      className="
      text-gray-500
      "
    >
      Copy your API key,
      install the SDK,
      and start sending requests.
    </p>

  </Card>

) : (

  <>
    <RecentRequestsTable
      requests={requests}
    />

    <TopEndpointsChart
      data={topEndpoints}
    />

    <RequestsTimelineChart
      data={timeline}
    />

    <ErrorDistributionChart
      data={errorData}
    />

    <SlowestEndpointsTable
      data={slowestEndpoints}
    />

    <HealthScoreCard
      score={healthScore}
    />
  </>

)}
      <Card>
        <h2
          className="
    text-red-600
    font-semibold
    mb-2
    "
        >
          Danger Zone
        </h2>

        <p
          className="
    text-gray-500
    mb-4
    "
        >
          This action cannot be undone.
        </p>

        <button
          onClick={handleDeleteProject}
          className="
    bg-red-600
    text-white
    px-4
    py-2
    rounded
    "
        >
          Delete Project
        </button>
      </Card>
    </div>
  );
}
