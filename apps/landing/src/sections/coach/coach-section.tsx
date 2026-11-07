import { Heading, Stat } from "@range/ui";

import { COACH } from "../../core/content/copy";
import { EXAMPLE_SPOT } from "../../core/content/example-spot";
import { Container } from "../../shared/container";

const { figures } = EXAMPLE_SPOT;

function Findings() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-body-medium text-ink">{COACH.feedback}</p>
      <div className="grid grid-cols-3 gap-6 border-t border-line pt-6">
        <Stat label="Needed to call" value={figures.neededEquity} unit="%" size="sm" />
        <Stat label="Flush completes" value={figures.drawCompletes} unit="%" size="sm" />
        <Stat
          label="Value of a call"
          value={figures.callValue}
          digits={2}
          signed
          unit="bb"
          size="sm"
        />
      </div>
    </div>
  );
}

export function CoachSection() {
  return (
    <section id="coach" className="scroll-mt-16 border-b border-line py-12 md:py-16">
      <Container className="grid gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <Heading as="h2">{COACH.title}</Heading>
          <p className="text-body text-ink-2">{COACH.intro}</p>
          <p className="text-caption text-ink-3">{COACH.method}</p>
        </div>
        <Findings />
      </Container>
    </section>
  );
}
