"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  FolderKanban,
  Plus,
} from "lucide-react";

import {
  getProjects,
  deleteProject,
} from "@/services/project.service";

import ProjectCard from "@/components/projects/ProjectCard";

import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ProjectsPage() {
  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadProjects =
    async () => {
      try {
        const res =
          await getProjects();

        setProjects(
          res.data.data || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete =
    async (id) => {
      try {
        await deleteProject(id);

        setProjects((prev) =>
          prev.filter(
            (project) =>
              project._id !== id
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

  if (loading) {
    return (
      <Loader text="Loading Projects..." />
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Projects"
        title="Project Management"
        description="Manage monitored services, API telemetry sources, and project configurations."
        actions={
          <Link
            href="/projects/new"
          >
            <Button
              className="
              gap-2
              "
            >
              <Plus size={16} />
              New Project
            </Button>
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

          h-40
          w-40

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
            PingNest Projects
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
            Monitor every service.
          </h2>

          <p
            className="
            mt-3

            max-w-2xl

            text-slate-400
            "
          >
            Create projects, connect
            applications, collect
            telemetry, and track API
            health from one place.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Your Projects"
          description="Every project represents a monitored application or service."
        />

        {projects.length === 0 ? (
          <EmptyState
            title="No Projects Yet"
            message="Create your first project and start collecting API telemetry."
          />
        ) : (
          <div
            className="
            grid

            gap-5

            md:grid-cols-2
            xl:grid-cols-3
            "
          >
            {projects.map(
              (project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onDelete={
                    handleDelete
                  }
                />
              )
            )}
          </div>
        )}
      </section>

      {/* Footer Stats */}

      {projects.length > 0 && (
        <section
          className="
          rounded-3xl

          border
          border-slate-800

          bg-slate-900/50

          p-6
          "
        >
          <div
            className="
            flex
            items-center
            gap-3
            "
          >
            <FolderKanban
              size={20}
              className="text-orange-400"
            />

            <div>
              <h3
                className="
                font-semibold
                text-white
                "
              >
                Total Projects
              </h3>

              <p
                className="
                text-sm
                text-slate-400
                "
              >
                You currently have{" "}
                {projects.length}
                {" "}
                monitored project
                {projects.length > 1
                  ? "s"
                  : ""}
                .
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}