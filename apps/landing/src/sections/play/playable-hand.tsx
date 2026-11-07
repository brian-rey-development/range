import { ActionBar, Grade, type Action } from "@range/ui";
import { useState } from "react";

import { PLAY } from "../../core/content/copy";
import { EXAMPLE_SPOT, type Outcome } from "../../core/content/example-spot";
import { ART } from "../../core/content/illustrations";
import { Illustration } from "../../shared/illustration";
import { SpotCards } from "./spot-cards";

function Derivation() {
  return (
    <details className="text-note text-ink-2">
      <summary className="focus-ring w-fit cursor-pointer rounded-sm font-medium text-ink">
        {PLAY.derivation}
      </summary>
      <dl className="mt-3 flex flex-col gap-3">
        {EXAMPLE_SPOT.derivation.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd className="figures text-ink">
              {row.working} = {row.result}
            </dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

function Verdict({ outcome }: { readonly outcome: Outcome }) {
  const loss = outcome.evLoss === undefined ? {} : { evLoss: outcome.evLoss };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <Illustration art={ART.coach} className="h-auto w-16 flex-none" />
        <div className="flex flex-col gap-2">
          <Grade grade={outcome.grade} {...loss} />
          <p className="text-copy text-ink">{outcome.message}</p>
        </div>
      </div>
      <Derivation />
    </div>
  );
}

function Reveal({ outcome }: { readonly outcome: Outcome | undefined }) {
  return (
    <div aria-live="polite">
      {outcome ? (
        <Verdict outcome={outcome} />
      ) : (
        <p className="text-note text-ink-2">{PLAY.prompt}</p>
      )}
    </div>
  );
}

function Scene() {
  return (
    <>
      <SpotCards
        board={EXAMPLE_SPOT.board}
        boardLabel={PLAY.street}
        hole={EXAMPLE_SPOT.hole}
        holeLabel={PLAY.hand}
      />
      <p className="figures text-num text-ink-2">{EXAMPLE_SPOT.situation}</p>
    </>
  );
}

export function PlayableHand() {
  const [chosen, setChosen] = useState<Action | null>(null);
  const outcome = chosen === null ? undefined : EXAMPLE_SPOT.outcomes[chosen];

  return (
    <div className="flex flex-col gap-5 rounded-lg bg-surface-raised p-6 shadow-pop">
      <Scene />
      <ActionBar
        actions={EXAMPLE_SPOT.actions}
        selected={chosen}
        onAction={(option) => setChosen(option.action)}
        hotkeys
        label="Your options"
      />
      <Reveal outcome={outcome} />
    </div>
  );
}
