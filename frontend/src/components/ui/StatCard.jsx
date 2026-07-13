import { Activity, Server, FolderKanban, HeartPulse } from "lucide-react";

import Card from "./Card";

export default function StatCard({ title, value }) {
  const getIcon = () => {
    switch (title) {
      case "Projects":
        return <FolderKanban size={20} className="text-orange-400" />;

      case "Active":
      case "Active Projects":
        return <Activity size={20} className="text-green-400" />;

      case "Requests":
      case "Total Requests":
        return <Server size={20} className="text-orange-400" />;

      case "Health Score":
        return <HeartPulse size={20} className="text-red-400" />;

      default:
        return <Activity size={20} className="text-orange-400" />;
    }
  };

  return (
    <Card
      className="
      relative
      overflow-hidden
      "
    >
      <div
        className="
        absolute
        top-0
        right-0

        h-24
        w-24

        rounded-full

        bg-orange-500/5

        blur-2xl
        "
      />

      <div
        className="
        relative

        flex
        items-start
        justify-between
        "
      >
        <div>
          <p
            className="
            text-sm
            font-medium

            text-slate-400
            "
          >
            {title}
          </p>

          <h2
            className="
            mt-3

            text-3xl
            font-bold

            text-white
            "
          >
            {value}
          </h2>
        </div>

        <div
          className="
          flex
          h-11
          w-11

          items-center
          justify-center

          rounded-xl

          border
          border-orange-500/20

          bg-orange-500/10
          "
        >
          {getIcon()}
        </div>
      </div>
    </Card>
  );
}
