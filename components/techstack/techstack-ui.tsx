"use client";

import ExperienceMatrix from "./experience-matrix";
import TechStackAnimationWheel from "./techstack-animation-wheel";
import { SectionTitle } from "@/components/ui/section-title";

const TechStackUI = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-20 py-12 md:py-24">
      <div className="w-full max-w-7xl mx-auto">
        <ExperienceMatrix />
        <div className="mt-10 md:mt-16">
          <SectionTitle light="Tech" emphasis="Stack" />
          <TechStackAnimationWheel />
        </div>
      </div>
    </section>
  );
};

export default TechStackUI;
