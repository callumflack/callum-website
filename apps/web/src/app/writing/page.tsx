import { Text } from "@repo/ui/atoms";
import { TitleHeader } from "@repo/ui/elements";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/page";
import { PagePostsIndexClient } from "@/components/page/page-posts-index-client";
import type { PostsKind } from "@/components/post";
import type { SearchParams } from "@/types/search-params";
import {
  writingHeading,
  WritingSubheading,
} from "./(components)/writing-components";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Writing about creativity, design and complexity through the lens of attention, interfaces and systems composition.",
};

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
