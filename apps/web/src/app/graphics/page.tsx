import { Link, Text } from "@repo/ui/atoms";
import { TitleHeader } from "@repo/ui/elements";
import { PageWrapper } from "@/components/page";
// import type { PostsKind } from "@/components/post";
// import type { SearchParams } from "@/types/search-params";
import { getProjects } from "./(components)/actions";
import { GraphicsGrid } from "./(components)/graphics-grid";
import { graphicsDescription } from "./(components)/copy";

/* 
  TODO:
  * add searchParam filters
  * add metaData
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
      {/* max-w-[1140px] */}
      <main className="container max-w-hero-px pt-tab pb-major">
        <GraphicsGrid cols={3} projects={projects} />
      </main>
    </PageWrapper>
  );
}
