import { formatPercent } from "../../lib/format";
import { slotOf } from "../application/frequencies";
import type { FrequencySegment, Slot } from "../types/actions";

const LABEL_SPAN = 0.7;

function startOffsets(segments: readonly FrequencySegment[]): number[] {
  const starts: number[] = [];
  let at = 0;
  for (const segment of segments) {
    starts.push(at);
    at += segment.value;
  }
  return starts;
}

export function stripeGradient(segments: readonly FrequencySegment[]): string {
  const starts = startOffsets(segments);
  const stops = segments.map((segment, index) => {
    const from = starts[index] ?? 0;
    const colour = `var(--color-act-${slotOf(segment.action)})`;
    return `${colour} ${formatPercent(from)} ${formatPercent(from + segment.value)}`;
  });
  return `linear-gradient(90deg, ${stops.join(", ")})`;
}

type Lead = { readonly slot: Slot; readonly overlap: number };

export function leadSlot(segments: readonly FrequencySegment[]): Slot {
  const starts = startOffsets(segments);
  const lead = segments.reduce<Lead>(
    (best, segment, index) => {
      const from = starts[index] ?? 0;
      const overlap = Math.max(0, Math.min(from + segment.value, LABEL_SPAN) - from);
      return overlap > best.overlap ? { slot: slotOf(segment.action), overlap } : best;
    },
    { slot: "fold", overlap: -1 },
  );
  return lead.slot;
}
