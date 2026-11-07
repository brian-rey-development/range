import type { ReactNode } from "react";

import { cx } from "../lib/cx";
import { formatSigned } from "../lib/format";

type Size = "sm" | "md";

type StatDelta = {
  readonly value: number | string;
  readonly digits?: number;
  readonly invert?: boolean;
  readonly context?: ReactNode;
};

type ValueProps = {
  readonly value: number | string;
  readonly unit?: ReactNode;
  readonly signed?: boolean;
  readonly digits?: number;
  readonly size?: Size;
};

type StatProps = ValueProps & {
  readonly label: ReactNode;
  readonly delta?: StatDelta;
  readonly className?: string;
};

const VALUE_SIZE: Record<Size, string> = { md: "text-stat-xl", sm: "text-stat" };

function deltaTone(value: number | string, invert: boolean): string {
  if (typeof value !== "number" || value === 0) {
    return "text-ink-2";
  }
  return value > 0 !== invert ? "text-gain" : "text-loss";
}

function Delta({ value, digits, invert = false, context }: StatDelta) {
  const text = typeof value === "number" ? formatSigned(value, digits) : value;
  return (
    <span
      className={cx("figures flex items-baseline gap-1.5 text-num-sm", deltaTone(value, invert))}
    >
      {text}
      {context ? <span className="font-sans text-caption text-ink-3">{context}</span> : null}
    </span>
  );
}

function Value({ value, unit, signed, digits, size = "md" }: ValueProps) {
  const text = signed && typeof value === "number" ? formatSigned(value, digits) : value;
  return (
    <span className={cx("figures flex items-baseline gap-1.5 text-ink", VALUE_SIZE[size])}>
      {text}
      {unit ? (
        <span className="font-sans text-small tracking-normal text-ink-3">{unit}</span>
      ) : null}
    </span>
  );
}

export function Stat({ label, delta, className, ...value }: StatProps) {
  return (
    <div className={cx("flex min-w-0 flex-col gap-1.5", className)}>
      <span className="text-small text-ink-2">{label}</span>
      <Value {...value} />
      {delta ? <Delta {...delta} /> : null}
    </div>
  );
}
