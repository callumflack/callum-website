import { Text } from "@repo/ui/atoms";
import { TitleHeader } from "@repo/ui/elements";
import { PageWrapper } from "@/components/page";
// import type { PostsKind } from "@/components/post";
// import type { SearchParams } from "@/types/search-params";
import { getProjects } from "./actions";
import { GraphicsGrid } from "./graphics-grid";

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
    <PageWrapper>
      <TitleHeader>
        <Text as="h1" intent="title">
          A history of graphics.
        </Text>
        <Text dim>Quote about taste & fun goes here…</Text>
      </TitleHeader>
      {/* <PagePostsIndexClient initialSort={currentSort} kind={kind} /> */}
      <main className="container max-w-hero-px pt-tab pb-major">
        <GraphicsGrid projects={projects} />
      </main>
    </PageWrapper>
  );
}
