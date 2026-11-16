"use client";

import { CSSProperties, ReactNode, useRef } from "react";
import { SplitReveal } from "@/components/motion/split-reveal";
import { useInertiaHover } from "@/components/motion/use-inertia-hover";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/utils/cn";
import {
  BackendVisual,
  DataVisual,
  MobileVisual,
} from "./visuals";

const items: {
  title: string;
  body: string;
  visual: ReactNode;
  /** Matches the segment colours of the Skill DNA bar above. */
  color: string;
  deep: string;
}[] = [
  {
    title: "Mobile apps",
    body: "Cross-platform apps, tested on real devices and shipped to both stores.",
    visual: <MobileVisual />,
    color: "var(--ocean)",
    deep: "var(--ocean-deep)",
  },
  {
    title: "Web platforms",
    body: "Interfaces and the domain-driven services behind them — payments, auctions, live sync.",
    visual: <BackendVisual />,
    color: "var(--sage)",
    deep: "var(--sage-deep)",
  },
  {
    title: "Data science & AI",
    body: "Practical AI features, from image models to agent workflows, checked with evals.",
    visual: <DataVisual />,
    color: "var(--lavender)",
    deep: "var(--lavender-deep)",
  },
];

function Tile({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // The tile gets flicked by the pointer and coasts back, like a physical chip.
  useInertiaHover(ref, { power: 20, rotate: 14 });
  return (
    <div ref={ref} className="cap-tile isolate">
      <div className="cap-glow" aria-hidden />
      {children}
    </div>
  );
}

export default function Capabilities() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
      tl.from("[data-cap-rule]", {
        scaleY: 0,
        duration: 1.5,
        stagger: 0.12,
        ease: "power4.inOut",
      })
        .from(
          "[data-cap-visual]",
          {
            opacity: 0,
            scale: 0.8,
            y: 40,
            filter: "blur(10px)",
            duration: 1.5,
            stagger: 0.14,
            ease: "power3.out",
            clearProps: "filter,transform",
          },
          0.1
        )
        .from(
          "[data-cap-copy]",
          {
            opacity: 0,
            y: 28,
            filter: "blur(6px)",
            duration: 1.2,
            stagger: 0.14,
            ease: "power3.out",
            clearProps: "filter,transform",
          },
          0.35
        );
    },
    { scope: root }
  );

  return (
    <div className="mt-20 md:mt-32">
      <SplitReveal
        as="h3"
        className="heading mb-12 max-w-[18ch] text-[clamp(1.75rem,3.6vw,3.25rem)] text-white md:mb-20"
      >
        Three disciplines, one engineer across the whole product.
      </SplitReveal>

      <div
        ref={root}
        className="grid grid-cols-1 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item, i) => {
          const flipped = i % 2 === 1;
          return (
            <article
              key={item.title}
              className="cap-card relative flex flex-col gap-10 px-0 sm:px-8 lg:px-10 lg:first:pl-0 lg:last:pr-0"
              style={
                { "--cap": item.color, "--cap-deep": item.deep } as CSSProperties
              }
            >
              {i > 0 && (
                <div
                  data-cap-rule
                  aria-hidden
                  className={cn(
                    "absolute inset-y-0 left-0 hidden w-px origin-top bg-white/10 lg:block",
                    i % 2 === 1 && "sm:block"
                  )}
                />
              )}
              <div
                data-cap-visual
                className={cn(
                  "flex justify-center py-4",
                  flipped && "lg:order-2"
                )}
              >
                <Tile>{item.visual}</Tile>
              </div>
              <div
                data-cap-copy
                className={cn("text-center lg:text-left", flipped && "lg:order-1")}
              >
                <h4 className="cap-title heading text-2xl text-white md:text-[1.75rem]">
                  {item.title}
                </h4>
                <p className="mx-auto mt-3 max-w-[26ch] text-sm leading-relaxed text-white/55 md:text-base lg:mx-0">
                  {item.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
