"use client";

import { useEffect, useRef, useState } from "react";

const IDLE_MS = 3500;

/**
 * Fixed corner cluster for the on-screen controls, shared by both displays.
 *
 * It watches for pointer/key activity and gets out of the way:
 *   • someone is using it   → fully visible, mouse cursor restored
 *   • idle, windowed        → faint, so it stays discoverable
 *   • idle, in kiosk mode   → completely invisible, nothing on the panel
 */
export default function DisplayControls({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const wake = () => {
      setActive(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setActive(false), IDLE_MS);
    };
    wake();
    window.addEventListener("mousemove", wake, { passive: true });
    window.addEventListener("keydown", wake);
    window.addEventListener("touchstart", wake, { passive: true });
    return () => {
      window.removeEventListener("mousemove", wake);
      window.removeEventListener("keydown", wake);
      window.removeEventListener("touchstart", wake);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // Only show the mouse cursor while someone is actually driving the screen.
  useEffect(() => {
    document.documentElement.classList.toggle("ui-on", active);
  }, [active]);

  return (
    <div className={`display-ui${active ? " is-active" : ""}`}>{children}</div>
  );
}
