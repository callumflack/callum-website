import { notFound } from "next/navigation";
import config from "@repo/ui/config";
import { isVideoFile } from "@repo/ui/utils";
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

  const { title, date: publishedTime, description, assets } = post;
  const asset = assets?.[0];
  let image;

  if (asset?.src) {
    if (isVideoFile(asset.src) && asset.poster) {
      image = `${config.PUBLIC_NOTES_URL}${asset.poster}`;
    } else {
      image = `${config.PUBLIC_NOTES_URL}${asset.src}`;
    }
  } else {
    image = `${config.PUBLIC_NOTES_URL}/opengraph-image.png`;
  }

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
          url: image,
        },
      ],
    },
  };
}
