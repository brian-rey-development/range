import type { Rank, Suit } from "../types/cards";

const RANK_NAME: Record<Rank, string> = {
  A: "Ace",
  K: "King",
  Q: "Queen",
  J: "Jack",
  T: "Ten",
  "9": "Nine",
  "8": "Eight",
  "7": "Seven",
  "6": "Six",
  "5": "Five",
  "4": "Four",
  "3": "Three",
  "2": "Two",
};

const SUIT_NAME: Record<Suit, string> = {
  s: "spades",
  h: "hearts",
  d: "diamonds",
  c: "clubs",
};

export function describeCard(rank: Rank, suit: Suit): string {
  return `${RANK_NAME[rank]} of ${SUIT_NAME[suit]}`;
}

export function displayRank(rank: Rank): string {
  return rank === "T" ? "10" : rank;
}
