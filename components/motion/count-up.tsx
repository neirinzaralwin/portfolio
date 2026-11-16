"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface CountUpProps {
  to: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function CountUp({ to, suffix = "", className, duration = 2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const state = { v: 0 };
      el.textContent = `0${suffix}`;
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () =>
          gsap.to(state, {
            v: to,
            duration,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = `${Math.round(state.v)}${suffix}`;
            },
          }),
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {to}
      {suffix}
    </span>
  );
}
