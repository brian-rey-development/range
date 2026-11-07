import type { Art } from "../../shared/illustration";

type ArtFile = { readonly name: string; readonly width: number; readonly height: number };

function art({ name, width, height }: ArtFile): Art {
  return { src: `/illustrations/${name}.webp`, width, height };
}

export const ART = {
  coach: art({ name: "coach", width: 478, height: 434 }),
  king: art({ name: "king", width: 476, height: 485 }),
} as const;
