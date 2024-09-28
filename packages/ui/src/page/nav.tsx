"use client";

import { cx } from "cva";
import { usePathname } from "next/navigation";
import { useWindowScroll } from "react-use";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { textVariants } from "../atoms/text";
import { Link } from "../atoms/next-link";
import { OutsetRule } from "../elements/outset-rule";

const linkStyle = [
  "h-tab flex items-center gap-0 relative hover:text-accent",
  "before:absolute before:left-[-2px] before:right-[-2px] before:bottom-[-1px] before:border-b",
];

interface NavProps {
  anchorName: string;
  navItems: NavLinkProps[];
  activeNav?: string;
  showRootActive?: boolean;
  ruleClassName?: string;
}

export const Nav = ({
  anchorName,
  navItems,
  activeNav,
  showRootActive = false,
  ruleClassName,
}: NavProps) => {
  const pathname = usePathname();
  const { y } = useWindowScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(y > 150);
  }, [y]);

  return (
    <div
      // bg-opacity-70 backdrop-blur-md
      className="Nav sticky top-0 z-50 bg-canvas"
      id="top"
    >
      <nav
        className={cx(
          "container flex justify-between",
          // create the height of the nav
          "pt-[calc(theme(spacing.nav)-theme(spacing.tab))]"
        )}
      >
        <Link
          className={cx(
            textVariants({ intent: "fineHeading" }),
            linkStyle,
            "pl-0 before:left-0",
            pathname === "/" || showRootActive
              ? "before:border-fill hover:before:border-accent"
              : "before:border-transparent"
          )}
          href="/"
        >
          {anchorName}
        </Link>
        <div className="flex items-center gap-4">
          {navItems.map(({ href, label }) => (
            <NavLink
              href={href}
              isActive={pathname === href || activeNav === href}
              key={href}
              label={label}
            />
          ))}
        </div>
      </nav>
      <OutsetRule
        className={cx(
          isScrolled ? "border-border" : "border-transparent",
          ruleClassName
        )}
      />
    </div>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink = ({
  href,
  isActive,
  label,
}: NavLinkProps & { isActive: boolean }) => (
  <Link
    className={cx(
      textVariants({ intent: "fineHeading" }),
      linkStyle,
      isActive
        ? "before:border-fill hover:before:border-accent"
        : "before:border-transparent"
    )}
    href={href}
  >
    {label}
    {href.includes("https://") && (
      <ArrowTopRightIcon className="size-[1.25em] mt-[-0.25em]" />
    )}
  </Link>
);
