const MINUS = "−";
const DEFAULT_DIGITS = 1;
const PERCENT = 100;
const TENTHS = 10;

export function formatSigned(value: number, digits = DEFAULT_DIGITS): string {
  const magnitude = Math.abs(value).toFixed(digits);
  if (value > 0) {
    return `+${magnitude}`;
  }
  return value < 0 ? `${MINUS}${magnitude}` : magnitude;
}

export function formatPercent(fraction: number): string {
  return `${Math.round(fraction * PERCENT * TENTHS) / TENTHS}%`;
}
