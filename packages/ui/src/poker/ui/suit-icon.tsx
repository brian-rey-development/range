import type { ReactNode } from "react";

import type { Suit } from "../types/cards";

const SUIT_SHAPES: Record<Suit, ReactNode> = {
  s: (
    <path d="M12 2.6s-7.9 5.9-7.9 10.6c0 2.7 2 4.5 4.3 4.5 1.3 0 2.4-.5 3-1.3-.2 1.9-1 3.3-2.4 4.4h6c-1.4-1.1-2.2-2.5-2.4-4.4.6.8 1.7 1.3 3 1.3 2.3 0 4.3-1.8 4.3-4.5C19.9 8.5 12 2.6 12 2.6z" />
  ),
  h: (
    <path d="M12 20.6s-7.6-4.7-9.4-9.4C1.3 7.9 3.4 4.4 6.9 4.4c2.1 0 3.7 1.2 5.1 3.1 1.4-1.9 3-3.1 5.1-3.1 3.5 0 5.6 3.5 4.3 6.8-1.8 4.7-9.4 9.4-9.4 9.4z" />
  ),
  d: <path d="M12 2.6 19.2 12 12 21.4 4.8 12z" />,
  c: (
    <>
      <circle cx="12" cy="7.4" r="4.1" />
      <circle cx="7.1" cy="13.2" r="4.1" />
      <circle cx="16.9" cy="13.2" r="4.1" />
      <path d="M10.9 11h2.2l1.4 9.8H9.5z" />
    </>
  ),
};

type SuitIconProps = { readonly suit: Suit; readonly className?: string };

export function SuitIcon({ suit, className }: SuitIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
      className={className}
    >
      {SUIT_SHAPES[suit]}
    </svg>
  );
}
