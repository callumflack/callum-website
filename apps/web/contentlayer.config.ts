import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer2/source-files";
import readingTime from "reading-time";
import smartypants from "remark-smartypants";
import remarkGfm from "remark-gfm";
// import remarkSlug from "remark-slug";
// import { rehypeHighlightCode } from "./lib/rehype-highlight-code";
// import { rehypeMetaAttribute } from "./lib/rehype-meta-attribute";

// https://contentlayer.dev/docs/reference/source-files/define-document-type-eb9db60e
export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    draft: {
      type: "boolean",
    },
    showAsNew: {
      type: "boolean",
    },
    title: {
      type: "string",
      required: true,
    },
    linkTitle: {
      type: "string",
      description:
        "Use this if you want to display a different link title. Helpful in the UI where it needs to be shorter.",
    },
    date: {
      type: "date",
      required: true,
    },
    endDate: {
      type: "date",
    },
    lede: {
      type: "string",
      required: true,
    },
    // https://www.contentlayer.dev/docs/reference/source-files/field-types#enum
    category: {
      type: "enum",
      options: ["writing", "projects", "library", "home", "about", "content"],
      required: true,
    },
    tags: {
      // Could use a nested enum but the filtering gets too complicated
      // …What about just an enum then?
      // See nested enum example below!
      // type: "nested",
      // of: Tags,
      type: "list",
      of: { type: "string" },
      // required: true,
    },
    // currently unused? Probably helpful as the site grows.
    // But I thought we were moving to Astro?
    libraryType: {
      type: "enum",
      // superset = category, topic = tag
      options: ["superset", "topic", "year", "post", "hide"],
      default: "post",
      description:
        "The library type category of the post, where `post` means it's not part of any library sorting, and `hide` means it's not shown in the library",
    },
    projectLink: {
      type: "string",
      description: "The project's external link.",
    },
    thumbnailLink: {
      type: "string",
      description:
        "An external link used on thumbnails. If present, the UI does not link to the Post page",
    },
    assets: {
      type: "list", // despite what docs says, use list not nested!
      of: Asset,
      description:
        "The first asset is used as the thumbnail, which should always be aspect-[1440/880]",
    },
    nextPostLink: {
      type: "string",
      // required: true,
    },
    tweet: {
      type: "string",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      // resolve: (post) => `/posts/${post._raw.flattenedPath}`,
      resolve: (post) => post._raw.flattenedPath.replace("posts/", ""),
    },
    readingTime: {
      type: "json",
      resolve: (post) => readingTime(post.body.raw),
    },
  },
}));

// https://contentlayer.dev/docs/reference/source-files/field-types-defe41e9#nested
const Asset = defineNestedType(() => ({
  name: "Asset",
  fields: {
    src: {
      type: "string",
      required: true,
    },
    alt: {
      type: "string",
      required: true,
    },
    aspect: {
      type: "string",
      required: true,
      description:
        "MDX components cannot take arbitrary classes, so we must provide a key to look-up the media/video-aspect map function. The first assetis used as the thumbnail, so it should always have aspect-[1440/880]",
    },
    poster: {
      type: "string",
      description: "The poster image for the video. Therefore not required.",
    },
    border: {
      type: "boolean",
      default: true,
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  contentDirExclude: ["_TEMPLATE.mdx", "_leftovers"],
  documentTypes: [Post],
  mdx: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- fuck you
    remarkPlugins: [smartypants, remarkGfm as any],
    // rehypePlugins: [rehypeMetaAttribute, rehypeHighlightCode],
  },
});

// Could use a nested enum here, but all the filtering gets too complicated
// const Tags = defineNestedType(() => ({
//   name: "Tags",
//   fields: {
//     title: {
//       type: "enum",
//       options: [
//         "engineering",
//         "teamwork",
//         "featured",
//         "design",
//         "knowhow",
//         "strategy",
//         "book",
//         "creativity",
//       ],
//     },
//   },
// }));
