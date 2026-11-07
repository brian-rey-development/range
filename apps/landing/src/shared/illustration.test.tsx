import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Illustration } from "./illustration";

const ART = { src: "/illustrations/king.webp", width: 348, height: 366 } as const;

describe("Illustration", () => {
  it("is decorative and reserves its size so the layout does not shift", () => {
    const { container } = render(<Illustration art={ART} />);
    const image = container.querySelector("img");
    expect(image).toHaveAttribute("alt", "");
    expect(image).toHaveAttribute("width", String(ART.width));
    expect(image).toHaveAttribute("height", String(ART.height));
  });

  it("loads lazily unless it is above the fold", () => {
    const { container, rerender } = render(<Illustration art={ART} />);
    expect(container.querySelector("img")).toHaveAttribute("loading", "lazy");
    rerender(<Illustration art={ART} priority />);
    expect(container.querySelector("img")).toHaveAttribute("loading", "eager");
  });
});
