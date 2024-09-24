"use client";

import { BlurFadeImages } from "./image-grid";
import { SlideIn, FadeIn } from "../ui/transition";
import SkillMarquee from "./skill-marquee";

const Portfolio = () => {
  return (
    <div className="flex flex-col mx-10 md:mx-20 my-10">
      <FadeIn>
        <div className="flex flex-row text-start">
          <div className="pr-4 italic text-xl md:text-4xl font-extralight text-gray-500">
            Work-Life's
          </div>
          <h1 className="text-2xl md:text-4xl text-white/70 mb-5 gradient-text">
            Balance
          </h1>
        </div>
      </FadeIn>
      <div className="text-gray-500 w-full md:w-2/3 text-lg md:text-2xl mb-20">
        <FadeIn>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
          excepturi, perferendis delectus porro saepe dolore minima? Inventore
          alias rerum fuga. Id ab a et quos similique est excepturi doloremque
          dolorum.
        </FadeIn>
      </div>

      <FadeIn>
        <SkillMarquee />
      </FadeIn>

      <BlurFadeImages />
    </div>
  );
};

export default Portfolio;
