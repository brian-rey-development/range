import { ButtonLink } from "@range/ui";

import { SITE } from "../../core/config/site";
import { HERO } from "../../core/content/copy";
import { Container } from "../../shared/container";
import { TrainerPreview } from "./trainer-preview";

function HeroCopy() {
  return (
    <div className="flex flex-col items-start gap-6">
      <h1 className="text-title-1 text-ink md:text-display">{HERO.title}</h1>
      <p className="max-w-xl text-body text-ink-2">{HERO.body}</p>
      <div className="flex flex-col items-start gap-2">
        <ButtonLink
          variant="primary"
          size="lg"
          href={SITE.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          {HERO.action}
        </ButtonLink>
        <p className="text-caption text-ink-3">{HERO.note}</p>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="border-b border-line py-12 md:py-16">
      <Container className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <HeroCopy />
        <TrainerPreview />
      </Container>
    </section>
  );
}
