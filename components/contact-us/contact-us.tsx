"use client";

import { motion } from "framer-motion";
import { SlideIn, FadeIn, Transition } from "../ui/transition";
import { TextReveal, SectionHeading } from "../ui/typography";
import { ReactNode } from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Input, Textarea } from "../ui/input";

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

interface ContactProps {
  email: string;
  social_handle: SocialHandle[];
  about: About;
}
export const ContactUs = ({ email, social_handle, about }: ContactProps) => {
  return (
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
        <div className="grid md:grid-cols-2 gap-10 md:pt-16">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Transition className="w-full">
                <Input
                  id="full-name"
                  placeholder="Full name"
                  className="border-0 border-b rounded-none"
                />
              </Transition>
              <Transition className="w-full">
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  className="border-0 border-b rounded-none"
                />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <Input
                  id="subject"
                  placeholder="Enter the subject"
                  className="border-0 border-b rounded-none"
                />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <Textarea
                  className="min-h-[100px] rounded-none border-0 border-b resize-none"
                  id="message"
                  placeholder="Enter your message"
                />
              </Transition>
            </div>
            <div>
              <Transition>
                <motion.button
                  whileHover="whileHover"
                  initial="initial"
                  className="border border-white/30 px-8 py-2 rounded-3xl relative overflow-hidden"
                >
                  <TextReveal className="uppercase">Send</TextReveal>
                </motion.button>
              </Transition>
            </div>
          </div>
          <div className="md:justify-self-end flex flex-col">
            <div className="pb-4">
              <Transition>
                <span className="text-gray-500">Get in touch</span>
              </Transition>
              <div className="text-2xl md:text-4xl font-bold py-2 gradient-text">
                {email}
              </div>
              <Transition>
                <div className="pb-1 text-gray-500">{about.phoneNumber}</div>
              </Transition>
              <Transition>
                <div className="text-gray-500">{about.address}</div>
              </Transition>
            </div>

            <div className="flex md:gap-8 gap-4 mt-auto md:pb-16">
              {social_handle.map((social, index) => (
                <Transition
                  key={social._id}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Link href={social.url}>
                    <TextReveal>{social.platform}</TextReveal>
                  </Link>
                </Transition>
              ))}
            </div>
          </div>
        </div>
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
