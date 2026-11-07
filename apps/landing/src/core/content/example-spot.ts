import type { ActionOption, GradeLevel, Rank, Suit } from "@range/ui";

export type CardSpec = { readonly rank: Rank; readonly suit: Suit };

export const EXAMPLE_SPOT = {
  hole: [
    { rank: "A", suit: "h" },
    { rank: "7", suit: "h" },
  ],
  board: [
    { rank: "K", suit: "h" },
    { rank: "9", suit: "h" },
    { rank: "2", suit: "c" },
  ],
  situation: "Pot 6 bb. Villain bets 4 bb.",
  actions: [
    { action: "fold", hotkey: "f" },
    { action: "call", amount: "4 bb", hotkey: "c" },
    { action: "raise", amount: "12 bb", hotkey: "r" },
  ],
  chosen: "fold",
  grade: "mistake",
  evLoss: 0.9,
  figures: {
    neededEquity: "28.6",
    drawCompletes: "35.0",
    callValue: 0.9,
  },
} as const satisfies {
  readonly hole: readonly CardSpec[];
  readonly board: readonly CardSpec[];
  readonly situation: string;
  readonly actions: readonly ActionOption[];
  readonly chosen: string;
  readonly grade: GradeLevel;
  readonly evLoss: number;
  readonly figures: Record<string, string | number>;
};
