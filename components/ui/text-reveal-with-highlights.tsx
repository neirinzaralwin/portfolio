"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import {
  ComponentPropsWithoutRef,
  CSSProperties,
  FC,
  ReactNode,
  useRef,
} from "react";

import { cn } from "@/utils/cn";

export interface HighlightedWord {
  word: string;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export interface TextRevealWithHighlightsProps
  extends ComponentPropsWithoutRef<"div"> {
  text: string;
  highlights?: HighlightedWord[];
}

export const TextRevealWithHighlights: FC<TextRevealWithHighlightsProps> = ({
  text,
  highlights = [],
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const words = text.split(" ");

  const highlightMap = new Map<string, string>();
  const gradientMap = new Map<string, { from: string; to: string }>();

  const normalize = (value: string) =>
    value.toLowerCase().replace(/[.,!?;:]/g, "");

  highlights.forEach(({ word, className, gradientFrom, gradientTo }) => {
    const key = normalize(word);
    if (className) {
      highlightMap.set(key, className);
    }
    if (gradientFrom && gradientTo) {
      gradientMap.set(key, {
        from: gradientFrom,
        to: gradientTo,
      });
    }
  });

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[160vh] md:h-[200vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-[55%] md:h-[50%] max-w-4xl items-center bg-transparent px-0 py-8 md:px-[1rem] md:py-[5rem]">
        <span className="flex flex-wrap gap-y-1 p-2 sm:p-5 text-xl font-semibold text-white/15 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const cleanWord = normalize(word);
            const highlightClass = highlightMap.get(cleanWord);
            const gradientColors = gradientMap.get(cleanWord);

            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                highlightClass={highlightClass}
                gradientColors={gradientColors}
              >
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  highlightClass?: string;
  gradientColors?: { from: string; to: string };
}

const Word: FC<WordProps> = ({
  children,
  progress,
  range,
  highlightClass,
  gradientColors,
}) => {
  const opacity = useTransform(progress, range, [0, 1]);

  const gradientStyle: CSSProperties = gradientColors
    ? ({
        "--gradient-from": gradientColors.from,
        "--gradient-to": gradientColors.to,
      } as CSSProperties)
    : {};

  return (
    <span className="relative mx-0.5 sm:mx-1 lg:mx-1.5">
      <span className="absolute text-white/25">{children}</span>
      <motion.span
        style={{ opacity, ...gradientStyle }}
        className={cn("text-white/85", highlightClass)}
      >
        {children}
      </motion.span>
    </span>
  );
};
