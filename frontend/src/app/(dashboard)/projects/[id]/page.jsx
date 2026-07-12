"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Check, Copy } from "lucide-react";
import toast from "react-hot-toast";

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
  getSlowestEndpoints,
  getTopEndpoints,
} from "@/services/analytics.service";
import {
  getApiErrorMessage,
  isSessionExpiredError,
} from "@/services/api";
import Loader from "@/components/ui/Loader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";
import RecentRequestsTable from "@/components/analytics/RecentRequestsTable";
import TopEndpointsChart from "@/components/analytics/TopEndpointsChart";
import HealthScoreCard from "@/components/analytics/HealthScoreCard";
import RequestsTimelineChart from "@/components/analytics/RequestsTimelineChart";
import ErrorDistributionChart from "@/components/analytics/ErrorDistributionChart";
import SlowestEndpointsTable from "@/components/analytics/SlowestEndpointsTable";
import QuickStartCard from "@/components/projects/QuickStartCard";
import { getSocket } from "@/lib/socket";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const copyTimeoutRef = useRef(null);
  const analyticsRefreshTimeoutRef = useRef(null);

  const [project, setProject] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [requests, setRequests] = useState([]);
  const [topEndpoints, setTopEndpoints] = useState([]);
  const [healthScore, setHealthScore] = useState(0);
  const [timeline, setTimeline] = useState([]);
  const [errorData, setErrorData] = useState([]);
  const [slowestEndpoints, setSlowestEndpoints] = useState([]);
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }

    let isActive = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setLoadError("");

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

        if (!isActive) {
          return;
        }

        setProject(projectRes.data.data);
        setSummary(summaryRes.data.data);
        setRequests(requestsRes.data.data);
        setTopEndpoints(endpointsRes.data.data);
        setHealthScore(healthRes.data.data.score);
        setTimeline(timelineRes.data.data);
        setErrorData(errorRes.data.data);
        setSlowestEndpoints(slowestRes.data.data);
      } catch (error) {
        if (!isActive || isSessionExpiredError(error)) {
          return;
        }

        const message = getApiErrorMessage(error, "Failed to load project data");
        setLoadError(message);
        toast.error(message);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isActive = false;
    };
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const socket = getSocket();

    socket.emit("join-project", id);

    return () => {
      socket.emit("leave-project", id);
    };
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }

    let isActive = true;
    const socket = getSocket();

    const refreshAnalytics = async () => {
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

        if (!isActive) {
          return;
        }

        setSummary(summaryRes.data.data);
        setHealthScore(healthRes.data.data.score);
        setTopEndpoints(endpointsRes.data.data);
        setTimeline(timelineRes.data.data);
        setErrorData(errorRes.data.data);
        setSlowestEndpoints(slowestRes.data.data);
      } catch (error) {
        if (!isSessionExpiredError(error)) {
          console.error(error);
        }
      }
    };

    const scheduleAnalyticsRefresh = () => {
      if (analyticsRefreshTimeoutRef.current) {
        clearTimeout(analyticsRefreshTimeoutRef.current);
      }

      analyticsRefreshTimeoutRef.current = setTimeout(refreshAnalytics, 500);
    };

    const handleTelemetry = (telemetry) => {
      if (!isActive) {
        return;
      }

      setRequests((prev) => [telemetry, ...prev].slice(0, 20));
      scheduleAnalyticsRefresh();
    };

    socket.on("telemetry:new", handleTelemetry);

    return () => {
      isActive = false;

      if (analyticsRefreshTimeoutRef.current) {
        clearTimeout(analyticsRefreshTimeoutRef.current);
      }

      socket.off("telemetry:new", handleTelemetry);
    };
  }, [id]);

  const handleCopyApiKey = async () => {
    if (!project?.apiKey) {
      return;
    }

    try {
      await navigator.clipboard.writeText(project.apiKey);
      toast.success("API key copied");

      setCopied(true);

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy API key");
    }
  };

  const handleRegenerateApiKey = async () => {
    const confirmed = window.confirm(
      "Are you sure? Existing SDK integrations will stop working.",
    );

    if (!confirmed) {
      return;
    }

    try {
      setRegenerating(true);

      const res = await regenerateApiKey(id);

      setProject((prev) => ({
        ...prev,
        apiKey: res.data.data.apiKey,
      }));

      toast.success(res.data.message || "API key regenerated successfully");
    } catch (error) {
      if (!isSessionExpiredError(error)) {
        toast.error(
          getApiErrorMessage(error, "Failed to regenerate API key"),
        );
      }
    } finally {
      setRegenerating(false);
    }
  };

  const handleDeleteProject = async () => {
    const confirmed = window.confirm("Delete this project permanently?");

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      const res = await deleteProject(id);

      toast.success(res.data.message || "Project deleted successfully");
      router.push("/projects");
    } catch (error) {
      if (!isSessionExpiredError(error)) {
        toast.error(getApiErrorMessage(error, "Failed to delete project"));
      }
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (loadError || !project || !summary) {
    return (
      <Card>
        <h1 className="text-xl font-semibold mb-2">Project Unavailable</h1>
        <p className="text-gray-500 mb-4">
          {loadError || "Project data is unavailable."}
        </p>
        <Button onClick={() => router.push("/projects")}>
          Back to Projects
        </Button>
      </Card>
    );
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

      <QuickStartCard apiKey={project.apiKey} />

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
            Copy your API key, install the SDK, and start sending requests.
          </p>
        </Card>
      ) : (
        <>
          <RecentRequestsTable requests={requests} />

          <TopEndpointsChart data={topEndpoints} />

          <RequestsTimelineChart data={timeline} />

          <ErrorDistributionChart data={errorData} />

          <SlowestEndpointsTable data={slowestEndpoints} />

          <HealthScoreCard score={healthScore} />
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
          disabled={deleting}
          className="
          bg-red-600
          text-white
          px-4
          py-2
          rounded
          disabled:opacity-60
          "
        >
          {deleting ? "Deleting..." : "Delete Project"}
        </button>
      </Card>
    </div>
  );
}
