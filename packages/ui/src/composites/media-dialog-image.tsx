"use client";

import { cx } from "cva";
import type { ImageProps } from "next/image";
import Image from "next/image";
import { splitAspect } from "../../lib/utils";
import type { MediaWrapperProps, MediaFigureProps } from "../media";
import { mediaWrapperVariants, MediaFigure } from "../media";
import { DialogClose } from "./dialog";
import { DialogBasic, type DialogBasicProps } from "./dialog-basic";

export interface MediaDialogImageProps
  extends Pick<DialogBasicProps, "title">,
    MediaFigureProps,
    Pick<MediaWrapperProps, "aspect" | "border" | "background" | "rounded">,
    Pick<ImageProps, "src" | "alt" | "priority" | "className"> {
  title: string;
  caption?: MediaFigureProps["caption"];
  showCaptionInButton?: boolean;
  buttonFigureIntent?: MediaFigureProps["figureIntent"];
}

export const MediaDialogImage = ({
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
}: MediaDialogImageProps) => {
  const { width, height } = splitAspect(aspect);

  return (
    <DialogBasic
      buttonNode={
        <MediaFigure
          caption={showCaptionInButton ? caption : null}
          // className="!py-0"
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
              })
            )}
            height={height}
            priority={priority}
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
        figureIntent="superOutset"
        isPortrait={height > width}
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
    </DialogBasic>
  );
};
