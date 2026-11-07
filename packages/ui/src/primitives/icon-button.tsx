import type { ComponentProps } from "react";

import { cx } from "../lib/cx";
import { Icon } from "./icon";
import type { IconName } from "./icon-paths";

type Variant = "ghost" | "secondary" | "primary";
type Size = "sm" | "md";

type IconButtonProps = Omit<ComponentProps<"button">, "aria-label" | "children"> & {
  readonly icon: IconName;
  readonly label: string;
  readonly variant?: Variant;
  readonly size?: Size;
};

const BASE =
  "focus-ring inline-flex flex-none items-center justify-center rounded-sm border border-transparent transition-colors disabled:cursor-not-allowed";

const VARIANT: Record<Variant, string> = {
  ghost: "text-ink-2 enabled:hover:bg-surface-sunken enabled:hover:text-ink disabled:opacity-40",
  secondary:
    "border-line-strong bg-surface-raised text-ink enabled:hover:bg-surface-sunken disabled:opacity-40",
  primary:
    "bg-accent text-on-accent enabled:hover:bg-accent-hover disabled:bg-surface-sunken disabled:text-ink-3",
};

const SIZE: Record<Size, string> = { sm: "size-7", md: "size-8" };

export function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={cx(BASE, VARIANT[variant], SIZE[size], className)}
      {...rest}
    >
      <Icon name={icon} />
    </button>
  );
}
