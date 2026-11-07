import { cx } from "../../lib/cx";
import { slotOf } from "../application/frequencies";
import type { Action } from "../types/actions";
import { FILL } from "./action-styles";

export function ActionSwatch({ action }: { readonly action: Action }) {
  return (
    <span
      aria-hidden
      className={cx("inline-block size-2 flex-none rounded-hair", FILL[slotOf(action)])}
    />
  );
}
