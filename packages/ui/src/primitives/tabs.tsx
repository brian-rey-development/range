import type { ReactNode } from "react";

import { cx } from "../lib/cx";
import { useRovingSelection } from "../lib/use-roving-selection";

type TabItem<V extends string> = {
  readonly value: V;
  readonly label: ReactNode;
  readonly count?: ReactNode;
};

type TabsProps<V extends string> = {
  readonly items: readonly TabItem<V>[];
  readonly label: string;
  readonly value?: V;
  readonly defaultValue?: V;
  readonly onChange?: (value: V) => void;
  readonly className?: string;
};

const LIST = "flex gap-5 border-b border-line";
const TAB =
  "focus-ring relative inline-flex items-center gap-1.5 rounded-xs pt-2 pb-2.5 text-control font-medium text-ink-2 transition-colors hover:text-ink aria-selected:text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-hair aria-selected:after:bg-ink";

type TabProps<V extends string> = {
  readonly item: TabItem<V>;
  readonly selected: boolean;
  readonly onSelect: (value: V) => void;
};

function Tab<V extends string>({ item, selected, onSelect }: TabProps<V>) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      data-value={item.value}
      tabIndex={selected ? 0 : -1}
      onClick={() => onSelect(item.value)}
      className={TAB}
    >
      {item.label}
      {item.count === undefined ? null : (
        <span className="figures text-num-sm text-ink-3">{item.count}</span>
      )}
    </button>
  );
}

export function Tabs<V extends string>({ items, label, className, ...selection }: TabsProps<V>) {
  const values = items.map((item) => item.value);
  const { current, select, onKeyDown } = useRovingSelection({ values, ...selection });

  return (
    <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className={cx(LIST, className)}>
      {items.map((item) => (
        <Tab key={item.value} item={item} selected={item.value === current} onSelect={select} />
      ))}
    </div>
  );
}
