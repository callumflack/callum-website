"use client";

import { Fragment, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { cx } from "cva";
import { spacingVariants } from "@repo/ui/atoms";
import type { PostsKind } from "@/components/post";
import {
  PostsBlockList,
  PostsList,
  hideFeaturedDotStyle,
} from "@/components/post";
import { useSortedPosts } from "../post/use-sorted-posts";
import { ListHeader } from "./list-header";
import { StyledSortButton } from "./sort-button";

export const PagePostsIndexClient = ({
  kind,
  initialSort,
}: {
  kind: PostsKind;
  initialSort: string;
}) => {
  const router = useRouter();
  const [currentSort, setCurrentSort] = useState(initialSort);
  const [showGrid, setShowGrid] = useState(
    initialSort === kind ||
      initialSort === "projects" ||
      initialSort === "writing"
  );

  // Must match a string from sortedPosts.ts
  const sortedPostsMap = useSortedPosts(kind);

  // const sortBy = Object.keys(sortedPostsMap);
  const sortBy = [kind, "year", "topic", "a-to-z"];

  // console.log("PagePostsIndex posts", posts);
  // console.log("currentSort", currentSort);

  const handleSortButtonClick = (sortKind: string) => {
    setCurrentSort(sortKind);
    router.push(`?sort=${sortKind}`, { scroll: false });
    if (sortKind === "projects" || sortKind === "writing") {
      setShowGrid((prev) => !prev);
    } else {
      setShowGrid(false);
    }
  };

  return (
    <main
      className={cx("container relative", spacingVariants({ intent: "b-xl" }))}
    >
      <ListHeader
        className={cx(
          "top-nav translate-y-px transform",
          hideFeaturedDotStyle
          // For PostsSquares only
          // (!currentSort ||
          //   currentSort === "projects" ||
          //   currentSort === "writing") && [
          //   mediaWrapperStyle.superOutset,
          //   "[&>div]:container",
          // ],
        )}
        // rhsElement={
        //   <div className="flex items-center gap-2.5">
        //     <button
        //       onClick={() => setShowGrid(false)}
        //       className={cx(
        //         buttonVariants({ variant: "icon", size: "icon" }),
        //         showGrid ? "text-solid" : "bg-background",
        //       )}
        //     >
        //       <CarbonTextAlignJustify className="size-em" />
        //     </button>
        //     <button
        //       onClick={() => setShowGrid(true)}
        //       className={cx(
        //         buttonVariants({ variant: "icon", size: "icon" }),
        //         !showGrid ? "text-solid" : "bg-background",
        //       )}
        //     >
        //       <CarbonCenterToFit className="size-em" />
        //     </button>
        //   </div>
        // }
        // rhsElement={
        //   currentSort !== kind && (
        //     // Show a start here" indicator for the featuredDots
        //     <div className={cx(sortButtonStyle, "pr-0")}>Start here</div>
        //   )
        // }
      >
        {sortBy.map((sort) => (
          <Fragment key={sort}>
            <StyledSortButton
              initialSortBy={kind}
              key={sort}
              onClick={() => handleSortButtonClick(sort)}
              searchParamsValue={currentSort}
              sortBy={sort}
            >
              {sort === "projects" || sort === "writing"
                ? " Selected"
                : sort.replace(/-/g, " ")}
            </StyledSortButton>
            {/* {index === 0 && (
              <hr className="hr-vertical h-[18px] translate-y-[-2px] transform" />
            )} */}
          </Fragment>
        ))}
      </ListHeader>

      {/* only kind of "projects" or "writing" will show grid */}
      <Suspense fallback={<>Loading…</>}>
        {showGrid ? (
          // <MemoizedPostsSquares
          //   kind={kind}
          //   sortBy={currentSort}
          //   sortedPostsMap={sortedPostsMap}
          //   wrapperClassName={cx(
          //     "flex flex-col gap-w24 pt-w12",
          //     mediaWrapperStyle.superOutset,
          //   )}
          // />
          <PostsBlockList
            kind={kind}
            sortBy={currentSort}
            sortedPostsMap={sortedPostsMap}
            wrapperClassName={cx("flex flex-col gap-w8 pt-w8")}
          />
        ) : (
          <PostsList
            kind={kind}
            sortBy={currentSort}
            sortedPostsMap={sortedPostsMap}
            wrapperClassName="pt-3"
          />
        )}
      </Suspense>
    </main>
  );
};
