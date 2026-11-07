const MINUS = "−";
const EV_DIGITS = 2;

export function formatLoss(value: number): string {
  const magnitude = Math.abs(value).toFixed(EV_DIGITS);
  return value === 0 ? magnitude : `${MINUS}${magnitude}`;
}
