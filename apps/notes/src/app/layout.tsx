import "./globals.css";
import { cx } from "cva";
import type { Metadata, Viewport } from "next";
import { mono, sans } from "@repo/ui/fonts";
import config from "@repo/ui/config";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(config.PUBLIC_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Callum's Notes",
    template: "%s — Callum's Notes",
  },
  description: "Wunderkammer curios by a designer who codes.",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
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
      <body className={cx(sans.variable, mono.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
