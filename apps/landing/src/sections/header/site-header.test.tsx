import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { NAV_LINKS } from "../../core/config/navigation";
import { SITE } from "../../core/config/site";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("links to every section and to GitHub, and offers a skip link", () => {
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const link of NAV_LINKS) {
      expect(within(nav).getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href,
      );
    }
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", SITE.githubUrl);
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
  });

  it("opens and closes the mobile menu with the button and Escape", async () => {
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: "Menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getAllByRole("navigation")).toHaveLength(1);

    await userEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("navigation")).toHaveLength(2);

    await userEvent.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getAllByRole("navigation")).toHaveLength(1);
  });

  it("closes the mobile menu after choosing a section", async () => {
    render(<SiteHeader />);
    await userEvent.click(screen.getByRole("button", { name: "Menu" }));
    const menu = screen.getAllByRole("navigation")[1];
    expect(menu).toBeDefined();
    await userEvent.click(within(menu as HTMLElement).getByRole("link", { name: "Coach" }));
    expect(screen.getAllByRole("navigation")).toHaveLength(1);
  });
});
