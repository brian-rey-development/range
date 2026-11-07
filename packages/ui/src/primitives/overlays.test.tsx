import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar, Term, Tooltip } from "../index";

describe("Tooltip", () => {
  it("links its bubble to the trigger for assistive tech", () => {
    render(
      <Tooltip content="Cards you can see">
        <button type="button">Hand</button>
      </Tooltip>,
    );
    const bubble = screen.getByRole("tooltip");
    expect(bubble).toHaveTextContent("Cards you can see");
    expect(screen.getByRole("button", { name: "Hand" })).toHaveAttribute(
      "aria-describedby",
      bubble.id,
    );
  });

  it("is visible when forced open", () => {
    render(
      <Tooltip content="Open" open>
        <button type="button">Hand</button>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip")).toHaveClass("visible");
  });
});

describe("Term", () => {
  it("is focusable and carries its definition", () => {
    render(<Term definition="Chance to win at showdown">equity</Term>);
    expect(screen.getByText("equity")).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tooltip")).toHaveTextContent("Chance to win at showdown");
  });
});

describe("Avatar", () => {
  it("shows initials for a person and names itself", () => {
    render(<Avatar name="Maria Lopez" />);
    const avatar = screen.getByRole("img", { name: "Maria Lopez" });
    expect(avatar).toHaveTextContent("ML");
  });

  it("calls the coach by name without needing one", () => {
    render(<Avatar kind="coach" />);
    expect(screen.getByRole("img", { name: "Coach" })).toBeInTheDocument();
  });

  it("marks a thinking bot", () => {
    render(<Avatar kind="bot" name="Nit" status="thinking" />);
    expect(screen.getByRole("img", { name: "Nit" }).className).toContain("animate-ring-pulse");
  });
});
