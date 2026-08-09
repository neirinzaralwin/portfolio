"use client";

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaJs,
  FaNode,
  FaReact,
  FaPython,
  FaJava,
} from "react-icons/fa";
import {
  SiFlutter,
  SiFastify,
  SiTailwindcss,
  SiStripe,
  SiMongodb,
  SiTensorflow,
  SiDart,
  SiFirebase,
  SiMysql,
  SiOracle,
  SiExpress,
  SiNextdotjs,
  SiSpringboot,
} from "react-icons/si";
import { FadeIn } from "@/components/ui/transition";

const TECH_ICONS = [
  { Icon: FaHtml5, name: "HTML5" },
  { Icon: FaCss3Alt, name: "CSS3" },
  { Icon: FaBootstrap, name: "Bootstrap" },
  { Icon: FaJs, name: "JavaScript" },
  { Icon: SiFlutter, name: "Flutter" },
  { Icon: SiFastify, name: "Fastify" },
  { Icon: SiTailwindcss, name: "Tailwind CSS" },
  { Icon: SiStripe, name: "Stripe" },
  { Icon: SiMongodb, name: "MongoDB" },
  { Icon: SiTensorflow, name: "TensorFlow" },
  { Icon: FaPython, name: "Python" },
  { Icon: SiDart, name: "Dart" },
  { Icon: SiFirebase, name: "Firebase" },
  { Icon: SiMysql, name: "MySQL" },
  { Icon: SiOracle, name: "Oracle" },
  { Icon: FaNode, name: "Node.js" },
  { Icon: SiExpress, name: "Express" },
  { Icon: FaReact, name: "React" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: FaJava, name: "Java" },
  { Icon: SiSpringboot, name: "Spring Boot" },
];

const TechStackAnimationWheel = () => {
  return (
    <FadeIn>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4 md:py-8">
        <ScrollVelocityContainer className="w-full">
          <ScrollVelocityRow baseVelocity={1} direction={1} className="py-4">
            {TECH_ICONS.map(({ Icon, name }, idx) => (
              <div
                key={idx}
                className="mx-2 sm:mx-4 inline-flex flex-col items-center justify-center p-3 sm:p-6"
              >
                <Icon
                  size={36}
                  className="mb-2 transition-transform duration-300 hover:scale-110 text-white/70 sm:hidden"
                />
                <Icon
                  size={48}
                  className="mb-2 transition-transform duration-300 hover:scale-110 text-white/70 hidden sm:block"
                />
                <span className="text-gray-500 text-xs sm:text-sm font-extralight">
                  {name}
                </span>
              </div>
            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
      </div>
    </FadeIn>
  );
};

export default TechStackAnimationWheel;
