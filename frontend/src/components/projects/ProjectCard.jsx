import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import Link from "next/link";

export default function ProjectCard({ project, onDelete }) {
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

        <Button className="bg-red-600" onClick={() => onDelete(project._id)}>
          Delete
        </Button>
      </div>
    </Card>
  );
}
