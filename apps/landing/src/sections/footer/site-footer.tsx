import { ButtonLink, RangeLogo } from "@range/ui";

import { SITE } from "../../core/config/site";
import { FOOTER } from "../../core/content/copy";
import { Container } from "../../shared/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container className="flex h-20 items-center justify-between">
        <RangeLogo className="h-6 w-auto" />
        <ButtonLink variant="ghost" href={SITE.githubUrl} target="_blank" rel="noreferrer">
          {FOOTER.action}
        </ButtonLink>
      </Container>
    </footer>
  );
}
