import { cx } from "../../lib/cx";
import { describeSegments } from "../application/frequencies";
import type { FrequencySegment } from "../types/actions";
import type { Hand } from "../types/hands";
import { LABEL_ON_FILL } from "./action-styles";
import { leadSlot, stripeGradient } from "./cell-appearance";

const CELL = "relative block aspect-square min-w-0 rounded-hair text-left";
const INTERACTIVE =
  "focus-ring cursor-pointer hover:z-10 hover:ring-2 hover:ring-ink focus-visible:z-30 aria-pressed:z-20 aria-pressed:ring-2 aria-pressed:ring-offset-2 aria-pressed:ring-ink aria-pressed:ring-offset-surface";
const LABEL = "absolute top-px left-px rounded-hair px-0.5 py-px text-grid-label whitespace-nowrap";

type RangeCellProps = {
  readonly hand: Hand;
  readonly segments: readonly FrequencySegment[];
  readonly selected: boolean;
  readonly tabbable: boolean;
  readonly compact: boolean;
  readonly onSelect: ((hand: Hand) => void) | undefined;
  readonly onHover: ((hand: Hand | null) => void) | undefined;
};

export function RangeCell({
  hand,
  segments,
  selected,
  tabbable,
  compact,
  onSelect,
  onHover,
}: RangeCellProps) {
  const attributes = {
    "data-hand": hand,
    style: { background: stripeGradient(segments) },
    title: `${hand}  ${describeSegments(segments)}`,
  };
  const label = compact ? null : (
    <span className={cx(LABEL, LABEL_ON_FILL[leadSlot(segments)])}>{hand}</span>
  );

  if (!onSelect && !onHover) {
    return (
      <div className={CELL} {...attributes}>
        {label}
      </div>
    );
  }
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={hand}
      tabIndex={tabbable ? 0 : -1}
      className={cx(CELL, INTERACTIVE)}
      onClick={() => onSelect?.(hand)}
      onMouseEnter={() => onHover?.(hand)}
      onFocus={() => onHover?.(hand)}
      {...attributes}
    >
      {label}
    </button>
  );
}
