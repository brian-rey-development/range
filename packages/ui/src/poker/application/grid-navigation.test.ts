import { describe, expect, it } from "vitest";

import { moveInGrid } from "./grid-navigation";
import { GRID_SIZE } from "./hands";

const LAST = GRID_SIZE * GRID_SIZE - 1;

describe("moveInGrid", () => {
  it("moves one cell with the arrow keys", () => {
    expect(moveInGrid("ArrowRight", 0)).toBe(1);
    expect(moveInGrid("ArrowDown", 0)).toBe(GRID_SIZE);
    expect(moveInGrid("ArrowLeft", 1)).toBe(0);
    expect(moveInGrid("ArrowUp", GRID_SIZE)).toBe(0);
  });

  it("stops at the edges instead of wrapping", () => {
    expect(moveInGrid("ArrowLeft", 0)).toBe(0);
    expect(moveInGrid("ArrowUp", 3)).toBe(3);
    expect(moveInGrid("ArrowRight", GRID_SIZE - 1)).toBe(GRID_SIZE - 1);
    expect(moveInGrid("ArrowDown", LAST)).toBe(LAST);
  });

  it("jumps to the start and end of the row", () => {
    expect(moveInGrid("Home", GRID_SIZE + 5)).toBe(GRID_SIZE);
    expect(moveInGrid("End", GRID_SIZE + 5)).toBe(GRID_SIZE * 2 - 1);
  });

  it("ignores other keys", () => {
    expect(moveInGrid("Enter", 0)).toBeUndefined();
  });
});
