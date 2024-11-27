import { Text } from "@repo/ui/atoms";
import { TitleHeader } from "@repo/ui/elements";
import type { Metadata } from "next";
import { Mdx } from "@/components/mdx";
import { PageWrapper } from "@/components/page";
import { allPosts } from "contentlayer/generated";
import { Avatar } from "~/src/components/elements/avatar";

export const metadata: Metadata = {
  title: "About",
};

const file = allPosts.filter(
  (p) => p.category === "home" && p.title.includes("What I want")
);

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="container pb-w20 pt-w12 [&>header]:!space-y-0 [&>header]:!pb-small">
        <TitleHeader isContainedChild>
          <div className="pb-4">
            <Avatar />
          </div>
          <Text as="h1" intent="title">
            {file[0]?.title}
          </Text>
        </TitleHeader>
        <Mdx code={file[0]?.body.code ?? ""} />

        {/* Render `no-bullets` for Tailwind to see */}
        <div className="no-bullets sr-only" />
      </div>
    </PageWrapper>
  );
}
