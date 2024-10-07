import type { Metadata } from "next";
import { Mdx } from "@/components/mdx";
import { Avatar } from "~/src/components/elements/avatar";
import { PageWrapper } from "@/components/page";
import { allPosts } from "contentlayer/generated";

export const metadata: Metadata = {
  title: "About",
};

const file = allPosts.filter(
  (p) => p.category === "home" && p.title.includes("gist")
);

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="container pb-w20 pt-w12">
        <div className="pb-4">
          <Avatar />
        </div>
        <Mdx code={file[0]?.body.code ?? ""} />

        {/* Render `no-bullets` for Tailwind to see */}
        <div className="no-bullets sr-only" />
      </div>
    </PageWrapper>
  );
}
