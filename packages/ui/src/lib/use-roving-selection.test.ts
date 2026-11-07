import { describe, expect, it } from "vitest";

import { nextValue } from "./use-roving-selection";

const VALUES = ["a", "b", "c"];

describe("nextValue", () => {
  it("moves forward and wraps at the end", () => {
    expect(nextValue("ArrowRight", VALUES, "a")).toBe("b");
    expect(nextValue("ArrowDown", VALUES, "c")).toBe("a");
  });

  it("moves backward and wraps at the start", () => {
    expect(nextValue("ArrowLeft", VALUES, "b")).toBe("a");
    expect(nextValue("ArrowUp", VALUES, "a")).toBe("c");
  });

  it("jumps to the ends", () => {
    expect(nextValue("Home", VALUES, "b")).toBe("a");
    expect(nextValue("End", VALUES, "b")).toBe("c");
  });

  it("ignores other keys", () => {
    expect(nextValue("Enter", VALUES, "a")).toBeUndefined();
  });
});
