import { MARK_HEIGHT, MARK_PATH, MARK_WIDTH } from "./brand-paths";

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK_WIDTH} ${MARK_HEIGHT}"><path d="${MARK_PATH}"/></svg>`;

export const MARK_MASK_IMAGE = `url("data:image/svg+xml,${encodeURIComponent(MARK_SVG)}")`;
