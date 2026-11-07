import type { ReactNode } from "react";

import { cx } from "../lib/cx";
import { useRovingSelection } from "../lib/use-roving-selection";

type Size = "sm" | "md";

type SegmentOption<V extends string> = {
  readonly value: V;
  readonly label: ReactNode;
  readonly disabled?: boolean;
};

type SegmentedControlProps<V extends string> = {
  readonly options: readonly SegmentOption<V>[];
  readonly label: string;
  readonly value?: V;
  readonly defaultValue?: V;
  readonly onChange?: (value: V) => void;
  readonly size?: Size;
  readonly block?: boolean;
  readonly className?: string;
};

const TRACK = "inline-flex gap-0.5 rounded-sm border border-line bg-surface-sunken p-0.5";
const ITEM =
  "focus-ring dim-disabled flex-1 rounded-xs font-medium text-ink-2 transition-colors hover:text-ink aria-checked:bg-surface-raised aria-checked:text-ink aria-checked:ring-1 aria-checked:ring-line-strong";
const ITEM_SIZE: Record<Size, string> = {
  sm: "h-6 px-2 text-caption",
  md: "h-7 px-3 text-small-medium",
};

type SegmentProps<V extends string> = {
  readonly option: SegmentOption<V>;
  readonly size: Size;
  readonly checked: boolean;
  readonly onSelect: (value: V) => void;
};

function Segment<V extends string>({ option, size, checked, onSelect }: SegmentProps<V>) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      data-value={option.value}
      tabIndex={checked ? 0 : -1}
      disabled={option.disabled}
      onClick={() => onSelect(option.value)}
      className={cx(ITEM, ITEM_SIZE[size])}
    >
      {option.label}
    </button>
  );
}

export function SegmentedControl<V extends string>({
  options,
  label,
  size = "md",
  block,
  className,
  ...selection
}: SegmentedControlProps<V>) {
  const values = options.filter((option) => !option.disabled).map((option) => option.value);
  const { current, select, onKeyDown } = useRovingSelection({ values, ...selection });

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cx(TRACK, block && "flex self-stretch", className)}
    >
      {options.map((option) => (
        <Segment
          key={option.value}
          option={option}
          size={size}
          checked={option.value === current}
          onSelect={select}
        />
      ))}
    </div>
  );
}
