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
          // isPortrait={height >= width}
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
            sizes="(min-width: 768px) 350px, 100vw"
            src={src}
            style={{
              aspectRatio: `${width}/${height}`,
            }}
            width={width}
          />
        </MediaFigure>
      }
      contentClassName="flex"
      title={title}
    >
      <MediaFigure
        caption={
          <div className="">
            <hr className="hidden sm:block transform translate-y-[0.15em]" />
            <div className="sm:pt-3">{caption}</div>
          </div>
        }
        className="space-y-3"
        figureIntent="superOutset"
        isPortrait={height >= width}
      >
        <DialogClose className="flex w-full cursor-zoom-out">
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
            sizes="(min-width: 1024px) 940px, (min-width: 700px) 660px, 100vw"
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
