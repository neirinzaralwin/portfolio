"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * Drives a looping scene: returns a step index that advances every `ms`
 * while the referenced element is on screen, and rests on `restAt` for
 * reduced-motion users.
 */
export function useStep<T extends HTMLElement>(
  count: number,
  ms = 1200,
  restAt = count - 1
) {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setStep(restAt);
      return;
    }
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        clearInterval(id);
        if (entry.isIntersecting) {
          id = setInterval(() => setStep((s) => (s + 1) % count), ms);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [count, ms, restAt]);

  return { ref, step };
}
