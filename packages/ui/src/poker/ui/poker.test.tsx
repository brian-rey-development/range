import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  ActionBar,
  type ActionOption,
  FrequencyBar,
  Grade,
  PlayingCard,
  RangeGrid,
} from "../../index";

const GRID_CELLS = 169;

describe("PlayingCard", () => {
  it("describes a face-up card and writes a ten as 10", () => {
    render(<PlayingCard rank="T" suit="h" />);
    expect(screen.getByRole("img", { name: "Ten of hearts" })).toHaveTextContent("10");
  });

  it("colours diamonds like hearts in a two-colour deck", () => {
    render(<PlayingCard rank="A" suit="d" deck="two" />);
    expect(screen.getByRole("img")).toHaveClass("text-suit-heart");
  });

  it("hides the face of a face-down card", () => {
    render(<PlayingCard faceDown />);
    expect(screen.getByRole("img", { name: "Face-down card" })).not.toHaveTextContent(/\w/);
  });
});

describe("RangeGrid", () => {
  it("renders every hand as a static cell when read-only", () => {
    render(<RangeGrid data={{ AA: { raise: 1 } }} />);
    expect(screen.getAllByTitle(/%/)).toHaveLength(GRID_CELLS);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("keeps a single tab stop and moves it with the arrow keys", async () => {
    render(<RangeGrid data={{}} onSelect={() => {}} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.filter((button) => button.tabIndex === 0)).toHaveLength(1);
    screen.getByRole("button", { name: "AA" }).focus();
    await userEvent.keyboard("{ArrowRight}{ArrowDown}");
    expect(screen.getByRole("button", { name: "KK" })).toHaveFocus();
    expect(screen.getByRole("button", { name: "KK" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("button", { name: "AA" })).toHaveAttribute("tabindex", "-1");
  });

  it("selects a hand and reports hover enter and leave", async () => {
    const onSelect = vi.fn<(hand: string) => void>();
    const onHover = vi.fn<(hand: string | null) => void>();
    render(<RangeGrid data={{}} selected="AKs" onSelect={onSelect} onHover={onHover} />);
    expect(screen.getByRole("button", { name: "AKs" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.hover(screen.getByRole("button", { name: "QJo" }));
    expect(onHover).toHaveBeenLastCalledWith("QJo");
    fireEvent.mouseLeave(screen.getByRole("group", { name: "Range grid" }));
    expect(onHover).toHaveBeenLastCalledWith(null);
    await userEvent.click(screen.getByRole("button", { name: "QJo" }));
    expect(onSelect).toHaveBeenCalledWith("QJo");
  });
});

describe("FrequencyBar", () => {
  it("states the numbers in the legend and the accessible label", () => {
    render(<FrequencyBar frequencies={{ raise: 42, call: 31, fold: 27 }} />);
    expect(screen.getByRole("img", { name: "Raise 42%, Call 31%, Fold 27%" })).toBeInTheDocument();
    expect(screen.getByText("42%")).toBeInTheDocument();
  });
});

describe("ActionBar", () => {
  const actions = [
    { action: "fold", hotkey: "f" },
    { action: "raise", amount: "9 bb", hotkey: "r" },
  ] as const;

  it("shows verb, size and hotkey, and holds the chosen action", () => {
    render(<ActionBar actions={actions} selected="raise:9 bb" />);
    expect(screen.getByRole("button", { name: /raise/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /raise/i })).toHaveTextContent("9 bb");
  });

  it("runs an action from its hotkey but not while typing in a field", async () => {
    const onAction = vi.fn<(action: ActionOption) => void>();
    render(
      <>
        <input aria-label="note" />
        <ActionBar actions={actions} hotkeys onAction={onAction} />
      </>,
    );
    await userEvent.keyboard("r");
    expect(onAction).toHaveBeenCalledWith(actions[1]);
    onAction.mockClear();
    await userEvent.type(screen.getByLabelText("note"), "r");
    expect(onAction).not.toHaveBeenCalled();
  });

  it("ignores clicks and hotkeys when disabled", async () => {
    const onAction = vi.fn<(action: ActionOption) => void>();
    render(<ActionBar actions={actions} hotkeys disabled onAction={onAction} />);
    await userEvent.keyboard("f");
    await userEvent.click(screen.getByRole("button", { name: /fold/i }));
    expect(onAction).not.toHaveBeenCalled();
  });
});

describe("Grade", () => {
  it("always shows the word and the EV loss", () => {
    render(<Grade grade="mistake" evLoss={0.42} />);
    expect(screen.getByText("Mistake")).toBeInTheDocument();
    expect(screen.getByText("−0.42 bb")).toBeInTheDocument();
  });
});
