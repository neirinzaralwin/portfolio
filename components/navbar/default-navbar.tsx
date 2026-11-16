"use client";

import React, { useRef } from "react";
import { HoverSwap } from "@/components/motion/hover-swap";
import { MainButton } from "@/components/motion/main-button";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { scrollToSection } from "../smooth-scroll";

const navLinks = [
  { title: "About", path: "about" },
  { title: "Experience", path: "experience" },
  { title: "Research", path: "publications" },
  { title: "Projects", path: "projects" },
];

const Navbar = () => {
  const root = useRef<HTMLDivElement>(null);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };

  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion()) return;

      gsap.set("[data-nav]", { yPercent: -160, autoAlpha: 0 });
      gsap.set("[data-nav-mobile]", { yPercent: 160, autoAlpha: 0 });

      const off = onIntroDone(
        contextSafe!(() => {
          gsap.to("[data-nav], [data-nav-mobile]", {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.2,
            delay: 0.5,
            ease: "power4.out",
          });
        })
      );

      // Desktop pill tucks away while reading down, returns on scroll up.
      const hide = gsap.quickTo("[data-nav-shell]", "yPercent", {
        duration: 0.7,
        ease: "power3.out",
      });
      ScrollTrigger.create({
        start: 120,
        end: "max",
        onUpdate: (self) => hide(self.direction === 1 ? -180 : 0),
        onLeaveBack: () => hide(0),
      });

      return off;
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      {/* Desktop navbar - top */}
      <div
        data-nav-shell
        className="pointer-events-none fixed top-0 z-40 hidden w-full justify-center pt-5 md:flex"
      >
        <nav
          data-nav
          aria-label="Primary"
          className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.06] p-1.5 pl-2 backdrop-blur-xl"
        >
          <a
            href="#about"
            onClick={go("about")}
            aria-label="Back to top"
            className="mr-2 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm font-semibold tracking-tight text-white transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:rotate-[360deg]"
          >
            nr
          </a>
          <ul className="flex items-center">
            {navLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={`#${link.path}`}
                  onClick={go(link.path)}
                  data-hover-trigger
                  className="block rounded-full px-4 py-2 text-sm text-white/70 transition-colors duration-500 hover:bg-white/[0.07] hover:text-white"
                >
                  <HoverSwap>{link.title}</HoverSwap>
                </a>
              </li>
            ))}
          </ul>
          <MainButton
            href="#contact"
            onClick={go("contact")}
            size="sm"
            className="ml-2"
          >
            Let&apos;s talk
          </MainButton>
        </nav>
      </div>

      {/* Mobile navbar - bottom */}
      <div className="fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] md:hidden">
        <div className="flex justify-center px-3 pb-4">
          <nav
            data-nav-mobile
            aria-label="Primary"
            className="inline-flex max-w-full items-center overflow-x-auto rounded-full border border-white/10 bg-black/60 px-2.5 py-2 text-white/70 backdrop-blur-md scrollbar-none"
          >
            <ul className="flex flex-row items-center gap-2.5 sm:gap-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={`#${link.path}`}
                    onClick={go(link.path)}
                    className="whitespace-nowrap px-1 text-[11px] transition-colors duration-300 hover:text-white sm:text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={go("contact")}
                  className="rounded-full bg-white px-3 py-1.5 text-[11px] font-medium whitespace-nowrap text-black sm:text-sm"
                >
                  Talk
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
