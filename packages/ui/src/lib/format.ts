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

const THOUSAND = 1000;
const LARGE_TOKENS = 100_000;
const SECOND = 1000;
const SLOW_SECOND = 10_000;

export function formatNumber(value: number, digits?: number): string {
  const places = digits ?? (Math.round(value * TENTHS) % TENTHS === 0 ? 0 : 1);
  return value.toFixed(places);
}

export function formatTokens(count: number): string {
  if (count < THOUSAND) {
    return String(count);
  }
  return `${(count / THOUSAND).toFixed(count >= LARGE_TOKENS ? 0 : 1)}k`;
}

export function formatDuration(ms: number): string {
  if (ms < SECOND) {
    return `${Math.round(ms)} ms`;
  }
  return `${(ms / SECOND).toFixed(ms >= SLOW_SECOND ? 0 : 1)} s`;
}
