// https://github.com/contentlayerdev/contentlayer/issues/140.
// import { withContentlayer } from "next-contentlayer";
// To load an ES module, set "type": "module" in the package.json or use the .mjs extension. Otherwise use require() instead. Mind you, this is Lee Rob's, which uses require() instead of import: https://github.com/leerob/leerob.io/blob/main/next.config.js
const { withContentlayer } = require("next-contentlayer2");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // importing styles & components from ui src directly
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.callumflack.design",
        port: "",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/blog/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/get-cleared",
        destination: "/cleared",
        permanent: true,
      },
      {
        source: "/the-first-principle-website",
        destination: "/the-first-principle",
        permanent: true,
      },
      {
        source: "/archive",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/shelf",
        destination: "/about",
        permanent: false,
      },
      {
        source: "/what-i-want",
        destination: "/the-work-and-team-im-after",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
