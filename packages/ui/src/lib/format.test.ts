import { describe, expect, it } from "vitest";

import { formatDuration, formatNumber, formatPercent, formatSigned, formatTokens } from "./format";

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

describe("formatNumber", () => {
  it("drops a zero decimal and keeps a real one", () => {
    expect(formatNumber(9)).toBe("9");
    expect(formatNumber(9.5)).toBe("9.5");
  });

  it("honours an explicit number of digits", () => {
    expect(formatNumber(9, 2)).toBe("9.00");
  });
});

describe("formatTokens", () => {
  it("abbreviates thousands", () => {
    expect(formatTokens(842)).toBe("842");
    expect(formatTokens(1250)).toBe("1.3k");
    expect(formatTokens(128_000)).toBe("128k");
  });
});

describe("formatDuration", () => {
  it("switches from milliseconds to seconds", () => {
    expect(formatDuration(420)).toBe("420 ms");
    expect(formatDuration(1500)).toBe("1.5 s");
    expect(formatDuration(12_000)).toBe("12 s");
  });
});
