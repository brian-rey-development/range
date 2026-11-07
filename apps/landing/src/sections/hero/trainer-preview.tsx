import { ActionBar, Grade, Heading } from "@range/ui";

import { TRAINER } from "../../core/content/copy";
import { EXAMPLE_SPOT } from "../../core/content/example-spot";
import { SpotCards } from "./spot-cards";

export function TrainerPreview() {
  return (
    <div className="flex flex-col gap-6 rounded-md border border-line p-6">
      <div className="flex items-baseline justify-between gap-4">
        <Heading as="h3">{TRAINER.title}</Heading>
        <span className="text-caption text-ink-3">{TRAINER.badge}</span>
      </div>
      <SpotCards hole={EXAMPLE_SPOT.hole} board={EXAMPLE_SPOT.board} holeSize="xl" boardSize="lg" />
      <p className="figures text-num text-ink-2">{EXAMPLE_SPOT.situation}</p>
      <div inert className="flex flex-col gap-4">
        <ActionBar
          actions={EXAMPLE_SPOT.actions}
          selected={EXAMPLE_SPOT.chosen}
          label="Your options"
        />
        <Grade grade={EXAMPLE_SPOT.grade} evLoss={EXAMPLE_SPOT.evLoss} />
      </div>
    </div>
  );
}
