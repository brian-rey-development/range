import { cx } from "../lib/cx";
import { LOCKUP, MARK_PATH, WORDMARK_PATH } from "./brand-paths";

type BrandProps = { readonly className?: string };

export function RangeLogo({ className }: BrandProps) {
  return (
    <svg
      viewBox={`0 0 ${LOCKUP.width} ${LOCKUP.height}`}
      role="img"
      aria-label="Range"
      className={cx("text-ink", className)}
    >
      <path className="fill-brand" d={MARK_PATH} />
      <path className="fill-current" transform={LOCKUP.wordTransform} d={WORDMARK_PATH} />
    </svg>
  );
}
