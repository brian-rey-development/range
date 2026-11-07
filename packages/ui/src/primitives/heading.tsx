import type { ReactNode } from "react";

import { cx } from "../lib/cx";

type HeadingTag = "h1" | "h2" | "h3";
type HeadingSize = "display" | "title-1" | "title-2" | "heading";

type HeadingProps = {
  readonly as: HeadingTag;
  readonly size?: HeadingSize;
  readonly children: ReactNode;
};

const DEFAULT_SIZE: Record<HeadingTag, HeadingSize> = {
  h1: "title-1",
  h2: "title-2",
  h3: "heading",
};

const SIZE_CLASS: Record<HeadingSize, string> = {
  display: "text-display",
  "title-1": "text-title-1",
  "title-2": "text-title-2",
  heading: "text-heading",
};

export function Heading({ as: Tag, size = DEFAULT_SIZE[Tag], children }: HeadingProps) {
  return <Tag className={cx("text-ink", SIZE_CLASS[size])}>{children}</Tag>;
}
