"use client";

import { useRef } from "react";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { MainButton } from "@/components/motion/main-button";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { scrollToSection } from "../smooth-scroll";
import { BackgroundBeams } from "./background-beams";
import { ThinkingGraph } from "./thinking-graph";

const Hero = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion()) return;

      // The graph fades up once the curtain lifts…
      gsap.set("[data-hero-graph]", { autoAlpha: 0, scale: 1.06 });
      const off = onIntroDone(
        contextSafe!(() => {
          gsap.to("[data-hero-graph]", {
            autoAlpha: 1,
            scale: 1,
            duration: 2.2,
            delay: 0.3,
            ease: "power3.out",
          });
        })
      );

      // …and drifts back as the page scrolls away.
      gsap.to("[data-hero-bg]", {
        yPercent: 14,
        autoAlpha: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("[data-hero-copy]", {
        yPercent: -30,
        autoAlpha: 0,
        filter: "blur(8px)",
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "70% top",
          scrub: true,
        },
      });

      return off;
    },
    { scope: root }
  );

  return (
    <section
      id="about"
      ref={root}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Backdrop: beams, then the thinking graph, then a veil for the type */}
      <div data-hero-bg className="pointer-events-none absolute inset-0">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 100%, rgba(0,89,114,0.38) 0%, rgba(0,56,98,0.22) 40%, transparent 75%)",
          }}
        />
        <BackgroundBeams className="absolute inset-0 h-full w-full opacity-70" />
        <div data-hero-graph className="absolute inset-0 hidden md:block">
          <ThinkingGraph className="absolute inset-0 overflow-hidden opacity-80" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 34% at 50% 40%, rgba(12,11,12,0.86) 0%, rgba(12,11,12,0.55) 55%, transparent 100%)",
          }}
        />
      </div>

      {/* Headline */}
      <div
        data-hero-copy
        className="relative z-10 flex flex-1 flex-col items-center px-4 pt-[19svh] text-center sm:px-6 md:pt-[17svh]"
      >
        <SplitReveal
          as="p"
          intro
          delay={0.1}
          className="mb-4 text-base text-white/60 md:mb-6 md:text-lg"
        >
          Hello, I&apos;m Nei Rin Zara Lwin
        </SplitReveal>
        <SplitReveal
          as="h1"
          preset="chars"
          intro
          delay={0.25}
          className="display max-w-[14ch] text-[clamp(3rem,9.4vw,9rem)] text-white"
        >
          AI native software engineer
        </SplitReveal>
      </div>

      {/* Footer row */}
      <div className="relative z-10 flex flex-col gap-6 px-4 pb-28 sm:px-6 md:flex-row md:items-end md:justify-between md:px-10 md:pb-10">
        <SplitReveal
          as="p"
          intro
          delay={1.1}
          className="mx-auto max-w-sm text-center text-base leading-snug text-white/70 md:mx-0 md:text-left md:text-lg"
        >
          I build mobile and web products with modern AI workflows — from
          marketplaces and fintech to hospitality systems.
        </SplitReveal>

        <Reveal intro delay={1.4} className="mx-auto md:mx-0">
          <div className="flex items-center gap-5 rounded-[1.4rem] border border-white/[0.08] bg-white/[0.06] p-2.5 pl-5 backdrop-blur-xl">
            <div className="text-left">
              <p className="flex items-center gap-2 text-sm font-medium text-white">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#97b999] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#97b999]" />
                </span>
                Open to new projects
              </p>
              <p className="mt-0.5 text-xs text-white/50">
                Now based in Bangkok, Thailand
              </p>
            </div>
            <MainButton
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
            >
              Get in touch
            </MainButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
