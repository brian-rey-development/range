import { SITE } from "../../core/config/site";
import { CTA } from "../../core/content/copy";
import { GitHubButton } from "../../shared/github-button";
import { Section } from "../../shared/section";

export function CtaSection() {
  return (
    <Section tone="dark" className="flex flex-col items-center gap-8 text-center">
      <div className="flex flex-col gap-4">
        <h2 className="text-section text-ink">{CTA.title}</h2>
        <p className="max-w-md text-lead text-ink-2">{CTA.body}</p>
      </div>
      <GitHubButton variant="primary" size="lg" href={SITE.githubUrl}>
        {CTA.action}
      </GitHubButton>
    </Section>
  );
}
