import { describe, expect, it } from "vitest";

import { formatPercent, formatSigned } from "./format";

describe("formatSigned", () => {
  it("prefixes gains with a plus and losses with the true minus", () => {
    expect(formatSigned(6.42, 2)).toBe("+6.42");
    expect(formatSigned(-0.4)).toBe("−0.4");
  });

  it("leaves zero unsigned", () => {
    expect(formatSigned(0)).toBe("0.0");
  });
});

describe("formatPercent", () => {
  it("rounds to a tenth of a percent", () => {
    expect(formatPercent(0.4)).toBe("40%");
    expect(formatPercent(1 / 3)).toBe("33.3%");
  });
});
