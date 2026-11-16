"use client";

import { useEffect, useRef } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/lib/gsap";

/**
 * Trailing cursor accent. Reads intent from the DOM:
 *   data-cursor="view"  → grows into a labelled disc (data-cursor-label)
 *   data-cursor="hide"  → gets out of the way (buttons animate themselves)
 *   a, button           → opens into a ring
 */
export const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    let shown = false;
    let mode = "";

    const setMode = (next: string, text = "") => {
      if (next === mode) return;
      mode = next;
      el.dataset.mode = next;
      if (label.current) label.current.textContent = text;
      const size = next === "view" ? 92 : next === "link" ? 44 : 12;
      gsap.to(el, {
        width: size,
        height: size,
        autoAlpha: next === "hide" ? 0 : 1,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!shown) {
        shown = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
      }
      const target = e.target as HTMLElement | null;
      const marked = target?.closest<HTMLElement>("[data-cursor]");
      if (marked) {
        setMode(marked.dataset.cursor ?? "", marked.dataset.cursorLabel ?? "View");
      } else if (target?.closest("a, button")) {
        setMode("link");
      } else {
        setMode("");
      }
    };

    const leave = () => {
      shown = false;
      gsap.to(el, { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={dot} className="site-cursor" aria-hidden>
      <span ref={label} className="site-cursor__label" />
    </div>
  );
};
