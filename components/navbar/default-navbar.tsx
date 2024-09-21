"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/typography";
import { Transition } from "@/components/ui/transition";

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Portfolio", path: "#portfolio" },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const toggelNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
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
        <div className="fixed top-0 w-full">
          <div className="flex justify-center text-white/70 pt-6">
            <div className="hidden md:inline-flex items-center justify-center px-8 py-3 rounded-full bg-black/50 backdrop-blur-lg border-t border-white/15">
              <ul className="flex flex-row space-x-8 items-center">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.path}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
                {/* contact us */}
                <li className="group">
                  <Link
                    href={"#contact"}
                    className="px-4 py-2 rounded-full border border-white/50 flex items-center gap-4 group"
                  >
                    <TextReveal>Let&apos;s talk</TextReveal>
                    <ArrowRight
                      size={20}
                      className="group-hover:rotate-90 transition-transform"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* mobile menu */}
          <div className="flex justify-between px-4 py-2 mx-auto md:hidden">
            <div
              className="cursor-pointer p-2 bg-black/50 backdrop-blur-lg border-t border-white/15 rounded z-50"
              onClick={toggelNav}
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

          <motion.div
            initial={false}
            animate={nav ? "open" : "closed"}
            variants={menuVariants}
            className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-lg z-40"
          >
            <ul className="text-4xl my-28 text-center space-y-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.path} onClick={closeNav}>
                    <p className="text-white/70 hover:text-white transition-colors duration-300">
                      {link.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Transition>
    </>
  );
};

export default Navbar;
