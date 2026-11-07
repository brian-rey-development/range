import type { ActionOption } from "../types/actions";

export function actionId({ id, action, amount }: ActionOption): string {
  return id ?? (amount ? `${action}:${amount}` : action);
}
