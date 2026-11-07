import type { Action, ActionOption, GradeLevel, Rank, Suit } from "@range/ui";

type CardSpec = { readonly rank: Rank; readonly suit: Suit };

export type Outcome = {
  readonly grade: GradeLevel;
  readonly evLoss?: number;
  readonly message: string;
};

type Derivation = {
  readonly label: string;
  readonly working: string;
  readonly result: string;
};

const FIGURES = { neededEquity: "28.6", drawCompletes: "35.0", callValue: "0.90" } as const;

const REASON = `Villain is all in, so no more betting follows and your flush draw gets both cards. It completes ${FIGURES.drawCompletes}% of the time and the call needs ${FIGURES.neededEquity}%, so the price is right.`;

const HOLE: readonly CardSpec[] = [
  { rank: "A", suit: "h" },
  { rank: "7", suit: "h" },
];

const BOARD: readonly CardSpec[] = [
  { rank: "K", suit: "h" },
  { rank: "9", suit: "h" },
  { rank: "2", suit: "c" },
];

const ACTIONS: readonly ActionOption[] = [
  { id: "fold", action: "fold", hotkey: "f" },
  { id: "call", action: "call", amount: "4 bb", hotkey: "c" },
];

const OUTCOMES: Partial<Record<Action, Outcome>> = {
  fold: {
    grade: "mistake",
    evLoss: 0.9,
    message: `Folding loses ${FIGURES.callValue} bb. ${REASON}`,
  },
  call: {
    grade: "best",
    message: `Calling wins ${FIGURES.callValue} bb on average. ${REASON}`,
  },
};

const DERIVATION: readonly Derivation[] = [
  {
    label: "Needed to call",
    working: "4 ÷ (6 + 4 + 4)",
    result: `${FIGURES.neededEquity}%`,
  },
  {
    label: "Flush completes",
    working: "378 of 1081 turn and river pairs hold a heart",
    result: `${FIGURES.drawCompletes}%`,
  },
  {
    label: "Value of a call",
    working: `${FIGURES.drawCompletes}% × 14 − 4`,
    result: `+${FIGURES.callValue} bb`,
  },
];

export const EXAMPLE_SPOT = {
  hole: HOLE,
  board: BOARD,
  situation: "Pot 6 bb. Villain is all in for 4 bb.",
  actions: ACTIONS,
  outcomes: OUTCOMES,
  derivation: DERIVATION,
  figures: FIGURES,
} as const;
