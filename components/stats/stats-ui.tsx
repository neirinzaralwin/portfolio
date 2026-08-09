"use client";

import React from "react";
import { FadeIn } from "@/components/ui/transition";
import { SectionTitle } from "@/components/ui/section-title";

const stats = [
  {
    label: "Years of",
    second_label: "Professional Experience",
    value: "5+",
  },
  {
    label: "Projects Delivered for",
    second_label: "Mobile and Web Applications",
    value: "15+",
  },
  {
    label: "Years",
    second_label: "Old",
    value: "25",
  },
];

export const StatsUI = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-20 pt-12 md:pt-16">
      <div className="w-full max-w-7xl mx-auto">
        <SectionTitle
          light="Career"
          emphasis="Snapshot"
          className="justify-center"
        />
        <FadeIn>
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-5 md:gap-8 mt-4">
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center justify-center min-w-0">
                  <div className="text-3xl md:text-4xl font-bold mr-3 md:mr-4 shrink-0 text-white/70">
                    {stat.value}
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <div className="text-sm md:text-base text-gray-500">
                      {stat.label}
                    </div>
                    {stat.second_label && (
                      <div className="text-base md:text-lg text-white/70">
                        {stat.second_label}
                      </div>
                    )}
                  </div>
                </div>
                {index < stats.length - 1 && (
                  <>
                    <div className="hidden md:block h-16 w-px bg-white/10 mx-2" />
                    <div className="md:hidden w-16 h-px bg-white/10" />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
