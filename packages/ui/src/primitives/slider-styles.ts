const WEBKIT_TRACK =
  "[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-ink)_var(--pct),var(--color-line-strong)_var(--pct))]";
const WEBKIT_THUMB =
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[1.5px] [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-surface-raised";
const MOZ_TRACK =
  "[&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-line-strong [&::-moz-range-progress]:h-1 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-ink";
const MOZ_THUMB =
  "[&::-moz-range-thumb]:size-3.25 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[1.5px] [&::-moz-range-thumb]:border-ink [&::-moz-range-thumb]:bg-surface-raised";
const FOCUS =
  "focus-visible:outline-none focus-visible:[&::-webkit-slider-thumb]:shadow-focus focus-visible:[&::-moz-range-thumb]:shadow-focus";

export const SLIDER = `block h-5 w-full cursor-pointer appearance-none bg-transparent ${WEBKIT_TRACK} ${WEBKIT_THUMB} ${MOZ_TRACK} ${MOZ_THUMB} ${FOCUS}`;
