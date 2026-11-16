"use client";

import { useRef } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { GridBackdrop } from "@/components/art/wire-art";
import { gsap, useGSAP, prefersReducedMotion, hasFinePointer } from "@/lib/gsap";

/**
 * The last image before the contact form: a human hand and a machine hand reach toward each other
 * and touch as the page ends. Creativity on one side, clarity on the other.
 *
 * The stage is 10:4. Both cut-outs are placed so their fingertips land on
 * the same point — 50% across, 45% down — with a hair's width between them.
 */
const TOUCH = { left: "50%", top: "45%" };

export function MeetingPoint() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const approach = {
        trigger: "[data-stage]",
        start: "top 92%",
        end: "center 72%",
        scrub: 1,
      };

      // 1 — They close the distance with the scroll, easing out of a tilt.
      gsap.fromTo(
        "[data-human]",
        { xPercent: -24, yPercent: 10, rotate: -7, opacity: 0, filter: "blur(10px)" },
        { xPercent: 0, yPercent: 0, rotate: 0, opacity: 1, filter: "blur(0px)", ease: "power2.out", scrollTrigger: approach }
      );
      gsap.fromTo(
        "[data-machine]",
        { xPercent: 26, yPercent: -10, rotate: 7, opacity: 0, filter: "blur(10px)" },
        { xPercent: 0, yPercent: 0, rotate: 0, opacity: 1, filter: "blur(0px)", ease: "power2.out", scrollTrigger: approach }
      );
      gsap.fromTo(
        "[data-meet-glow]",
        { opacity: 0, scale: 0.55 },
        { opacity: 1, scale: 1, ease: "none", scrollTrigger: approach }
      );

      // 2 — Contact: a flash, a beam, rings, and the machine's lights surge.
      const contact = gsap
        .timeline({
          scrollTrigger: {
            trigger: "[data-stage]",
            start: "center 74%",
            toggleActions: "play none none reverse",
          },
        })
        .fromTo(
          "[data-flash]",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(3)" }
        )
        .fromTo(
          "[data-flash-burst]",
          { scale: 0.2, opacity: 0.9 },
          { scale: 7, opacity: 0, duration: 1.3, ease: "power2.out" },
          0
        )
        .fromTo(
          "[data-beam]",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.4, ease: "power3.out" },
          0.05
        )
        .fromTo(
          "[data-rings]",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          0.1
        )
        .fromTo(
          "[data-led]",
          { opacity: 0.25, scale: 0.7 },
          { opacity: 1, scale: 1.25, duration: 0.7, stagger: 0.12, ease: "power2.out" },
          0
        )
        .fromTo(
          "[data-meet-word]",
          { textShadow: "0 0 0px rgba(170,181,229,0)" },
          { textShadow: "0 0 36px rgba(170,181,229,0.65)", duration: 1, stagger: 0.15 },
          0.1
        );

      // 3 — Idle: both breathe, out of phase; the lights pulse.
      gsap.to("[data-human-float]", { y: -9, rotate: -0.6, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to("[data-machine-float]", { y: 8, rotate: 0.5, duration: 4.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to("[data-led-pulse]", {
        opacity: 0.55,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      });

      // 4 — The pointer nudges them: toward each other as it nears the touch.
      if (hasFinePointer()) {
        const stage = root.current?.querySelector<HTMLElement>("[data-stage]");
        const hx = gsap.quickTo("[data-human-pointer]", "x", { duration: 0.9, ease: "power3" });
        const hy = gsap.quickTo("[data-human-pointer]", "y", { duration: 0.9, ease: "power3" });
        const mx = gsap.quickTo("[data-machine-pointer]", "x", { duration: 0.9, ease: "power3" });
        const my = gsap.quickTo("[data-machine-pointer]", "y", { duration: 0.9, ease: "power3" });
        const move = (e: MouseEvent) => {
          if (!stage) return;
          const r = stage.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.45;
          hx(nx * 22);
          hy(ny * 16);
          mx(nx * -22);
          my(ny * -16);
        };
        window.addEventListener("mousemove", move, { passive: true });
        return () => {
          window.removeEventListener("mousemove", move);
          contact.kill();
        };
      }
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="meeting-point"
      className="relative overflow-hidden pt-14 md:pt-20"
    >
      <div
        data-meet-glow
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 70% at 50% 62%, rgba(0,56,98,0.9) 0%, rgba(0,56,98,0.35) 48%, transparent 82%)",
        }}
      />
      <GridBackdrop className="absolute inset-0" />

      <Reveal
        as="p"
        className="relative z-10 mx-auto max-w-6xl px-4 text-center text-[clamp(1.75rem,4.2vw,3.75rem)] font-light leading-[1.1] tracking-[-0.04em] text-white sm:px-6"
      >
        I sit where{" "}
        <span data-meet-word className="font-bold">
          clarity
        </span>{" "}
        meets{" "}
        <span data-meet-word className="font-bold">
          creativity.
        </span>
      </Reveal>

      <div
        data-stage
        aria-hidden
        className="relative mx-auto -mt-2 aspect-[10/4] w-[150%] max-w-none -translate-x-[16.67%] md:-mt-6 md:w-full md:max-w-[62rem] md:translate-x-0"
      >
        {/* Beam through the point of contact */}
        <div
          data-beam
          className="absolute h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#aab5e5] to-transparent"
          style={TOUCH}
        />

        {/* Human — creativity */}
        <div
          data-human
          className="absolute w-[80%] origin-left"
          style={{ left: "-5.6%", top: "30.3%" }}
        >
          <div data-human-pointer>
            <div data-human-float className="origin-left">
              <Image
                src="/assets/hands/human-hand.webp"
                alt=""
                width={1600}
                height={533}
                sizes="(max-width: 768px) 130vw, 80vw"
                className="h-auto w-full select-none [filter:drop-shadow(0_0_40px_rgba(102,142,171,0.35))] [mask-image:linear-gradient(90deg,transparent,#000_30%)]"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Machine — clarity */}
        <div
          data-machine
          className="absolute w-[62%] origin-right"
          style={{ left: "44.4%", top: "6%" }}
        >
          <div data-machine-pointer>
            <div data-machine-float className="relative origin-right">
              <Image
                src="/assets/hands/robot-hand.webp"
                alt=""
                width={1500}
                height={640}
                sizes="(max-width: 768px) 100vw, 62vw"
                className="h-auto w-full select-none [filter:drop-shadow(0_0_40px_rgba(102,142,171,0.4))] [mask-image:linear-gradient(270deg,transparent,#000_28%)]"
                draggable={false}
              />
              {/* Extra bloom over the two lights in the photo */}
              {[
                { left: "44.3%", top: "41.9%" },
                { left: "47.4%", top: "81.7%" },
              ].map((pos) => (
                <span
                  key={pos.left}
                  data-led
                  className="absolute h-[16%] w-[7%] -translate-x-1/2 -translate-y-1/2"
                  style={pos}
                >
                  <span
                    data-led-pulse
                    className="block h-full w-full rounded-full mix-blend-screen"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(64,140,255,0.7) 40%, transparent 72%)",
                      transform: "scale(2.6)",
                    }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Point of contact */}
        <div className="absolute h-0 w-0" style={TOUCH}>
          <span
            data-flash-burst
            className="absolute -left-6 -top-6 h-12 w-12 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(170,181,229,0.55), transparent)",
            }}
          />
          <span
            data-flash
            className="absolute -left-10 -top-10 h-20 w-20 rounded-full mix-blend-screen md:-left-16 md:-top-16 md:h-32 md:w-32"
            style={{
              background:
                "radial-gradient(closest-side, #fff 0%, rgba(170,181,229,0.85) 22%, rgba(64,140,255,0.4) 48%, transparent 72%)",
            }}
          />
          <svg
            data-rings
            viewBox="-60 -60 120 120"
            className="absolute -left-16 -top-16 h-32 w-32 overflow-visible"
            fill="none"
          >
            <circle className="spark-ring" r="14" stroke="#f3f1f6" strokeWidth="0.6" />
            <circle
              className="spark-ring"
              style={{ animationDelay: "-0.8s" }}
              r="14"
              stroke="#aab5e5"
              strokeWidth="0.6"
            />
            <circle
              className="spark-ring"
              style={{ animationDelay: "-1.6s" }}
              r="14"
              stroke="#668eab"
              strokeWidth="0.6"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
