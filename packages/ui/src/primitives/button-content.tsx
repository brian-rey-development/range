import type { ReactNode } from "react";

import { Icon } from "./icon";
import type { IconName } from "./icon-paths";

type ButtonContentProps = {
  readonly icon?: IconName | undefined;
  readonly leading?: ReactNode;
  readonly trailing?: ReactNode;
  readonly children?: ReactNode;
};

export function ButtonContent({ icon, leading, trailing, children }: ButtonContentProps) {
  const lead = leading ?? (icon ? <Icon name={icon} /> : null);
  return (
    <>
      {lead ? (
        <span aria-hidden className="inline-flex [&>svg]:size-4">
          {lead}
        </span>
      ) : null}
      {children}
      {trailing}
    </>
  );
}
