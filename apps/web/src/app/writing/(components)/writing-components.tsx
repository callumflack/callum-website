import { Text, Link } from "@repo/ui/atoms";
import config from "@repo/ui/config";

export const writingHeading = "If you have the words, you’ll find the way.";

export const WritingSubheading = () => (
  <Text dim>
    Writing about creativity, design and complexity through the lens of
    attention, interfaces and systems composition.{" "}
    <Link className="link" href={config.SUBSTACK_URL}>
      Signup for new posts
    </Link>
    .
  </Text>
);
