"use client";

import Link from "next/link";
import { LayoutDashboard, FolderKanban } from "lucide-react";

export default function Sidebar() {
  return (
    <aside
      className="
      w-64
      bg-white
      border-r
      min-h-screen
      p-4
    "
    >
      <h1 className="text-2xl font-bold mb-8">PingNest</h1>

      <nav className="space-y-2">
        <Link
          href="/dashboard"
          className="
            flex
            items-center
            gap-2
            p-3
            rounded-lg
            hover:bg-gray-100
          "
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/projects"
          className="
            flex
            items-center
            gap-2
            p-3
            rounded-lg
            hover:bg-gray-100
          "
        >
          <FolderKanban size={18} />
          Projects
        </Link>
      </nav>
    </aside>
  );
}
