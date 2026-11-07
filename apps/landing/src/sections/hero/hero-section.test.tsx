import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HERO } from "../../core/content/copy";
import { HeroSection } from "./hero-section";

describe("HeroSection", () => {
  it("states the problem and the answer in one heading", () => {
    render(<HeroSection />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(HERO.problem);
    expect(heading).toHaveTextContent(HERO.answer);
  });

  it("offers one action that jumps to the playable hand", () => {
    render(<HeroSection />);
    expect(screen.getByRole("link", { name: HERO.action })).toHaveAttribute("href", "#play");
  });

  it("shows its illustration as decoration, not as content", () => {
    const { container } = render(<HeroSection />);
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
    expect(screen.queryByRole("img")).toBeNull();
  });
});
