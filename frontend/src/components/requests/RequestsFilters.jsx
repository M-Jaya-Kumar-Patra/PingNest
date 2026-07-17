"use client";

import { Search } from "lucide-react";

export default function RequestsFilters({
  search,
  setSearch,
  method,
  setMethod,
  status,
  setStatus,
}) {
  return (
    <div
      className="
      mb-6

      grid
      gap-4

      md:grid-cols-3
      "
    >
      <div className="relative">
        <Search
          size={16}
          className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-slate-500
          "
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search routes..."
          className="
          w-full

          bg-slate-900
          border
          border-slate-800

          rounded-xl

          py-3
          pl-10
          pr-4

          outline-none

          focus:border-orange-500/50
          "
        />
      </div>

      <select
        value={method}
        onChange={(e) =>
          setMethod(e.target.value)
        }
        className="
        bg-slate-900
        border
        border-slate-800

        rounded-xl
        px-4
        "
      >
        <option value="">
          All Methods
        </option>

        <option value="GET">
          GET
        </option>

        <option value="POST">
          POST
        </option>

        <option value="PUT">
          PUT
        </option>

        <option value="PATCH">
          PATCH
        </option>

        <option value="DELETE">
          DELETE
        </option>
      </select>

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="
        bg-slate-900
        border
        border-slate-800

        rounded-xl
        px-4
        "
      >
        <option value="">
          All Status
        </option>

        <option value="200">
          2xx Success
        </option>

        <option value="400">
          4xx Client Errors
        </option>

        <option value="500">
          5xx Server Errors
        </option>
      </select>
    </div>
  );
}