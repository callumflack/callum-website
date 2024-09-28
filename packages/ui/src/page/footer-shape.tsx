import { cx } from "cva";
import { OutsetRule } from "../elements/outset-rule";

interface FooterShapeProps {
  children: React.ReactNode;
  // isHome?: boolean;
  intersectionRef?: React.RefObject<HTMLDivElement>;
}

export const FooterShape = ({
  children,
  intersectionRef,
}: FooterShapeProps) => (
  <>
    <OutsetRule wrapperClassName="relative z-20" />
    <footer
      className={cx(
        "container relative flex flex-col",
        "relative min-h-[calc(100vh-var(--height-nav)-1px)] justify-between pt-submajor"
        // isHome && "mt-auto pt-w12",
      )}
    >
      {children}
      {intersectionRef ? (
        <div className="absolute bottom-0 h-px" ref={intersectionRef} />
      ) : null}
    </footer>
  </>
);
