import config from "@repo/ui/config";
import { TitleHeader } from "@repo/ui/elements";
import { Text } from "@repo/ui/atoms";
import { PageWrapper } from "@/components/page";
import { PagePostsIndexClient } from "@/components/page/page-posts-index-client";
import type { PostsKind } from "@/components/post";
import type { SearchParams } from "@/types/search-params";

export default function WritingIndexPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const kind: PostsKind = "writing";
  const currentSort = (searchParams.sort as string) || kind;

  return (
    <PageWrapper>
      <TitleHeader>
        <Text as="h1" intent="title">
          {writingHeading}
        </Text>
        <WritingSubheading />
      </TitleHeader>
      <PagePostsIndexClient initialSort={currentSort} kind={kind} />
    </PageWrapper>
  );
}

export const writingHeading = "If you have the words, you’ll find the way.";
export const WritingSubheading = () => (
  <Text dim>
    Writing about creativity, design and complexity through the lens of
    attention, interfaces and systems composition. Signup for new posts{" "}
    <a className="link" href={config.SUBSTACK_URL}>
      here
    </a>
    .
  </Text>
);
