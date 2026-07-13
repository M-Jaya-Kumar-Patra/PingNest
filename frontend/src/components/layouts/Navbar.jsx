"use client";

import Button from "@/components/ui/Button";
import useAuth from "@/hooks/useAuth";
import { logoutUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";

import {
  Menu,
  Activity,
  LogOut,
} from "lucide-react";

export default function Navbar({
  setSidebarOpen,
}) {
  const router = useRouter();

  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {}

    setUser(null);

    router.replace("/login");
  };

  return (
    <header
      className="
      sticky
      top-0
      z-30

      h-16

      bg-slate-950/80
      backdrop-blur-xl

      border-b
      border-slate-800

      px-4
      sm:px-6

      flex
      items-center
      justify-between
      "
    >
      <div
        className="
        flex
        items-center
        gap-3
        "
      >
        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="
          md:hidden

          p-2

          rounded-lg

          hover:bg-slate-800
          "
        >
          <Menu size={20} />
        </button>

        <div className="md:hidden flex items-center gap-2">
          <Activity
            size={18}
            className="text-orange-400"
          />

          <span className="font-semibold">
            PingNest
          </span>
        </div>

        <div className="hidden md:block">
          <h2 className="font-medium text-white">
            Welcome back,
            {" "}
            {user?.name}
          </h2>
        </div>
      </div>

      <Button
        onClick={handleLogout}
        className="
        flex
        items-center
        gap-2
        "
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">
          Logout
        </span>
      </Button>
    </header>
  );
}