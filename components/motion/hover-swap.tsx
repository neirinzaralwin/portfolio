"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/utils/cn";

interface HoverSwapProps {
  children: string;
  className?: string;
}

/**
 * Character-by-character text swap on hover. Listens on the closest
 * `[data-hover-trigger]` ancestor so a whole button or link can drive it.
 */
export function HoverSwap({ children, className }: HoverSwapProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const original = el.querySelector<HTMLElement>("[data-swap-original]");
      const clone = el.querySelector<HTMLElement>("[data-swap-clone]");
      if (!original || !clone) return;

      const a = SplitText.create(original, { type: "chars" });
      const b = SplitText.create(clone, { type: "chars" });
      gsap.set(clone, { visibility: "visible" });
      gsap.set(b.chars, { yPercent: 100, opacity: 0, filter: "blur(0.2rem)" });

      const tl = gsap
        .timeline({ paused: true })
        .to(
          a.chars,
          {
            yPercent: -100,
            opacity: 0,
            filter: "blur(0.2rem)",
            stagger: 0.02,
            duration: 0.5,
            ease: "back.inOut(1.7)",
          },
          0
        )
        .to(
          b.chars,
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0rem)",
            stagger: 0.02,
            duration: 0.5,
            ease: "back.inOut(1.7)",
          },
          0.1
        );

      const host = el.closest<HTMLElement>("[data-hover-trigger]") ?? el;
      const enter = () => tl.play();
      const leave = () => tl.reverse();
      host.addEventListener("mouseenter", enter);
      host.addEventListener("mouseleave", leave);
      host.addEventListener("focus", enter);
      host.addEventListener("blur", leave);

      return () => {
        host.removeEventListener("mouseenter", enter);
        host.removeEventListener("mouseleave", leave);
        host.removeEventListener("focus", enter);
        host.removeEventListener("blur", leave);
        a.revert();
        b.revert();
      };
    },
    { scope: ref, dependencies: [children] }
  );

  return (
    <span
      ref={ref}
      className={cn("relative inline-block whitespace-nowrap", className)}
    >
      <span data-swap-original className="block">
        {children}
      </span>
      <span
        data-swap-clone
        aria-hidden
        className="invisible absolute inset-0 block"
      >
        {children}
      </span>
    </span>
  );
}
