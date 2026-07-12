"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  deleteProject,
  getProjects,
} from "@/services/project.service";
import {
  getApiErrorMessage,
  isSessionExpiredError,
} from "@/services/api";
import ProjectCard from "@/components/projects/ProjectCard";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let isActive = true;

    const loadProjects = async () => {
      try {
        const res = await getProjects();

        if (isActive) {
          setProjects(res.data.data);
          setErrorMessage("");
        }
      } catch (error) {
        if (!isActive || isSessionExpiredError(error)) {
          return;
        }

        const message = getApiErrorMessage(error, "Failed to load projects");
        setErrorMessage(message);
        toast.error(message);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      isActive = false;
    };
  }, []);

  const handleDelete = async (id) => {
    if (deletingId) {
      return;
    }

    try {
      setDeletingId(id);

      const res = await deleteProject(id);

      setProjects((currentProjects) =>
        currentProjects.filter((project) => project._id !== id),
      );

      toast.success(res.data.message || "Project deleted successfully");
    } catch (error) {
      if (!isSessionExpiredError(error)) {
        toast.error(getApiErrorMessage(error, "Failed to delete project"));
      }
    } finally {
      setDeletingId(null);
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

        <Link href="/projects/new">
          <Button>New Project</Button>
        </Link>
      </div>

      {errorMessage && (
        <div
          className="
          mb-4
          rounded-lg
          border
          border-red-200
          bg-red-50
          p-3
          text-sm
          text-red-700
          "
        >
          {errorMessage}
        </div>
      )}

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
            Create your first project to start monitoring APIs.
          </p>

          <Link href="/projects/new">
            <Button>Create Project</Button>
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
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              deleting={deletingId === project._id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
