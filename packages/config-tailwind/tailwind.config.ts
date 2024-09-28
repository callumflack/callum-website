import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { generateClampSize } from "./generate-clamp-size";
import { generateScale } from "./generate-scale";
import twAnimate from "tailwindcss-animate";

// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
// sm: '640px',
// md: '768px',
// lg: '1024px',
// xl: '1280px',
// '2xl': '1536px',

const lineHeight = {
  body: `${24 / 17}`,
};
const letterSpacing = {
  fine: "0.0175em",
  metaHeading: "0.125em",
  body: "0",
  heading: "-0.01em",
  title: "-0.0075em",
};

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    container: {
      center: true,
      padding: "var(--space-inset)",
      screens: {
        // "var(--container-text)" doesn't work here
        lg: "660px",
      },
    },
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans], // 400 > 800
      mono: ["var(--font-mono)", ...fontFamily.mono], // 500
    },
    extend: {
      colors: {
        // GRAY
        canvas: "var(--color-gray-base)",
        "background-subtle": "var(--color-gray-bg-subtle)",
        background: "var(--color-gray-bg)",
        "background-hover": "var(--color-gray-bg-hover)",
        "background-active": "var(--color-gray-bg-active)",
        line: "var(--color-gray-line)",
        border: "var(--color-gray-border)",
        "border-hover": "var(--color-gray-border-hover)",
        "solid-light": "var(--color-gray-solid-light)",
        solid: "var(--color-gray-solid)",
        "solid-hover": "var(--color-gray-solid-hover)",
        "fill-tint": "var(--color-gray-fill)",
        fill: "var(--color-gray-fill-contrast)",

        // ACCENTS
        "accent1-background": "var(--color-accent1-bg)",
        accent: "var(--color-accent1-solid)",
        "accent1-hover": "var(--color-accent1-solid-hover)",
        accent2: "var(--color-accent2)",
        "accent3-background": "var(--color-accent3-bg)",
        accent3: "var(--color-accent3-solid)",
        "accent3-hover": "var(--color-accent3-solid-hover)",

        // ALPHAS: text-black-a4
        black: generateScale("black"),
        white: generateScale("white"),
      },
      fontSize: {
        fine: [
          generateClampSize(500, 1200, 9, 11),
          { lineHeight: lineHeight.body, letterSpacing: letterSpacing.fine },
        ],
        meta: [
          generateClampSize(500, 1200, 11.5, 14),
          { lineHeight: lineHeight.body, letterSpacing: letterSpacing.body },
        ],
        body: [
          generateClampSize(500, 1200, 15, 16),
          { lineHeight: lineHeight.body, letterSpacing: letterSpacing.body },
        ],
        heading: [
          generateClampSize(500, 1200, 16, 18),
          { lineHeight: lineHeight.body, letterSpacing: letterSpacing.body },
        ],
        title: [
          generateClampSize(500, 1200, 17, 21),
          { lineHeight: lineHeight.body, letterSpacing: letterSpacing.title },
        ],
      },
      spacing: {
        em: "1em",
        bullet: "1.35em",
        nav: "var(--height-nav)",
        tab: "var(--height-tab)",
        inset: "var(--space-inset)",

        "text-px": "var(--container-text-px)",
        text: "var(--container-text)",
        "hero-px": "var(--container-hero-px)",
        hero: "var(--container-hero)",
        mobile: "639px",

        "inset-full": "var(--inset-full)",
        "inset-hero": "var(--inset-hero)",
        "inset-text": "var(--inset-text)",

        // don't count the space above the text in the nav height, 80-29 = 51, ie. 54+51 / 80+51
        w20WithNav: "clamp(105px, 5.4018rem + 3.7143vw, 131px)",

        // lower value is 2/3 of upper value
        w4: generateClampSize(500, 1200, 10.5, 16),
        w6: generateClampSize(500, 1200, 16, 24),
        w8: generateClampSize(500, 1200, 21, 32),
        w12: generateClampSize(500, 1200, 32, 48),
        w16: generateClampSize(500, 1200, 43, 64),
        w20: generateClampSize(500, 1200, 54, 80),
        w24: generateClampSize(500, 1200, 64, 96),
        w28: generateClampSize(500, 1200, 75, 112),
        w32: generateClampSize(500, 1200, 85, 128),
        w36: generateClampSize(500, 1200, 96, 144),
        w42: generateClampSize(500, 1200, 112, 168),
        w48: generateClampSize(500, 1200, 128, 192),
        w64: generateClampSize(500, 1200, 171, 256),
        w72: generateClampSize(500, 1200, 192, 288),
        w96: generateClampSize(500, 1200, 256, 384),

        // semantic spacers
        gap: generateClampSize(500, 1200, 10.5, 16), // w4
        small: generateClampSize(500, 1200, 16, 24), // w8
        minor: generateClampSize(500, 1200, 32, 48), // w12
        major: generateClampSize(500, 1200, 64, 96), // w24
      },
      letterSpacing: {
        ...letterSpacing,
      },
      lineHeight: {
        ...lineHeight,
      },
      borderRadius: {
        soft: "2px",
        button: "5px",
        card: "9px",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulse2: {
          "50%": {
            // opacity: ".5",
            transform: "scale(0.5)",
          },
        },
      },
      animation: {
        spinner: "spin 1s infinite linear",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse2: "pulse2 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  // https://github.com/jamiebuilds/tailwindcss-animate?tab=readme-ov-file
  plugins: [twAnimate],
};

export default config;
