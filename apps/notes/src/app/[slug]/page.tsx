import { notFound } from "next/navigation";
import config from "@repo/ui/config";
import { allPosts } from "contentlayer/generated";
import { PagePost } from "@/components/page-post";
import { PageWrapper } from "~/src/components/page-wrapper";

interface Params {
  slug: string;
}

export default function PostPage({ params }: { params: Params }) {
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <PageWrapper showRootActive>
      <PagePost post={post} />
    </PageWrapper>
  );
}

export function generateStaticParams(): Params[] {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

export function generateMetadata({ params }: { params: Params }) {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return;
  }

  const { title: postTitle, date: publishedTime, description } = post;
  const title = `${postTitle} —— Callum Flack Notes`;

  const ogImage = `${config.PUBLIC_NOTES_URL}/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${config.PUBLIC_NOTES_URL}/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
