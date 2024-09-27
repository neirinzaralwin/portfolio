"use client";

import { BlurFadeImages } from "./image-grid";
import { FadeIn } from "../ui/transition";
import SkillMarquee from "./skill-marquee";
import FeatureProjects from "./feature_projects";

const Portfolio = () => {
  return (
    <section id="projects">
      <div className="flex flex-col mx-10 md:mx-20 my-16">
        <FadeIn>
          <SkillMarquee />
        </FadeIn>

        <FadeIn>
          <div className="flex flex-row text-start mt-16">
            <div className="pr-2 text-2xl md:text-4xl font-extralight text-gray-500">
              Outshined
            </div>
            <h1 className="text-2xl md:text-4xl text-white/70 mb-5 gradient-text">
              Projects
            </h1>
          </div>
        </FadeIn>
        <BlurFadeImages />

        <FeatureProjects />
      </div>
    </section>
  );
};

export default Portfolio;
