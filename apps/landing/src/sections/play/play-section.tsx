import { PLAY } from "../../core/content/copy";
import { Section } from "../../shared/section";
import { SectionHeading } from "../../shared/section-heading";
import { PlayableHand } from "./playable-hand";

export function PlaySection() {
  return (
    <Section
      id="play"
      className="grid items-center gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16"
    >
      <SectionHeading title={PLAY.title} lead={PLAY.intro} />
      <PlayableHand />
    </Section>
  );
}
