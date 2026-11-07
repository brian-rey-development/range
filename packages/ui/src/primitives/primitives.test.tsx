import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button, ButtonLink, Input, Kbd, SegmentedControl, Stat, Tabs } from "../index";

const POSITIONS = [
  { value: "btn", label: "BTN" },
  { value: "co", label: "CO", disabled: true },
  { value: "bb", label: "BB" },
];

describe("Button", () => {
  it("is a non-submitting button that renders its slots and fires clicks", async () => {
    const onClick = vi.fn<() => void>();
    render(
      <Button trailing={<Kbd>N</Kbd>} onClick={onClick}>
        Next hand
      </Button>,
    );
    const button = screen.getByRole("button", { name: /next hand/i });
    expect(button).toHaveAttribute("type", "button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe("ButtonLink", () => {
  it("renders an anchor that looks like a button and keeps its link attributes", () => {
    render(
      <ButtonLink variant="primary" href="https://example.com" target="_blank" rel="noreferrer">
        View source
      </ButtonLink>,
    );
    const link = screen.getByRole("link", { name: "View source" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveClass("bg-accent");
  });
});

describe("Input", () => {
  it("labels the control and links the message to it", () => {
    render(<Input label="Stack" suffix="bb" numeric invalid message="Too deep" />);
    const input = screen.getByLabelText("Stack");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("inputmode", "decimal");
    expect(input).toHaveAccessibleDescription("Too deep");
  });

  it("shows a zero prefix instead of dropping it", () => {
    render(<Input label="Edge" prefix={0} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});

describe("SegmentedControl", () => {
  it("selects on click and reports the value", async () => {
    const onChange = vi.fn<(value: string) => void>();
    render(<SegmentedControl label="Position" options={POSITIONS} onChange={onChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "BB" }));
    expect(onChange).toHaveBeenCalledWith("bb");
    expect(screen.getByRole("radio", { name: "BB" })).toBeChecked();
  });

  it("moves with the arrow keys, skips disabled options and keeps one tab stop", async () => {
    render(<SegmentedControl label="Position" options={POSITIONS} defaultValue="btn" />);
    screen.getByRole("radio", { name: "BTN" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("radio", { name: "BB" })).toHaveFocus();
    expect(screen.getByRole("radio", { name: "BB" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "BTN" })).toHaveAttribute("tabindex", "-1");
  });
});

describe("Tabs", () => {
  it("wraps around with the arrow keys and shows counts", async () => {
    const items = [
      { value: "hands", label: "Hands", count: 12 },
      { value: "stats", label: "Stats" },
    ];
    render(<Tabs label="Review" items={items} />);
    expect(screen.getByRole("tab", { name: /hands/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("12")).toBeInTheDocument();
    screen.getByRole("tab", { name: /hands/i }).focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Stats" })).toHaveFocus();
  });
});

describe("Stat", () => {
  it("signs values and colours deltas by direction", () => {
    const { container } = render(
      <Stat label="EV" value={6.42} digits={2} signed delta={{ value: 1.2 }} />,
    );
    expect(screen.getByText("+6.42")).toBeInTheDocument();
    expect(container.querySelector(".text-gain")).toHaveTextContent("+1.2");
  });

  it("treats a falling number as good when lower is better", () => {
    const { container } = render(
      <Stat label="EV lost" value={0.8} delta={{ value: -0.2, invert: true }} />,
    );
    expect(container.querySelector(".text-gain")).toHaveTextContent("−0.2");
  });
});
