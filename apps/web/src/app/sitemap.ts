import { allPosts } from "contentlayer/generated";
import { MetadataRoute } from "next";
import config from "@/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: config.PUBLIC_URL,
      lastModified: new Date(),
    },
    {
      url: `${config.PUBLIC_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${config.PUBLIC_URL}/work`,
      lastModified: new Date(),
    },
    {
      url: `${config.PUBLIC_URL}/writing`,
      lastModified: new Date(),
    },
    ...allPosts.map((post) => ({
      url: `${config.PUBLIC_URL}/${post._raw.flattenedPath}`,
      lastModified: new Date(),
    })),
  ];
}