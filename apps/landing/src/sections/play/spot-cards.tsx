import { PlayingCard, type Rank, type Suit } from "@range/ui";
import type { ReactNode } from "react";

type Card = { readonly rank: Rank; readonly suit: Suit };
type CardSize = "md" | "lg" | "xl";

type RowProps = { readonly cards: readonly Card[]; readonly size: CardSize };

function Row({ cards, size }: RowProps) {
  return (
    <div className="flex gap-2">
      {cards.map((card) => (
        <PlayingCard
          key={`${card.rank}${card.suit}`}
          rank={card.rank}
          suit={card.suit}
          size={size}
        />
      ))}
    </div>
  );
}

function Group({ label, children }: { readonly label: string; readonly children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-note text-ink-2">{label}</p>
      {children}
    </div>
  );
}

type SpotCardsProps = {
  readonly board: readonly Card[];
  readonly boardLabel: string;
  readonly hole: readonly Card[];
  readonly holeLabel: string;
};

export function SpotCards({ board, boardLabel, hole, holeLabel }: SpotCardsProps) {
  return (
    <div className="flex flex-wrap items-start gap-x-8 gap-y-4">
      <Group label={boardLabel}>
        <Row cards={board} size="lg" />
      </Group>
      <Group label={holeLabel}>
        <Row cards={hole} size="xl" />
      </Group>
    </div>
  );
}
