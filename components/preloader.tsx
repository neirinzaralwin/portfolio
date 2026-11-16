"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";

const NAME = "nei rin zara lwin";

/**
 * Loading sequence, played on every page load. Same language as the Uttara
 * brand art: near-black, one soft band of light sweeping along a wide arc,
 * and a bold lowercase wordmark that lights up as the band passes.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const finish = () => {
        el.style.display = "none";
        markIntroDone();
      };

      if (prefersReducedMotion()) {
        finish();
        return;
      }

      gsap.set("[data-pre-word]", { autoAlpha: 1 });
      gsap.set("[data-pre-char]", {
        opacity: 0,
        yPercent: 45,
        filter: "blur(14px)",
      });
      gsap.set("[data-pre-arc]", { rotate: -70, opacity: 0 });
      gsap.set("[data-pre-arc-2]", { rotate: 150, opacity: 0 });

      gsap
        .timeline()
        // 1 — the band of light enters and sweeps along its arc
        .to("[data-pre-arc]", { opacity: 1, duration: 1.2, ease: "power2.out" }, 0)
        .to("[data-pre-arc]", { rotate: 18, duration: 4.2, ease: "power2.out" }, 0)
        .to("[data-pre-arc-2]", { opacity: 0.7, duration: 1.6, ease: "power2.out" }, 0.5)
        .to("[data-pre-arc-2]", { rotate: 205, duration: 4, ease: "power2.out" }, 0.3)
        .fromTo(
          "[data-pre-wash]",
          { opacity: 0 },
          { opacity: 1, duration: 2, ease: "power1.out" },
          0.2
        )
        // 2 — the wordmark lights up, letter by letter
        .to(
          "[data-pre-char]",
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.045,
            ease: "power3.out",
          },
          0.7
        )
        .fromTo(
          "[data-pre-word]",
          { textShadow: "0 0 0px rgba(151,185,153,0)" },
          {
            textShadow: "0 0 34px rgba(151,185,153,0.75)",
            duration: 0.9,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          },
          1.5
        )
        // 3 — dissolve into the page
        .to(
          "[data-pre-word]",
          {
            scale: 1.06,
            autoAlpha: 0,
            filter: "blur(12px)",
            duration: 0.9,
            ease: "power2.in",
          },
          3.3
        )
        .to(el, { autoAlpha: 0, duration: 1, ease: "power2.inOut" }, 3.65)
        .add(markIntroDone, 3.85)
        .add(finish);
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050605]"
      aria-hidden
    >
      {/* Faint colour wash so the black is never flat */}
      <div
        data-pre-wash
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 15% 100%, rgba(0,89,114,0.35), transparent 60%), radial-gradient(70% 60% at 90% 20%, rgba(151,185,153,0.14), transparent 65%)",
        }}
      />
      {/* The arc: a blurred ring; only one soft stretch of it is lit */}
      <div data-pre-arc className="preloader-arc" />
      <div data-pre-arc-2 className="preloader-arc preloader-arc--thin" />

      <div
        data-pre-word
        className="invisible relative px-6 text-center text-[clamp(2.25rem,8.4vw,7.5rem)] font-bold leading-none tracking-[-0.045em] text-white"
      >
        {NAME.split("").map((ch, i) => (
          <span
            key={i}
            data-pre-char
            className="inline-block"
            style={ch === " " ? { width: "0.26em" } : undefined}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </div>
    </div>
  );
}
