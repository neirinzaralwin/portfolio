"use client";

import React, { useRef } from "react";
import { CountUp } from "@/components/motion/count-up";
import { SectionTitle } from "@/components/ui/section-title";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { GridBackdrop, WireArt } from "@/components/art/wire-art";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
const PROJECTS = 15;
/** Two journal papers and one book chapter — see the Research section. */
const PUBLICATIONS = [
  { where: "Journal article", when: "2025" },
  { where: "Journal article", when: "2026" },
  { where: "Springer chapter", when: "Forthcoming" },
];

export const StatsUI = () => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
      tl.fromTo(
        "[data-stat-card]",
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.3,
          stagger: 0.14,
          ease: "power3.out",
          clearProps: "filter,transform",
        }
      )
        // Years: the axis fills, ticks land one by one.
        .fromTo(
          "[data-years-fill]",
          { scaleX: 0 },
          { scaleX: 1, duration: 2, ease: "power3.inOut" },
          0.4
        )
        .fromTo(
          "[data-year]",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" },
          0.5
        )
        // Projects: tiles light up in order.
        .fromTo(
          "[data-tile]",
          { opacity: 0.15, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.07,
            ease: "back.out(2)",
            clearProps: "transform",
          },
          0.6
        )
        // Publications: the three entries land one by one.
        .fromTo(
          "[data-pub]",
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, duration: 0.7, stagger: 0.16, ease: "power3.out" },
          0.7
        );
    },
    { scope: root }
  );

  return (
    <section className="w-full px-4 pt-20 sm:px-6 md:px-20 md:pt-32">
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle light="Career" emphasis="snapshot" />

        <div ref={root} className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Years of experience */}
          <div data-stat-card className="lg:col-span-5">
            <SpotlightCard
              color="var(--ocean)"
              className="group flex h-full min-h-[17rem] flex-col justify-between overflow-hidden p-6 md:min-h-[21rem] md:p-8"
            >
              <GridBackdrop className="absolute inset-0 -z-10" />
              <WireArt
                shape="sphere"
                color="102,142,171"
                className="pointer-events-none absolute -right-16 -top-16 -z-10 h-72 w-72 opacity-70 transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
              />
              <div>
                <div className="display text-[clamp(5rem,10vw,9rem)] text-white">
                  <CountUp to={5} suffix="+" className="tabular-nums" />
                </div>
                <p className="mt-1 text-sm text-white/45 md:text-base">Years of</p>
                <p className="text-base text-white/90 md:text-lg">
                  Professional Experience
                </p>
              </div>
              <div className="mt-10">
                <div className="relative h-px w-full bg-white/12">
                  <div
                    data-years-fill
                    className="absolute inset-0 origin-left bg-gradient-to-r from-[var(--ocean)] to-[var(--sage)]"
                  />
                </div>
                <div className="mt-3 flex justify-between text-[11px] text-white/45 tabular-nums">
                  {YEARS.map((y, i) => (
                    <span key={y} data-year className="relative">
                      <span className="absolute -top-[15px] left-1/2 h-[7px] w-px -translate-x-1/2 bg-white/40" />
                      {i === 0 || i === YEARS.length - 1 ? y : `’${String(y).slice(2)}`}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Projects delivered */}
          <div data-stat-card className="lg:col-span-4">
            <SpotlightCard
              color="var(--sage)"
              className="group flex h-full min-h-[17rem] flex-col justify-between p-6 md:min-h-[21rem] md:p-8"
            >
              <div>
                <div className="display text-[clamp(5rem,10vw,9rem)] text-white">
                  <CountUp to={PROJECTS} suffix="+" className="tabular-nums" />
                </div>
                <p className="mt-1 text-sm text-white/45 md:text-base">
                  Projects Delivered for
                </p>
                <p className="text-base text-white/90 md:text-lg">
                  Mobile and Web Applications
                </p>
              </div>
              <div className="mt-10 grid grid-cols-8 gap-1.5">
                {Array.from({ length: PROJECTS }, (_, i) => (
                  <span
                    key={i}
                    data-tile
                    className="aspect-square rounded-[5px] transition-[transform,filter] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:brightness-150"
                    style={{
                      background: `color-mix(in srgb, var(--sage) ${
                        28 + Math.round((i / (PROJECTS - 1)) * 72)
                      }%, #1c1b1f)`,
                    }}
                  />
                ))}
                <span
                  data-tile
                  className="grid aspect-square place-items-center rounded-[5px] border border-dashed border-white/30 text-xs text-white/60"
                >
                  +
                </span>
              </div>
            </SpotlightCard>
          </div>

          {/* Research publications */}
          <div data-stat-card className="lg:col-span-3">
            <SpotlightCard
              color="var(--lavender)"
              className="group flex h-full min-h-[15rem] flex-col justify-between p-6 md:min-h-[21rem] md:p-8"
            >
              <div>
                <div className="display text-[clamp(5rem,10vw,9rem)] text-white">
                  <CountUp to={PUBLICATIONS.length} className="tabular-nums" />
                </div>
                <p className="mt-1 text-sm text-white/45 md:text-base">Research</p>
                <p className="text-base text-white/90 md:text-lg">Publications</p>
              </div>
              <ul className="mt-10 space-y-2">
                {PUBLICATIONS.map((pub) => (
                  <li
                    key={pub.where + pub.when}
                    data-pub
                    className="flex items-center justify-between gap-3 border-t border-white/10 pt-2 text-xs text-white/60 transition-colors duration-500 group-hover:border-[color-mix(in_srgb,var(--lavender)_45%,transparent)]"
                  >
                    <span className="flex items-center gap-2 text-white/85">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--lavender)]" />
                      {pub.where}
                    </span>
                    <span className="tabular-nums">{pub.when}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
