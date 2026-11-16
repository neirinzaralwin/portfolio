"use client";

import { ComponentType } from "react";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import {
  SiAndroidstudio,
  SiClaude,
  SiGithubcopilot,
  SiGooglegemini,
  SiOllama,
  SiOpenai,
  SiXcode,
  SiZedindustries,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { MousePointer2, Wind } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

/** How the work is done — shown instead of a list of frameworks. */
const METHODS = [
  "Test-driven development",
  "Domain-driven design",
  "Human in the loop",
  "Enterprise architecture",
  "Spec-driven development",
  "Evals before release",
  "Clean architecture",
  "CI/CD",
  "Agile",
  "Code review",
];

type IconType = ComponentType<{ size?: number | string; className?: string }>;

/** The AI pair-programmers and editors in daily use. */
const TOOLS: { Icon: IconType; name: string }[] = [
  { Icon: SiClaude, name: "Claude Code" },
  { Icon: SiOpenai, name: "Codex" },
  { Icon: MousePointer2, name: "Cursor" },
  { Icon: SiGooglegemini, name: "Gemini" },
  { Icon: SiGithubcopilot, name: "GitHub Copilot" },
  { Icon: Wind, name: "Windsurf" },
  { Icon: TbBrandVscode, name: "VS Code" },
  { Icon: SiAndroidstudio, name: "Android Studio" },
  { Icon: SiXcode, name: "Xcode" },
  { Icon: SiZedindustries, name: "Zed" },
  { Icon: SiOllama, name: "Ollama" },
];

const TechStackAnimationWheel = () => {
  return (
    <Reveal>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4 md:py-8">
        <ScrollVelocityContainer className="w-full">
          <ScrollVelocityRow baseVelocity={1} direction={1} className="py-3">
            {METHODS.map((method) => (
              <span
                key={method}
                className="heading mx-5 inline-flex items-center gap-10 text-[clamp(2rem,5vw,4.25rem)] text-white/30 transition-colors duration-500 hover:text-white md:mx-7"
              >
                {method}
                <span className="h-2 w-2 rounded-full bg-[var(--sage)]" />
              </span>
            ))}
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={1} direction={-1} className="py-4">
            {TOOLS.map(({ Icon, name }) => (
              <div
                key={name}
                className="group mx-2 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-[var(--ocean)] hover:bg-white/[0.08] sm:mx-3"
              >
                <Icon
                  size={22}
                  className="text-white/60 transition-colors duration-500 group-hover:text-white"
                />
                <span className="text-sm text-white/70 transition-colors duration-500 group-hover:text-white md:text-base">
                  {name}
                </span>
              </div>
            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
      </div>
    </Reveal>
  );
};

export default TechStackAnimationWheel;
