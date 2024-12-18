import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Text, Link } from "@repo/ui/atoms";

export const Available = () => (
  <div className="pt-2">
    <Link
      className="inline-flex rounded-button border border-accent2 bg-canvas px-3 pr-4 py-2 text-accent2"
      href="/what-i-want"
    >
      <div className="flex items-center gap-2">
        {/* animate-pulse2 h-[0.35em] w-[0.35em] */}
        <div className="h-[0.8em] w-[0.8em] translate-y-[-0.05em] transform animate-pulse rounded-full bg-accent2" />
        <Text
          className="translate-y-[-0.075em] transform"
          intent="meta"
          weight="medium"
        >
          Currently available for projects, teams, missions
        </Text>
        <ArrowRightIcon className="h-4 w-4" />
      </div>
    </Link>
  </div>
);
