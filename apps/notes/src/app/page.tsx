import { cx } from "cva";
import { compareDesc } from "date-fns";
import { PagePost } from "@/components/page-post";
import { PageWrapper } from "@/components/page-wrapper";
import { allPosts } from "contentlayer/generated";

export default function HomePage(): JSX.Element {
  const publishedPosts = allPosts.filter((p) => !p.draft);

  const posts = publishedPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <PageWrapper>
      <main
        className={cx(
          "min-h-screen sm:min-h-fit relative",
          // pt-w12 space-y-w12
          "pb-w24"
        )}
        id="posts"
      >
        {posts.map((post) => (
          <div className="Post" key={post._id}>
            <PagePost isIndex post={post} />
          </div>
        ))}
      </main>
    </PageWrapper>
  );
}
