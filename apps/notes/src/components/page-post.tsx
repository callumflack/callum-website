import { TitleHeader, TitleMetaHeading } from "@repo/ui/elements";
import { formatPostDate } from "@repo/ui/utils";
import { Link, Text } from "@repo/ui/atoms";
import { cx } from "cva";
import { Mdx } from "@/components/mdx-components";
import { type Post } from "contentlayer/generated";
// import { PostMeta } from "./post-meta";

interface PagePostProps {
  post: Post;
  isIndex?: boolean;
}

export const PagePost = ({ post, isIndex }: PagePostProps) => {
  return (
    /* unlike in apps/web, we do NOT wrap with PageWrapper */
    <>
      {isIndex ? (
        <TitleHeader hasMetaSubheading>
          <Link className="block hover:text-accent" href={post.slug}>
            <Text as="h1" intent="title">
              {post.title}
            </Text>
          </Link>
          <Subheading post={post} />
        </TitleHeader>
      ) : (
        <TitleHeader hasMetaSubheading>
          <Text as="h1" intent="title">
            {post.title}
          </Text>
          <Subheading post={post} />
        </TitleHeader>
      )}
      <article
        className={cx("container flex flex-col", isIndex ? "" : "pb-submajor")}
      >
        <Mdx code={post.body.code}>
          {/* {!isIndex ? <PostMeta post={post} /> : null} */}
        </Mdx>
      </article>
    </>
  );
};

const Subheading = ({ post }: { post: Post }) => (
  <TitleMetaHeading>
    <span>{formatPostDate(post.date)}</span>
    <hr className="hr-vertical h-[0.9em] border-solid-light mt-[0.075em]" />
    <span>
      <Link
        className="capitalize link-alt"
        href={`/archive?category=${post.category}`}
      >
        {post.category}
      </Link>
    </span>
  </TitleMetaHeading>
);
