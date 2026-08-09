"use client";

import { FadeIn } from "@/components/ui/transition";
import { cn } from "@/utils/cn";

interface SectionTitleProps {
  light: string;
  emphasis: string;
  className?: string;
}

export function SectionTitle({ light, emphasis, className }: SectionTitleProps) {
  return (
    <FadeIn>
      <div className={cn("flex flex-row flex-wrap text-start", className)}>
        <div className="pr-2 text-2xl md:text-4xl font-extralight text-gray-500">
          {light}
        </div>
        <h2 className="text-2xl md:text-4xl text-white/70 mb-5 gradient-text">
          {emphasis}
        </h2>
      </div>
    </FadeIn>
  );
}
