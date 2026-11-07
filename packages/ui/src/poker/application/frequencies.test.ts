import { describe, expect, it } from "vitest";

import { describeSegments, normalise, toSegments } from "./frequencies";

describe("toSegments", () => {
  it("treats a missing hand as a pure fold", () => {
    expect(toSegments()).toEqual([{ action: "fold", value: 1 }]);
  });

  it("normalises percentages and orders by aggression", () => {
    const segments = toSegments({ fold: 27, call: 31, raise: 42 });
    expect(segments.map((segment) => segment.action)).toEqual(["raise", "call", "fold"]);
    expect(segments.map((segment) => segment.value)).toEqual([0.42, 0.31, 0.27]);
  });
});

describe("normalise", () => {
  it("drops empty segments and keeps labels", () => {
    const result = normalise([
      { action: "bet", value: 1, label: "Bet 33%" },
      { action: "check", value: 0 },
      { action: "bet", value: 3, label: "Bet 75%" },
    ]);
    expect(result).toEqual([
      { action: "bet", value: 0.25, label: "Bet 33%" },
      { action: "bet", value: 0.75, label: "Bet 75%" },
    ]);
  });
});

describe("describeSegments", () => {
  it("reads like the numeric legend", () => {
    expect(describeSegments(toSegments({ raise: 0.4, call: 0.6 }))).toBe("Raise 40%, Call 60%");
  });
});
