import { notFound } from "next/navigation";
import { slugify } from "@repo/ui/utils";
import { getProjects } from "../../../(components)/actions";
import { DialogContent } from "../../../(components)/dialog-content";

export default async function ProjectModal({
  params,
}: {
  params: { title: string };
}) {
  const projects = await getProjects();
  const project = projects.find((p) => slugify(p.title) === params.title);

  if (!project) {
    notFound();
  }

  return <DialogContent project={project} />;
}
