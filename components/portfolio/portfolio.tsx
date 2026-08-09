"use client";

import { BlurFadeImages } from "./image-grid";
import { SectionTitle } from "@/components/ui/section-title";
import FeatureProjects from "./feature_projects";

const Portfolio = () => {
  return (
    <section id="projects" className="w-full px-4 sm:px-6 md:px-20 my-12 md:my-16">
      <div className="w-full max-w-7xl mx-auto">
        <SectionTitle light="Selected" emphasis="Projects" />
        <BlurFadeImages />
        <FeatureProjects />
      </div>
    </section>
  );
};

export default Portfolio;
