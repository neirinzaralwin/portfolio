"use client";

import { RefObject, useEffect } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/lib/gsap";
import { pointerDelta, trackPointer } from "@/lib/pointer";

const clamp = gsap.utils.clamp(-600, 600);

/**
 * Throws the element in the direction the pointer entered from, then lets it
 * coast back to rest with a small rotational wobble.
 */
export function useInertiaHover<T extends HTMLElement>(
  ref: RefObject<T>,
  { power = 10, rotate = 10 }: { power?: number; rotate?: number } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    trackPointer();

    const enter = () => {
      const tl = gsap.timeline({ onComplete: () => void tl.kill() });
      tl.timeScale(1.2);
      tl.to(el, {
        inertia: {
          x: { velocity: clamp(pointerDelta.x * power), end: 0 },
          y: { velocity: clamp(pointerDelta.y * power), end: 0 },
        },
      });
      tl.fromTo(
        el,
        { rotate: 0 },
        {
          duration: 0.4,
          rotate: (Math.random() - 0.5) * rotate,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        },
        "<"
      );
    };

    el.addEventListener("mouseenter", enter);
    return () => {
      el.removeEventListener("mouseenter", enter);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "transform" });
    };
  }, [ref, power, rotate]);
}
