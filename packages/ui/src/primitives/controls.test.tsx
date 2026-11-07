import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button, Icon, IconButton, SegmentedControl, Slider, Switch, Tag } from "../index";
import { percentAlong } from "./slider";

describe("Icon", () => {
  it("is hidden from assistive tech unless it has a label", () => {
    const { container, rerender } = render(<Icon name="check" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");

    rerender(<Icon name="check" label="Correct" />);
    expect(screen.getByRole("img", { name: "Correct" })).toBeInTheDocument();
  });
});

describe("IconButton", () => {
  it("takes its accessible name and tooltip from the label", async () => {
    const onClick = vi.fn<() => void>();
    render(<IconButton icon="plus" label="Add note" onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Add note" });
    expect(button).toHaveAttribute("title", "Add note");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire when disabled", async () => {
    const onClick = vi.fn<() => void>();
    render(<IconButton icon="plus" label="Add note" disabled onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Add note" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("Tag", () => {
  it("renders its text with an optional icon and tone", () => {
    render(
      <Tag tone="heuristic" icon="heuristic">
        Heuristic
      </Tag>,
    );
    expect(screen.getByText("Heuristic")).toHaveClass("text-heuristic");
  });
});

describe("Switch", () => {
  it("toggles uncontrolled and reports the new state", async () => {
    const onChange = vi.fn<(checked: boolean) => void>();
    render(<Switch label="Show hints" onChange={onChange} />);
    const toggle = screen.getByRole("switch", { name: "Show hints" });
    expect(toggle).toHaveAttribute("aria-checked", "false");

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(onChange).toHaveBeenLastCalledWith(true);
  });

  it("stays put when controlled and ignores clicks when disabled", async () => {
    render(<Switch label="Locked" checked disabled />);
    const toggle = screen.getByRole("switch", { name: "Locked" });
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });
});

describe("Slider", () => {
  it("reports numbers and exposes the fill as a percentage", () => {
    const onChange = vi.fn<(value: number) => void>();
    render(<Slider aria-label="Raise to" min={0} max={50} value={25} onChange={onChange} />);
    const slider = screen.getByRole("slider", { name: "Raise to" });
    expect(slider).toHaveStyle({ "--pct": "50%" });
  });
});

describe("percentAlong", () => {
  it("maps a value onto the range and guards an empty range", () => {
    expect(percentAlong(25, 0, 100)).toBe(25);
    expect(percentAlong(7.5, 5, 10)).toBe(50);
    expect(percentAlong(3, 4, 4)).toBe(0);
  });
});

describe("Button additions", () => {
  it("renders a named icon before the label and can fill its row", () => {
    render(
      <Button icon="plus" block>
        Add
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Add" });
    expect(button).toHaveClass("w-full");
    expect(button.querySelector("svg")).not.toBeNull();
  });
});

describe("SegmentedControl block", () => {
  it("stretches to its container", () => {
    render(<SegmentedControl label="Street" block options={[{ value: "flop", label: "Flop" }]} />);
    expect(screen.getByRole("radiogroup", { name: "Street" })).toHaveClass("flex", "self-stretch");
  });
});
