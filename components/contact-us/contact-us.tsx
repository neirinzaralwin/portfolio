"use client";

import { useRef } from "react";
import Link from "next/link";
import EmailForm from "./email-form";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { CanvasText } from "@/components/motion/canvas-text";
import { HoverSwap } from "@/components/motion/hover-swap";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { scrollToSection } from "../smooth-scroll";

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
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-contact-glow]",
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "top 10%",
            scrub: true,
          },
        }
      );
      // Footer wordmark rises word by word as the page bottoms out.
      gsap.from("[data-wordmark] > span", {
        yPercent: 110,
        duration: 1.4,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-wordmark]",
          start: "top 98%",
          once: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section id="contact" ref={root} className="relative overflow-hidden">
      <div
        data-contact-glow
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] origin-top"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 0%, rgba(0,89,114,0.42) 0%, rgba(0,56,98,0.22) 45%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-4 pb-24 pt-14 sm:px-6 md:px-20 md:pb-40 md:pt-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal
            as="h2"
            className="display text-[clamp(3.5rem,9vw,8.5rem)] text-white"
          >
            <span className="text-white/35">Let&apos;s</span>{" "}
            <CanvasText text="connect" />
          </Reveal>
          <SplitReveal
            as="p"
            delay={0.2}
            className="mt-6 max-w-md text-base leading-relaxed text-white/60 md:text-lg"
          >
            Open to collaborations, product builds, and interesting
            opportunities. Send a note and I&apos;ll get back to you.
          </SplitReveal>

          <Reveal group delay={0.35} className="mt-10 flex flex-col items-start gap-3">
            <a
              href={`mailto:${email}`}
              data-hover-trigger
              className="link-line heading text-xl text-white md:text-2xl"
            >
              <HoverSwap>{email}</HoverSwap>
            </a>
            <a
              href={`tel:${about.phoneNumber.replace(/\s/g, "")}`}
              data-hover-trigger
              className="link-line text-base text-white/70"
            >
              <HoverSwap>{about.phoneNumber}</HoverSwap>
            </a>
            <p className="text-base text-white/45">{about.address}</p>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <EmailForm />
        </div>
      </div>

      <footer className="relative border-t border-white/10 px-4 pb-28 pt-8 sm:px-6 md:px-10 md:pb-8">
        <div className="flex flex-col gap-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {social_handle.map((social) => (
              <li key={social._id}>
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover-trigger
                  className="link-line text-white/70 transition-colors duration-500 hover:text-white"
                >
                  <HoverSwap>{social.platform}</HoverSwap>
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            data-hover-trigger
            className="link-line self-start text-white/70 transition-colors duration-500 hover:text-white sm:self-auto"
          >
            <HoverSwap>Back to top</HoverSwap>
          </button>
        </div>

        <div
          data-wordmark
          aria-hidden
          className="display mt-10 flex select-none justify-between overflow-hidden text-[10.4vw] uppercase leading-[0.82] text-white md:mt-14"
        >
          {["Nei", "Rin", "Zara", "Lwin"].map((word) => (
            <span key={word} className="inline-block">
              {word}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <div>&copy; {new Date().getFullYear()} Nei Rin Zara Lwin</div>
          <p>
            Built by{" "}
            <Link
              href="https://github.com/neirinzaralwin"
              className="link-line text-white/70 transition-colors duration-500 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              @neirinzaralwin
            </Link>
          </p>
        </div>
      </footer>
    </section>
  );
};
