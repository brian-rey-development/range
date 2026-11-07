import { Button, ButtonLink, RangeLogo } from "@range/ui";
import { useEffect, useState } from "react";

import { SITE } from "../../core/config/site";
import { NAVIGATION } from "../../core/content/copy";
import { Container } from "../../shared/container";
import { NavLinks } from "./nav-links";

const MENU_ID = "mobile-menu";

function useCloseOnEscape(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  useCloseOnEscape(open, close);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <a
        href="#main"
        className="focus-ring sr-only rounded-sm bg-surface-raised px-3 py-2 text-control focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        {NAVIGATION.skip}
      </a>
      <Container className="flex h-16 items-center gap-8">
        <a href="/" aria-label="Range home" className="focus-ring rounded-sm">
          <RangeLogo className="h-8 w-auto" />
        </a>
        <nav aria-label={NAVIGATION.label} className="hidden md:block">
          <NavLinks className="flex items-center gap-1" />
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ButtonLink size="sm" href={SITE.githubUrl} target="_blank" rel="noreferrer">
            {NAVIGATION.github}
          </ButtonLink>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-expanded={open}
            aria-controls={MENU_ID}
            onClick={() => setOpen(!open)}
          >
            {open ? NAVIGATION.closeMenu : NAVIGATION.openMenu}
          </Button>
        </div>
      </Container>
      {open ? (
        <nav id={MENU_ID} aria-label={NAVIGATION.label} className="border-t border-line md:hidden">
          <Container className="py-2">
            <NavLinks className="flex flex-col" onNavigate={close} />
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
