import "./globals.css";
// import "@repo/ui/styles.css";
import { cx } from "cva";
import type { Metadata, Viewport } from "next";
import PlausibleProvider from "next-plausible";
import { mono, sans } from "@repo/ui/fonts";
import config from "@repo/ui/config";
import { BodyWrapper } from "@/components/utils";
import { Providers } from "./providers";

const title = "Callum Flack is a designer who codes and writes";
const description =
  "Callum Flack is a designer who codes. Fluid across visual design, user experience and frontend engineering, he also writes about creativity, teamwork and attention.";

// See
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#twitter
// Jim's <head>: https://blog.jim-nielsen.com/2024/cold-blooded-software/
export const metadata: Metadata = {
  metadataBase: new URL(config.PUBLIC_URL),
  title,
  description,
  twitter: {
    card: "summary",
    creator: "@callumflack",
    title,
    description,
    images: {
      url: "/images/twitter-card.png", // Must be an absolute URL
      alt: "Callum Flack's initial (C) on his favourite colour.",
    },
  },
};

// https://nextjs.org/docs/app/api-reference/functions/generate-viewport
export const viewport: Viewport = {
  // Indicating multiple color schemes indicates that the first scheme is preferred by the document, but that the second specified scheme is acceptable if the user prefers it. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name
  colorScheme: "light dark",
  // customize the surrounding browser chrome UI, see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* https://github.com/4lejandrito/next-plausible */}
        <PlausibleProvider domain={config.PUBLIC_DOMAIN} trackOutboundLinks />
      </head>
      <BodyWrapper className={cx(sans.variable, mono.variable)}>
        <Providers>{children}</Providers>
      </BodyWrapper>
    </html>
  );
}
