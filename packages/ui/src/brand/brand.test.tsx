import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RangeLogo, RangeMark, RangeWordmark } from "../index";
import { MARK_PATH, WORDMARK_PATH } from "./brand-paths";

const asset = (name: string) => readFileSync(resolve("brand", name), "utf8");

describe("brand components", () => {
  it("name themselves Range and carry no tagline", () => {
    const { container } = render(
      <>
        <RangeLogo />
        <RangeMark />
        <RangeWordmark />
      </>,
    );
    expect(screen.getAllByRole("img", { name: "Range" })).toHaveLength(3);
    expect(container.textContent).not.toMatch(/intelligence/i);
  });

  it("colour the mark with the brand token and the wordmark with ink", () => {
    const { container } = render(<RangeLogo />);
    expect(container.querySelector("path.fill-brand")).toHaveAttribute("d", MARK_PATH);
    expect(container.querySelector("path.fill-current")).toHaveAttribute("d", WORDMARK_PATH);
  });
});

describe("static brand files", () => {
  it("are generated from the same paths as the components", () => {
    expect(asset("range-mark.svg")).toContain(MARK_PATH);
    expect(asset("range-wordmark.svg")).toContain(WORDMARK_PATH);
    const lockup = asset("range-lockup.svg");
    expect(lockup).toContain(MARK_PATH);
    expect(lockup).toContain(WORDMARK_PATH);
  });
});
