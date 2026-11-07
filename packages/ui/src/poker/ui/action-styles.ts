import type { Slot } from "../types/actions";

export const FILL: Record<Slot, string> = {
  allin: "bg-act-allin",
  raise: "bg-act-raise",
  call: "bg-act-call",
  fold: "bg-act-fold ring-1 ring-inset ring-line-strong",
};

export const LABEL_ON_FILL: Record<Slot, string> = {
  allin: "bg-act-allin text-on-allin",
  raise: "bg-act-raise text-on-raise",
  call: "bg-act-call text-on-call",
  fold: "bg-act-fold text-on-fold",
};
