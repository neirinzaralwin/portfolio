"use client";

import { BlurFadeImages } from "./image-grid";
import { FadeIn } from "../ui/transition";
import FeatureProjects from "./feature_projects";

const Portfolio = () => {
  return (
    <section id="projects">
      <div className="flex flex-col px-4 sm:px-6 md:px-20 my-12 md:my-16">
        <FadeIn>
          <div className="flex flex-row flex-wrap text-start">
            <div className="pr-2 text-2xl md:text-4xl font-extralight text-gray-500">
              Selected
            </div>
            <h1 className="text-2xl md:text-4xl text-white/70 mb-5 gradient-text">
              Projects
            </h1>
          </div>
        </FadeIn>
        <BlurFadeImages />
      </div>
      <FeatureProjects />
    </section>
  );
};

export default Portfolio;
