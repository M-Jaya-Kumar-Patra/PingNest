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
      Project Dashboard
    </p>

    <h1
      className="
      mt-2

      text-3xl
      md:text-4xl

      font-bold

      text-white
      "
    >
      {project.name}
    </h1>

    <p
      className="
      mt-3

      text-slate-400
      "
    >
      {project.description}
    </p>
  </div>
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
    flex-col
    gap-4

    md:flex-row
    md:items-center
    md:justify-between
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
        API Key
      </h2>

      <p
        className="
        mt-1

        text-sm

        text-slate-400
        "
      >
        Use this key to connect your SDK.
      </p>
    </div>

    <div className="flex gap-2">
      <button
        onClick={handleCopyApiKey}
        className="
        rounded-xl

        border
        border-slate-700

        px-4
        py-2

        text-slate-300

        hover:border-orange-500
        hover:text-orange-400
        "
      >
        {copied ? "Copied" : "Copy"}
      </button>

      <button
        onClick={handleRegenerateApiKey}
        disabled={regenerating}
        className="
        rounded-xl

        bg-orange-500

        px-4
        py-2

        text-white

        hover:bg-orange-400
        "
      >
        {regenerating
          ? "Generating..."
          : "Regenerate"}
      </button>
    </div>
  </div>

  <div
    className="
    mt-5

    rounded-2xl

    border
    border-slate-800

    bg-slate-950

    p-4
    "
  >
    <code
      className="
      break-all

      text-sm

      text-orange-400
      "
    >
      {project.apiKey}
    </code>
  </div>
</Card>

      {requests.length === 0 ? (

<Card className="text-center py-10">

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
      text-slate-400
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
      <h2
        className="
        text-lg
        font-semibold

        text-red-400
        "
      >
        Danger Zone
      </h2>

      <p
        className="
        mt-1

        text-slate-400
        "
      >
        Permanently delete this project and all telemetry data.
      </p>
    </div>

    <button
      onClick={handleDeleteProject}
      className="
      rounded-xl

      bg-red-600

      px-5
      py-2.5

      text-white

      hover:bg-red-500
      "
    >
      Delete Project
    </button>
  </div>
</Card>
    </div>
  );
}
