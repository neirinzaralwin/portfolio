"use client";

import Marquee from "../ui/marquee";

const reviews = [
  "Flutter",
  "Dart",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "Fastify",
  "Python",
  "TensorFlow",
  "Machine Learning",
  "Firebase",
  "MongoDB",
  "MySQL",
  "Stripe",
  "Tailwind CSS",
  "Java",
  "Spring Boot",
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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
    </div>
  );
};

export default SkillMarquee;
