"use client";

import { FadeIn } from "@/components/ui/transition";
import { SectionTitle } from "@/components/ui/section-title";

const categories = [
  { label: "Mobile", percent: 40, score: 7.66 },
  { label: "Backend", percent: 30, score: 6.59 },
  { label: "Data Science", percent: 20, score: 7.61 },
  { label: "Frontend", percent: 10, score: 7.66 },
];

/** Same brand gradients as the main portfolio DNA bar */
const colors = [
  "bg-gradient-to-r from-[#668eab] to-[#003862]",
  "bg-gradient-to-r from-[#97b999] to-[#005972]",
  "bg-gradient-to-r from-[#aab5e5] to-[#432e5b]",
  "bg-gradient-to-r from-[#456882] to-[#B1AB86]",
] as const;

const ExperienceMatrix = () => {
  return (
    <div>
      <SectionTitle light="Skill" emphasis="DNA" />

      <FadeIn>
        <div className="grid grid-cols-2 gap-3 mb-4 md:hidden">
          {categories.map((cat, idx) => (
            <div key={cat.label} className="flex items-center gap-2">
              <span
                className={`inline-block h-3 w-3 shrink-0 rounded-sm ${colors[idx]}`}
                aria-hidden
              />
              <div className="min-w-0">
                <span className="block text-sm text-gray-500 truncate">
                  {cat.label}
                </span>
                <span className="font-semibold text-base text-white/70">
                  {cat.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:flex mb-2 w-full">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="flex flex-col items-start min-w-0 pr-1"
              style={{ width: `${cat.percent}%` }}
            >
              <span className="text-sm text-gray-500 truncate w-full">
                {cat.label}
              </span>
              <span className="font-semibold text-base text-white/70">
                {cat.percent}%
              </span>
            </div>
          ))}
        </div>

        <div className="relative w-full h-10 md:h-12 bg-white/10 rounded-sm overflow-hidden flex">
          {categories.map((cat, idx) => (
            <div
              key={cat.label}
              className={`h-full ${colors[idx]}`}
              style={{ width: `${cat.percent}%` }}
              title={`${cat.label} ${cat.percent}%`}
            />
          ))}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 border-r border-dotted border-white/20"
              style={{
                left: `${categories
                  .slice(0, i)
                  .reduce((a, b) => a + b.percent, 0)}%`,
                width: 0,
              }}
            />
          ))}
        </div>
      </FadeIn>
    </div>
  );
};

export default ExperienceMatrix;
