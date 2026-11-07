import type { ComponentProps } from "react";

import { cx } from "../lib/cx";

const KEY =
  "inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-xs border border-line-strong bg-surface-raised px-1 font-mono text-num-sm text-ink-2 shadow-key";

export function Kbd({ className, ...rest }: ComponentProps<"kbd">) {
  return <kbd className={cx(KEY, className)} {...rest} />;
}
