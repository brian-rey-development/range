import { describe, expect, it } from "vitest";

import { toSegments } from "../application/frequencies";
import { leadSlot, stripeGradient } from "./cell-appearance";

describe("stripeGradient", () => {
  it("paints hard stops with the action colour tokens", () => {
    const gradient = stripeGradient(toSegments({ raise: 0.5, fold: 0.5 }));
    expect(gradient).toBe(
      "linear-gradient(90deg, var(--color-act-raise) 0% 50%, var(--color-act-fold) 50% 100%)",
    );
  });
});

describe("leadSlot", () => {
  it("picks the stripe that sits under most of the label", () => {
    expect(leadSlot(toSegments({ raise: 0.2, call: 0.8 }))).toBe("call");
    expect(leadSlot(toSegments({ raise: 0.9, fold: 0.1 }))).toBe("raise");
  });
});
