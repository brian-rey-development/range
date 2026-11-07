import { RANKS } from "../types/cards";
import type { Hand } from "../types/hands";

export const GRID_SIZE = RANKS.length;
export const ORIGIN_HAND: Hand = "AA";

export const HANDS: readonly Hand[] = RANKS.flatMap((rowRank, row) =>
  RANKS.map((colRank, col) => {
    if (row === col) {
      return `${rowRank}${colRank}`;
    }
    return row < col ? `${rowRank}${colRank}s` : `${colRank}${rowRank}o`;
  }),
);
