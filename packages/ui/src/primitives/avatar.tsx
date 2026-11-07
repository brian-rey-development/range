import { MARK_MASK_IMAGE } from "../brand/mark-mask";
import { cx } from "../lib/cx";
import { initialsOf } from "../lib/initials";

export type AvatarKind = "learner" | "coach" | "bot" | "model";
type Size = "xs" | "sm" | "md" | "lg";
type Status = "acting" | "thinking";

type AvatarProps = {
  readonly kind?: AvatarKind;
  readonly name?: string;
  readonly initials?: string;
  readonly src?: string;
  readonly size?: Size;
  readonly status?: Status | null;
  readonly title?: string;
  readonly className?: string;
};

const SIZE: Record<Size, string> = {
  xs: "[--s:20px]",
  sm: "[--s:24px]",
  md: "[--s:32px]",
  lg: "[--s:40px]",
};

const BASE =
  "relative inline-flex size-(--s) flex-none items-center justify-center text-[length:calc(var(--s)*0.38)] leading-none font-semibold tracking-tight select-none";

const KIND: Record<AvatarKind, string> = {
  learner: "rounded-full bg-surface-sunken text-ink-2 ring-1 ring-line-strong ring-inset",
  coach: "rounded-full bg-brand",
  bot: "rounded-[calc(var(--s)*0.26)] bg-surface-raised font-mono font-medium text-ink-2 ring-1 ring-line-control ring-inset",
  model: "rounded-[calc(var(--s)*0.26)] bg-ink font-mono font-medium text-surface",
};

const ACTING = "shadow-focus";
const THINKING =
  "after:absolute after:-inset-1 after:rounded-[inherit] after:border-2 after:border-accent after:opacity-35 after:animate-ring-pulse";

function statusClass(status: Status | null | undefined): string | undefined {
  if (status === "acting") {
    return ACTING;
  }
  return status === "thinking" ? THINKING : undefined;
}

function Inner({
  kind,
  src,
  text,
}: {
  readonly kind: AvatarKind;
  readonly src?: string | undefined;
  readonly text: string;
}) {
  if (kind === "coach") {
    return (
      <span
        aria-hidden
        style={{ maskImage: MARK_MASK_IMAGE }}
        className="block aspect-380/268 w-[62%] bg-card-face mask-contain mask-center mask-no-repeat"
      />
    );
  }
  if (src) {
    return <img src={src} alt="" className="size-full rounded-[inherit] object-cover" />;
  }
  return <span>{text}</span>;
}

export function Avatar({
  kind = "learner",
  name,
  initials,
  src,
  size = "md",
  status,
  title,
  className,
}: AvatarProps) {
  const label = name ?? (kind === "coach" ? "Coach" : undefined);
  return (
    <span
      role="img"
      aria-label={label}
      title={title ?? label}
      className={cx(BASE, SIZE[size], KIND[kind], statusClass(status), className)}
    >
      <Inner kind={kind} src={src} text={initials ?? initialsOf(name)} />
    </span>
  );
}
