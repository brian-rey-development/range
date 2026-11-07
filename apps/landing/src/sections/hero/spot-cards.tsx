import { PlayingCard, type Rank, type Suit } from "@range/ui";

type Card = { readonly rank: Rank; readonly suit: Suit };
type CardSize = "md" | "lg" | "xl";

type SpotCardsProps = {
  readonly hole: readonly Card[];
  readonly board: readonly Card[];
  readonly holeSize: CardSize;
  readonly boardSize: CardSize;
};

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

export function SpotCards({ hole, board, holeSize, boardSize }: SpotCardsProps) {
  return (
    <div className="flex flex-col items-start gap-6">
      <Row cards={board} size={boardSize} />
      <Row cards={hole} size={holeSize} />
    </div>
  );
}
