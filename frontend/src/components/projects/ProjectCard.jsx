import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import Link from "next/link";

export default function ProjectCard({ project, deleting = false, onDelete }) {
  return (
    <Card>
      <h2 className="text-xl font-bold">{project.name}</h2>

      <p className="text-gray-500 mt-2">{project.description}</p>

      <div
        className="
        flex
        gap-2
        mt-4
      "
      >
        <Link href={`/projects/${project._id}`}>
          <Button>View</Button>
        </Link>

        <Button
          className="bg-red-600"
          disabled={deleting}
          onClick={() => onDelete(project._id)}
        >
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Card>
  );
}
