import type { ReactNode } from "react";

type ButtonContentProps = {
  readonly leading?: ReactNode;
  readonly trailing?: ReactNode;
  readonly children?: ReactNode;
};

export function ButtonContent({ leading, trailing, children }: ButtonContentProps) {
  return (
    <>
      {leading ? (
        <span aria-hidden className="inline-flex [&>svg]:size-4">
          {leading}
        </span>
      ) : null}
      {children}
      {trailing}
    </>
  );
}
