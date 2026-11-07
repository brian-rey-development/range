import { cx } from "../../lib/cx";
import { HANDS } from "../application/hands";
import { toSegments } from "../application/frequencies";
import { useRangeGridNavigation } from "../hooks/use-range-grid-navigation";
import type { Frequencies } from "../types/actions";
import type { Hand } from "../types/hands";
import { RangeCell } from "./range-cell";

type RangeData = Readonly<Record<Hand, Frequencies>> | ((hand: Hand) => Frequencies | undefined);

type RangeGridProps = {
  readonly data: RangeData;
  readonly selected?: Hand | null;
  readonly onSelect?: (hand: Hand) => void;
  readonly onHover?: (hand: Hand | null) => void;
  readonly compact?: boolean;
  readonly label?: string;
  readonly className?: string;
};

function lookup(data: RangeData, hand: Hand): Frequencies | undefined {
  return typeof data === "function" ? data(hand) : data[hand];
}

export function RangeGrid({
  data,
  selected,
  onSelect,
  onHover,
  compact = false,
  label = "Range grid",
  className,
}: RangeGridProps) {
  const { active, onFocus, onKeyDown } = useRangeGridNavigation(selected);
  const interactive = Boolean(onSelect || onHover);
  const layout = cx(
    "grid w-full grid-cols-13 font-mono select-none",
    compact ? "gap-px" : "gap-0.5",
    className,
  );

  return (
    <div
      role="group"
      aria-label={label}
      className={layout}
      onKeyDown={interactive ? onKeyDown : undefined}
      onFocus={interactive ? onFocus : undefined}
      onMouseLeave={onHover ? () => onHover(null) : undefined}
    >
      {HANDS.map((hand) => (
        <RangeCell
          key={hand}
          hand={hand}
          segments={toSegments(lookup(data, hand))}
          selected={selected === hand}
          tabbable={active === hand}
          compact={compact}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
}
