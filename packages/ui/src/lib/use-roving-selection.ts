import type { KeyboardEvent } from "react";

import { useControllable } from "./use-controllable";

const KEY_STEP: Readonly<Record<string, number>> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
};

export function nextValue<V>(
  key: string,
  values: readonly V[],
  current: V | undefined,
): V | undefined {
  if (key === "Home") {
    return values[0];
  }
  if (key === "End") {
    return values.at(-1);
  }
  const step = KEY_STEP[key];
  if (step === undefined) {
    return undefined;
  }
  const index = current === undefined ? -1 : values.indexOf(current);
  return values[(index + step + values.length) % values.length];
}

function focusOption(container: HTMLElement, value: string) {
  const options = container.querySelectorAll<HTMLElement>("[data-value]");
  Array.from(options)
    .find((option) => option.dataset["value"] === value)
    ?.focus();
}

type RovingOptions<V extends string> = {
  readonly values: readonly V[];
  readonly value?: V | undefined;
  readonly defaultValue?: V | undefined;
  readonly onChange?: ((value: V) => void) | undefined;
};

export function useRovingSelection<V extends string>({
  values,
  value,
  defaultValue,
  onChange,
}: RovingOptions<V>) {
  const [current, select] = useControllable(value, defaultValue ?? values[0], onChange);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const next = nextValue(event.key, values, current);
    if (next === undefined) {
      return;
    }
    event.preventDefault();
    select(next);
    focusOption(event.currentTarget, next);
  };

  return { current, select, onKeyDown };
}
