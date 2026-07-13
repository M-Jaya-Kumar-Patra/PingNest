"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  FolderPlus,
  Rocket,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { createProject } from "@/services/project.service";

import toast from "react-hot-toast";

export default function NewProjectPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      environment: "development",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res =
        await createProject(
          formData
        );

      toast.success(
        "Project created"
      );

      router.push(
        `/projects/${res.data.data._id}`
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to create project"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      max-w-4xl
      mx-auto

      space-y-8
      "
    >
      {/* Hero */}

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

          <h1
            className="
            mt-2

            text-3xl
            md:text-4xl

            font-bold

            text-white
            "
          >
            Create New Project
          </h1>

          <p
            className="
            mt-3

            max-w-2xl

            text-slate-400
            "
          >
            Create a project and start
            collecting API telemetry,
            response times, errors,
            and health metrics.
          </p>
        </div>
      </div>

      {/* Form */}

      <Card>
        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
        >
          <Input
            label="Project Name"
            name="name"
            value={formData.name}
            onChange={
              handleChange
            }
            placeholder="User Service API"
            required
          />

          <div>
            <label
              className="
              block

              text-sm
              font-medium

              text-slate-200

              mb-2
              "
            >
              Description
            </label>

            <textarea
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              rows={5}
              placeholder="Describe your service, API, or application..."
              className="
              w-full

              rounded-xl

              border
              border-slate-700

              bg-slate-900

              px-4
              py-3

              text-white

              placeholder:text-slate-500

              outline-none

              transition-all

              focus:border-orange-500
              focus:ring-2
              focus:ring-orange-500/20

              hover:border-orange-500/30
              "
            />
          </div>

          <div>
            <label
              className="
              block

              text-sm
              font-medium

              text-slate-200

              mb-2
              "
            >
              Environment
            </label>

            <select
              name="environment"
              value={
                formData.environment
              }
              onChange={
                handleChange
              }
              className="
              w-full

              rounded-xl

              border
              border-slate-700

              bg-slate-900

              px-4
              py-3

              text-white

              outline-none

              transition-all

              focus:border-orange-500
              focus:ring-2
              focus:ring-orange-500/20

              hover:border-orange-500/30
              "
            >
              <option value="development">
                Development
              </option>

              <option value="staging">
                Staging
              </option>

              <option value="production">
                Production
              </option>
            </select>
          </div>

          <div
            className="
            flex
            flex-col

            gap-3

            sm:flex-row
            sm:justify-end
            "
          >
            <Button
              type="submit"
              disabled={loading}
              className="
              w-full
              sm:w-auto

              gap-2
              "
            >
              {loading ? (
                "Creating..."
              ) : (
                <>
                  <Rocket
                    size={18}
                  />
                  Create Project
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>

      {/* Info Card */}

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
            flex

            h-12
            w-12

            items-center
            justify-center

            rounded-xl

            bg-orange-500/10

            text-orange-400
            "
          >
            <FolderPlus
              size={22}
            />
          </div>

          <div>
            <h3
              className="
              text-lg
              font-semibold

              text-white
              "
            >
              What happens next?
            </h3>

            <p
              className="
              mt-2

              text-slate-400
              "
            >
              After creating your
              project you'll receive
              a unique API key.
              Install the PingNest
              SDK in your Express
              application and start
              monitoring requests
              instantly.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}