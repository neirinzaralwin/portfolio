"use client";

import ExperienceMatrix from "./experience-matrix";
import TechStackAnimationWheel from "./techstack-animation-wheel";
import Capabilities from "@/components/capabilities/capabilities";
import { SectionTitle } from "@/components/ui/section-title";
import { WireArt } from "@/components/art/wire-art";

const TechStackUI = () => {
  return (
    <section className="w-full px-4 py-20 sm:px-6 md:px-20 md:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <ExperienceMatrix />
        <Capabilities />
        <div className="relative mt-20 md:mt-32">
          <WireArt
            shape="torus"
            color="151,185,153"
            className="pointer-events-none absolute -right-10 -top-24 hidden h-80 w-80 opacity-60 md:block"
          />
          <SectionTitle light="Methods and" emphasis="tools" />
          <TechStackAnimationWheel />
        </div>
      </div>
    </section>
  );
};

export default TechStackUI;
