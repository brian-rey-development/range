import { RangeLogo } from "@range/ui";

import { SITE } from "../../core/config/site";
import { FOOTER } from "../../core/content/copy";
import { Container } from "../../shared/container";
import { GitHubButton } from "../../shared/github-button";

export function SiteFooter() {
  return (
    <footer data-theme="dark" className="bg-surface">
      <Container className="flex h-24 items-center justify-between">
        <RangeLogo className="h-6 w-auto" />
        <GitHubButton variant="ghost" href={SITE.githubUrl}>
          {FOOTER.action}
        </GitHubButton>
      </Container>
    </footer>
  );
}
