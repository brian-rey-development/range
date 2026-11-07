import type { ComponentProps, ReactNode } from "react";

import { ButtonContent } from "./button-content";
import { buttonClass, type ButtonSize, type ButtonVariant } from "./button-styles";

type ButtonLinkProps = ComponentProps<"a"> & {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly leading?: ReactNode;
  readonly trailing?: ReactNode;
};

export function ButtonLink({
  variant,
  size,
  leading,
  trailing,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a className={buttonClass({ variant, size, className })} {...rest}>
      <ButtonContent leading={leading} trailing={trailing}>
        {children}
      </ButtonContent>
    </a>
  );
}
