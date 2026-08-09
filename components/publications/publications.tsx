"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/ui/transition";
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
    statusLabel: "Under research · Survey-based architecture",
    title:
      "An MCP-Driven Multi-Agent Enterprise Marketplace Platform Architecture for Myanmar Secondhand and Local Fashion Merchants",
    abstract:
      "Myanmar’s secondhand and local fashion merchants still operate through Facebook and Viber, without automated order tools, AI discovery, or trust verification. This paper presents a survey-based requirements analysis of 15 merchants and proposes an MCP-driven multi-agent marketplace architecture — five tool servers across analytics, orders, recommendations, chat, and listing — with a trust layer grounded in signaling theory.",
    authors: ["Nei Rin Zara Lwin", "Kyaw Kyaw Oo", "Si Thu Aung"],
  },
  {
    id: "eeg-learning",
    statusLabel: "Peer-reviewed article · Dec 2025",
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

function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <article className="flex h-full flex-col border-t border-white/10 pt-8 md:pt-10">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">
        {pub.statusLabel}
      </p>
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white/80 leading-tight text-balance">
        {pub.title}
      </h3>
      <p className="mt-5 text-sm md:text-base text-gray-500 leading-relaxed text-pretty flex-1">
        {pub.abstract}
      </p>
      <p className="mt-4 text-sm text-white/50">
        {pub.authors.map((author, i) => (
          <span key={author}>
            {i > 0 ? ", " : null}
            <span
              className={
                author === "Nei Rin Zara Lwin"
                  ? "text-white/80 font-medium"
                  : undefined
              }
            >
              {author}
            </span>
          </span>
        ))}
      </p>
      {pub.href ? (
        <Link
          href={pub.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit items-center gap-2 border border-white/20 px-5 py-3 text-sm text-white/80 transition-colors hover:border-white/40 hover:text-white"
        >
          {pub.ctaLabel ?? "Read the full paper"}
          <ArrowUpRight size={16} />
        </Link>
      ) : (
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-gray-600">
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
      className="relative w-full px-4 sm:px-6 md:px-20 py-16 md:py-24"
    >
      <div className="w-full max-w-7xl mx-auto">
      <SectionTitle light="Research" emphasis="Publications" />

      <FadeIn>
        {/* Mobile carousel */}
        <div className="mt-8 md:hidden">
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
        </div>

        {/* Desktop side-by-side */}
        <div className="mt-8 md:mt-12 hidden md:grid md:grid-cols-2 md:gap-10 lg:gap-14">
          {publications.map((pub) => (
            <PublicationCard key={pub.id} pub={pub} />
          ))}
        </div>
      </FadeIn>
      </div>
    </section>
  );
}
