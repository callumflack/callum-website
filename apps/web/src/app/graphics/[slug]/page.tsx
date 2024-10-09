import { Link } from "@repo/ui/atoms";
import config from "@repo/ui/config";
import { slugify } from "@repo/ui/utils";
import { cx } from "cva";
import { notFound } from "next/navigation";
import projects from "@/app/graphics/(components)/projects";
import { DialogContent } from "@/app/graphics/(components)/dialog-content";
import { graphicsDescription } from "@/app/graphics/(components)/copy";
import { getProjectBySlug } from "@/app/graphics/(components)/actions";

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

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: slugify(project.title),
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => slugify(p.title) === params.slug);
  if (!project) {
    return;
  }

  const { title, date: publishedTime, image } = project;
  const imageUrl = `${config.PUBLIC_URL}${image}`;

  return {
    title,
    description: graphicsDescription,
    openGraph: {
      title,
      description: graphicsDescription,
      type: "image",
      publishedTime,
      url: `${config.PUBLIC_URL}/graphics/${params.slug}`,
      images: [
        {
          url: imageUrl,
        },
      ],
    },
  };
}
