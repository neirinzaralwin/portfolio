"use client";

import { useRef } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { CountUp } from "@/components/motion/count-up";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const categories = [
  { label: "Mobile", percent: 40 },
  { label: "Web", percent: 30 },
  { label: "Data Science", percent: 30 },
];

/** Same brand gradients as the main portfolio DNA bar */
const colors = [
  "bg-gradient-to-r from-[#668eab] to-[#003862]",
  "bg-gradient-to-r from-[#97b999] to-[#005972]",
  "bg-gradient-to-r from-[#aab5e5] to-[#432e5b]",
] as const;

const ExperienceMatrix = () => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
      // The bar grows segment by segment, each label landing as its
      // segment arrives, then a sheen runs the full length.
      tl.fromTo(
        "[data-dna-seg]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.3,
          stagger: 0.2,
          ease: "power4.inOut",
          clearProps: "transform",
        }
      )
        .fromTo(
          "[data-dna-label]",
          { opacity: 0, y: 16, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.2,
            ease: "power3.out",
            clearProps: "filter,transform",
          },
          0.25
        )
        .fromTo(
          "[data-dna-sheen]",
          { xPercent: -120 },
          { xPercent: 520, duration: 1.8, ease: "power2.inOut" },
          1.2
        );
    },
    { scope: root }
  );

  return (
    <div>
      <SectionTitle light="Skill" emphasis="DNA" />

      <div ref={root}>
        <div className="mb-3 flex w-full gap-1">
          {categories.map((cat) => (
            <div
              key={cat.label}
              data-dna-label
              className="flex min-w-0 flex-col items-start pr-1"
              style={{ width: `${cat.percent}%` }}
            >
              <span className="w-full truncate text-xs text-white/45 md:text-sm">
                {cat.label}
              </span>
              <span className="text-lg font-medium text-white/90 md:text-2xl">
                <CountUp to={cat.percent} suffix="%" duration={1.6} />
              </span>
            </div>
          ))}
        </div>

        <div className="relative flex h-12 w-full gap-1 overflow-hidden rounded-md md:h-16">
          {categories.map((cat, idx) => (
            <div
              key={cat.label}
              className="group h-full"
              style={{ width: `${cat.percent}%` }}
              title={`${cat.label} ${cat.percent}%`}
            >
              <div
                data-dna-seg
                className={`h-full origin-left rounded-md ${colors[idx]} transition-[filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:brightness-125`}
              />
            </div>
          ))}
          <div
            data-dna-sheen
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1/5 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            style={{ transform: "translateX(-120%)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceMatrix;
