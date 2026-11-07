import { useState, type FocusEvent, type KeyboardEvent } from "react";

import { moveInGrid } from "../application/grid-navigation";
import { HANDS, ORIGIN_HAND } from "../application/hands";
import type { Hand } from "../types/hands";

function focusHand(container: HTMLElement, hand: Hand) {
  Array.from(container.querySelectorAll<HTMLElement>("[data-hand]"))
    .find((cell) => cell.dataset["hand"] === hand)
    ?.focus();
}

export function useRangeGridNavigation(selected: Hand | null | undefined) {
  const [active, setActive] = useState<Hand>(selected ?? ORIGIN_HAND);

  const onFocus = (event: FocusEvent<HTMLElement>) => {
    const hand = event.target.dataset["hand"];
    if (hand) {
      setActive(hand);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const index = moveInGrid(event.key, HANDS.indexOf(active));
    const next = index === undefined ? undefined : HANDS[index];
    if (next === undefined) {
      return;
    }
    event.preventDefault();
    setActive(next);
    focusHand(event.currentTarget, next);
  };

  return { active, onFocus, onKeyDown };
}
