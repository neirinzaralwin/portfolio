"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const MOBILE_BREAKPOINT = 768;

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Lenis smooth scroll fights touch scrolling and delays
    // IntersectionObserver-based fade-ins on mobile.
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      return;
    }

    const lenis = new Lenis();

    let frameId = 0;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}
