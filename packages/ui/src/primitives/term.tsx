import type { ReactNode } from "react";

import { Tooltip } from "./tooltip";

type TermProps = {
  readonly definition: ReactNode;
  readonly children: ReactNode;
  readonly side?: "top" | "bottom";
  readonly open?: boolean;
};

const WORD =
  "focus-ring cursor-help rounded-hair underline decoration-ink-3 decoration-dotted decoration-[1.5px] underline-offset-3";

export function Term({ definition, children, side, open }: TermProps) {
  return (
    <Tooltip content={definition} side={side ?? "top"} open={open ?? false}>
      <span tabIndex={0} className={WORD}>
        {children}
      </span>
    </Tooltip>
  );
}
