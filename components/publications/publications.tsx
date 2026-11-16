"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { MainButton } from "@/components/motion/main-button";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { CanvasText } from "@/components/motion/canvas-text";
import { SectionTitle } from "@/components/ui/section-title";
import { brandGradientAt } from "@/lib/brand";

type Publication = {
  id: string;
  statusLabel: string;
  title: string;
  abstract: string;
  authors: string[];
  href?: string;
  ctaLabel?: string;
};

const publications: Publication[] = [
  {
    id: "mcp-marketplace",
    statusLabel: "Peer-reviewed article, Aug 2026",
    title:
      "An MCP-Driven Multi-Agent Enterprise Marketplace Platform Architecture for Myanmar Secondhand and Local Fashion Merchants: A Survey-based Requirements Analysis",
    abstract:
      "Myanmar’s secondhand and local fashion merchants still operate through Facebook and Viber, without automated order tools, AI discovery, or trust verification. This paper presents a survey-based requirements analysis of 15 merchants and proposes an MCP-driven multi-agent marketplace architecture — five tool servers across analytics, orders, recommendations, chat, and listing — with a trust layer grounded in signaling theory.",
    authors: ["Nei Rin Zara Lwin", "Kyaw Kyaw Oo", "Si Thu Aung"],
    href: "https://www.ijcaonline.org/archives/volume187/number136/an-mcp-driven-multi-agent-enterprise-marketplace-platform-architecture-for-myanmar-secondhand-and-local-fashion-merchants-a-survey-based-requirements/",
    ctaLabel: "Read the full paper",
  },
  {
    id: "eeg-learning",
    statusLabel: "Peer-reviewed article, Dec 2025",
    title:
      "Dynamic Functional Connectivity Patterns in Resting-State EEG for Classifying Learning Strategies",
    abstract:
      "This paper investigates whether dynamic functional connectivity in resting-state EEG can classify learning strategies. Using Phase Lag Index features from 21 participants and sliding-window analysis, K-Nearest Neighbors and Random Forest models separated control, active, and passive strategies with accuracies above 80% and 70%.",
    authors: [
      "Si Thu Aung",
      "Khin Muyar Kyaw",
      "Kyaw Kyaw Oo",
      "Aung Cho Oo",
      "Kyawt Kyawt Zin",
      "Nei Rin Zara Lwin",
      "Thura Tun",
    ],
    href: "https://www.ijcaonline.org/archives/volume187/number64/dynamic-functional-connectivity-patterns-in-resting-state-eeg-for-classifying-learning-strategies/",
    ctaLabel: "Read the full paper",
  },
];

/** Forthcoming book chapter — given the widest card in the section. */
const book = {
  publisher: "Springer",
  publisherLine: "Forthcoming from Springer Nature",
  chapter:
    "Mercy Hospital–Fort Smith: Can AI Create Emergency-Department Capacity Without Building More Capacity?",
  volume:
    "Handbook of Optimization and Operations Management in Action: A Practitioner’s Casebook for Business and Real-World Dilemmas",
  authors: ["Kyaw Kyaw Oo", "Nei Rin Zara Lwin"],
  parts: ["Case chapter", "Teaching notes", "In production"],
};

