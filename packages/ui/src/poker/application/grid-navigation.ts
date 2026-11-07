import { GRID_SIZE } from "./hands";

type Step = readonly [row: number, col: number];

const ARROW_STEP: Readonly<Record<string, Step>> = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

const clamp = (value: number) => Math.min(Math.max(value, 0), GRID_SIZE - 1);

export function moveInGrid(key: string, index: number): number | undefined {
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;
  if (key === "Home") {
    return row * GRID_SIZE;
  }
  if (key === "End") {
    return row * GRID_SIZE + GRID_SIZE - 1;
  }
  const step = ARROW_STEP[key];
  return step && clamp(row + step[0]) * GRID_SIZE + clamp(col + step[1]);
}
