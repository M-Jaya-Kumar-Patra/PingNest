"use client";

import Card from "@/components/ui/Card";
import useAuth from "@/hooks/useAuth";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-2">Manage your PingNest account.</p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Account</h2>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user?.name || "Not available"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user?.email || "Not available"}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
