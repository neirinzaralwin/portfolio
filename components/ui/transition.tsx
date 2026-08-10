"use client";

import { cn } from "@/utils/cn";
import { HTMLMotionProps, motion } from "framer-motion";

const defaultViewport = { once: true, amount: 0.2 as const };

export const SlideIn = ({
  className,
  initial,
  whileInView,
  transition,
  viewport,
  ...rest
}: HTMLMotionProps<"span">) => {
  const init = initial ? initial : { opacity: 0, y: "100%" };
  const inView = whileInView ? whileInView : { opacity: 1, y: 0 };
  const trans = transition ? transition : { duration: 0.4, delay: 0 };

  return (
    <motion.span
      initial={init}
      whileInView={inView}
      transition={trans}
      viewport={viewport ? viewport : defaultViewport}
      className={cn("inline-block overflow-hidden", className)}
      {...rest}
    />
  );
};

export const Transition = ({
  initial,
  whileInView,
  transition,
  viewport,
  ...rest
}: HTMLMotionProps<"div">) => {
  const init = initial ? initial : { opacity: 0 };
  const inView = whileInView ? whileInView : { opacity: 1 };
  const trans = transition ? transition : { duration: 0.4, delay: 0 };

  return (
    <motion.div
      initial={init}
      whileInView={inView}
      transition={trans}
      viewport={viewport ? viewport : defaultViewport}
      {...rest}
    />
  );
};

export const FadeIn = ({
  children,
  transition,
  viewport,
  ...rest
}: HTMLMotionProps<"div">) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={transition ?? { duration: 0.35, delay: 0 }}
      viewport={viewport ?? defaultViewport}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
