import type { MetadataRoute } from "next";
import config from "@repo/ui/config";
import { allPosts } from "contentlayer/generated";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return Promise.resolve([
    {
      url: config.PUBLIC_NOTES_URL,
      lastModified: new Date(),
    },
    ...allPosts.map((post) => ({
      url: `${config.PUBLIC_NOTES_URL}/${post._raw.flattenedPath}`,
      lastModified: new Date(),
    })),
  ]);
}
