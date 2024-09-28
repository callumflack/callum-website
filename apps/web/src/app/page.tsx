import { Link, Text, textVariants } from "@repo/ui/atoms";
import { LinkWithArrow, OutsetRule, TitleHeader } from "@repo/ui/elements";
import { cx } from "cva";
import type { CustomPost } from "@/app/(home)";
import { HomeSnapCarousel, extraCard } from "@/app/(home)";
import { WritingSubheading, writingHeading } from "@/app/writing/page";
import { Available, Avatar, ContactIcons } from "@/components/elements";
import { Mdx } from "@/components/mdx";
import { PageWrapper } from "@/components/page";
import { PostBlock } from "@/components/post/post-block";
import { featuredWorkSlugs, featuredWritingSlugs } from "@/data";
import { sortByCustomSlugOrder } from "@/utils";
import { allPosts, type Post } from "contentlayer/generated";

const work = featuredWorkSlugs.map((slug) =>
  allPosts.find((post) => post.slug === slug)
);
const writing = featuredWritingSlugs.map((slug) =>
  allPosts.find((post) => post.slug === slug)
);

const workPosts = sortByCustomSlugOrder(
  work.filter((post): post is Post => post !== undefined),
  featuredWorkSlugs
);

const allWorkPosts: CustomPost[] = [...workPosts, extraCard];

const writingPosts = sortByCustomSlugOrder(
  writing.filter((post): post is Post => post !== undefined),
  featuredWritingSlugs
);

const copyPosts = allPosts.filter(
  (p) => p.category === "home" && p.title.includes("intro")
);

export default function HomePage(): JSX.Element {
  return (
    <PageWrapper>
      {/* make this div fill the screen on mobile */}
      <div className="min-h-screen sm:min-h-fit">
        <header className="container pb-minor pt-minor">
          <div className="pb-gap">
            <Avatar />
          </div>
          <div className="space-y-2 lg:w-10/12">
            <Text as="h1" intent="title">
              Hi, I&rsquo;m Callum. I make beautiful hypertext products.
            </Text>
            <Mdx code={copyPosts[0]?.body.code ?? ""}>
              <div className="pb-1">
                <Available />
              </div>
              <ContactIcons className="pt-0.5" />
            </Mdx>
          </div>
        </header>

        {/* PROJECTS */}
        <main className="relative pb-major" id="work">
          <HomeSnapCarousel posts={allWorkPosts} />
        </main>

        {/* WRITING */}
        <OutsetRule wrapperClassName="relative z-20" />
        <section className="container pt-submajor pb-major">
          <TitleHeader as="div" className="pb-minor" isContainedChild>
            <Text
              as="h2"
              className="flex justify-between items-end"
              intent="title"
            >
              {writingHeading}
              <LinkWithArrow
                className={cx(
                  textVariants({
                    intent: "meta",
                    dim: true,
                    link: "accent",
                    weight: "normal",
                  })
                )}
                href="/writing"
              >
                View all
              </LinkWithArrow>
            </Text>
            <WritingSubheading />
          </TitleHeader>

          <div className="grid grid-cols-2 gap-inset">
            {writingPosts.map((post) => (
              <Link
                href={post.thumbnailLink ? post.thumbnailLink : post.slug}
                key={post._id}
              >
                <PostBlock post={post} theme="home" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
