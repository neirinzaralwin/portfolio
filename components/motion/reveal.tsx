"use client";

import { ElementType, ReactNode, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { cn } from "@/utils/cn";

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Animate each direct child in sequence instead of the wrapper. */
  group?: boolean;
  delay?: number;
  stagger?: number;
  y?: number;
  duration?: number;
  start?: string;
  intro?: boolean;
  id?: string;
}

/** Fade + rise + de-blur. The block-level counterpart to SplitReveal. */
export function Reveal({
  as,
  children,
  className,
  group = false,
  delay = 0,
  stagger = 0.12,
  y = 36,
  duration = 1.2,
  start = "top 88%",
  intro = false,
  id,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const targets = group ? Array.from(el.children) : [el];
      gsap.set(targets, { opacity: 0, y, filter: "blur(8px)" });

      const play = contextSafe!(() => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          delay,
          stagger,
          ease: "power3.out",
          clearProps: "filter,transform",
        });
      });

      if (intro) {
        return onIntroDone(play);
      }
      ScrollTrigger.create({ trigger: el, start, once: true, onEnter: play });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  start?: string;
}

/** Wipes media in from the bottom while the content settles from a zoom. */
export function ImageReveal({
  children,
  className,
  delay = 0,
  start = "top 88%",
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const inner = el?.firstElementChild;
      if (!el || !inner || prefersReducedMotion()) return;

      gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(inner, { scale: 1.3 });

      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => {
          gsap.to(el, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            delay,
            ease: "power4.inOut",
            clearProps: "clipPath",
          });
          gsap.to(inner, {
            scale: 1,
            duration: 1.9,
            delay,
            ease: "power3.out",
            clearProps: "transform",
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div className="h-full w-full will-change-transform">{children}</div>
    </div>
  );
}
