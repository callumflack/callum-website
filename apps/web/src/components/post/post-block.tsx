import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Text } from "@repo/ui/atoms";
import { mediaWrapperVariants } from "@repo/ui/media";
import { isVideoFile } from "@repo/ui/utils";
import { cx } from "cva";
import { type Post } from "contentlayer/generated";
// CardTitleMeta
import { CardImage } from "@/components/card";
import { PostLinkHeadingWrapper } from "./post-link-heading-wrapper";
import { postIconStyle } from "./post.styles";

interface PostBlockProps {
  post: Post;
  isComingSoon?: boolean;
  theme?: "home" | "index";
}

export const PostBlock = ({
  post,
  isComingSoon,
  theme = "index",
}: PostBlockProps) => {
  return (
    <div
      className={cx(
        "PostBlock group flex flex-col",
        theme === "index" ? "gap-w4 sm:flex-row" : "gap-3"
      )}
    >
      {/* IMAGE */}
      <div
        className={cx(
          "w-full relative",
          theme === "index" ? "sm:w-1/3 sm:shrink-0" : ""
        )}
      >
        {post.assets && post.assets.length > 0 ? (
          <CardImage
            asset={{
              ...post.assets[0],
              // Don't show videos, only images
              src: isVideoFile(post.assets[0]?.src)
                ? post.assets[0]?.poster || post.assets[0]?.src || ""
                : post.assets[0]?.src || "",
            }}
            className={cx(
              mediaWrapperVariants(),
              theme === "home" && "!aspect-[2/1]"
            )}
            priority
            sizes="(min-width: 660px) 205px, 100vw"
          />
        ) : null}
        {post.showAsNew ? (
          <div
            className={cx(
              "absolute inset-0 flex sm:rounded-button overflow-hidden",
              "border border-accent2 group-hover:border-accent",
              "ease-linear transition-colors duration-300",
              theme === "index"
                ? "items-start justify-end"
                : "items-end justify-start"
            )}
          >
            <Text
              className={cx(
                "bg-accent2 group-hover:bg-accent",
                "px-gap h-[20px] flex items-center",
                "ease-linear transition-colors duration-300",
                theme === "index"
                  ? "sm:rounded-bl-button"
                  : "sm:rounded-tr-button"
              )}
              color="canvas"
              intent="fineHeading"
            >
              <span className="transform translate-y-[0.1em]">New</span>
            </Text>
          </div>
        ) : null}
      </div>

      {/* CAPTION */}
      <div className="translate-y-[-0.2em] transform space-y-1">
        <PostLinkHeadingWrapper>
          <Text as="h2" weight="medium">
            {post.title}
          </Text>
          {post.thumbnailLink && !isComingSoon ? (
            <ArrowTopRightIcon className={cx(postIconStyle)} />
          ) : null}
        </PostLinkHeadingWrapper>
        <Text dim intent="meta">
          {post.lede}
          {/* <span className={cx("Text-subheading text-solid")}>
              {date ? format(parseISO(date), "yyyy") : "HEY"}
            </span> */}
        </Text>
        {/* {theme === "home" && <CardTitleMeta post={post} />} */}
      </div>
    </div>
  );
};
