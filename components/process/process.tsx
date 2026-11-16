"use client";

import { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { CanvasText } from "@/components/motion/canvas-text";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { cn } from "@/utils/cn";
import {
  BacklogScene,
  PipelineScene,
  RetroScene,
  ReviewScene,
  SprintScene,
  StandupScene,
} from "./scenes";

const steps: {
  title: string;
  body: string;
  scene: ReactNode;
  color: string;
  span: string;
}[] = [
  {
    title: "A backlog ranked every week",
    body: "Stories are sized and re-ordered by what users need next.",
    scene: <BacklogScene />,
    color: "var(--ocean)",
    span: "lg:col-span-2",
  },
  {
    title: "Two-week sprints",
    body: "Small tickets move left to right. Nothing sits in progress for long.",
    scene: <SprintScene />,
    color: "var(--sage)",
    span: "lg:col-span-4",
  },
  {
    title: "Stand-ups in writing",
    body: "Yesterday, today, blockers — posted before anyone joins a call.",
    scene: <StandupScene />,
    color: "var(--lavender)",
    span: "lg:col-span-3",
  },
  {
    title: "Every change gets a preview",
    body: "Lint, tests and build run on each push, ending in a link to click.",
    scene: <PipelineScene />,
    color: "var(--olive)",
    span: "lg:col-span-3",
  },
  {
    title: "Agents draft, I review",
    body: "AI writes the first pass and flags the risks. A person approves every merge.",
    scene: <ReviewScene />,
    color: "var(--ocean)",
    span: "lg:col-span-4",
  },
  {
    title: "Retros with numbers",
    body: "Burndown and velocity decide what changes next sprint.",
    scene: <RetroScene />,
    color: "var(--sage)",
    span: "lg:col-span-2",
  },
];

export default function Process() {
  return (
    <section id="process" className="w-full px-4 py-20 sm:px-6 md:px-20 md:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <Reveal
            as="h2"
            className="display text-[clamp(3rem,8vw,7.5rem)] text-white"
          >
            <span className="text-white/35">How I</span>{" "}
            <CanvasText text="ship" />
          </Reveal>
          <SplitReveal
            as="p"
            delay={0.15}
            className="max-w-sm text-base leading-relaxed text-white/55 md:text-lg"
          >
            Agile, kept small: a ranked backlog, short sprints, and a working
            build at the end of every one.
          </SplitReveal>
        </div>

        <Reveal
          group
          stagger={0.1}
          y={50}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6"
        >
          {steps.map((s) => (
            <SpotlightCard
              key={s.title}
              color={s.color}
              className={cn("group flex flex-col p-5 md:p-6", s.span)}
            >
              <div className="mb-6">{s.scene}</div>
              <h3 className="heading mt-auto text-xl text-white transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5 md:text-2xl">
                {s.title}
              </h3>
              <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-white/55">
                {s.body}
              </p>
            </SpotlightCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
