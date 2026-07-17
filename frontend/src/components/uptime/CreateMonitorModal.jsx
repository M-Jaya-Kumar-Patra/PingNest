"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { createMonitor } from "@/services/uptime.service";
import toast from "react-hot-toast";

export default function CreateMonitorModal({ projectId, onCreated, onClose }) {
  const [form, setForm] = useState({
    name: "",
    url: "",
    method: "GET",
    interval: 5,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createMonitor(projectId, form);

      toast.success("Monitor created");

      onCreated?.();
      onClose?.();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create monitor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      fixed
      inset-0
      z-50

      bg-black/60

      flex
      items-center
      justify-center
      p-4
      "
    >
      <Card className="w-full max-w-lg">
        <h2
          className="
          text-xl
          font-semibold
          text-white
          mb-6
          "
        >
          Create Monitor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Monitor Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="
            w-full
            bg-slate-900
            border
            border-slate-700
            rounded-xl
            p-3
            "
            required
          />

          <input
            type="url"
            placeholder="https://api.example.com"
            value={form.url}
            onChange={(e) =>
              setForm({
                ...form,
                url: e.target.value,
              })
            }
            className="
            w-full
            bg-slate-900
            border
            border-slate-700
            rounded-xl
            p-3
            "
            required
          />

          <select
            value={form.method}
            onChange={(e) =>
              setForm({
                ...form,
                method: e.target.value,
              })
            }
            className="
            w-full
            bg-slate-900
            border
            border-slate-700
            rounded-xl
            p-3
            "
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>PATCH</option>
            <option>DELETE</option>
          </select>

          <select
            value={form.interval}
            onChange={(e) =>
              setForm({
                ...form,
                interval: Number(e.target.value),
              })
            }
            className="
            w-full
            bg-slate-900
            border
            border-slate-700
            rounded-xl
            p-3
            "
          >
            <option value={1}>1 Minute</option>
            <option value={5}>5 Minutes</option>
            <option value={15}>15 Minutes</option>
          </select>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
              flex-1
              border
              border-slate-700
              rounded-xl
              py-3
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
              flex-1
              bg-orange-500
              rounded-xl
              py-3
              text-white
              "
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
