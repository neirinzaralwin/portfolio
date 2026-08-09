"use client";

import { FadeIn } from "@/components/ui/transition";
import { SectionTitle } from "@/components/ui/section-title";

export default function VintShowcase() {
  return (
    <section
      id="vint"
      className="relative w-full overflow-hidden px-4 sm:px-6 md:px-20 py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-1/3 h-1/2 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, #668eab33 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto">
        <SectionTitle light="Ongoing" emphasis="Project" />

        <div className="relative mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <FadeIn className="lg:col-span-5 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-gray-500 mb-5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#97b999] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#97b999]" />
              </span>
              In progress
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white/80 tracking-tight">
              Vint
            </h3>
            <p className="mt-2 text-xl sm:text-2xl md:text-3xl font-medium gradient-text">
              Co-founder
            </p>
            <p className="mt-3 text-base md:text-lg text-white/60">
              Digital thrift-fashion marketplace for shop owners
            </p>

            <p className="mt-6 text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">
              A structured marketplace for pre-loved fashion — listings,
              auctions, payment review, and commission billing in one place.
              Free to join; shops only pay commission on sales.
            </p>
          </FadeIn>

          <FadeIn className="lg:col-span-7 order-1 lg:order-2 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] flex flex-col items-center">
              <video
                src="/assets/vint-reveal.mp4"
                className="w-full h-auto rounded-2xl"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Vint product reveal film"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
