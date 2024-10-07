# Callum's sites

My personal website and notes site using a single design theme.

- **Framework**: [Next.js](https://nextjs.org/)
- **Data**: [MDX](https://mdxjs.com/)
- **Monorepo**: [Turborepo](https://turborepo.org/)
- **UI**: [Tailwind CSS](https://tailwindcss.com), [Radix UI](https://www.radix-ui.com/) and [Shadcn](https://ui.shadcn.com/)
- **Utils**: [TypeScript](https://www.typescriptlang.org/) for static type checking, [ESLint](https://eslint.org/) for code linting, [Prettier](https://prettier.io/) for code formatting, and [pnpm](https://pnpm.io/) for package management.
- **Analytics**: [Plausible](https://plausible.io/) (website only)

## Designed for writing

Create a new post: `pnpm run --filter=web create-post`

## Turborepo apps & packages system

- `notes`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `web`: another [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) shared by both `web` and `notes` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Building packages/ui

Produces compiled styles for `ui` components into the `dist` directory.

The component `.tsx` files are consumed by the Next.js apps directly using `transpilePackages` in `next.config.js`. This was chosen for several reasons:

- Make sharing one `tailwind.config.js` to apps and packages as easy as possible.
- Make package compilation simple by only depending on the Next.js Compiler and `tailwindcss`.
- Ensure Tailwind classes do not overwrite each other. The `ui` package uses a `ui-` prefix for it's classes.
- Maintain clear package export boundaries.

Another option is to consume `packages/ui` directly from source without building. If using this option, you will need to update the `tailwind.config.js` in your apps to be aware of your package locations, so it can find all usages of the `tailwindcss` class names for CSS compilation.

For example, in [tailwind.config.js](packages/tailwind-config/tailwind.config.js):

```js
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/ui/*.{js,ts,jsx,tsx}",
  ],
```

If you choose this strategy, you can remove the `tailwindcss` and `autoprefixer` dependencies from the `ui` package.

## License

1. You are free to use this code as inspiration.
2. Please do not copy it directly.
3. Crediting the author is appreciated.

Please remove my posts by running `pnpm run delete-posts`.
