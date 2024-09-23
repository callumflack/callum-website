import { ArrowRightIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { cx } from "cva";
import type { AnchorHTMLAttributes } from "react";
import { Link } from "../atoms/next-link";

interface LinkWithArrowProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  iconClassName?: string;
}

export const LinkWithArrow = ({
  href,
  children,
  className,
  iconClassName,
}: LinkWithArrowProps) => {
  const isExternal = href.startsWith("http");

  return (
    <Link
      className={cx(
        isExternal
          ? "pr-[0.35em] relative"
          : "inline-flex items-center gap-[2px]",
        className
      )}
      href={href}
    >
      {children}
      {isExternal ? (
        <ChevronRightIcon
          className={cx(
            "absolute right-[-0.2em] top-[0.15em] size-[0.7em]",
            "transform -rotate-45",
            "!no-underline",
            iconClassName
          )}
        />
      ) : (
        <ArrowRightIcon className="translate-y-[0.05em] transform" />
      )}
    </Link>
  );
};
