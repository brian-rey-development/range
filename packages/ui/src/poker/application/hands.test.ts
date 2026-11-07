import { describe, expect, it } from "vitest";

import { GRID_SIZE, HANDS } from "./hands";

describe("HANDS", () => {
  it("lists the 169 starting hands in grid order", () => {
    expect(HANDS).toHaveLength(GRID_SIZE * GRID_SIZE);
    expect(new Set(HANDS).size).toBe(HANDS.length);
  });

  it("puts pairs on the diagonal, suited above it and offsuit below", () => {
    expect(HANDS[0]).toBe("AA");
    expect(HANDS[1]).toBe("AKs");
    expect(HANDS[GRID_SIZE]).toBe("AKo");
    expect(HANDS.at(-1)).toBe("22");
  });
});
