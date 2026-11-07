import { describe, expect, it } from "vitest";

import { EXAMPLE_SPOT } from "./example-spot";

const POT = 6;
const BET = 4;
const PRICE = POT + BET + BET;
const UNSEEN = 47;
const HEARTS_LEFT = 9;
const PAIRS = (UNSEEN * (UNSEEN - 1)) / 2;
const MISSING_PAIRS = ((UNSEEN - HEARTS_LEFT) * (UNSEEN - HEARTS_LEFT - 1)) / 2;
const HITTING_PAIRS = PAIRS - MISSING_PAIRS;
const EQUITY = HITTING_PAIRS / PAIRS;

describe("example spot", () => {
  it("states the pot odds the call needs", () => {
    expect(((BET / PRICE) * 100).toFixed(1)).toBe(EXAMPLE_SPOT.figures.neededEquity);
  });

  it("counts the turn and river pairs that complete the flush", () => {
    expect(HITTING_PAIRS).toBe(378);
    expect(PAIRS).toBe(1081);
    expect((EQUITY * 100).toFixed(1)).toBe(EXAMPLE_SPOT.figures.drawCompletes);
  });

  it("values the call at the stated amount, which a fold gives up", () => {
    const value = EQUITY * PRICE - BET;
    expect(value.toFixed(2)).toBe(EXAMPLE_SPOT.figures.callValue);
    expect(EXAMPLE_SPOT.outcomes.fold?.evLoss).toBeCloseTo(value, 1);
  });

  it("has an outcome for every action on offer", () => {
    for (const option of EXAMPLE_SPOT.actions) {
      expect(EXAMPLE_SPOT.outcomes[option.action]).toBeDefined();
    }
  });
});
