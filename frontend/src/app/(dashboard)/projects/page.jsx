"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  getProjects,
  deleteProject,
} from "@/services/project.service";

import ProjectCard from "@/components/projects/ProjectCard";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";

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
          res.data.data
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

        setProjects(
          projects.filter(
            (project) =>
              project._id !== id
          )
        );

      } catch (error) {

        console.error(error);

      }

    };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>

      <div
        className="
        flex
        justify-between
        items-center
        mb-6
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Projects
        </h1>

        <Link
          href="/projects/new"
        >
          <Button>
            New Project
          </Button>
        </Link>

      </div>

      {projects.length === 0 ? (

        <div
          className="
          text-center
          py-12
          "
        >

          <h2
            className="
            text-2xl
            font-semibold
            mb-2
            "
          >
            No Projects Yet
          </h2>

          <p
            className="
            text-gray-500
            mb-4
            "
          >
            Create your first
            project to start
            monitoring APIs.
          </p>

          <Link
            href="/projects/new"
          >
            <Button>
              Create Project
            </Button>
          </Link>

        </div>

      ) : (

        <div
          className="
          grid
          md:grid-cols-2
          gap-4
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

    </div>
  );
}