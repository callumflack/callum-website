"use client";

import { Link } from "@repo/ui/atoms";
import { MediaFigure, mediaWrapperVariants } from "@repo/ui/media";
import { cx } from "cva";
import Image from "next/image";
import { memo } from "react";
import { slugify } from "@repo/ui/utils";
import type { Project } from "./projects";

// Add a slugify function
export const GraphicsGrid = memo(
  ({ projects, cols }: { projects: Project[]; cols: number }) => {
    // Pre-pack images for mobile and desktop
    const columnsMobile = pack(projects, 2);
    const columnsDesktop = pack(projects, cols);

    const renderColumns = (columns: Project[][], basisClass: string) =>
      columns.map((column, columnIndex) => (
        <div
          className={cx(`flex flex-col gap-w4`, basisClass)}
          key={`column-${column[0].image}`}
        >
          {column.map((project) => (
            <Link
              className="w-full focus-visible:outline-none !py-0"
              href={`/graphics/${slugify(project.title)}`}
              key={project.image}
            >
              <MediaFigure
                className="!py-0 focus-visible:outline-none"
                figureIntent="inGrid"
              >
                <Image
                  alt={project.title}
                  className={cx(
                    mediaWrapperVariants({
                      border: !project.noBorder,
                    }),
                    "focus-visible:outline-none"
                  )}
                  height={project.height}
                  priority={columnIndex < 7}
                  sizes="(min-width: 768px) 350px, 100vw"
                  src={project.image}
                  style={{
                    aspectRatio: `${project.width}/${project.height}`,
                  }}
                  width={project.width}
                />
              </MediaFigure>
            </Link>
          ))}
        </div>
      ));

    return (
      <>
        {/* Mobile layout: 2 columns */}
        <div className="flex flex-row gap-w4 sm:hidden">
          {renderColumns(columnsMobile, "basis-1/2")}
        </div>
        {/* Desktop layout: cols prop */}
        <div className="hidden sm:flex flex-row gap-w4">
          {renderColumns(columnsDesktop, renderColStyle(cols))}
        </div>
      </>
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
