import { useId, type ReactNode } from "react";

import { cx } from "../lib/cx";
import { useControllable } from "../lib/use-controllable";

type SwitchProps = {
  readonly label?: ReactNode;
  readonly checked?: boolean;
  readonly defaultChecked?: boolean;
  readonly onChange?: (checked: boolean) => void;
  readonly disabled?: boolean;
  readonly className?: string;
};

const TRACK =
  "focus-ring group/switch relative h-4.5 w-8 flex-none cursor-pointer rounded-full bg-line-control transition-colors aria-checked:bg-ink disabled:cursor-not-allowed";
const THUMB =
  "absolute top-0.5 left-0.5 size-3.5 rounded-full bg-surface-raised shadow-key transition-transform group-aria-checked/switch:translate-x-3.5 group-aria-checked/switch:bg-surface";

export function Switch({
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled,
  className,
}: SwitchProps) {
  const id = useId();
  const [on, toggle] = useControllable(checked, defaultChecked, onChange);

  return (
    <div className={cx("inline-flex items-center gap-3", disabled && "opacity-45", className)}>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        className={TRACK}
        onClick={() => toggle(!on)}
      >
        <span className={THUMB} />
      </button>
      {label ? (
        <label htmlFor={id} className="cursor-pointer text-control text-ink">
          {label}
        </label>
      ) : null}
    </div>
  );
}
