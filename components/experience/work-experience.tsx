"use client";

import { useRef } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { BRAND_GRADIENT_CLASSES } from "@/lib/brand";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const colors = BRAND_GRADIENT_CLASSES;
/** Light stop of each brand gradient: readable as text on the dark page. */
const DATE_COLORS = ["#8fb3cf", "#97b999", "#aab5e5", "#b1ab86"];

const timelineItems = [
  {
    date: "Dec 2024 — Feb 2026",
    title: "Senior Mobile & Full-Stack Developer",
    company: "Flying Rocket Co., Ltd.",
    companyUrl: undefined as string | undefined,
    description:
      "Built consumer marketplace and hospitality products end-to-end — auctions, payments, boutique workflows, hotel PMS, channel manager sync, and SCB Thai QR payments.",
    colorIndex: 0,
  },
  {
    date: "2022 — 2024",
    title: "Senior Mobile & Backend Developer",
    company: "GoldSilver Central",
    companyUrl: "https://www.goldsilvercentral.com.sg",
    description:
      "Led mobile and backend work on a Singapore bullion trading platform — gold-saving wallets, token exchange, multi-wallet support, market charts, chat, and TensorFlow image classification.",
    colorIndex: 1,
  },
  {
    date: "2021 — 2022",
    title: "Senior Mobile Developer",
    company: "App.com.mm",
    companyUrl: "https://app.com.mm/",
    description:
      "Shipped consumer apps across e-commerce, education, food, and travel for the Myanmar market, and helped scale the engineering team from 5 to 100 people.",
    colorIndex: 2,
  },
  {
    date: "2020 — 2021",
    title: "Junior Mobile Developer",
    company: "Tech Plus Solution",
    companyUrl: "https://techplussolution.com/",
    description:
      "Built early-career mobile products for retail and POS, including a lightweight point-of-sale system, native Fortune app migration, and color-based inventory management.",
    colorIndex: 0,
  },
  {
    date: "",
    title: "Bachelor of Computer Science",
    company: undefined as string | undefined,
    companyUrl: undefined as string | undefined,
    description: undefined as string | undefined,
    colorIndex: 3,
  },
];

export default function WorkExperience() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // The spine fills as you travel down the timeline.
      gsap.fromTo(
        "[data-tl-fill]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-tl-track]",
            start: "top 55%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-tl-item]").forEach((item) => {
        const dot = item.querySelector("[data-tl-dot]");
        const copy = item.querySelectorAll("[data-tl-copy] > *");
        const date = item.querySelector("[data-tl-date]");

        gsap.set(dot, { scale: 0.35, opacity: 0.35 });
        gsap.set(copy, { opacity: 0, x: 40, filter: "blur(8px)" });
        gsap.set(date, { opacity: 0, x: -40, filter: "blur(8px)" });

        ScrollTrigger.create({
          trigger: item,
          start: "top 62%",
          once: true,
          onEnter: () => {
            gsap.to(dot, {
              scale: 1,
              opacity: 1,
              duration: 0.9,
              ease: "back.out(2.4)",
            });
            gsap.to([date, ...Array.from(copy)], {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.2,
              stagger: 0.09,
              ease: "power3.out",
              clearProps: "filter,transform",
            });
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      id="experience"
      ref={root}
      className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:px-20 md:py-32"
    >
      <SectionTitle light="Career" emphasis="timeline" />

      <div data-tl-track className="relative mx-auto max-w-5xl">
        {/* Spine */}
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
          <div
            data-tl-fill
            className="h-full w-full origin-top bg-gradient-to-b from-[#aab5e5] via-[#668eab] to-[#97b999]"
          />
        </div>

        {timelineItems.map((item) => (
          <div
            key={`${item.date}-${item.title}`}
            data-tl-item
            className="group relative grid grid-cols-[15px_1fr] gap-x-6 py-10 md:grid-cols-[1fr_120px_1fr] md:gap-x-0 md:py-16"
          >
            <div className="col-start-2 mb-3 md:col-start-1 md:mb-0 md:text-right">
              <div
                data-tl-date
                className="heading inline-block text-xl md:sticky md:top-[45vh] md:text-[2rem]"
                style={{ color: DATE_COLORS[item.colorIndex] }}
              >
                {item.date}
              </div>
            </div>

            <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
              <div className="relative mt-1.5 md:mt-3">
                <div
                  data-tl-dot
                  className={`h-[15px] w-[15px] rounded-full ${colors[item.colorIndex]} shadow-[0_0_0_6px_#0c0b0c] transition-shadow duration-700 group-hover:shadow-[0_0_0_6px_#0c0b0c,0_0_28px_6px_rgba(170,181,229,0.55)]`}
                />
              </div>
            </div>

            <div data-tl-copy className="col-start-2 md:col-start-3">
              <h3 className="heading text-xl text-white transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2 md:text-2xl">
                {item.title}
              </h3>
              {item.company && (
                <div className="mt-3">
                  {item.companyUrl ? (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-line text-base text-[var(--accent)]"
                    >
                      {item.company}
                    </a>
                  ) : (
                    <span className="text-base text-[var(--accent)]">
                      {item.company}
                    </span>
                  )}
                </div>
              )}
              {item.description && (
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
