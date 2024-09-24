import { SlideIn } from "../ui/transition";
import Meteors from "../ui/background/meteors";

const Hero = () => {
  return (
    <>
      <Meteors number={20} />
      <div className="flex flex-col justify-center items-center h-screen text-3xl md:text-6xl">
        <div className="flex flex-row text-gray-500">
          <div className="font-extralight italic pr-4">
            <SlideIn>Hello! I'm</SlideIn>
          </div>
          <SlideIn>Nei Rin Zara Lwin</SlideIn>
        </div>
        <div className="text-5xl font-extralight md:text-8xl text-white/70">
          <SlideIn className="gradient-text pb-2">Software Engineer</SlideIn>
        </div>
        <p className="text-white/70 text-base md:text-xl mt-20 break-words mx-10 text-center">
          <SlideIn className="gradient-text">
            I develop mobile & web applications integrating with data science
          </SlideIn>
        </p>
      </div>
    </>
  );
};

export default Hero;
