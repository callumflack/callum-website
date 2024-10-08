import { Link, Text } from "@repo/ui/atoms";
import type { Metadata } from "next";
import { TitleHeader } from "@repo/ui/elements";
import { PageWrapper } from "@/components/page";
import { getProjects } from "./(components)/actions";
import { GraphicsGrid } from "./(components)/graphics-grid";
import { graphicsDescription } from "./(components)/copy";
// import type { PostsKind } from "@/components/post";
// import type { SearchParams } from "@/types/search-params";

export const metadata: Metadata = {
  title: "Graphics and interactions",
  description: graphicsDescription,
};

/* 
  TODO: add searchParam filters?
 */

export default async function GraphicsIndexPage() {
  const projects = await getProjects();

  // add filters?
  // searchParams: SearchParams;
  // const kind: PostsKind = "projects";
  // const currentSort = (searchParams.sort as string) || kind;

  return (
    <PageWrapper activeNav="/work">
      <TitleHeader>
        <Text as="h1" intent="title">
          Graphics and interactions.
        </Text>
        <Text dim>
          {graphicsDescription}{" "}
          <Link className="link" href="/work">
            View case studies
          </Link>
          .
        </Text>
      </TitleHeader>
      <main className="container max-w-hero-px pt-tab pb-major">
        <GraphicsGrid cols={3} projects={projects} />
      </main>
    </PageWrapper>
  );
}
