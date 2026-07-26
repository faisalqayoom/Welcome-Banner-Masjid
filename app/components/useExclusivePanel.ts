"use client";

import { useEffect } from "react";

const PANEL_EVENT = "display-ui-panel";

/**
 * Only one panel in the corner cluster may be open at a time.
 *
 * Each open panel floats out to the LEFT of its own button, so two open at
 * once would sit on top of each other and the lower one would swallow the
 * clicks. A window event rather than shared state or context: the pickers are
 * independent components dropped into DisplayControls in any order, and this
 * keeps them that way.
 */
export function useExclusivePanel(
  id: string,
  open: boolean,
  close: () => void,
) {
  useEffect(() => {
    if (open) {
      window.dispatchEvent(new CustomEvent(PANEL_EVENT, { detail: id }));
    }
  }, [id, open]);

  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent).detail !== id) close();
    };
    window.addEventListener(PANEL_EVENT, onOther);
    return () => window.removeEventListener(PANEL_EVENT, onOther);
  }, [id, close]);
}
