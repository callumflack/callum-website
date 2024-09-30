"use client";

import { Text } from "@repo/ui/atoms";
import { LinkWithArrow } from "@repo/ui/elements";
import { getYear } from "@repo/ui/utils";
import { cx } from "cva";
import { useEffect, useMemo, useState, memo } from "react";
import { CardIcon } from "~/src/components/card/card-title-meta";
import { MediaDialog } from "./media-dialog";
import type { Project } from "./projects";

export const GraphicsGrid = memo(
  ({ projects, cols }: { projects: Project[]; cols: number }) => {
    const isMobile = useMediaQuery("(max-width: 640px)");

    const columns = useMemo(
      () => pack(projects, isMobile ? 2 : cols),
      [cols, projects, isMobile]
    );

    return (
      <div className="flex flex-col sm:flex-row gap-w4">
        {columns.map((column, columnIndex) => (
          <div
            className={cx(
              "flex flex-col gap-w4 basis-1/2",
              renderColStyle(cols)
            )}
            // eslint-disable-next-line react/no-array-index-key -- hey
            key={`column-${columnIndex}`}
          >
            {column.map((project) => (
              <MediaDialog
                alt={project.title}
                aspect={`${project.width}-${project.height}`}
                buttonFigureIntent="inGrid"
                caption={<Caption project={project} />}
                key={project.image}
                priority={columnIndex < 3}
                showCaptionInButton={false}
                src={project.image}
                title={project.title}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
);

GraphicsGrid.displayName = "GraphicsGrid";

function pack(images: Project[], columns: number): Project[][] {
  const packed: Project[][] = Array.from({ length: columns }, () => []);
  const heights = Array.from({ length: columns }, () => 0);

  // Sort images by height in descending order
  const sortedImages = [...images].sort((a, b) => b.height - a.height);

  for (const image of sortedImages) {
    // Find the column with the smallest height
    const minHeight = Math.min(...heights);
    const columnIndex = heights.indexOf(minHeight);

    // Add the image to the column
    packed[columnIndex].push(image);
    heights[columnIndex] += image.height / image.width; // Use aspect ratio
  }

  return packed;
}

const renderColStyle = (col: number) => {
  if (col === 4) return "sm:basis-1/4";
  if (col === 3) return "sm:basis-1/3";
  if (col === 2) return "sm:basis-1/2";
  return "basis-1/2";
};

const Caption = ({ project }: { project: Project }) => (
  <div className="flex justify-between">
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
        <CardIcon category="projects" />
        <span>{getYear(project.date)}</span>
      </Text>
    </div>

    {project.caseStudyLink ? (
      <LinkWithArrow
        className="group block link-alt"
        href={project.caseStudyLink}
      >
        Case study
      </LinkWithArrow>
    ) : null}
  </div>
);

// const MemoizedCaption = memo(Caption);

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
