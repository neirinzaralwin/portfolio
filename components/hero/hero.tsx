import { SlideIn } from "../ui/transition";
import Meteors from "../ui/background/meteors";

const Hero = () => {
  return (
    <section id="about">
      <Meteors number={20} />
      <div className="flex flex-col justify-center items-center min-h-[100svh] px-4 sm:px-6 text-center pb-24 md:pb-0">
        <div className="flex flex-row flex-wrap justify-center gap-x-2 text-base sm:text-xl md:text-4xl lg:text-5xl text-gray-500">
          <div className="font-extralight italic">
            <SlideIn>Hello! I&apos;m</SlideIn>
          </div>
          <SlideIn>Nei Rin Zara Lwin</SlideIn>
        </div>
        <div className="w-full max-w-5xl mt-2 font-extralight text-white/70 text-[1.65rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
          <SlideIn className="gradient-text block w-full pb-2 text-balance">
            AI Native Software Engineer
          </SlideIn>
        </div>
        <p className="text-white/70 text-sm sm:text-base md:text-xl mt-8 sm:mt-12 md:mt-20 break-words max-w-2xl text-center px-1">
          <SlideIn className="gradient-text">
            I build mobile and web products with modern AI workflows — from
            marketplaces and fintech to hospitality systems.
          </SlideIn>
        </p>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-500">
          <SlideIn>Now based in Bangkok, Thailand</SlideIn>
        </p>
      </div>
    </section>
  );
};

export default Hero;
