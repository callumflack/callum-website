import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";
import { Link } from "@repo/ui/atoms";
import { cx } from "cva";
import { mediaWrapperVariants } from "@repo/ui/media";
import { type Post } from "contentlayer/generated";
import { iconStyle, transformStyle } from "./card-styles";
import { CardIcon } from "./card-title-meta";
import { CardImage } from "./card-image";

interface PostCardProps {
  post: Post;
  className: string;
  captionClassName: string;
  showRule?: boolean;
}

export const PostCard = ({
  post,
  className,
  captionClassName,
  showRule,
}: PostCardProps) => (
  <Link
    className={cx("PostCard group block h-full w-full", className)}
    href={post.thumbnailLink ? post.thumbnailLink : `/${post.slug}`}
  >
    <div className="relative">
      {/* IMAGE */}
      {post.assets && post.assets.length > 0 ? (
        <CardImage
          asset={post.assets[0]}
          className={cx(mediaWrapperVariants())}
        />
      ) : null}

      {/* CAPTION */}
      <div
        className={cx(
          "flex w-full flex-1 transform items-baseline gap-2 text-body",
          captionClassName
        )}
      >
        <CardIcon post={post} />
        <span>{post.title}</span>
        {showRule ? (
          <hr
            className={cx(
              "hr-vertical mx-[2px] block h-[15px] border-solid",
              transformStyle
            )}
          />
        ) : null}
        <span className="text-solid">
          {format(parseISO(post.date), "yyyy")}
        </span>
        {post.thumbnailLink ? (
          <ArrowTopRightIcon className={cx(iconStyle, transformStyle)} />
        ) : null}
      </div>
    </div>
  </Link>
);
