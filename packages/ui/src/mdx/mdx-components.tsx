import { cx } from "cva";
import type { ComponentPropsWithoutRef } from "react";
import { highlight } from "sugar-high";
import { Link } from "../atoms/next-link";
import type { TextProps } from "../atoms/text";
import { Text, textVariants } from "../atoms/text";
import { LinkWithArrow } from "../elements";
import { MediaDialogImage } from "../composites/media-dialog-image";
import { MediaDialogVideo } from "../composites/media-dialog-video";
import { MdxImage } from "./mdx-image";
import { MdxVideo } from "./mdx-video";

type AnchorProps = ComponentPropsWithoutRef<"a">;
type HeadingProps = ComponentPropsWithoutRef<"h2">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

export const noteStyle = [
  "Note !mt-w12 space-y-2 text-meta text-solid link-block",
  "[&_p]:text-meta [&_p]:text-solid",
];

export const components = {
  a: ({ href, ...props }: AnchorProps) => {
    const isExternal = href && /^(?:https?:)?\/\//.test(href);
    return isExternal ? (
      <LinkWithArrow
        className={cx(textVariants({ intent: "link" }))}
        href={href}
        {...props}
      />
    ) : (
      <Link
        className={cx(textVariants({ intent: "link" }))}
        href={href || "#"}
        {...props}
      />
    );
  },
  p: ({ children, ...props }: ParagraphProps) => (
    <p {...(props as TextProps)}>{children}</p>
  ),
  ul: ({ children, ...props }: ListProps) => (
    <ul
      className={cx(
        "space-y-0.5 pl-bullet",
        "[&>li]:relative [&>li]:before:content-[''] [&>li]:before:absolute [&>li]:before:inline-block [&>li]:before:bg-current [&>li]:before:-left-[1.3em] [&>li]:before:top-[0.75em] [&>li]:before:h-px [&>li]:before:w-[14px]"
      )}
      {...(props as TextProps)}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ListProps) => (
    <ol className="space-y-0.5 pl-5 list-decimal" {...(props as TextProps)}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ListItemProps) => <li {...props}>{children}</li>,
  blockquote: ({ children, ...props }: BlockquoteProps) => (
    <Text
      as="blockquote"
      {...(props as TextProps)}
      className={cx(
        "pb-2 group",
        "[&_p]:pb-0 [&_p]:border-l [&_p]:border-border-hover [&_p]:pl-2.5 [&_p]:text-solid-hover md:[&_p]:pl-4",
        "group-[&_strong]:table group-[&_strong]:pt-[calc(5/16*1em)] group-[&_strong]:text-meta group-[&_strong]:!font-normal"
      )}
    >
      {children}
    </Text>
  ),
  h2: (props: HeadingProps) => <HeadingWithId as="h2" {...props} />,
  h3: (props: HeadingProps) => <HeadingWithId as="h3" {...props} />,
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <div className="py-1">
      <pre
        className={cx(
          "Pre bg-background-hover rounded-button overflow-auto",
          "[&_code]:overflow-auto [&_code]:py-2.5 [&_code]:pl-3 [&_code]:block",
          "[&_code]:leading-[1.6] [&_code]:hide-scrollbar",
          // overwrite prose code styles
          "[&_code]:bg-transparent"
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  ),
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    // sugar-high encapsulates code styles so we can't set them here nor in <Prose> but we can in a global CSS file, see styles/theme-code.css
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  hr: () => (
    <div className={cx(noteStyle)}>
      <hr />
    </div>
  ),
  Note: (props: ComponentPropsWithoutRef<"div">) => (
    <div className={cx(noteStyle)} {...props} />
  ),
  Img: MdxImage,
  Video: MdxVideo,
  MediaDialogVideo,
  MediaDialogImage,
};

type HeadingWithIdProps = HeadingProps &
  Pick<TextProps, "as" | "intent"> & {
    as: "h2" | "h3";
    children?: React.ReactNode;
  };

function HeadingWithId({ as, children }: HeadingWithIdProps) {
  const id = children?.toString().toLowerCase().replace(/\s+/g, "-");
  return (
    <Text
      as={as}
      className="group/heading scroll-mt-[calc(theme(spacing.nav)+theme(spacing.inset))] [&:not(:first-child)]:!mt-w8"
      id={id}
      intent={as === "h2" ? "heading" : "fineHeading"}
    >
      {children ? (
        <Link
          aria-hidden="true"
          className="relative !no-underline"
          href={`#${id}`}
        >
          <span className="absolute -left-em top-1/2 -translate-y-1/2 opacity-0 group-hover/heading:opacity-100 transition-opacity">
            #
          </span>

          {children}
        </Link>
      ) : null}
    </Text>
  );
}
