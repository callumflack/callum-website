import { Text, Link } from "@repo/ui/atoms";
import { Suspense } from "react";
import { ContactIcons } from "./contact-icons";
import { SiteTime } from "./site-time";

// Callum Flack is a designer who codes.
// Callum Flack. Design. Code. Writing.
const heading = "Callum Flack designs and builds beautiful hypertext products.";

export const Signoff = () => {
  return (
    <>
      {/* space-y-[calc(6/16*1em)] */}
      <Link className="block space-y-2 pb-2.5 lg:w-5/6" href="/">
        <Text as="h1" balance intent="title">
          {heading}
        </Text>
        <Text dim>
          <Suspense fallback={<>Loading time…</>}>
            <SiteTime />
          </Suspense>
        </Text>
      </Link>

      <ContactIcons className="hidden md:flex" showLabel />
      <ContactIcons className="md:hidden" />
    </>
  );
};
