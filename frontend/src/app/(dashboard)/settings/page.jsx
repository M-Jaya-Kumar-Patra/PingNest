"use client";

import Card from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your PingNest preferences.
        </p>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-2">
          General
        </h2>

        <p className="text-gray-500">
          Settings page coming soon.
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-2">
          Notifications
        </h2>

        <p className="text-gray-500">
          Configure alerts and notifications.
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-2">
          Preferences
        </h2>

        <p className="text-gray-500">
          Customize your dashboard experience.
        </p>
      </Card>
    </div>
  );
}