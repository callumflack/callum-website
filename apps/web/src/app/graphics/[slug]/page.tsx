import { Link } from "@repo/ui/atoms";
import { cx } from "cva";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DialogContent } from "@/app/graphics/(components)/dialog-content";
import { graphicsDescription } from "@/app/graphics/(components)/copy";
import { getProjectBySlug } from "@/app/graphics/(components)/actions";

export const metadata: Metadata = {
  title: "Graphics and interactions",
  description: graphicsDescription,
};

export default async function InterceptedProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    // <PageWrapper activeNav="/graphics">
    <Link className="absolute inset-0 cursor-zoom-out" href="/graphics">
      <main
        className={cx(
          "container",
          // duplicate DialogContent styles
          "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        )}
      >
        <DialogContent isModal={false} project={project} />
      </main>
    </Link>
  );
}
