import { MARK_MASK_IMAGE } from "../../brand/mark-mask";
import { cx } from "../../lib/cx";
import { describeCard, displayRank } from "../application/cards";
import type { Rank, Suit } from "../types/cards";
import { SuitIcon } from "./suit-icon";

type Size = "sm" | "md" | "lg" | "xl";
type Deck = "four" | "two";

type CardSource =
  | { readonly rank: Rank; readonly suit: Suit; readonly faceDown?: false }
  | { readonly faceDown: true; readonly rank?: never; readonly suit?: never };

type PlayingCardProps = CardSource & {
  readonly size?: Size;
  readonly deck?: Deck;
  readonly selected?: boolean;
  readonly dimmed?: boolean;
  readonly className?: string;
};

type SizeStyle = {
  readonly frame: string;
  readonly padding: string;
  readonly rank: string;
  readonly pip: string;
  readonly ghost: string | null;
};

const SIZE: Record<Size, SizeStyle> = {
  sm: {
    frame: "h-10 w-7 rounded-xs",
    padding: "px-1 py-0.5",
    rank: "text-card-sm",
    pip: "size-2",
    ghost: null,
  },
  md: {
    frame: "h-15.5 w-11 rounded-sm",
    padding: "px-1 py-1",
    rank: "text-card-md",
    pip: "size-3",
    ghost: "size-8 -right-1 -bottom-1",
  },
  lg: {
    frame: "h-22.5 w-16 rounded-md",
    padding: "px-2 py-1.5",
    rank: "text-card-lg",
    pip: "size-4.5",
    ghost: "size-11 -right-1.5 -bottom-1.5",
  },
  xl: {
    frame: "h-31 w-22 rounded-md",
    padding: "px-2.5 py-2",
    rank: "text-card-xl",
    pip: "size-6",
    ghost: "size-16 -right-2 -bottom-2",
  },
};

const FRAME =
  "relative inline-flex flex-none flex-col overflow-hidden border shadow-card transition";

const SUIT_COLOR: Record<Suit, string> = {
  s: "text-suit-spade",
  h: "text-suit-heart",
  d: "text-suit-diamond",
  c: "text-suit-club",
};

const TWO_COLOUR_SUIT: Record<Suit, Suit> = { s: "s", c: "s", h: "h", d: "h" };

const WEAVE =
  "repeating-linear-gradient(45deg, rgb(255 255 255 / 0.07) 0 1px, transparent 1px 5px), repeating-linear-gradient(-45deg, rgb(255 255 255 / 0.07) 0 1px, transparent 1px 5px)";

type FaceProps = {
  readonly frame: string;
  readonly size: Size;
  readonly deck: Deck | undefined;
  readonly rank: Rank;
  readonly suit: Suit;
};

function CardFace({ frame, size, deck, rank, suit }: FaceProps) {
  const style = SIZE[size];
  const colour = SUIT_COLOR[deck === "two" ? TWO_COLOUR_SUIT[suit] : suit];
  return (
    <span
      role="img"
      aria-label={describeCard(rank, suit)}
      className={cx(frame, style.padding, "items-start border-card-edge bg-card-face", colour)}
    >
      <span aria-hidden className={cx("relative", style.rank)}>
        {displayRank(rank)}
      </span>
      <SuitIcon suit={suit} className={cx("relative mt-0.5", style.pip)} />
      {style.ghost ? (
        <SuitIcon suit={suit} className={cx("absolute opacity-10", style.ghost)} />
      ) : null}
    </span>
  );
}

function CardBack({ frame }: { readonly frame: string }) {
  return (
    <span
      role="img"
      aria-label="Face-down card"
      className={cx(frame, "items-center justify-center border-brand-deep bg-brand-deep")}
    >
      <span
        className="absolute inset-1 rounded-xs border border-white/20"
        style={{ backgroundImage: WEAVE }}
      />
      <span
        style={{ maskImage: MARK_MASK_IMAGE }}
        className="relative block aspect-380/268 w-3/5 bg-card-face mask-contain mask-center mask-no-repeat"
      />
    </span>
  );
}

export function PlayingCard({
  size = "md",
  deck,
  selected,
  dimmed,
  className,
  ...source
}: PlayingCardProps) {
  const lifted = selected && "-translate-y-0.5 shadow-card-lifted";
  const frame = cx(FRAME, SIZE[size].frame, lifted, dimmed && "opacity-40", className);
  if (source.faceDown) {
    return <CardBack frame={frame} />;
  }
  return <CardFace frame={frame} size={size} deck={deck} rank={source.rank} suit={source.suit} />;
}
