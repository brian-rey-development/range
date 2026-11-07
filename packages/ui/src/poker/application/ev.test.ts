import { describe, expect, it } from "vitest";

import { formatLoss } from "./ev";

describe("formatLoss", () => {
  it("renders an EV loss with a true minus and two digits", () => {
    expect(formatLoss(0.42)).toBe("−0.42");
    expect(formatLoss(0)).toBe("0.00");
  });
});
