"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/section-title";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { CanvasText } from "@/components/motion/canvas-text";
import { useInertiaHover } from "@/components/motion/use-inertia-hover";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Uttara's own greens, sampled from its brand artwork.
const GREENS = ["#8fd16a", "#4f8f3c", "#c9efae", "#2f6a2c"];

function UttaraMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 95 95" className={className} fill="currentColor" aria-hidden>
      <path d="M30.1628 14.026C30.1762 9.59834 26.5905 6 22.1628 6H8C3.58172 6 0 9.58172 0 14V72.7333C0 74.855 0.842855 76.8899 2.34315 78.3901L16.0868 92.1338C17.5871 93.6341 19.622 94.477 21.7437 94.477H80.993C85.4113 94.477 88.993 90.8953 88.993 86.477V72.984C88.993 68.5657 85.4113 64.984 80.993 64.984H38.0332C33.6055 64.984 30.0199 61.3857 30.0332 56.958C30.0808 41.1917 30.1152 29.7923 30.1628 14.026Z" />
      <path d="M63 36C60.7909 36 59 34.2091 59 32V9.65307C59 6.08998 63.3075 4.30507 65.8276 6.82385L77.6836 18.6732L88.1765 29.1724C90.6952 31.6926 88.9103 36 85.3472 36H63Z" />
    </svg>
  );
}

/**
 * Teaser for Uttara. It is not public yet, so this section only hints:
 * brand, one line, no product details.
 */
export default function UttaraShowcase() {
  const root = useRef<HTMLElement>(null);
  const icon = useRef<HTMLDivElement>(null);
  useInertiaHover(icon, { power: 18, rotate: 12 });

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // The artwork opens from a narrow slit and drifts against the scroll.
      gsap.fromTo(
        "[data-uttara-frame]",
        { clipPath: "inset(22% 18% 22% 18% round 2rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-uttara-frame]",
            start: "top 95%",
            end: "top 40%",
            scrub: 0.6,
          },
        }
      );
      gsap.fromTo(
        "[data-uttara-art]",
        { scale: 1.25, yPercent: -6 },
        {
          scale: 1.05,
          yPercent: 6,
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
        "[data-uttara-glow]",
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
      gsap.from("[data-uttara-icon]", {
        y: 80,
        rotate: -18,
        autoAlpha: 0,
        duration: 1.6,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-uttara-frame]",
          start: "top 60%",
          once: true,
        },
      });
      // The mark draws attention with a slow breathing glow.
      gsap.to("[data-uttara-mark]", {
        filter: "drop-shadow(0 0 22px rgba(143,209,106,0.75))",
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: root }
  );

  return (
    <section
      id="uttara"
      ref={root}
      className="relative w-full overflow-hidden px-4 py-20 sm:px-6 md:px-20 md:py-32"
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <SectionTitle light="Upcoming" emphasis="project" />

        <div className="relative mt-10 grid grid-cols-1 items-center gap-12 md:mt-14 lg:grid-cols-12 lg:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Reveal>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8fd16a] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8fd16a]" />
                </span>
                Coming soon
              </div>
            </Reveal>

            <Reveal
              as="h3"
              className="display flex items-center gap-[0.22em] text-[clamp(4rem,10vw,8.5rem)] text-white"
            >
              <span data-uttara-mark className="inline-block">
                <UttaraMark className="h-[0.72em] w-[0.72em]" />
              </span>
              <CanvasText text="uttara" colors={GREENS} />
            </Reveal>
            <SplitReveal
              as="p"
              delay={0.2}
              className="heading mt-6 text-2xl text-white/90 md:text-3xl"
            >
              Co-founder. A new platform for locals.
            </SplitReveal>
            <SplitReveal
              as="p"
              delay={0.35}
              className="mt-6 max-w-md text-sm leading-relaxed text-white/55 md:text-base"
            >
              Something for the shops around the corner and the people who buy
              from them. That&apos;s all I can say for now — more soon.
            </SplitReveal>
          </div>

          <div className="relative order-1 w-full lg:order-2 lg:col-span-7">
            <div
              data-uttara-glow
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[130%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(79,143,60,0.34), rgba(47,106,44,0.14) 55%, transparent)",
              }}
            />
            <div
              data-uttara-frame
              className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.5rem]"
            >
              <div data-uttara-art className="absolute inset-0">
                <Image
                  src="/assets/uttara/uttara-wordmark-wide.webp"
                  alt="Uttara wordmark on a dark green glow"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div
              data-uttara-icon
              className="absolute -bottom-8 -left-3 w-24 sm:w-32 md:-bottom-10 md:-left-8 md:w-40"
            >
              <div
                ref={icon}
                className="overflow-hidden rounded-[22%] shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)]"
              >
                <Image
                  src="/assets/uttara/uttara-app-icon.webp"
                  alt="Uttara app icon"
                  width={320}
                  height={320}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
