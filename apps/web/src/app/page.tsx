import { Link, Text, textVariants } from "@repo/ui/atoms";
import { LinkWithArrow, OutsetRule, TitleHeader } from "@repo/ui/elements";
import { cx } from "cva";
import type { CustomPost } from "@/app/(home)";
import { extraCard, HomeSnapCarousel } from "@/app/(home)";
import { WritingSubheading } from "@/app/writing/(components)/writing-components";
import { Available, Avatar, ContactIcons } from "@/components/elements";
import { Mdx } from "@/components/mdx";
import { PageWrapper } from "@/components/page";
import { PostBlock } from "@/components/post/post-block";
import { featuredWorkSlugs, featuredWritingSlugs } from "@/data";
import { sortByCustomSlugOrder } from "@/utils";
import { allPosts, type Post } from "contentlayer/generated";
import { getProjects } from "./graphics/(components)/actions";
import { GraphicsGrid } from "./graphics/(components)/graphics-grid";
import { graphicsDescription } from "./graphics/(components)/copy";

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

export default async function HomePage(): Promise<JSX.Element> {
  const projects = await getProjects();
  const displayedProjects = projects.slice(0, 9);

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

        {/* GRAPHICS */}
        <OutsetRule wrapperClassName="relative z-20" />
        <section className="pt-submajor pb-major">
          <div className="container">
            <TitleHeader as="div" className="pb-minor" isContainedChild>
              <Text
                as="h2"
                className="flex justify-between items-end"
                intent="title"
              >
                Graphics & interactions
                <LinkWithArrow
                  className={cx(
                    textVariants({
                      intent: "meta",
                      dim: true,
                      link: "accent",
                      weight: "normal",
                    })
                  )}
                  href="/work"
                >
                  View Gx
                </LinkWithArrow>
              </Text>
              <Text dim>{graphicsDescription}</Text>
            </TitleHeader>
          </div>
          <div className="container max-w-hero-px">
            <div className="h-[60vh] overflow-hidden relative">
              <div className="absolute inset-x-0 top-0">
                <GraphicsGrid cols={3} projects={displayedProjects} />
              </div>
              <div className="absolute w-full bottom-0 h-[20%] bg-gradient-to-t from-background-active to-transparent pointer-events-none" />
              <div className="absolute w-full bottom-0 h-[12%] bg-gradient-to-t from-background-active to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* WRITING */}
        <OutsetRule wrapperClassName="relative z-20" />
        <section className="container pt-submajor pb-major">
          <TitleHeader as="div" className="pb-minor" isContainedChild>
            <Text
              as="h2"
              className="flex justify-between items-end"
              intent="title"
            >
              {/* {writingHeading} */} Writing
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
