"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { createProject } from "@/services/project.service";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "@/services/api";

export default function NewProjectPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    environment: "development",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await createProject(formData);
      toast.success(res.data.message || "Project created successfully");

      router.push(`/projects/${res.data.data._id}`);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to create project"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Project</h1>

        <p className="text-gray-500 mt-2">
          Create a new project and start monitoring your APIs with PingNest.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Project Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="QloudPrint"
            required
          />

          <div>
            <label
              className="
              block
              text-sm
              font-medium
              mb-2
              "
            >
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Project monitoring for production APIs..."
              className="
              w-full
              border
              rounded-lg
              p-3
              outline-none
              focus:ring-2
              focus:ring-black
              "
            />
          </div>

          <div>
            <label
              className="
              block
              text-sm
              font-medium
              mb-2
              "
            >
              Environment
            </label>

            <select
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              className="
              w-full
              border
              rounded-lg
              p-3
              "
            >
              <option value="development">Development</option>

              <option value="staging">Staging</option>

              <option value="production">Production</option>
            </select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
