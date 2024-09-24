"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Transition, FadeIn } from "../ui/transition";
import { PerspectiveText } from "../ui/typography";
import Timeline from "@/lib/interfaces/timeline";
import { formatDate } from "@/lib";

interface ExperienceProps {
  timeline: Timeline[];
}

const Experience = ({ timeline }: ExperienceProps) => {
  const experience = timeline
    .filter((line) => !line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence);

  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="relative pb-20">
      <span className="blob absolute top-[20%] left-0 w-1/3 h-5/6 blur-[100px] -z-10" />
      <FadeIn>
        <div className="flex flex-row text-start mx-10 md:mx-20">
          <div className="pr-2 text-2xl md:text-4xl font-extralight text-gray-500">
            Experience
          </div>
          <h1 className="text-2xl md:text-4xl text-white/70 mb-5 gradient-text">
            History
          </h1>
        </div>
      </FadeIn>
      <div>
        {experience.map((exp, index) => (
          <Transition
            key={exp._id}
            className="py-4 px-10 md:py-8 border-b border-white/10 hover:bg-white/5 md:px-12"
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            <div className="flex items-center justify-between md:gap-8">
              <span className="max-md:hidden">0{index + 1}</span>
              <div className="md:text-5xl text-xl md:font-semibold flex-1">
                <PerspectiveText hover={hover === index}>
                  {exp.jobTitle}
                </PerspectiveText>
              </div>
              <div className="max-md:text-sm max-md:flex flex-col text-foreground/50">
                <span className="italic">
                  {formatDate(exp.startDate).month +
                    ", " +
                    formatDate(exp.startDate).year}
                </span>
                <span className="max-md:hidden">{" - "}</span>
                <span className="italic">
                  {formatDate(exp.endDate).month +
                    ", " +
                    formatDate(exp.endDate).year}
                </span>
              </div>
            </div>
            <div className="md:pl-12 py-2 text-foreground/50 max-md:text-sm flex items-center justify-between">
              <span className="text-gray-500">{exp.company_name}</span>
              <span className="text-gray-500">{exp.jobLocation}</span>
            </div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: hover === index ? "auto" : 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden md:px-12"
            >
              <p className="text-foreground/60 py-2">{exp.summary}</p>
              <ul className="list-disc list-inside">
                {exp.bulletPoints.map((point, index) => (
                  <li key={index} className="text-foreground/80 max-md:text-sm">
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </Transition>
        ))}
      </div>
    </div>
  );
};

export default Experience;
