import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { EXAMPLE_SPOT } from "../../core/content/example-spot";
import { PlaySection } from "./play-section";

describe("PlaySection", () => {
  it("keeps the verdict hidden until the visitor chooses", () => {
    render(<PlaySection />);
    expect(screen.queryByText("Mistake")).toBeNull();
    expect(screen.queryByText("Best")).toBeNull();
  });

  it("grades a fold as a mistake and shows where the numbers come from", async () => {
    render(<PlaySection />);
    await userEvent.click(screen.getByRole("button", { name: /fold/i }));
    expect(screen.getByText("Mistake")).toBeInTheDocument();
    expect(screen.getByText(EXAMPLE_SPOT.outcomes.fold?.message ?? "")).toBeInTheDocument();
    expect(screen.getByText(/4 ÷ \(6 \+ 4 \+ 4\)/)).toBeInTheDocument();
  });

  it("answers the hotkey, so a visitor can play from the keyboard", async () => {
    render(<PlaySection />);
    await userEvent.keyboard("c");
    expect(screen.getByText("Best")).toBeInTheDocument();
  });
});
