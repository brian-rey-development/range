import { Heading } from "@range/ui";

import { STRATEGY } from "../../core/content/copy";
import { Container } from "../../shared/container";
import { RangeExplorer } from "./range-explorer";

export function StrategySection() {
  return (
    <section id="strategy" className="scroll-mt-16 border-b border-line py-12 md:py-16">
      <Container className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="flex flex-col gap-3">
          <Heading as="h2">{STRATEGY.title}</Heading>
          <p className="text-body text-ink-2">{STRATEGY.intro}</p>
          <p className="text-caption text-ink-3">{STRATEGY.note}</p>
        </div>
        <RangeExplorer />
      </Container>
    </section>
  );
}
