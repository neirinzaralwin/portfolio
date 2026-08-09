"use client";

import { FadeIn, Transition } from "../ui/transition";
import { SectionTitle } from "../ui/section-title";
import Link from "next/link";
import EmailForm from "./email-form";

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
    <section id="contact" className="relative overflow-hidden pb-28 md:pb-0">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, #668eab33 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-4 sm:px-6 py-16 md:px-8 md:py-28">
        <div className="w-full text-center">
          <SectionTitle
            light="Let's"
            emphasis="Connect"
            className="justify-center"
          />
          <FadeIn>
            <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500 md:text-base px-1">
              Open to collaborations, product builds, and interesting
              opportunities. Send a note and I&apos;ll get back to you.
            </p>
          </FadeIn>
        </div>

        <div className="mt-8 w-full md:mt-14">
          <EmailForm
            email={email}
            social_handle={social_handle}
            about={about}
          />
        </div>
      </div>

      <footer className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 px-4 py-4 text-xs sm:text-sm text-gray-500 md:px-8">
        <Transition>
          <div>&copy; {new Date().getFullYear()} Nei Rin Zara Lwin</div>
        </Transition>
        <Transition>
          <p>
            Built by{" "}
            <Link
              href="https://github.com/neirinzaralwin"
              className="text-white/70 transition-colors hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              @neirinzaralwin
            </Link>
          </p>
        </Transition>
      </footer>
    </section>
  );
};
