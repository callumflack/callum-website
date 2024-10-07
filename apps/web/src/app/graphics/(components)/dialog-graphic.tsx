"use client";

import { cx } from "cva";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@repo/ui/composites";

/* Duplicate of @repo/ui/composites/dialog-basic with onCloseAutoFocus */

export interface DialogBasicProps {
  title: string;
  buttonNode: React.ReactElement;
  children: React.ReactNode;
  contentClassName?: string;
}

export const DialogGraphic = ({
  title,
  buttonNode,
  children,
  contentClassName,
}: DialogBasicProps) => {
  return (
    <Dialog>
      <DialogTrigger className="flex w-full focus-visible:outline-none">
        {buttonNode}
      </DialogTrigger>
      <DialogContent
        aria-describedby={title}
        className={cx("container", contentClassName)}
        // Prevent focus from returning to the trigger: fixes layout issue with Graphics-Grid
        onCloseAutoFocus={(event) => {
          event.preventDefault();
        }}
        overlayClassName="bg-background-active cursor-zoom-out"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">Description</DialogDescription>

        {children}

        {/* In order to show ther close button outside of the video area, we'd need to refactor MediaWrapper which a nested div that takes a child. Let's leave for now and presume users know the how to close this dialog without any guidance… */}
        {/* <DialogClose
            className={clsx(
              "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity",
              "hover:opacity-100",
              "focus:ring-ring focus:outline-none focus:ring-2 focus:ring-offset-2",
              "disabled:pointer-events-none",
              "data-[state=open]:bg-accent data-[state=open]:text-solid",
            )}
          >
            <Cross2Icon className="size-em" />
            <span className="sr-only">Close</span>
          </DialogClose> */}
      </DialogContent>
    </Dialog>
  );
};
