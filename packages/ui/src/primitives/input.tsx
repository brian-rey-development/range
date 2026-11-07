import { useId, type ComponentProps, type ReactNode } from "react";

import { cx } from "../lib/cx";

type Size = "sm" | "md";

const FRAME = "flex items-center gap-2 rounded-sm border bg-surface-raised transition-colors";
const FRAME_VALID =
  "border-line-control not-focus-within:hover:border-ink-3 focus-within:border-accent focus-within:shadow-halo";
const FRAME_INVALID = "border-accent-text";
const FRAME_SIZE: Record<Size, string> = { sm: "h-7 px-2", md: "h-9 px-3" };
const CONTROL =
  "h-full min-w-0 flex-1 bg-transparent text-control text-ink outline-none placeholder:text-ink-3";

type FieldProps = {
  readonly prefix?: ReactNode;
  readonly suffix?: ReactNode;
  readonly numeric?: boolean;
  readonly invalid?: boolean;
  readonly size?: Size;
};

type ControlProps = Omit<ComponentProps<"input">, "size" | "prefix"> & FieldProps;

type InputProps = ControlProps & {
  readonly label?: ReactNode;
  readonly message?: ReactNode;
};

function Affix({ children }: { readonly children: ReactNode }) {
  if (children === undefined || children === null || children === false) {
    return null;
  }
  return <span className="figures flex-none text-small text-ink-3">{children}</span>;
}

function Control({ prefix, suffix, numeric, invalid, size = "md", ...rest }: ControlProps) {
  return (
    <div className={cx(FRAME, FRAME_SIZE[size], invalid ? FRAME_INVALID : FRAME_VALID)}>
      <Affix>{prefix}</Affix>
      <input
        inputMode={numeric ? "decimal" : undefined}
        aria-invalid={invalid || undefined}
        className={cx(CONTROL, numeric && "figures")}
        {...rest}
      />
      <Affix>{suffix}</Affix>
    </div>
  );
}

function FieldMessage({
  id,
  invalid,
  children,
}: {
  readonly id: string;
  readonly invalid?: boolean | undefined;
  readonly children: ReactNode;
}) {
  return (
    <p id={id} className={cx("text-small", invalid ? "text-accent-text" : "text-ink-2")}>
      {children}
    </p>
  );
}

export function Input({ label, message, className, id, ...control }: InputProps) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const messageId = `${inputId}-message`;

  return (
    <div className={cx("flex min-w-0 flex-col gap-1.5", className)}>
      {label ? (
        <label htmlFor={inputId} className="text-small-medium text-ink">
          {label}
        </label>
      ) : null}
      <Control id={inputId} aria-describedby={message ? messageId : undefined} {...control} />
      {message ? (
        <FieldMessage id={messageId} invalid={control.invalid}>
          {message}
        </FieldMessage>
      ) : null}
    </div>
  );
}
