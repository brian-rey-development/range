import type { ReactNode } from "react";

import { cx } from "../lib/cx";
import { Icon } from "./icon";
import type { IconName } from "./icon-paths";

type Tone = "neutral" | "outline" | "heuristic";

type TagProps = {
  readonly children?: ReactNode;
  readonly icon?: IconName;
  readonly tone?: Tone;
  readonly className?: string;
};

const BASE =
  "inline-flex h-6 items-center gap-1 rounded-xs px-2 text-small-medium whitespace-nowrap";

const TONE: Record<Tone, string> = {
  neutral: "bg-surface-sunken text-ink-2",
  outline: "bg-transparent text-ink-2 ring-1 ring-line-strong ring-inset",
  heuristic: "bg-heuristic-soft text-heuristic",
};

export function Tag({ children, icon, tone = "neutral", className }: TagProps) {
  return (
    <span className={cx(BASE, TONE[tone], className)}>
      {icon ? <Icon name={icon} size="xs" /> : null}
      {children}
    </span>
  );
}
