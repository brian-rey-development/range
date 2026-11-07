import { describe, expect, it } from "vitest";

import { initialsOf } from "./initials";

describe("initialsOf", () => {
  it("uses the first and last word", () => {
    expect(initialsOf("Tight Aggressive Bot")).toBe("TB");
    expect(initialsOf("nit")).toBe("N");
  });

  it("falls back to a question mark", () => {
    expect(initialsOf(undefined)).toBe("?");
    expect(initialsOf("   ")).toBe("?");
  });
});
