import { cx } from "../lib/cx";
import { MARK_HEIGHT, MARK_PATH, MARK_WIDTH } from "./brand-paths";

type BrandProps = { readonly className?: string };

export function RangeMark({ className }: BrandProps) {
  return (
    <svg
      viewBox={`0 0 ${MARK_WIDTH} ${MARK_HEIGHT}`}
      role="img"
      aria-label="Range"
      className={cx("fill-brand", className)}
    >
      <path d={MARK_PATH} />
    </svg>
  );
}
