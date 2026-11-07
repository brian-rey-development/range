import { cx } from "../lib/cx";
import { ICONS, type IconName, type IconShape } from "./icon-paths";

const SIZE = { xs: 12, sm: 14, md: 16, lg: 20 } as const;

type IconSize = keyof typeof SIZE;
const VIEW_BOX = "0 0 16 16";
const STROKE = 1.5;

type IconProps = {
  readonly name: IconName;
  readonly size?: IconSize;
  readonly label?: string;
  readonly className?: string;
};

const DASH = "2.2 2";

function shapeKey(shape: IconShape): string {
  return JSON.stringify(shape);
}

function Shape({ shape }: { readonly shape: IconShape }) {
  switch (shape.kind) {
    case "path":
      return <path d={shape.d} />;
    case "circle":
      return <circle cx={shape.cx} cy={shape.cy} r={shape.r} />;
    case "dashed":
      return <circle cx={shape.cx} cy={shape.cy} r={shape.r} strokeDasharray={DASH} />;
    case "dot":
      return <circle cx={shape.cx} cy={shape.cy} r={shape.r} fill="currentColor" stroke="none" />;
    case "rect":
      return <rect x={shape.x} y={shape.y} width={shape.w} height={shape.h} rx={shape.rx} />;
  }
}

export function Icon({ name, size = "md", label, className }: IconProps) {
  return (
    <svg
      width={SIZE[size]}
      height={SIZE[size]}
      viewBox={VIEW_BOX}
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cx("block flex-none", className)}
    >
      {ICONS[name].map((shape) => (
        <Shape key={shapeKey(shape)} shape={shape} />
      ))}
    </svg>
  );
}
