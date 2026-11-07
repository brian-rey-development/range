import { cloneElement, useId, type ReactElement, type ReactNode } from "react";

import { cx } from "../lib/cx";

type Side = "top" | "bottom";

type TooltipProps = {
  readonly content: ReactNode;
  readonly children: ReactElement<{ "aria-describedby"?: string }>;
  readonly side?: Side;
  readonly open?: boolean;
  readonly className?: string;
};

const BUBBLE =
  "pointer-events-none invisible absolute left-1/2 z-20 w-max max-w-70 -translate-x-1/2 rounded-xs bg-ink px-2.5 py-2 text-left text-small font-normal tracking-normal whitespace-normal text-surface opacity-0 shadow-pop transition-opacity";
const SHOWN =
  "group-hover/tip:visible group-hover/tip:opacity-100 group-focus-within/tip:visible group-focus-within/tip:opacity-100";
const FORCED = "visible opacity-100";
const SIDE: Record<Side, string> = {
  top: "bottom-[calc(100%+8px)]",
  bottom: "top-[calc(100%+8px)]",
};

export function Tooltip({ content, children, side = "top", open, className }: TooltipProps) {
  const id = useId();
  return (
    <span className={cx("group/tip relative inline-flex", className)}>
      {cloneElement(children, { "aria-describedby": id })}
      <span id={id} role="tooltip" className={cx(BUBBLE, SIDE[side], open ? FORCED : SHOWN)}>
        {content}
      </span>
    </span>
  );
}
