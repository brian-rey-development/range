import type { ReactNode } from "react";

type ContainerProps = {
  readonly className?: string;
  readonly children: ReactNode;
};

export function Container({ className, children }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-5xl px-6 ${className ?? ""}`}>{children}</div>;
}
