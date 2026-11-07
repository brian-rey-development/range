import { cx } from "../../lib/cx";
import { formatLoss } from "../application/ev";
import type { GradeLevel } from "../types/grade";

type GradeProps = {
  readonly grade: GradeLevel;
  readonly evLoss?: number;
  readonly label?: string;
  readonly className?: string;
};

const GRADE_STYLE: Record<GradeLevel, { readonly word: string; readonly dot: string }> = {
  best: { word: "Best", dot: "bg-grade-best" },
  good: { word: "Good", dot: "bg-grade-good" },
  inaccuracy: { word: "Inaccuracy", dot: "bg-grade-inaccuracy" },
  mistake: { word: "Mistake", dot: "bg-grade-mistake" },
  blunder: { word: "Blunder", dot: "bg-grade-blunder" },
};

export function Grade({ grade, evLoss, label, className }: GradeProps) {
  const { word, dot } = GRADE_STYLE[grade];
  return (
    <span className={cx("inline-flex items-center gap-2 text-small-medium text-ink", className)}>
      <span aria-hidden className={cx("size-2 flex-none rounded-full", dot)} />
      {label ?? word}
      {evLoss === undefined ? null : (
        <span className="figures text-caption font-normal text-ink-2">{formatLoss(evLoss)} bb</span>
      )}
    </span>
  );
}
