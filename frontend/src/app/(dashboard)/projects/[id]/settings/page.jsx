"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import {
  getProject,
  regenerateApiKey,
  deleteProject,
  updateProject,
} from "@/services/project.service";

import Card from "@/components/ui/Card";
import Loader from "@/components/ui/Loader";
import QuickStartCard from "@/components/projects/QuickStartCard";

import toast from "react-hot-toast";

import {
  Copy,
  RefreshCw,
  Trash2,
  FolderKanban,
  KeyRound,
} from "lucide-react";

export default function ProjectSettingsPage() {
  const { id } = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [project, setProject] =
    useState(null);

    const [name, setName] =
  useState("");

const [
  description,
  setDescription,
] = useState("");

const [saving, setSaving] =
  useState(false);

  const [copied, setCopied] =
    useState(false);

  const [regenerating, setRegenerating] =
    useState(false);

  useEffect(() => {
    const loadProject =
      async () => {
        try {
          const res =
            await getProject(id);

          const projectData =
  res.data.data;

console.log("--------------->", res.data);

setProject(projectData);

setName(projectData.name);

setDescription(
  projectData.description || ""
);
        } catch (error) {
          console.error(error);

          toast.error(
            "Failed to load project"
          );
        } finally {
          setLoading(false);
        }
      };

    if (id) {
      loadProject();
    }
  }, [id]);

  console.log("project: ", project)

  

  const handleCopyApiKey =
    async () => {
      try {
        await navigator.clipboard.writeText(
          project.apiKey
        );

        setCopied(true);

        toast.success(
          "API key copied"
        );

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to copy API key"
        );
      }
    };

  const handleRegenerate =
    async () => {
      const confirmed =
        window.confirm(
          "Regenerate API key? Existing SDK integrations will stop working."
        );

      if (!confirmed) return;

      try {
        setRegenerating(true);

        const res =
          await regenerateApiKey(
            id
          );

        setProject((prev) => ({
          ...prev,
          apiKey:
            res.data.data.apiKey,
        }));

        toast.success(
          "API key regenerated"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to regenerate API key"
        );
      } finally {
        setRegenerating(false);
      }
    };

  const handleDelete =
    async () => {
      const confirmed =
        window.confirm(
          "Delete this project permanently?"
        );

      if (!confirmed) return;

      try {
        await deleteProject(id);

        toast.success(
          "Project deleted"
        );

        router.push(
          "/projects"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to delete project"
        );
      }
    };

    const handleSaveProject =
  async () => {
    try {
        console.log("Submitting:", {
  name,
  description,
});
      setSaving(true);

      const res =
        await updateProject(
          project._id,
          {
            name,
            description,
          },
        );

      setProject(
        res.data.data,
      );

      toast.success(
        "Project updated",
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update project",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading || !project) {
    return (
      <Loader text="Loading settings..." />
    );
  }

  const hasChanges =
  name !== project.name ||
  description !== (project.description || "");

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1
          className="
          text-3xl
          font-bold
          text-white
          "
        >
          Project Settings
        </h1>

        <p
          className="
          mt-2
          text-slate-400
          "
        >
          Manage project
          configuration,
          API keys and SDK
          setup.
        </p>
      </div>

      {/* Project Info */}

      <Card>
  <h2
    className="
    text-xl
    font-semibold
    text-white
    mb-6
    "
  >
    Project Information
  </h2>

  <div className="space-y-5">
    <div>
      <label
        className="
        block
        mb-2

        text-sm
        text-slate-400
        "
      >
        Project Name
      </label>

      <input
        type="text"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value,
          )
        }
        className="
        w-full

        rounded-xl

        border
        border-slate-800

        bg-slate-950

        px-4
        py-3

        text-white

        outline-none

        focus:border-orange-500
        "
      />
    </div>

    <div>
      <label
        className="
        block
        mb-2

        text-sm
        text-slate-400
        "
      >
        Description
      </label>

      <textarea
        rows={4}
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value,
          )
        }
        className="
        w-full

        rounded-xl

        border
        border-slate-800

        bg-slate-950

        px-4
        py-3

        text-white

        outline-none

        focus:border-orange-500
        "
      />
    </div>

    <button
      onClick={
        handleSaveProject
      }
      disabled={!hasChanges || saving}
      className="
      rounded-xl

      bg-orange-500

      px-5
      py-2.5

      text-white

      hover:bg-orange-400

      disabled:opacity-50
      "
    >
      {saving
        ? "Saving..."
        : "Save Changes"}
    </button>
  </div>
</Card>

      {/* API Key */}

      <Card>
        <div
          className="
          flex
          items-center
          gap-3
          mb-5
          "
        >
          <KeyRound
            size={20}
            className="text-orange-400"
          />

          <h2
            className="
            text-xl
            font-semibold
            text-white
            "
          >
            API Key
          </h2>
        </div>

        <p
          className="
          text-slate-400
          mb-4
          "
        >
          Use this key to
          connect your SDK.
        </p>

        <div
          className="
          rounded-xl
          border
          border-slate-800
          bg-slate-950
          p-4
          "
        >
          <code
            className="
            break-all
            text-orange-400
            "
          >
            {project.apiKey}
          </code>
        </div>

        <div
          className="
          mt-4
          flex
          gap-3
          "
        >
          <button
            onClick={
              handleCopyApiKey
            }
            className="
            rounded-xl
            border
            border-slate-700
            px-4
            py-2
            text-slate-300
            "
          >
            {copied
              ? "Copied"
              : "Copy"}
          </button>

          <button
            onClick={
              handleRegenerate
            }
            disabled={
              regenerating
            }
            className="
            rounded-xl
            bg-orange-500
            px-4
            py-2
            text-white
            "
          >
            {regenerating
              ? "Generating..."
              : "Regenerate"}
          </button>
        </div>
      </Card>

      {/* SDK Setup */}

      <QuickStartCard
        apiKey={project.apiKey}
      />

      {/* Danger Zone */}

      <Card>
        <div
          className="
          flex
          items-center
          gap-3
          mb-4
          "
        >
          <Trash2
            size={20}
            className="text-red-400"
          />

          <h2
            className="
            text-xl
            font-semibold
            text-red-400
            "
          >
            Danger Zone
          </h2>
        </div>

        <p
          className="
          text-slate-400
          mb-5
          "
        >
          Permanently delete
          this project and all
          telemetry data.
        </p>

        <button
          onClick={handleDelete}
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
      </Card>
    </div>
  );
}