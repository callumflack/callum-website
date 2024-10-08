"use client";

import { Text } from "@repo/ui/atoms";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogTitle,
  DialogContent as RadixDialogContent,
} from "@repo/ui/composites";
import { LinkWithArrow } from "@repo/ui/elements";
import { MediaFigure, mediaWrapperVariants } from "@repo/ui/media";
import { getYear } from "@repo/ui/utils";
import { cx } from "cva";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CardIcon } from "~/src/components/card/card-title-meta";
import type { Project } from "./projects";

export interface DialogContentProps {
  project: Project;
  isModal: boolean;
}

export const DialogContent = ({ project, isModal }: DialogContentProps) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const { width, height, image, title } = project;

  const content = (
    <MediaFigure
      caption={
        <div>
          <hr className="hidden sm:block transform translate-y-[0.15em]" />
          <div className="sm:pt-3">
            <Caption project={project} />
          </div>
        </div>
      }
      className="space-y-3"
      figureIntent="superOutset"
      isPortrait={height >= width}
      style={{
        aspectRatio: `${width}/${height}`,
      }}
    >
      <Image
        alt={title}
        className={cx(
          mediaWrapperVariants({
            border: false,
            background: false,
            rounded: false,
          })
        )}
        height={height}
        sizes="(min-width: 1024px) 940px, (min-width: 700px) 660px, 100vw"
        src={image}
        style={{
          aspectRatio: `${width}/${height}`,
        }}
        width={width}
      />
    </MediaFigure>
  );

  if (!isModal) {
    return content;
  }

  return (
    <Dialog onOpenChange={(open) => !open && handleClose()} open>
      <RadixDialogContent
        aria-describedby={title}
        className="flex container"
        // Prevent focus from returning to the trigger
        onCloseAutoFocus={(event) => {
          event.preventDefault();
        }}
        overlayClassName="bg-background-active cursor-zoom-out"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{title}</DialogDescription>
        <DialogClose className="flex w-full cursor-zoom-out">
          {content}
        </DialogClose>
      </RadixDialogContent>
    </Dialog>
  );
};

const Caption = ({ project }: { project: Project }) => (
  <div className="flex flex-col space-y-1 sm:flex-row justify-between">
    <div className="flex items-center gap-2">
      <Text
        as="h2"
        className="flex gap-2"
        color="fill"
        intent="body"
        weight="medium"
      >
        {project.title}
      </Text>
      {/* <hr className={hrStyle} /> */}
      {/* {getYear(project.date)} */}
      {/* duplicated from CardTitleMeta */}
      {/* <CardTitleMeta post={project} /> */}
      <Text
        className="flex shrink-0 items-center gap-2 transform translate-y-px"
        dim
        intent="meta"
      >
        <CardIcon category="projects" className="hidden sm:block" />
        <span className="hidden sm:block">{getYear(project.date)}</span>
      </Text>
    </div>

    <div className="flex shrink-0 items-center gap-2">
      <CardIcon category="projects" className="sm:hidden" />
      <span className="sm:hidden">{getYear(project.date)}</span>
      {project.caseStudyLink ? (
        <>
          <hr className="sm:hidden hr-vertical border-border-hover h-[0.7em] transform translate-y-[0.15em]" />
          <LinkWithArrow
            className="group block link-alt"
            href={project.caseStudyLink}
          >
            Case study
          </LinkWithArrow>
        </>
      ) : null}
    </div>
  </div>
);
