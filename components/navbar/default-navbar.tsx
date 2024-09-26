"use client";

import React, { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/typography";
import { Transition } from "@/components/ui/transition";
import { scrollToSection } from "../smooth-scroll";

const navLinks = [
  { title: "About", path: "about" },
  { title: "Experience", path: "experience" },
  { title: "Projects", path: "projects" },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

  const handleLinkClick = (id: string) => {
    scrollToSection(id);
    closeNav();
  };

  const menuVariants = {
    open: {
      x: 0,
      transition: {
        duration: 0.8, // Increased duration for smoother animation
        ease: [0.25, 0.1, 0.25, 1.0], // Adjusted ease values for a smoother effect
      },
    },
    closed: {
      x: "-100%",
      transition: {
        duration: 0.8, // Increased duration for smoother animation
        ease: [0.25, 0.1, 0.25, 1.0], // Adjusted ease values for a smoother effect
      },
    },
  };

  return (
    <>
      <Transition viewport={{ once: true }}>
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

          <motion.div
            initial={false}
            animate={nav ? "open" : "closed"}
            variants={menuVariants}
            className="py-10 fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md z-40"
          >
            <ul className="text-3xl text-center py-10 space-y-4">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.path}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.path);
                    }}
                  >
                    <p className="text-white/70 hover:text-white transition-colors duration-300">
                      {link.title}
                    </p>
                  </a>
                </li>
              ))}
              <li className="group">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("contact");
                  }}
                >
                  <p className="text-white/70 hover:text-white transition-colors duration-300 flex items-center justify-center gap-4">
                    <TextReveal>Let&apos;s talk</TextReveal>
                    <ArrowRight
                      size={20}
                      className="group-hover:rotate-90 transition-transform"
                    />
                  </p>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* mobile menu */}
          <div className="fixed top-0 left-0 flex justify-between px-4 py-4 mx-auto md:hidden z-50">
            <div
              className="cursor-pointer p-2 bg-black/50 backdrop-blur-md border-t border-white/15 rounded"
              onClick={toggleNav}
            >
              {nav ? (
                <X
                  size={24}
                  className="text-white/70 hover:text-white transition-colors duration-300"
                />
              ) : (
                <Menu
                  size={24}
                  className="text-white/70 hover:text-white transition-colors duration-300"
                />
              )}
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Navbar;
