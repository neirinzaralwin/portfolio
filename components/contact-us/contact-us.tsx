"use client";

import { motion } from "framer-motion";
import { FadeIn, Transition } from "../ui/transition";
import { ReactNode } from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import emailForm from "./email-form";

interface SocialHandle {
  _id: string;
  platform: string;
  url: string;
  imageUrl: string;
}

interface About {
  phoneNumber: string;
  address: string;
}

export interface ContactProps {
  email: string;
  social_handle: SocialHandle[];
  about: About;
}
export const ContactUs = ({ email, social_handle, about }: ContactProps) => {
  return (
    <section id="contact">
      <motion.section className="relative">
        <span className="blob size-1/2 absolute top-20 right-0 blur-[100px]" />
        <div className="p-4 md:p-8 md:px-16">
          <FadeIn>
            <div className="flex flex-row text-start mt-16">
              <div className="pr-2 text-2xl md:text-4xl font-extralight text-gray-500">
                If you interested
              </div>
              <h1 className="text-2xl md:text-4xl text-white/70 mb-5 gradient-text">
                Reach to me
              </h1>
            </div>
          </FadeIn>
          {emailForm({ email, social_handle, about })}
        </div>
        <footer className="flex items-center justify-between md:px-8 px-2 py-4 text-sm">
          <Transition>
            <div>&copy; {new Date().getFullYear()} Portfolio</div>
          </Transition>
          <Transition>
            <p>
              developed by @
              <Link
                href={"https://twitter.com/tehseen_type"}
                className="hover:underline"
              >
                neirinzaralwin
              </Link>
            </p>
          </Transition>
        </footer>
      </motion.section>
    </section>
  );
};

interface BackgroundScaleProps {
  children: ReactNode;
  className?: string;
}

export const BackgroundScale = ({
  children,
  className,
}: BackgroundScaleProps) => {
  return (
    <motion.div
      whileHover="whileHover"
      whileFocus="whileHover"
      whileTap="whileHover"
      initial="initial"
      className={cn("relative p-1 group", className)}
    >
      <motion.span
        variants={{
          initial: { scaleY: 0 },
          whileHover: { scaleY: 1 },
        }}
        className="absolute top-0 left-0 h-full w-full bg-primary -z-10 group-hover:text-black"
      />
      {children}
    </motion.div>
  );
};
