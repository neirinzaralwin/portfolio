"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const MOBILE_BREAKPOINT = 768;

let lenis: Lenis | null = null;

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Native scrolling stays on touch devices and for reduced-motion users;
    // ScrollTrigger works the same either way.
    if (window.innerWidth < MOBILE_BREAKPOINT || prefersReducedMotion()) {
      return;
    }

    const instance = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
    });
    lenis = instance;

    // One clock for everything: Lenis advances on GSAP's ticker and
    // ScrollTrigger re-measures on every Lenis scroll event.
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  return <>{children}</>;
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  if (lenis) {
    lenis.scrollTo(element, {
      duration: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}
