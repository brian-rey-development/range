import { cx } from "../../lib/cx";
import { formatPercent } from "../../lib/format";
import {
  describeSegments,
  labelOf,
  normalise,
  slotOf,
  toSegments,
} from "../application/frequencies";
import type { Frequencies, FrequencySegment } from "../types/actions";
import { ActionSwatch } from "./action-swatch";
import { FILL } from "./action-styles";

type Source =
  | { readonly frequencies: Frequencies; readonly segments?: never }
  | { readonly segments: readonly FrequencySegment[]; readonly frequencies?: never };

type FrequencyBarProps = Source & {
  readonly legend?: boolean;
  readonly size?: "md" | "lg";
  readonly className?: string;
};

type SegmentsProps = { readonly segments: readonly FrequencySegment[] };

const segmentKey = ({ action, label }: FrequencySegment) => `${action}:${label ?? ""}`;

function Bar({ segments, size }: SegmentsProps & { readonly size: "md" | "lg" }) {
  const track = cx("flex gap-0.5 overflow-hidden rounded-full", size === "lg" ? "h-3" : "h-2");
  return (
    <div role="img" aria-label={describeSegments(segments)} className={track}>
      {segments.map((segment) => (
        <span
          key={segmentKey(segment)}
          style={{ flexGrow: segment.value }}
          className={cx("min-w-0.5 basis-0", FILL[slotOf(segment.action)])}
        />
      ))}
    </div>
  );
}

function Legend({ segments }: SegmentsProps) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {segments.map((segment) => (
        <span key={segmentKey(segment)} className="inline-flex items-center gap-2 text-small">
          <ActionSwatch action={segment.action} />
          <span className="text-ink-2">{labelOf(segment)}</span>
          <span className="figures text-num-sm text-ink">{formatPercent(segment.value)}</span>
        </span>
      ))}
    </div>
  );
}

export function FrequencyBar({
  legend = true,
  size = "md",
  className,
  ...source
}: FrequencyBarProps) {
  const segments = source.segments ? normalise(source.segments) : toSegments(source.frequencies);
  return (
    <div className={cx("flex min-w-0 flex-col gap-3", className)}>
      <Bar segments={segments} size={size} />
      {legend ? <Legend segments={segments} /> : null}
    </div>
  );
}
