import { cn } from "@/utils/cn";
import Marquee from "../ui/marquee";

const reviews = [
  "HTML5",
  "CSS3",
  "Bootstrap",
  "Javascript",
  "Flutter",
  "Dart",
  "Firebase",
  "MongoDB",
  "MYSQL",
  "Oracle",
  "NodeJs",
  "ExpressJs",
  "React",
  "NextJs",
  "Java",
  "Spring-boot",
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const SkillMarquee = () => {
  return (
    <div className="relative flex h-[150] w-full flex-col items-center justify-center overflow-hidden  md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((review, index) => (
          <div
            key={review + index}
            className="text-3xl font-bold text-gray-500"
          >
            {review.toLocaleUpperCase()}
          </div>
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((review, index) => (
          <div
            key={review + index}
            className="text-3xl font-bold text-gray-500"
          >
            {review.toLocaleUpperCase()}
          </div>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-500 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-500 dark:from-background"></div>
    </div>
  );
};

export default SkillMarquee;
