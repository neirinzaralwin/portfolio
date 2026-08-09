"use client";

import { Transition } from "../ui/transition";
import { SectionTitle } from "@/components/ui/section-title";
import Timeline from "@/lib/interfaces/timeline";

interface ExperienceProps {
  timeline: Timeline[];
}

const Experience = ({ timeline }: ExperienceProps) => {
  const experience = timeline
    .filter((line) => !line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence);

  return (
    <section
      id="experience"
      className="relative w-full px-4 sm:px-6 md:px-20 py-12 md:py-16"
    >
      <span className="blob absolute top-[20%] left-0 w-1/3 h-5/6 blur-[100px] -z-10" />
      <div className="relative w-full max-w-7xl mx-auto">
        <SectionTitle light="Work" emphasis="Experience" />
        <div className="mt-2">
          {experience.map((exp, index) => (
            <Transition
              key={exp._id}
              className="py-4 md:py-8 border-b border-white/10"
            >
              <div className="flex items-start justify-between gap-3 md:gap-8">
                <span className="max-md:hidden pt-1">0{index + 1}</span>
                <div className="md:text-5xl text-lg sm:text-xl md:font-semibold flex-1 min-w-0 text-white/70 leading-snug">
                  {exp.jobTitle}
                </div>
                <div className="shrink-0 text-right text-xs sm:text-sm max-md:flex flex-col text-foreground/50">
                  <span className="italic">{exp.startDate}</span>
                  <span className="max-md:hidden">{" - "}</span>
                  <span className="italic">{exp.endDate}</span>
                </div>
              </div>
              <div className="md:pl-12 py-2 text-foreground/50 text-xs sm:text-sm flex items-start justify-between gap-3">
                <span className="text-gray-500 min-w-0 break-words">
                  {exp.company_name}
                </span>
                <span className="text-gray-500 shrink-0 text-right">
                  {exp.jobLocation}
                </span>
              </div>
            </Transition>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
