"use client";

import { useRef } from "react";
import { useIntersection } from "react-use";
import { cx } from "cva";
import { Nav, FooterShape } from "@repo/ui/page";
import config from "@repo/ui/config";
import { TitleHeader } from "@repo/ui/elements";
import { Text } from "@repo/ui/atoms";

export const PageWrapper = ({
  activeNav,
  showRootActive,
  children,
  footerChildren,
}: {
  activeNav?: string;
  showRootActive?: boolean;
  children: React.ReactNode;
  footerChildren?: React.ReactNode;
}) => {
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  return (
    <>
      <Nav
        activeNav={activeNav}
        anchorName="Notes"
        navItems={[
          // { href: "/archive", label: "Archive" },
          // { href: "/random", label: "Random" },
          // { href: "/patterns", label: "Patterns" },
          { href: config.PUBLIC_URL, label: "Callum" },
        ]}
        ruleClassName={cx(
          intersection && intersection.intersectionRatio < 1
            ? ""
            : "!border-transparent"
        )}
        showRootActive={showRootActive}
      />

      {children}

      <FooterShape intersectionRef={intersectionRef}>
        <TitleHeader as="div" isContainedChild>
          <Text as="h2" intent="title">
            More soon…
          </Text>
          <Text dim>It&lsquo;s hard to believe you made it down this far.</Text>
        </TitleHeader>
        {footerChildren}
      </FooterShape>
    </>
  );
};
