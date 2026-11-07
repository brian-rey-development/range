import { cx } from "../lib/cx";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "focus-ring dim-disabled inline-flex items-center justify-center whitespace-nowrap rounded-sm border border-transparent font-medium select-none transition-colors enabled:active:translate-y-px";

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-hover [&_kbd]:border-on-accent/45 [&_kbd]:bg-transparent [&_kbd]:text-on-accent [&_kbd]:shadow-none",
  secondary: "border-line-strong bg-surface-raised text-ink hover:bg-surface-sunken",
  ghost: "text-ink-2 hover:bg-surface-sunken hover:text-ink",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "h-7 gap-1.5 px-3 text-small-medium",
  md: "h-9 gap-2 px-4 text-control",
  lg: "h-11 gap-2 px-5 text-body-medium",
};

type ButtonLook = {
  readonly variant?: ButtonVariant | undefined;
  readonly size?: ButtonSize | undefined;
  readonly className?: string | undefined;
};

export function buttonClass({ variant = "secondary", size = "md", className }: ButtonLook): string {
  return cx(BASE, VARIANT[variant], SIZE[size], className);
}
