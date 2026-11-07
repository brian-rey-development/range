import type { ComponentProps, ReactNode } from "react";

import { ButtonContent } from "./button-content";
import { buttonClass, type ButtonSize, type ButtonVariant } from "./button-styles";

type ButtonProps = ComponentProps<"button"> & {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly leading?: ReactNode;
  readonly trailing?: ReactNode;
};

export function Button({
  variant,
  size,
  leading,
  trailing,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type="button" className={buttonClass({ variant, size, className })} {...rest}>
      <ButtonContent leading={leading} trailing={trailing}>
        {children}
      </ButtonContent>
    </button>
  );
}
