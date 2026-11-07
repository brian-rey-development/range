import { formatPercent } from "../../lib/format";
import type { Action, Frequencies, FrequencySegment, Slot } from "../types/actions";

const ACTION_ORDER: readonly Action[] = ["allin", "raise", "bet", "call", "check", "fold"];

export const ACTION_LABEL: Record<Action, string> = {
  allin: "All-in",
  raise: "Raise",
  bet: "Bet",
  call: "Call",
  check: "Check",
  fold: "Fold",
};

const SLOT_OF: Record<Action, Slot> = {
  allin: "allin",
  raise: "raise",
  bet: "raise",
  call: "call",
  check: "call",
  fold: "fold",
};

export function slotOf(action: Action): Slot {
  return SLOT_OF[action];
}

export function normalise(segments: readonly FrequencySegment[]): FrequencySegment[] {
  const positive = segments.filter((segment) => segment.value > 0);
  const total = positive.reduce((sum, segment) => sum + segment.value, 0);
  if (total === 0) {
    return [{ action: "fold", value: 1 }];
  }
  return positive.map((segment) => Object.assign({}, segment, { value: segment.value / total }));
}

export function toSegments(frequencies: Frequencies = {}): FrequencySegment[] {
  return normalise(ACTION_ORDER.map((action) => ({ action, value: frequencies[action] ?? 0 })));
}

export function labelOf(segment: FrequencySegment): string {
  return segment.label ?? ACTION_LABEL[segment.action];
}

export function describeSegments(segments: readonly FrequencySegment[]): string {
  return segments
    .map((segment) => `${labelOf(segment)} ${formatPercent(segment.value)}`)
    .join(", ");
}
