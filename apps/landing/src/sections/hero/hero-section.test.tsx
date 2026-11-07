import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SITE } from "../../core/config/site";
import { HERO } from "../../core/content/copy";
import { HeroSection } from "./hero-section";

describe("HeroSection", () => {
  it("leads with the title and a single primary action to GitHub", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(HERO.title);
    const action = screen.getByRole("link", { name: HERO.action });
    expect(action).toHaveAttribute("href", SITE.githubUrl);
    expect(action).toHaveClass("bg-accent");
  });

  it("shows the trainer preview as a non-interactive example", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { name: "Turn decision" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Your options" }).closest("[inert]")).not.toBeNull();
  });
});
