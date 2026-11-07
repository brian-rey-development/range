import { cx } from "../../lib/cx";
import { Kbd } from "../../primitives/kbd";
import { actionId } from "../application/action-id";
import { ACTION_LABEL } from "../application/frequencies";
import { useActionHotkeys } from "../hooks/use-action-hotkeys";
import type { ActionOption } from "../types/actions";
import { ActionSwatch } from "./action-swatch";

type ActionBarProps = {
  readonly actions: readonly ActionOption[];
  readonly label?: string;
  readonly selected?: string | null;
  readonly onAction?: (action: ActionOption) => void;
  readonly hotkeys?: boolean;
  readonly disabled?: boolean;
  readonly className?: string;
};

const TILE =
  "focus-ring dim-disabled flex min-h-16 flex-col gap-1 rounded-md border border-line-strong bg-surface-raised px-3 pt-2.5 pb-3 text-left text-ink transition-colors enabled:hover:border-ink-3 aria-pressed:border-ink aria-pressed:ring-1 aria-pressed:ring-ink";

type TileProps = {
  readonly option: ActionOption;
  readonly selected: boolean;
  readonly disabled: boolean;
  readonly onAction: ActionBarProps["onAction"];
};

function ActionTile({ option, selected, disabled, onAction }: TileProps) {
  return (
    <button
      type="button"
      disabled={option.disabled || disabled}
      aria-pressed={selected}
      className={TILE}
      onClick={() => onAction?.(option)}
    >
      <span className="flex items-center gap-2">
        <ActionSwatch action={option.action} />
        <span className="text-small-medium font-semibold">
          {option.label ?? ACTION_LABEL[option.action]}
        </span>
        {option.hotkey ? <Kbd className="ml-auto">{option.hotkey.toUpperCase()}</Kbd> : null}
      </span>
      <span className="figures text-small text-ink-2">{option.amount ?? " "}</span>
    </button>
  );
}

export function ActionBar({
  actions,
  label = "Actions",
  selected,
  onAction,
  hotkeys,
  disabled = false,
  className,
}: ActionBarProps) {
  useActionHotkeys({ actions, onAction, hotkeys, disabled });

  return (
    <div
      role="group"
      aria-label={label}
      className={cx("grid auto-cols-fr grid-flow-col gap-2", className)}
    >
      {actions.map((option) => (
        <ActionTile
          key={actionId(option)}
          option={option}
          selected={selected === actionId(option)}
          disabled={disabled}
          onAction={onAction}
        />
      ))}
    </div>
  );
}
