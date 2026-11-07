import type { ComponentProps, ReactNode } from "react";

import { ButtonContent } from "./button-content";
import type { IconName } from "./icon-paths";
import { buttonClass, type ButtonSize, type ButtonVariant } from "./button-styles";

type ButtonProps = ComponentProps<"button"> & {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly icon?: IconName;
  readonly block?: boolean;
  readonly leading?: ReactNode;
  readonly trailing?: ReactNode;
};

export function Button({
  variant,
  size,
  icon,
  block,
  leading,
  trailing,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type="button" className={buttonClass({ variant, size, block, className })} {...rest}>
      <ButtonContent icon={icon} leading={leading} trailing={trailing}>
        {children}
      </ButtonContent>
    </button>
  );
}
