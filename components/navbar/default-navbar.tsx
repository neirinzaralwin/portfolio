"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/ui/typography";
import { Transition } from "@/components/ui/transition";
import { scrollToSection } from "../smooth-scroll";

const navLinks = [
  { title: "About", path: "about" },
  { title: "Experience", path: "experience" },
  { title: "Research", path: "publications" },
  { title: "Projects", path: "projects" },
];

const Navbar = () => {
  const handleLinkClick = (id: string) => {
    scrollToSection(id);
  };

  return (
    <>
      <Transition viewport={{ once: true }}>
        {/* Desktop navbar - top */}
        <div className="fixed top-0 w-full z-40">
          <div className="flex justify-center text-white/70 pt-6">
            <div className="hidden md:inline-flex items-center justify-center px-8 py-3 rounded-full bg-black/50 backdrop-blur-md">
              <ul className="flex flex-row space-x-8 items-center">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.path}
                      className="hover:text-white transition-colors duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.path);
                      }}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
                <li className="group">
                  <a
                    href="#contact"
                    className="px-4 py-2 rounded-full border border-white/50 flex items-center gap-4 group"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("contact");
                    }}
                  >
                    <TextReveal>Let&apos;s talk</TextReveal>
                    <ArrowRight
                      size={20}
                      className="group-hover:rotate-90 transition-transform"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile navbar - bottom */}
        <div className="fixed bottom-0 inset-x-0 z-40 md:hidden pb-[env(safe-area-inset-bottom)]">
          <div className="flex justify-center text-white/70 pb-4 px-3">
            <div className="inline-flex max-w-full items-center justify-center px-2.5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 overflow-x-auto">
              <ul className="flex flex-row items-center gap-2.5 sm:gap-3">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.path}
                      className="hover:text-white transition-colors duration-300 text-[11px] sm:text-sm whitespace-nowrap"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.path);
                      }}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contact"
                    className="px-2 py-1 rounded-full border border-white/40 flex items-center gap-1"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("contact");
                    }}
                  >
                    <span className="text-[11px] sm:text-sm whitespace-nowrap">
                      Talk
                    </span>
                    <ArrowRight size={12} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Navbar;
