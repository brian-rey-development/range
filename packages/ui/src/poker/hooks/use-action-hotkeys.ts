import { useEffect } from "react";

import type { ActionOption } from "../types/actions";

const TYPING_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

type HotkeyOptions = {
  readonly actions: readonly ActionOption[];
  readonly onAction?: ((action: ActionOption) => void) | undefined;
  readonly hotkeys?: boolean | undefined;
  readonly disabled?: boolean | undefined;
};

function isTyping(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement && (target.isContentEditable || TYPING_TAGS.has(target.tagName))
  );
}

function findAction(actions: readonly ActionOption[], event: KeyboardEvent) {
  if (event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) {
    return undefined;
  }
  const key = event.key.toLowerCase();
  return actions.find((action) => !action.disabled && action.hotkey?.toLowerCase() === key);
}

export function useActionHotkeys({ actions, onAction, hotkeys, disabled }: HotkeyOptions) {
  const enabled = Boolean(hotkeys) && !disabled;

  useEffect(() => {
    if (!enabled || !onAction) {
      return undefined;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      const match = findAction(actions, event);
      if (match) {
        event.preventDefault();
        onAction(match);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [actions, onAction, enabled]);
}
