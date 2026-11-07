import type { ReactNode } from "react";

import { Container } from "./container";

type Tone = "plain" | "sunken" | "dark";

const TONE: Record<Tone, string> = {
  plain: "bg-surface",
  sunken: "bg-surface-sunken",
  dark: "bg-surface",
};

type SectionProps = {
  readonly id?: string;
  readonly tone?: Tone;
  readonly className?: string;
  readonly children: ReactNode;
};

export function Section({ id, tone = "plain", className, children }: SectionProps) {
  return (
    <section
      id={id}
      data-theme={tone === "dark" ? "dark" : undefined}
      className={`${TONE[tone]} py-12 md:py-20 ${id ? "scroll-mt-16" : ""}`}
    >
      <Container className={className ?? ""}>{children}</Container>
    </section>
  );
}
