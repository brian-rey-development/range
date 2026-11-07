import { FrequencyBar, Heading, RangeGrid, type Hand } from "@range/ui";

import { useState } from "react";

import { STRATEGY } from "../../core/content/copy";
import { FOLD_ONLY, SAMPLE_RANGE } from "../../core/content/sample-range";

const INITIAL_HAND: Hand = "AKs";

export function RangeExplorer() {
  const [hand, setHand] = useState<Hand>(INITIAL_HAND);

  return (
    <div className="flex flex-col gap-6">
      <RangeGrid data={SAMPLE_RANGE} selected={hand} onSelect={setHand} label="Sample range" />
      <div className="flex flex-col gap-3">
        <Heading as="h3">{hand}</Heading>
        <FrequencyBar frequencies={SAMPLE_RANGE[hand] ?? FOLD_ONLY} />
      </div>
      <p className="text-caption text-ink-3">{STRATEGY.hint}</p>
    </div>
  );
}
