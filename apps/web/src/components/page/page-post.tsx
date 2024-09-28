import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link, Text } from "@repo/ui/atoms";
import { TitleHeader, TitleMetaHeading } from "@repo/ui/elements";
import { getYear, isVideoFile, splitAspect } from "@repo/ui/utils";
import NextImage from "next/image";
import { mediaWrapperVariants, MediaWrapper } from "@repo/ui/media";
import { cx } from "cva";
import { allPosts, type Post } from "contentlayer/generated";
import { notSupersetOrTopicPosts } from "@/utils";
import { PostMeta } from "@/components/post";
import { Mdx } from "@/components/mdx";
import { PageWrapper } from "./page-wrapper";

export const PagePost = ({ post }: { post: Post }) => {
  // const longDate = format(parseISO(post?.date ?? ""), "LLLL d, yyyy");
  // const year = format(parseISO(post?.date ?? ""), "yyyy");
  // const tagsWithoutFeatured = post?.tags.filter((tag) => tag !== "featured");

  const everyPost = notSupersetOrTopicPosts(allPosts);
  const nextPost = everyPost.find((p) => p.slug === post.nextPostLink);
  const { width, height } = splitAspect(
    nextPost?.assets?.[0]?.aspect ?? "1920-1080"
  );

  const year = getYear(post.date);
  const endYear = post.endDate ? getYear(post.endDate) : null;
  const readingTimeText = (post.readingTime as { text: string }).text;

  const renderActiveNav = () => {
    if (post.category === "projects") return "/work";
    if (post.category === "writing") return "/writing";
    return undefined;
  };

  return (
    <PageWrapper
      activeNav={renderActiveNav()}
      footerChildren={
        <>
          {nextPost ? (
            <Link className="space-y-w8" href={nextPost.slug}>
              <Text
                as="h2"
                className="flex items-baseline gap-1.5"
                intent="title"
              >
                Next
                <ArrowRightIcon className="size-[0.9em] translate-y-[0.1em] transform" />
              </Text>

              {/* 810 = 1080 * 0.75 */}
              {/* TODO post.asset[0] is aspect-[1440/880]? */}
              <MediaWrapper
                aspect="1920-810"
                className="!rounded-b-none !border-b-0"
              >
                {nextPost.assets && nextPost.assets.length > 0 ? (
                  <NextImage
                    alt={nextPost.assets[0].alt}
                    className={cx(
                      mediaWrapperVariants({
                        border: false,
                        background: false,
                        rounded: false,
                      })
                    )}
                    height={height}
                    sizes="(min-width: 1000px) 960px, (min-width: 660px) 620px, 100vw"
                    src={
                      isVideoFile(nextPost.assets[0].src)
                        ? (nextPost.assets[0].poster ?? "")
                        : nextPost.assets[0].src
                    }
                    style={{
                      aspectRatio: "1920 / 1080",
                    }}
                    width={width}
                  />
                ) : null}
              </MediaWrapper>
            </Link>
          ) : null}
        </>
      }
    >
      <TitleHeader hasMetaSubheading>
        <Text as="h1" intent="title">
          {post.title}
        </Text>
        <TitleMetaHeading>
          <>
            {year}
            {endYear ? (
              <>
                &ndash;
                {endYear}
              </>
            ) : null}
            {post.category === "writing" ? (
              <>
                <hr className="hr-vertical border-border-hover h-[13px]" />
                {readingTimeText}
              </>
            ) : null}
          </>
        </TitleMetaHeading>
      </TitleHeader>

      <div className="container flex flex-col pb-w20">
        <Mdx code={post.body.code}>
          <PostMeta post={post} />
        </Mdx>
      </div>
    </PageWrapper>
  );
};
