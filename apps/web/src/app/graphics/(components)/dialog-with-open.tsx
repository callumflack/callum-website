"use client";

import { cx } from "cva";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@repo/ui/composites";
import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/* Duplicate of @repo/ui/composites/dialog-basic with searchParams state */

export interface DialogWithOpenProps {
  title: string;
  buttonNode: React.ReactElement;
  children: React.ReactNode;
  contentClassName?: string;
  initialOpen?: boolean;
}

export const DialogWithOpen = ({
  title,
  buttonNode,
  children,
  contentClassName,
  initialOpen = false,
}: DialogWithOpenProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(initialOpen);

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen);
      // Do not update the URL to avoid re-renders?
      const params = new URLSearchParams(searchParams);
      if (newOpen) {
        params.set("open", encodeURIComponent(title));
      } else {
        params.delete("open");
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, title]
  );

  // Sync open state with URL
  useEffect(() => {
    const openParam = searchParams.get("open");
    setOpen(openParam === encodeURIComponent(title));
  }, [searchParams, title]);

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger className="w-full focus-visible:outline-none">
        {buttonNode}
      </DialogTrigger>
      <DialogContent
        aria-describedby={title}
        className={cx("container", contentClassName)}
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
