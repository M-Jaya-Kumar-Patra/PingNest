"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layouts/Sidebar";
import Navbar from "@/components/layouts/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
