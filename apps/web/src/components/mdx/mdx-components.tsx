import { useMDXComponent } from "next-contentlayer2/hooks";
import { components as uiMdxComponents } from "@repo/ui/mdx-components";
import { Prose } from "@repo/ui/elements";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "cva";
import { Available, ContactIcons } from "~/src/components/elements";

export const components = {
  ...uiMdxComponents,
  Contact: () => <ContactIcons className="!pl-0 pt-0.5" />,
  Available: () => <Available />,
  Callout: ({ children }: DivProps) => <Callout>{children}</Callout>,
};

interface MdxProps {
  code: string;
  children?: React.ReactNode;
}

export function Mdx({ code, children }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <Prose>
      <Component components={components} />

      {/* allow children to be passed in to make it easy to compose eg. ContactIcons or Available components */}
      {children}
    </Prose>
  );
}

type DivProps = ComponentPropsWithoutRef<"div">;

const Callout = ({ children }: DivProps) => (
  <div
    className={cx(
      "bg-accent3-background px-w4 py-w4 rounded-button space-y-1.5",
      "[&_code]:bg-black-a1 [&_ul]:text-[0.925em]"
    )}
  >
    {/* <CalloutIcon className="size-[1.25em]" /> */}
    {children}
  </div>
);
