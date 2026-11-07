import { useState } from "react";

export function useControllable<T>(
  value: T | undefined,
  initial: T | undefined,
  onChange: ((next: T) => void) | undefined,
) {
  const [inner, setInner] = useState(initial);

  const select = (next: T) => {
    if (value === undefined) {
      setInner(next);
    }
    onChange?.(next);
  };

  return [value ?? inner, select] as const;
}
