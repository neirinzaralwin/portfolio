"use client";

import { TextRevealWithHighlights } from "@/components/ui/text-reveal-with-highlights";
import { brandStops } from "@/lib/brand";

export function AboutMe() {
  return (
    <section id="about-me" className="w-full px-4 sm:px-6 md:px-20 pt-4 md:pt-8">
      <div className="w-full max-w-7xl mx-auto">
      <TextRevealWithHighlights
        text="I build cross-platform products with Flutter and Next.js, scalable backends with Node.js and Python, and practical AI features that improve real user workflows."
        highlights={[
          {
            word: "Flutter",
            className: "gradient-text",
            gradientFrom: brandStops.ocean.from,
            gradientTo: brandStops.ocean.to,
          },
          {
            word: "Next.js",
            className: "gradient-text",
            gradientFrom: brandStops.slateOlive.from,
            gradientTo: brandStops.slateOlive.to,
          },
          {
            word: "Node.js",
            className: "gradient-text",
            gradientFrom: brandStops.sage.from,
            gradientTo: brandStops.sage.to,
          },
          {
            word: "Python",
            className: "gradient-text",
            gradientFrom: brandStops.lavender.from,
            gradientTo: brandStops.lavender.to,
          },
          {
            word: "AI",
            className: "gradient-text",
            gradientFrom: brandStops.lavender.from,
            gradientTo: brandStops.lavender.to,
          },
        ]}
        className="[&_span]:!text-lg [&_span]:sm:!text-xl [&_span]:md:!text-2xl [&_span]:lg:!text-3xl [&_span]:xl:!text-4xl [&_span]:!font-semibold"
      />
      </div>
    </section>
  );
}
