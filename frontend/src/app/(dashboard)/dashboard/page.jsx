"use client";

import { useEffect, useState } from "react";

import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";

import { getDashboardOverview } from "@/services/dashboard.service";

import {
  Activity,
  FolderKanban,
  HeartPulse,
  Plus,
  RadioTower,
} from "lucide-react";

import Link from "next/link";

export default function DashboardPage() {
  const [overview, setOverview] =
    useState(null);

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const overviewRes =
          await getDashboardOverview();

        const overviewData =
          overviewRes.data.data;

        setOverview(overviewData);

        setProjects(
          overviewData.projects || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="PingNest"
        title="Dashboard"
        description="Monitor requests, traffic, performance, and service health across all your projects."
        actions={
          <Link
            href="/projects/new"
            className="
            inline-flex
            items-center
            gap-2

            rounded-xl

            bg-orange-500

            px-4
            py-2.5

            text-sm
            font-medium
            text-white

            transition-all

            hover:bg-orange-400
            hover:shadow-lg
            hover:shadow-orange-500/20
            "
          >
            <Plus size={16} />
            New Project
          </Link>
        }
      />

      {/* Hero */}

      <section
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
            Real-Time Monitoring
          </p>

          <h2
            className="
            mt-2

            text-3xl
            md:text-4xl

            font-bold

            text-white
            "
          >
            Observe your APIs in real time.
          </h2>

          <p
            className="
            mt-3

            max-w-2xl

            text-slate-400
            "
          >
            Track requests, latency,
            failures, and health scores
            from a centralized dashboard.
          </p>
        </div>
      </section>

      {/* Overview */}

      <section className="space-y-4">
        <SectionHeader
          title="Overview"
          description="Portfolio-level metrics across all monitored projects."
        />

        <div
          className="
          grid
          gap-4

          sm:grid-cols-2
          xl:grid-cols-4
          "
        >
          <StatCard
            title="Projects"
            value={
              overview?.totalProjects || 0
            }
            icon={FolderKanban}
          />

          <StatCard
            title="Active"
            value={
              overview?.activeProjects || 0
            }
            icon={RadioTower}
          />

          <StatCard
            title="Requests"
            value={
              overview?.totalRequests || 0
            }
            icon={Activity}
          />

          <StatCard
            title="Health Score"
            value={`${
              overview?.averageHealthScore ||
              0
            }/100`}
            icon={HeartPulse}
          />
        </div>
      </section>

      {/* Projects */}

      <section className="space-y-4">
        <SectionHeader
          title="Projects"
          description="Inspect telemetry, endpoints, traffic, errors, and health metrics."
        />

        {projects.length === 0 ? (
          <EmptyState
            title="No projects yet"
            message="Create your first project and start collecting telemetry data."
          />
        ) : (
          <Card
            className="
            p-0
            overflow-hidden
            "
          >
            <div
              className="
              divide-y
              divide-slate-800
              "
            >
              {projects.map(
                (project) => (
                  <Link
                    key={project._id}
                    href={`/projects/${project._id}`}
                    className="
                    group
                    block

                    p-5

                    transition-all

                    hover:bg-slate-900/60

                    sm:p-6
                    "
                  >
                    <div
                      className="
                      flex
                      flex-col
                      gap-4

                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                      "
                    >
                      <div className="min-w-0">
                        <h3
                          className="
                          truncate

                          text-lg
                          font-semibold

                          text-white

                          transition-colors

                          group-hover:text-orange-400
                          "
                        >
                          {project.name}
                        </h3>

                        <p
                          className="
                          mt-2

                          line-clamp-2

                          text-sm
                          leading-6

                          text-slate-400
                          "
                        >
                          {project.description ||
                            "No description provided."}
                        </p>
                      </div>

                      <div
                        className="
                        flex
                        shrink-0

                        flex-row
                        items-center
                        justify-between

                        gap-3

                        sm:flex-col
                        sm:items-end
                        "
                      >
                        <StatusBadge
                          status={
                            project.status
                          }
                        />

                        <p
                          className="
                          text-xs
                          text-slate-500
                          "
                        >
                          Last request:{" "}
                          {project.lastRequest
                            ? new Date(
                                project.lastRequest
                              ).toLocaleString()
                            : "Never"}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <LoadingSkeleton
          rows={1}
          itemClassName="h-10 w-56"
        />

        <LoadingSkeleton
          rows={1}
          itemClassName="h-5 max-w-2xl"
        />
      </div>

      <Card className="h-48" />

      <div
        className="
        grid
        gap-4

        sm:grid-cols-2
        xl:grid-cols-4
        "
      >
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <Card
            key={index}
            className="space-y-5"
          >
            <LoadingSkeleton
              rows={1}
              itemClassName="h-4 w-24"
            />

            <LoadingSkeleton
              rows={1}
              itemClassName="h-10 w-28"
            />

            <LoadingSkeleton
              rows={1}
              itemClassName="h-4 w-40"
            />
          </Card>
        ))}
      </div>

      <Card className="space-y-4">
        <LoadingSkeleton
          rows={1}
          itemClassName="h-6 w-40"
        />

        <LoadingSkeleton
          rows={4}
          itemClassName="h-16"
        />
      </Card>
    </div>
  );
}