"use client";

import { useRef } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { CanvasText } from "@/components/motion/canvas-text";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export default function VintShowcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // The film opens from a narrow slit and drifts against the scroll.
      gsap.fromTo(
        "[data-vint-frame]",
        { clipPath: "inset(18% 22% 18% 22% round 2rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 1.25rem)",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-vint-frame]",
            start: "top 95%",
            end: "top 35%",
            scrub: 0.6,
          },
        }
      );
      gsap.fromTo(
        "[data-vint-frame]",
        { yPercent: 8 },
        {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        "[data-vint-glow]",
        { scale: 0.7, opacity: 0 },
        {
          scale: 1.1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "center center",
            scrub: true,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      id="vint"
      ref={root}
      className="relative w-full overflow-hidden px-4 py-20 sm:px-6 md:px-20 md:py-32"
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <SectionTitle light="Ongoing" emphasis="project" />

        <div className="relative mt-10 grid grid-cols-1 items-center gap-12 md:mt-14 lg:grid-cols-12 lg:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#97b999] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#97b999]" />
                </span>
                In progress
              </div>
            </Reveal>

            <Reveal
              as="h3"
              className="display text-[clamp(5rem,13vw,11rem)] text-white"
            >
              <CanvasText text="Vint" />
            </Reveal>
            <SplitReveal
              as="p"
              delay={0.2}
              className="heading mt-4 text-2xl text-white/90 md:text-3xl"
            >
              Co-founder. Digital thrift-fashion marketplace for shop owners.
            </SplitReveal>
            <SplitReveal
              as="p"
              delay={0.35}
              className="mt-6 max-w-xl text-sm leading-relaxed text-white/55 md:text-base"
            >
              A structured marketplace for pre-loved fashion — listings,
              auctions, payment review, and commission billing in one place.
              Free to join; shops only pay commission on sales.
            </SplitReveal>
          </div>

          <div className="relative order-1 flex w-full justify-center lg:order-2 lg:col-span-6 lg:justify-end">
            <div
              data-vint-glow
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(102,142,171,0.35), rgba(0,89,114,0.18) 55%, transparent)",
              }}
            />
            <div
              data-vint-frame
              className="relative w-full max-w-[300px] overflow-hidden rounded-[1.25rem] sm:max-w-[340px]"
            >
              <video
                src="/assets/vint-reveal.mp4"
                className="h-auto w-full"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Vint product reveal film"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
