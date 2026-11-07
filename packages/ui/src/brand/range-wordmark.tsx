import { cx } from "../lib/cx";
import { WORDMARK_PATH, WORDMARK_VIEWBOX } from "./brand-paths";

type BrandProps = { readonly className?: string };

export function RangeWordmark({ className }: BrandProps) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      role="img"
      aria-label="Range"
      className={cx("fill-ink", className)}
    >
      <path d={WORDMARK_PATH} />
    </svg>
  );
}
