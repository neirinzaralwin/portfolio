"use client";

import { CSSProperties, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { brandStops } from "@/lib/brand";
import { GridBackdrop, WireArt } from "@/components/art/wire-art";

type Tone = { from: string; to: string };

const TONES: Record<string, Tone> = {
  ocean: { from: "#b9d4ea", to: brandStops.ocean.from },
  olive: { from: "#e4dfc0", to: brandStops.slateOlive.to },
  sage: { from: "#c7e2c9", to: brandStops.sage.from },
  lavender: { from: "#dfe4fb", to: brandStops.lavender.from },
};

/** The statement, in runs. A run with a tone is a highlighted method. */
const RUNS: { text: string; tone?: keyof typeof TONES }[] = [
  { text: "I build products the disciplined way:" },
  { text: "test-driven,", tone: "ocean" },
  { text: "domain-driven,", tone: "olive" },
  { text: "on" },
  { text: "enterprise-grade", tone: "sage" },
  { text: "architecture — with AI agents writing the first draft and a" },
  { text: "human in the loop", tone: "lavender" },
  { text: "on every merge." },
];

const WORDS = RUNS.flatMap((run) =>
  run.text.split(" ").map((word) => ({ word, tone: run.tone }))
);

/**
 * Pinned statement: the section holds still while each word sharpens into
 * focus, tied directly to scroll position.
 */
export function AboutMe() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");

      gsap.fromTo(
        words,
        { opacity: 0.12, filter: "blur(6px)", x: 14 },
        {
          opacity: 1,
          filter: "blur(0px)",
          x: 0,
          stagger: 0.12,
          ease: "power1.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 35%",
            end: "bottom 85%",
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        "[data-about-progress]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 35%",
            end: "bottom 85%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      id="about-me"
      ref={root}
      className="relative h-[230vh] w-full md:h-[260vh]"
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-4 sm:px-6 md:px-20">
        {/* Background art: drafting grid, a low glow, a slow wireframe form */}
        <GridBackdrop className="absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-48 -left-48 h-[40rem] w-[40rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(102,142,171,0.3), rgba(0,56,98,0.12) 60%, transparent)",
          }}
        />
        <WireArt
          shape="knot"
          className="pointer-events-none absolute -right-[18vw] top-1/2 h-[92vh] w-[92vh] -translate-y-1/2 opacity-60 md:-right-[8vw]"
        />
        <div className="relative mx-auto w-full max-w-6xl">
          <p className="heading text-[clamp(1.75rem,4.6vw,4.25rem)] text-white">
            {WORDS.map(({ word, tone }, i) => {
              const hl = tone ? TONES[tone] : undefined;
              return (
                <span key={i}>
                  <span
                    data-word
                    className={
                      hl ? "gradient-text inline-block" : "inline-block"
                    }
                    style={
                      hl
                        ? ({
                            "--gradient-from": hl.from,
                            "--gradient-to": hl.to,
                          } as CSSProperties)
                        : undefined
                    }
                  >
                    {word}
                  </span>{" "}
                </span>
              );
            })}
          </p>
          <div className="mt-10 h-px w-full bg-white/10 md:mt-14">
            <div
              data-about-progress
              className="h-full origin-left bg-[var(--accent)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
