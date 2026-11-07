import type { ChangeEvent, ComponentProps, CSSProperties } from "react";

import { cx } from "../lib/cx";
import { useControllable } from "../lib/use-controllable";
import { SLIDER } from "./slider-styles";

type SliderProps = Omit<ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange"> & {
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly value?: number;
  readonly defaultValue?: number;
  readonly onChange?: (value: number) => void;
};

const PERCENT = 100;
const DEFAULT_MAX = 100;

export function percentAlong(value: number, min: number, max: number): number {
  return max > min ? ((value - min) / (max - min)) * PERCENT : 0;
}

export function Slider({
  min = 0,
  max = DEFAULT_MAX,
  step = 1,
  value,
  defaultValue,
  onChange,
  className,
  style,
  ...rest
}: SliderProps) {
  const [current, select] = useControllable(value, defaultValue ?? min, onChange);
  const fill = { "--pct": `${percentAlong(current ?? min, min, max)}%`, ...style } as CSSProperties;

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={current}
      style={fill}
      className={cx(SLIDER, className)}
      onChange={(event: ChangeEvent<HTMLInputElement>) => select(Number(event.target.value))}
      {...rest}
    />
  );
}
