    "use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import {
  getMonitor,
  updateMonitor,
} from "@/services/uptime.service.js";

import Loader from "@/components/ui/Loader";
import Card from "@/components/ui/Card";

import toast from "react-hot-toast";

export default function EditMonitorPage() {
  const { monitorId, id } = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [name, setName] =
    useState("");

  const [url, setUrl] =
    useState("");

  const [method, setMethod] =
    useState("GET");

  const [interval, setInterval] =
    useState(5);

  useEffect(() => {
    const loadMonitor =
      async () => {
        try {
          const res =
            await getMonitor(
              monitorId,
            );

          const monitor =
            res.data.data;

          setName(
            monitor.name,
          );

          setUrl(
            monitor.url,
          );

          setMethod(
            monitor.method,
          );

          setInterval(
            monitor.interval,
          );
        } catch (error) {
          console.error(
            error,
          );

          toast.error(
            "Failed to load monitor",
          );
        } finally {
          setLoading(false);
        }
      };

    if (monitorId) {
      loadMonitor();
    }
  }, [monitorId]);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setSaving(true);

        await updateMonitor(
          monitorId,
          {
            name,
            url,
            method,
            interval:
              Number(
                interval,
              ),
          },
        );

        toast.success(
          "Monitor updated",
        );

        router.push(
          `/projects/${id}/uptime/${monitorId}`,
        );
      } catch (error) {
        console.error(
          error,
        );

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to update monitor",
        );
      } finally {
        setSaving(false);
      }
    };

  if (loading) {
    return (
      <Loader text="Loading monitor..." />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="
          text-3xl
          font-bold
          text-white
          "
        >
          Edit Monitor
        </h1>

        <p
          className="
          mt-2
          text-slate-400
          "
        >
          Update monitor
          configuration.
        </p>
      </div>

      <Card>
        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >
          <div>
            <label
              className="
              block
              mb-2

              text-sm
              text-slate-400
              "
            >
              Monitor Name
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
              required
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
              URL
            </label>

            <input
              type="url"
              value={url}
              onChange={(e) =>
                setUrl(
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
              required
            />
          </div>

          <div
            className="
            grid
            gap-5

            md:grid-cols-2
            "
          >
            <div>
              <label
                className="
                block
                mb-2

                text-sm
                text-slate-400
                "
              >
                Method
              </label>

              <select
                value={method}
                onChange={(e) =>
                  setMethod(
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
                "
              >
                <option>
                  GET
                </option>

                <option>
                  POST
                </option>

                <option>
                  PUT
                </option>

                <option>
                  PATCH
                </option>

                <option>
                  DELETE
                </option>
              </select>
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
                Interval
              </label>

              <select
                value={interval}
                onChange={(e) =>
                  setInterval(
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
                "
              >
                <option value={1}>
                  1 Minute
                </option>

                <option value={5}>
                  5 Minutes
                </option>

                <option value={15}>
                  15 Minutes
                </option>
              </select>
            </div>
          </div>

          <div
            className="
            flex
            gap-3
            "
          >
            <button
              type="submit"
              disabled={
                saving
              }
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

            <button
              type="button"
              onClick={() =>
                router.back()
              }
              className="
              rounded-xl

              border
              border-slate-700

              px-5
              py-2.5

              text-slate-300
              "
            >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}