"use client";

import { useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layouts/Sidebar";
import Navbar from "@/components/layouts/Navbar";

export default function DashboardLayout({
  children,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <ProtectedRoute>
      <div
        className="
        min-h-screen
        bg-slate-950
        text-white
        "
      >
        <div className="flex">
  <Sidebar
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
  />

  <div
    className="
    flex-1
    min-w-0

    md:ml-72
    "
  >
            <Navbar
              setSidebarOpen={setSidebarOpen}
            />

            <main
              className="
              p-4
              sm:p-6
              lg:p-8
              "
            >
              <div
                className="
                mx-auto
                max-w-7xl
                "
              >
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}