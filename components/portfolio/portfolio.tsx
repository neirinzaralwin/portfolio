"use client";

import { BlurFadeImages } from "./image-grid";
import { FadeIn } from "../ui/transition";
import SkillMarquee from "./skill-marquee";
import Image from "next/image";

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

        {/* immersive projects  */}
        <FadeIn>
          <div className="flex flex-row text-start mt-16">
            <div className="pr-2 text-2xl md:text-4xl font-extralight text-gray-500">
              Best
            </div>
            <h1 className="text-2xl md:text-4xl text-white/70 mb-5 gradient-text">
              Applications
            </h1>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <div className="relative w-full h-0 pb-[50%]">
            <Image
              src="https://scontent.fbkk22-3.fna.fbcdn.net/v/t39.30808-6/346955679_1313785589486043_1207697121383871436_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=hQIaLwuofQAQ7kNvgEC9wL1&_nc_ht=scontent.fbkk22-3.fna&_nc_gid=Abx8HM9P_3dj-Rpk_cRxuxv&oh=00_AYBfDuBl8aFY1fPrmLkCE6S-SpbvD8E9rFKJBQ12KUA0zA&oe=66FB621D"
              alt="Food.com.mm"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="relative w-full h-0 pb-[50%]">
            <Image
              src="https://www.goldsilvercentral.com.sg/wp-content/uploads/2017/02/GSAP_WebsiteElements-01.png?x10759"
              alt="Gold Silver Central"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