function BookCard() {
  return (
    <SpotlightCard
      as="article"
      color="var(--sage)"
      className="group grid grid-cols-1 gap-8 p-6 md:p-10 lg:grid-cols-12 lg:gap-12"
    >
      <div className="flex flex-col justify-between gap-6 lg:col-span-5">
        <p className="flex items-center gap-2 text-sm text-white/55">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--sage)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sage)]" />
          </span>
          {book.publisherLine}
        </p>
        <div className="display text-[clamp(3.75rem,9vw,8rem)] text-white">
          <CanvasText text={book.publisher} />
        </div>
        <p className="text-sm text-white/45">Co-author, book chapter</p>
      </div>

      <div className="flex flex-col lg:col-span-7">
        <h3 className="heading text-balance text-2xl text-white transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2 md:text-3xl lg:text-4xl">
          {book.chapter}
        </h3>
        <p className="mt-5 text-sm leading-relaxed text-white/55 md:text-base">
          In <span className="text-white/85">{book.volume}</span>
        </p>
        <p className="mt-4 text-sm text-white/45">
          {book.authors.map((author, i) => (
            <span key={author}>
              {i > 0 ? ", " : null}
              <span
                className={
                  author === "Nei Rin Zara Lwin"
                    ? "font-medium text-white/90"
                    : undefined
                }
              >
                {author}
              </span>
            </span>
          ))}
        </p>
        <ul className="mt-7 flex flex-wrap gap-2 lg:mt-auto lg:pt-8">
          {book.parts.map((part) => (
            <li
              key={part}
              className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs text-white/70 transition-colors duration-500 group-hover:border-[var(--sage)]"
            >
              {part}
            </li>
          ))}
        </ul>
      </div>
    </SpotlightCard>
  );
}

function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <article className="group relative flex h-full flex-col pt-8 md:pt-10">
      {/* Rule: a second line sweeps across on hover */}
      <span className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
      />
      <p className="mb-4 text-sm text-white/45">{pub.statusLabel}</p>
      <h3 className="heading text-balance text-xl text-white/90 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2 sm:text-2xl lg:text-3xl">
        {pub.title}
      </h3>
      <p className="mt-5 flex-1 text-pretty text-sm leading-relaxed text-white/55 md:text-base">
        {pub.abstract}
      </p>
      <p className="mt-4 text-sm text-white/45">
        {pub.authors.map((author, i) => (
          <span key={author}>
            {i > 0 ? ", " : null}
            <span
              className={
                author === "Nei Rin Zara Lwin"
                  ? "font-medium text-white/90"
                  : undefined
              }
            >
              {author}
            </span>
          </span>
        ))}
      </p>
      {pub.href ? (
        <div className="mt-7">
          <MainButton href={pub.href} external variant="ghost">
            {pub.ctaLabel ?? "Read the full paper"}
          </MainButton>
        </div>
      ) : (
        <p className="mt-7 flex items-center gap-2 text-sm text-white/40">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          </span>
          Manuscript in progress
        </p>
      )}
    </article>
  );
}

export default function Publications() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const syncActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth;
    if (width === 0) return;
    const index = Math.round(track.scrollLeft / width);
    setActive(Math.min(Math.max(index, 0), publications.length - 1));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", syncActive, { passive: true });
    return () => track.removeEventListener("scroll", syncActive);
  }, [syncActive]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
    setActive(index);
  };

  return (
    <section
      id="publications"
      className="relative w-full px-4 py-20 sm:px-6 md:px-20 md:py-32"
    >
      <div className="w-full max-w-7xl mx-auto">
      <SectionTitle light="Research" emphasis="publications" />

      <div>
        <Reveal y={60}>
          <BookCard />
        </Reveal>

        {/* Mobile carousel */}
        <Reveal className="mt-10 md:hidden">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {publications.map((pub) => (
              <div
                key={pub.id}
                className="w-full shrink-0 snap-center snap-always pr-2"
              >
                <PublicationCard pub={pub} />
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {publications.map((pub, i) => (
              <button
                key={pub.id}
                type="button"
                aria-label={`Show publication ${i + 1}`}
                aria-current={active === i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  active === i
                    ? `w-6 ${brandGradientAt(i)}`
                    : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>
        </Reveal>

        {/* Desktop side-by-side */}
        <Reveal
          group
          stagger={0.18}
          y={60}
          className="mt-8 hidden md:mt-16 md:grid md:grid-cols-2 md:gap-10 lg:gap-14"
        >
          {publications.map((pub) => (
            <PublicationCard key={pub.id} pub={pub} />
          ))}
        </Reveal>
      </div>
      </div>
    </section>
  );
}
