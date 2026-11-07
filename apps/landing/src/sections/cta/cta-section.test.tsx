import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SITE } from "../../core/config/site";
import { CTA } from "../../core/content/copy";
import { CtaSection } from "./cta-section";

describe("CtaSection", () => {
  it("points the one action at GitHub", () => {
    render(<CtaSection />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(CTA.title);
    expect(screen.getByRole("link", { name: CTA.action })).toHaveAttribute("href", SITE.githubUrl);
  });
});
