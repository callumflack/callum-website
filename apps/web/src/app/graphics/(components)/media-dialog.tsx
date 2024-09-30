"use client";

import { DialogClose, type DialogBasicProps } from "@repo/ui/composites";
import type { MediaFigureProps, MediaWrapperProps } from "@repo/ui/media";
import { MediaFigure, mediaWrapperVariants } from "@repo/ui/media";
import { splitAspect } from "@repo/ui/utils";
import { cx } from "cva";
import type { ImageProps } from "next/image";
import Image from "next/image";
import { DialogGraphic } from "./dialog-graphic";

/* Duplicated from @repo/ui/composites/media-dialog-image */

export interface MediaDialogProps
  extends Pick<DialogBasicProps, "title">,
    MediaFigureProps,
    Pick<MediaWrapperProps, "aspect" | "border" | "background" | "rounded">,
    Pick<ImageProps, "src" | "alt" | "priority" | "className"> {
  title: string;
  caption?: MediaFigureProps["caption"];
  showCaptionInButton?: boolean;
  buttonFigureIntent?: MediaFigureProps["figureIntent"];
  initialOpen?: boolean;
}

export const MediaDialog = ({
  alt,
  aspect,
  border,
  background,
  buttonFigureIntent = "inMdxDialog",
  priority,
  rounded,
  src,
  title = "Media Dialog Image",
  caption,
  showCaptionInButton = true,
}: MediaDialogProps) => {
  const { width, height } = splitAspect(aspect);

  return (
    <DialogGraphic
      buttonNode={
        <MediaFigure
          caption={showCaptionInButton ? caption : null}
          className="!py-0 focus-visible:outline-none"
          figureIntent={buttonFigureIntent}
          isPortrait={height > width}
        >
          <Image
            alt={alt}
            className={cx(
              mediaWrapperVariants({
                border,
                background,
                rounded,
              }),
              "focus-visible:outline-none"
            )}
            height={height}
            priority={priority}
            sizes="(min-width: 768px) 400px, 100vw"
            src={src}
            style={{
              aspectRatio: `${width}/${height}`,
            }}
            width={width}
          />
        </MediaFigure>
      }
      title={title}
    >
      <MediaFigure
        caption={caption}
        captionRule
        className="space-y-3"
        figureIntent="superOutset"
        isPortrait={height >= width}
      >
        <DialogClose className="w-full cursor-zoom-out">
          <Image
            alt={alt}
            className={cx(
              mediaWrapperVariants({
                border,
                background,
                rounded,
              })
            )}
            height={height}
            src={src}
            style={{
              aspectRatio: `${width}/${height}`,
            }}
            width={width}
          />
        </DialogClose>
      </MediaFigure>
    </DialogGraphic>
  );
};
