import { ButtonLink } from "@range/ui";

import { HERO } from "../../core/content/copy";
import { ART } from "../../core/content/illustrations";
import { Container } from "../../shared/container";
import { Illustration } from "../../shared/illustration";

function HeroCopy() {
  return (
    <div className="flex flex-col items-start gap-6 pb-10 md:pb-16">
      <h1 className="text-hero text-ink">
        <span className="block text-balance text-ink-2">{HERO.problem}</span>{" "}
        <span className="block text-balance">{HERO.answer}</span>
      </h1>
      <p className="max-w-xl text-lead text-ink-2">{HERO.body}</p>
      <ButtonLink variant="primary" size="lg" href="#play">
        {HERO.action}
      </ButtonLink>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="bg-accent-soft pt-12 md:pt-16">
      <Container className="grid items-end gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-12">
        <HeroCopy />
        <Illustration art={ART.king} priority className="ml-auto block h-auto w-full max-w-md" />
      </Container>
    </section>
  );
}
