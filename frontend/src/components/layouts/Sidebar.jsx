"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getProjects } from "@/services/project.service";

import {
  LayoutDashboard,
  FolderKanban,
  User,
  Book,
  Activity,
  X,
  ChevronRight,
  Server,
  ShieldAlert,
  Settings,
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
      label: "Documentation",
      href: "/docs",
      icon: Book,
    },
  ];
  const [projects, setProjects] = useState([]);
  const [showProjectMenu, setShowProjectMenu] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await getProjects();
        setProjects(res.data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadProjects();
  }, []);

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
          fixed
          inset-0
          z-40

          bg-black/60
          backdrop-blur-sm

          md:hidden
          "
        />
      )}

      <aside
        className={`
        fixed
        left-0
        top-0

        z-50

        flex
        h-screen
        w-72
        flex-col

        border-r
        border-slate-800

        bg-slate-950

        transition-transform
        duration-300

        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* Header */}

        <div
          className="
          border-b
          border-slate-800

          px-6
          py-6
          "
        >
          <div
            className="
            flex
            items-center
            justify-between
            "
          >
            <Link
              href="/dashboard"
              className="
              flex
              items-center
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

                rounded-2xl

                bg-orange-500/10

                border
                border-orange-500/20
                "
              >
                <Activity
                  size={24}
                  className="
                  text-orange-400
                  "
                />
              </div>

              <div>
                <h1
                  className="
                  text-lg
                  font-bold
                  text-white
                  "
                >
                  PingNest
                </h1>

                <p
                  className="
                  text-xs
                  text-slate-500
                  "
                >
                  Developer Observability
                </p>
              </div>
            </Link>

            <button onClick={() => setSidebarOpen(false)} className="md:hidden">
              <X size={20} className="text-slate-400" />
            </button>
          </div>

          {/* Workspace */}

          <div
            className="
            mt-5

            rounded-2xl

            border
            border-slate-800

            bg-slate-900

            p-4
            "
          >
            <p
              className="
              text-xs

              uppercase

              tracking-wider

              text-slate-500
              "
            >
              Workspace
            </p>

            <p
              className="
              mt-2

              font-medium

              text-white
              "
            >
              Personal
            </p>
          </div>
        </div>

        {/* Navigation */}

        <nav
  className="
  flex-1
  overflow-y-auto
  hide-scrollbar

  p-4
  "
>
          <p
            className="
            px-3
            pb-3

            text-xs

            uppercase

            tracking-wider

            text-slate-500
            "
          >
            Navigation
          </p>

          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                  group

                  flex
                  items-center
                  justify-between

                  rounded-xl

                  px-4
                  py-3

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
                  <div
                    className="
                    flex
                    items-center
                    gap-3
                    "
                  >
                    <Icon size={18} />

                    <span>{item.label}</span>
                  </div>

                  <ChevronRight
                    size={15}
                    className="
                    opacity-0

                    transition

                    group-hover:opacity-100
                    "
                  />
                </Link>
              );
            })}
          </div>

          {/* Quick Links */}

          <div className="mt-8">
            <p
              className="
    px-3
    pb-3

    text-xs

    uppercase

    tracking-wider

    text-slate-500
    "
            >
              Quick Access
            </p>

            {/* Monitors */}

            <div
              className="relative"
              onMouseEnter={() => setShowProjectMenu("monitors")}
              onMouseLeave={() => setShowProjectMenu(null)}
            >
              <div
                className="
      flex
      items-center
      justify-between

      rounded-xl

      bg-slate-900

      px-4
      py-3

      text-slate-300

      cursor-pointer

      hover:bg-slate-800
      "
              >
                <div
                  className="
        flex
        items-center
        gap-3
        "
                >
                  <Server size={18} />
                  Monitors
                </div>

                <ChevronRight size={15} />
              </div>

              {showProjectMenu === "monitors" && (
                <div
                  className="
absolute

left-0
top-full

mt-2

w-full

rounded-xl

border
border-slate-800

bg-slate-950

p-2

shadow-xl
z-50
"
                >
                  <p
                    className="
          px-3
          py-2

          text-xs

          uppercase

          text-slate-500
          "
                  >
                    Select Project
                  </p>

                  {projects.map((project) => (
                    <Link
                      key={project._id}
                      href={`/projects/${project._id}/uptime`}
                      className="
            block

            rounded-lg

            px-3
            py-2

            text-slate-300

            hover:bg-slate-900
            "
                    >
                      {project.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Incidents */}

            <div
              className="relative mt-2"
              onMouseEnter={() => setShowProjectMenu("incidents")}
              onMouseLeave={() => setShowProjectMenu(null)}
            >
              <div
                className="
      flex
      items-center
      justify-between

      rounded-xl

      bg-slate-900

      px-4
      py-3

      text-slate-300

      cursor-pointer

      hover:bg-slate-800
      "
              >
                <div
                  className="
        flex
        items-center
        gap-3
        "
                >
                  <ShieldAlert size={18} />
                  Incidents
                </div>

                <ChevronRight size={15} />
              </div>

              {showProjectMenu === "incidents" && (
                <div
                  className="
absolute

left-0
top-full

mt-2

w-full

rounded-xl

border
border-slate-800

bg-slate-950

p-2

shadow-xl
z-50
"
                >
                  <p
                    className="
          px-3
          py-2

          text-xs

          uppercase

          text-slate-500
          "
                  >
                    Select Project
                  </p>

                  {projects.map((project) => (
                    <Link
                      key={project._id}
                      href={`/projects/${project._id}/incident`}
                      className="
            block

            rounded-lg

            px-3
            py-2

            text-slate-300

            hover:bg-slate-900
            "
                    >
                      {project.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Footer */}

        <div
          className="
          border-t
          border-slate-800

          p-4
          "
        >
          <div
            className="
            flex
            items-center
            justify-between

            rounded-xl

            bg-slate-900

            p-3
            "
          >
            <div>
              <p
                className="
                text-sm
                font-medium

                text-white
                "
              >
                PingNest
              </p>

              <p
                className="
                text-xs

                text-slate-500
                "
              >
                v1.0.0
              </p>
            </div>

            <Link href="/account">
              <Settings
                size={18}
                className="
    text-slate-500

    hover:text-orange-400

    transition
    "
              />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
