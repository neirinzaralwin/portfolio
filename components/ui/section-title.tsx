"use client";

import { SplitReveal } from "@/components/motion/split-reveal";
import { cn } from "@/utils/cn";

interface SectionTitleProps {
  light: string;
  emphasis: string;
  className?: string;
}

export function SectionTitle({ light, emphasis, className }: SectionTitleProps) {
  return (
    <SplitReveal
      as="h2"
      preset="chars"
      stagger={0.03}
      className={cn(
        "heading mb-8 text-[clamp(2.25rem,5.2vw,4.5rem)] text-white md:mb-12",
        className
      )}
    >
      <span className="text-white/35">{light}</span> {emphasis}
    </SplitReveal>
  );
}
