"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { BRAND_GRADIENT_CLASSES } from "@/lib/brand";
import { testimonials, Testimonial } from "@/lib/testimonials";
import { cn } from "@/utils/cn";

const SPOT = ["var(--ocean)", "var(--sage)", "var(--lavender)", "var(--olive)"];
const COLUMNS = 4;

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function Card({ item, index }: { item: Testimonial; index: number }) {
  return (
    <SpotlightCard
      as="figure"
      lift
      color={SPOT[index % SPOT.length]}
      className={cn(
        "group p-6",
        item.placeholder && "outline-dashed outline-1 outline-white/15"
      )}
    >
      <div className="flex items-center justify-between">
        <Quote
          size={20}
          className="-scale-x-100 text-white/25 transition-[color,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-0.5 group-hover:text-[var(--spot)]"
        />
        {item.placeholder && (
          <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[10px] text-white/50">
            Placeholder
          </span>
        )}
      </div>
      <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-white/75 transition-colors duration-500 group-hover:text-white">
        {item.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {item.avatar ? (
          <Image
            src={item.avatar}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-semibold text-white transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110 group-hover:-rotate-6",
              BRAND_GRADIENT_CLASSES[index % BRAND_GRADIENT_CLASSES.length]
            )}
          >
            {initials(item.name)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-white">
            {item.name}
          </span>
          <span className="block truncate text-xs text-white/50">
            {item.role}, {item.company}
          </span>
        </span>
      </figcaption>
    </SpotlightCard>
  );
}

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  // Round-robin into columns; uneven card heights do the masonry.
  const columns = Array.from({ length: COLUMNS }, (_, c) =>
    testimonials
      .map((item, index) => ({ item, index }))
      .filter(({ index }) => index % COLUMNS === c)
  );

  return (
    <section
      id="worked-with"
      className="w-full px-4 py-20 sm:px-6 md:px-20 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle light="Worked" emphasis="with" />
        <SplitReveal
          as="p"
          className="-mt-4 mb-12 max-w-md text-base leading-relaxed text-white/55 md:-mt-6 md:mb-16 md:text-lg"
        >
          Notes from people I&apos;ve built products and research with.
        </SplitReveal>

        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((col, c) => (
            <Reveal
              key={c}
              group
              delay={c * 0.12}
              stagger={0.16}
              y={50}
              className={cn(
                "grid gap-5",
                // On two columns, fold columns 3 and 4 under 1 and 2.
                c === 1 && "lg:mt-10",
                c === 3 && "lg:mt-10"
              )}
            >
              {col.map(({ item, index }) => (
                <Card key={index} item={item} index={index} />
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
