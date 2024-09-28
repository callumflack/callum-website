import { Text } from "@repo/ui/atoms";
import config from "@repo/ui/config";

export const writingHeading = "If you have the words, you’ll find the way.";

export const WritingSubheading = () => (
  <Text dim>
    Writing about creativity, design and complexity through the lens of
    attention, interfaces and systems composition. Signup for new posts{" "}
    <a className="link" href={config.SUBSTACK_URL}>
      here
    </a>
    .
  </Text>
);
