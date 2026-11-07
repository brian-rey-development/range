import type { ComponentProps, ReactNode } from "react";

import { ButtonContent } from "./button-content";
import type { IconName } from "./icon-paths";
import { buttonClass, type ButtonSize, type ButtonVariant } from "./button-styles";

type ButtonLinkProps = ComponentProps<"a"> & {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly icon?: IconName;
  readonly block?: boolean;
  readonly leading?: ReactNode;
  readonly trailing?: ReactNode;
};

export function ButtonLink({
  variant,
  size,
  icon,
  block,
  leading,
  trailing,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a className={buttonClass({ variant, size, block, className })} {...rest}>
      <ButtonContent icon={icon} leading={leading} trailing={trailing}>
        {children}
      </ButtonContent>
    </a>
  );
}
