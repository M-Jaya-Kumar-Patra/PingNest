"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FolderKanban,
  User,
  Book,
  Activity,
  X,
} from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Projects",
      href: "/projects",
      icon: FolderKanban,
    },
    {
      label: "Account",
      href: "/account",
      icon: User,
    },
    {
      label: "Docs",
      href: "/docs",
      icon: Book,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
          md:hidden
          fixed
          inset-0
          bg-black/50
          z-40
          "
        />
      )}

      <aside
        className={`
  fixed
  top-0
  left-0

  h-screen
  w-72

  z-50
  flex
  flex-col

  bg-slate-950
  border-r
  border-slate-800

  transform
  transition-transform
  duration-300

  ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
`}
      >
        <div
          className="
          flex
          items-center
          justify-between

          px-6
          py-6

          border-b
          border-slate-800
          "
        >
          <Link
            href="/dashboard"
            className="
            flex
            items-center
            gap-3
            "
          >
            <div
              className="
              h-11
              w-11

              rounded-xl

              bg-orange-500/10
              border
              border-orange-500/20

              flex
              items-center
              justify-center
              "
            >
              <Activity size={22} className="text-orange-400" />
            </div>

            <div>
              <h1 className="font-bold text-white">PingNest</h1>

              <p className="text-xs text-slate-500">API Monitoring</p>
            </div>
          </Link>

          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        <nav
          className="
  flex-1
  overflow-y-auto

  p-4
  space-y-2
  "
        >
          {navItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex
                  items-center
                  gap-3

                  px-4
                  py-3

                  rounded-xl

                  transition-all

                  ${
                    active
                      ? `
                        bg-orange-500/10
                        text-orange-400
                        border
                        border-orange-500/20
                      `
                      : `
                        text-slate-400
                        hover:bg-slate-900
                        hover:text-white
                      `
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
