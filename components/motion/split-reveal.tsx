"use client";

import { ElementType, ReactNode, useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  SplitText,
  useGSAP,
  prefersReducedMotion,
} from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { cn } from "@/utils/cn";

type Preset = "lines" | "chars" | "words";

const PRESETS: Record<
  Preset,
  {
    type: string;
    from: gsap.TweenVars;
    to: gsap.TweenVars;
    duration: number;
    stagger: number;
    ease: string;
  }
> = {
  // Lines drift up out of a soft blur.
  lines: {
    type: "lines",
    from: { opacity: 0, yPercent: 50, filter: "blur(0.2rem)" },
    to: { opacity: 1, yPercent: 0, filter: "blur(0rem)" },
    duration: 1.5,
    stagger: 0.16,
    ease: "power2.out",
  },
  // Characters slide in from the right, over-scaled and blurred.
  chars: {
    type: "words,chars",
    from: { opacity: 0, x: "5rem", filter: "blur(0.6rem)", scale: 1.2 },
    to: { opacity: 1, x: 0, filter: "blur(0rem)", scale: 1 },
    duration: 1.4,
    stagger: 0.035,
    ease: "back.out(1.2)",
  },
  words: {
    type: "words",
    from: { opacity: 0, yPercent: 60, filter: "blur(0.3rem)" },
    to: { opacity: 1, yPercent: 0, filter: "blur(0rem)" },
    duration: 1.2,
    stagger: 0.05,
    ease: "power3.out",
  },
};

interface SplitRevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  preset?: Preset;
  /** Seconds to wait after the trigger fires. */
  delay?: number;
  stagger?: number;
  duration?: number;
  /** ScrollTrigger start position. */
  start?: string;
  /** Play after the preloader instead of on scroll (above-the-fold text). */
  intro?: boolean;
}

export function SplitReveal({
  as,
  children,
  className,
  preset = "lines",
  delay = 0,
  stagger,
  duration,
  start = "top 85%",
  intro = false,
}: SplitRevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        el.style.visibility = "visible";
        return;
      }

      const cfg = PRESETS[preset];
      let played = false;
      let cancelled = false;
      let split: SplitText | undefined;
      let trigger: ScrollTrigger | undefined;
      let offIntro: (() => void) | undefined;

      const build = () => {
        if (cancelled) return;
        split = SplitText.create(el, {
          type: cfg.type,
          autoSplit: preset === "lines",
          onSplit(self) {
            const targets =
              preset === "lines"
                ? self.lines
                : preset === "chars"
                  ? self.chars
                  : self.words;

            el.style.visibility = "visible";
            // After the reveal has played, a re-split (resize) just shows text.
            if (played) return;

            gsap.set(targets, cfg.from);
            const play = () => {
              played = true;
              gsap.to(targets, {
                ...cfg.to,
                delay,
                duration: duration ?? cfg.duration,
                stagger: stagger ?? cfg.stagger,
                ease: cfg.ease,
                clearProps: "filter",
              });
            };

            trigger?.kill();
            offIntro?.();
            if (intro) {
              offIntro = onIntroDone(play);
            } else {
              trigger = ScrollTrigger.create({
                trigger: el,
                start,
                once: true,
                onEnter: play,
              });
            }
          },
        });
      };

      document.fonts.ready.then(build);

      return () => {
        cancelled = true;
        offIntro?.();
        trigger?.kill();
        split?.revert();
      };
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={cn("split-reveal", className)}>
      {children}
    </Tag>
  );
}
