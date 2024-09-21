import { TextReveal } from "../ui/typography";
import { SlideIn } from "../ui/transition";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-3xl md:text-6xl">
      <div className="flex flex-row text-gray-500">
        <div className="font-extralight italic pr-4">
          <SlideIn>hello! I'm</SlideIn>
        </div>
        <SlideIn>Nei Rin Zara Lwin</SlideIn>
      </div>
      <div className="text-5xl font-extralight md:text-8xl text-white/70">
        <SlideIn>Software Engineer</SlideIn>
      </div>
      <p className="text-white/70 text-base md:text-xl font-semibold mt-20 break-words mx-10 text-center">
        <SlideIn>
          I develop mobile & web applications integrating with data science
        </SlideIn>
      </p>
    </div>
  );
};

export default Hero;
