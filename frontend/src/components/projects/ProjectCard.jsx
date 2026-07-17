import Link from "next/link";

import {
  FolderKanban,
  Trash2,
  ArrowRight,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ProjectCard({
  project,
  onDelete,
}) {
  return (
    <Card
      className="
      group

      relative

      overflow-hidden

      transition-all
      duration-300

      hover:border-orange-500/30
      hover:-translate-y-1
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

        bg-orange-500/10

        blur-3xl
        "
      />

      <div className="relative">
        {/* Header */}

        <div
          className="
          flex
          items-start
          justify-between
          "
        >
          <div
            className="
            h-12
            w-12

            rounded-xl

            bg-orange-500/10

            flex
            items-center
            justify-center
            "
          >
            <FolderKanban
              size={22}
              className="
              text-orange-400
              "
            />
          </div>

          <span
            className="
            rounded-full

            bg-green-500/10

            px-3
            py-1

            text-xs
            font-semibold

            text-green-400
            "
          >
            Active
          </span>
        </div>

        {/* Content */}

        <div className="mt-5">
          <h2
            className="
            text-xl
            font-bold

            text-white
            "
          >
            {project.name}
          </h2>

          <p
            className="
            mt-3

            min-h-[48px]

            text-sm
            leading-6

            text-slate-400
            "
          >
            {project.description ||
              "No description provided."}
          </p>
        </div>

        {/* Footer */}

        <div
          className="
          mt-6

          flex
          items-center
          justify-between
          "
        >
          <p
            className="
            text-xs

            text-slate-500
            "
          >
            Created{" "}
            {new Date(
              project.createdAt
            ).toLocaleDateString()}
          </p>

          <ArrowRight
            size={18}
            className="
            text-slate-500

            group-hover:text-orange-400

            transition
            "
          />
        </div>

        {/* Actions */}

        <div
          className="
          mt-6

          flex
          gap-3
          "
        >
          <Link
            href={`/projects/${project._id}`}
            className="flex-1"
          >
            <Button
              className="
              w-full
              "
            >
              Open Project
            </Button>
          </Link>

          <Button
            onClick={() =>
              onDelete(project._id)
            }
            className="
            bg-red-600

            hover:bg-red-500
            hover:shadow-red-500/20
            "
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
}