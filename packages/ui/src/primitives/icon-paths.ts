export type IconShape =
  | { readonly kind: "path"; readonly d: string }
  | { readonly kind: "circle"; readonly cx: number; readonly cy: number; readonly r: number }
  | { readonly kind: "dashed"; readonly cx: number; readonly cy: number; readonly r: number }
  | { readonly kind: "dot"; readonly cx: number; readonly cy: number; readonly r: number }
  | {
      readonly kind: "rect";
      readonly x: number;
      readonly y: number;
      readonly w: number;
      readonly h: number;
      readonly rx: number;
    };

const path = (d: string): IconShape => ({ kind: "path", d });
const circle = (cx: number, cy: number, r: number): IconShape => ({ kind: "circle", cx, cy, r });

export const ICONS = {
  "arrow-up": [path("M8 12.5v-9"), path("M4 7.5l4-4 4 4")],
  check: [path("M3.5 8.5l3 3 6-7")],
  x: [path("M4.5 4.5l7 7M11.5 4.5l-7 7")],
  "chevron-left": [path("M9.5 3.5L5 8l4.5 4.5")],
  "chevron-right": [path("M6.5 3.5L11 8l-4.5 4.5")],
  "chevron-down": [path("M3.5 6l4.5 4.5L12.5 6")],
  play: [path("M5 3.5v9l7-4.5z")],
  pause: [path("M5.5 3.5v9M10.5 3.5v9")],
  "step-back": [path("M11.5 4v8L6 8z"), path("M4 4v8")],
  "step-forward": [path("M4.5 4v8L10 8z"), path("M12 4v8")],
  eye: [path("M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z"), circle(8, 8, 2)],
  "eye-off": [
    path(
      "M6.2 3.8A6.7 6.7 0 0 1 8 3.5C12 3.5 14.5 8 14.5 8a12 12 0 0 1-1.8 2.4M10 11.9a6 6 0 0 1-2 .6C4 12.5 1.5 8 1.5 8a12 12 0 0 1 2.6-3",
    ),
    path("M2.5 2.5l11 11"),
  ],
  memory: [path("M4.5 2.5h7v11L8 11l-3.5 2.5z")],
  pattern: [path("M2.5 11.5l3-3 2.5 2.5 5.5-6"), path("M10 5h3.5v3.5")],
  pace: [circle(8, 8.5, 5), path("M8 8.5V6M6.5 2h3")],
  preference: [path("M3 4.5h10M3 8h6M3 11.5h8")],
  tool: [
    path(
      "M9.8 2.7a3.2 3.2 0 0 0-3.4 4.4l-3.6 3.6a1.3 1.3 0 0 0 1.9 1.9l3.6-3.6a3.2 3.2 0 0 0 4.4-3.4l-1.9 1.9-1.6-.3-.3-1.6z",
    ),
  ],
  agent: [circle(8, 8, 2.5), path("M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3")],
  model: [path("M3 3.5h10v7H7.5L4.5 13v-2.5H3z")],
  engine: [circle(8, 8, 5.5), path("M5.6 8.1l1.6 1.6 3.2-3.4")],
  heuristic: [{ kind: "dashed", cx: 8, cy: 8, r: 5.5 }, path("M8 5.5v3"), path("M8 10.75v.01")],
  info: [circle(8, 8, 6), path("M8 7.5V11"), path("M8 5.2v.01")],
  undo: [path("M5.5 5.5H10a3 3 0 0 1 0 6H6.5"), path("M7.5 3L5 5.5 7.5 8")],
  more: [path("M3.5 8h.01M8 8h.01M12.5 8h.01")],
  pencil: [path("M10.5 2.8l2.7 2.7L6 12.7H3.3V10z")],
  clock: [circle(8, 8, 5.5), path("M8 5v3l2 1.5")],
  drill: [circle(8, 8, 5.5), circle(8, 8, 2)],
  hand: [
    { kind: "rect", x: 2.5, y: 4, w: 6.5, h: 9, rx: 1.2 },
    path("M9 4.6l3.2.9a1.2 1.2 0 0 1 .8 1.5l-1.7 6a1.2 1.2 0 0 1-1.5.8L9 13.4"),
  ],
  chart: [path("M3 13V9M6.3 13V5M9.6 13V7.5M13 13V3")],
  settings: [path("M3 5h6M12 5h1M3 11h1M7 11h6"), circle(10.5, 5, 1.5), circle(5.5, 11, 1.5)],
  search: [circle(7, 7, 4.5), path("M10.5 10.5l3 3")],
  plus: [path("M8 3.5v9M3.5 8h9")],
  dot: [{ kind: "dot", cx: 8, cy: 8, r: 2.5 }],
} as const satisfies Record<string, readonly IconShape[]>;

export type IconName = keyof typeof ICONS;
