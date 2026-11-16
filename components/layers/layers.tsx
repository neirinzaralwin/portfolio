"use client";

import { useRef } from "react";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { GridBackdrop } from "@/components/art/wire-art";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * "How the business model sits on the build": an exploded, isometric stack.
 * Each sheet is one layer of a product; the stack pulls apart as it scrolls
 * into view so the layers can be read one at a time.
 */

const CX = 380;
const A = 190; // half-width of a sheet
const B = 92; // half-height of a sheet
const GRID = 12;

// A point on a sheet, in grid units, lifted by a soft wave.
const pt = (i: number, j: number, cy: number, wave = 0) => {
  const lift = wave * Math.sin(i * 0.75) * Math.cos(j * 0.62);
  return [CX + ((i - j) * A) / GRID, cy + ((i + j - GRID) * B) / GRID - lift] as const;
};
const poly = (cy: number, inset = 0) =>
  [
    [CX - A + inset * 2, cy],
    [CX, cy - B + inset],
    [CX + A - inset * 2, cy],
    [CX, cy + B - inset],
  ]
    .map((p) => p.join(","))
    .join(" ");

function Mesh({ cy, wave, stroke }: { cy: number; wave: number; stroke: string }) {
  const lines: string[] = [];
  for (let i = 0; i <= GRID; i++) {
    lines.push(
      Array.from({ length: GRID + 1 }, (_, j) => pt(i, j, cy, wave).join(",")).join(" "),
      Array.from({ length: GRID + 1 }, (_, j) => pt(j, i, cy, wave).join(",")).join(" ")
    );
  }
  return (
    <g stroke={stroke} strokeWidth="0.7" fill="none">
      {lines.map((d, k) => (
        <polyline key={k} points={d} />
      ))}
    </g>
  );
}

function Beads({ cy, fill }: { cy: number; fill: string }) {
  const dots = [];
  for (let i = 1; i < GRID; i++) {
    for (let j = 1; j < GRID; j++) {
      const [x, y] = pt(i, j, cy, 5);
      dots.push(
        <circle key={`${i}-${j}`} cx={x} cy={y} r={2.2 + ((i + j) / (GRID * 2)) * 2.6} fill={fill} />
      );
    }
  }
  return <g>{dots}</g>;
}

function Slab({ cy, depth, top, side }: { cy: number; depth: number; top: string; side: string }) {
  return (
    <g>
      <polygon
        points={`${CX - A},${cy} ${CX},${cy + B} ${CX + A},${cy} ${CX + A},${cy + depth} ${CX},${cy + B + depth} ${CX - A},${cy + depth}`}
        fill={side}
      />
      <polygon points={poly(cy)} fill={top} />
    </g>
  );
}

const LAYERS = [
  { key: "business", y: 120, title: "Business model", sub: "Who pays, and for what", side: "right" as const },
  { key: "product", y: 245, title: "Product", sub: "What people touch", side: "left" as const },
  { key: "domain", y: 370, title: "Domain model", sub: "The rules of the business, in code", side: "right" as const },
  { key: "services", y: 495, title: "Services", sub: "APIs, agents, integrations", side: "left" as const },
  { key: "platform", y: 610, title: "Data and infrastructure", sub: "Where it all rests", side: "right" as const },
];

function Label({ y, title, sub, side }: { y: number; title: string; sub: string; side: "left" | "right" }) {
  const right = side === "right";
  const x0 = right ? CX + A * 0.62 : CX - A * 0.62;
  const x1 = right ? CX + A + 34 : CX - A - 34;
  const x2 = right ? x1 + 46 : x1 - 46;
  const ty = y - 44;
  return (
    <g data-layer-label>
      <polyline
        points={`${x0},${y - 18} ${x1},${ty} ${x2},${ty}`}
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="0.8"
        fill="none"
      />
      <circle cx={x0} cy={y - 18} r="2.2" fill="#fff" />
      <text
        x={right ? x2 + 10 : x2 - 10}
        y={ty - 2}
        textAnchor={right ? "start" : "end"}
        fill="#f3f1f6"
        fontSize="19"
        fontWeight="500"
      >
        {title}
      </text>
      <text
        x={right ? x2 + 10 : x2 - 10}
        y={ty + 21}
        textAnchor={right ? "start" : "end"}
        fill="rgba(255,255,255,0.5)"
        fontSize="14.5"
      >
        {sub}
      </text>
    </g>
  );
}

export default function Layers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const sheets = gsap.utils.toArray<SVGGElement>("[data-layer]");
      const mid = (sheets.length - 1) / 2;

      // Collapsed into one block, then pulled apart by the scroll.
      sheets.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: (i - mid) * 92, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 75%",
              end: "center 55%",
              scrub: 0.8,
            },
          }
        );
      });
      gsap.fromTo(
        "[data-layer-label]",
        { opacity: 0, x: (i) => (i % 2 === 0 ? 24 : -24) },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "center 68%", once: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      id="layers"
      ref={root}
      className="relative w-full overflow-hidden px-4 py-20 sm:px-6 md:px-20 md:py-32"
    >
      <GridBackdrop className="absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(102,142,171,0.32), rgba(0,56,98,0.14) 60%, transparent)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SplitReveal
            as="h2"
            className="heading text-[clamp(2.25rem,4.6vw,4rem)] text-white"
          >
            A business model sits on everything built beneath it.
          </SplitReveal>
          <SplitReveal
            as="p"
            delay={0.2}
            className="mt-6 max-w-md text-base leading-relaxed text-white/55 md:text-lg"
          >
            Pricing and revenue are the top sheet. They only hold if the
            layers under them do, so I design from the bottom up and keep
            each layer free to change without a rewrite.
          </SplitReveal>

          {/* Legend for small screens, where the diagram labels are too fine */}
          <Reveal group className="mt-8 space-y-3 md:hidden">
            {LAYERS.map((l) => (
              <div key={l.key} className="flex items-baseline gap-3 text-sm">
                <span className="text-white">{l.title}</span>
                <span className="text-white/45">{l.sub}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <svg
            viewBox="-150 0 1060 740"
            className="mx-auto my-20 w-full max-w-[52rem] scale-[1.7] md:my-0 md:scale-100"
            fill="none"
            role="img"
            aria-label="Five stacked layers: business model, product, domain model, services, data and infrastructure"
          >
            <defs>
              <linearGradient id="lg-glass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#aab5e5" stopOpacity="0.75" />
                <stop offset="1" stopColor="#668eab" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="lg-base" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#97b999" stopOpacity="0.55" />
                <stop offset="1" stopColor="#668eab" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Drawn bottom-up so upper sheets overlap lower ones */}
            <g data-layer>
              <g className="bob" style={{ animationDelay: "-4s" }}>
                <Slab cy={LAYERS[4].y} depth={26} top="url(#lg-base)" side="rgba(102,142,171,0.28)" />
                <Mesh cy={LAYERS[4].y} wave={0} stroke="rgba(255,255,255,0.22)" />
              </g>
            </g>
            <g data-layer>
              <g className="bob" style={{ animationDelay: "-3s" }}>
                <Mesh cy={LAYERS[3].y} wave={9} stroke="rgba(255,255,255,0.42)" />
              </g>
            </g>
            <g data-layer>
              <g className="bob" style={{ animationDelay: "-2s" }}>
                <Slab cy={LAYERS[2].y} depth={7} top="rgba(243,241,246,0.9)" side="rgba(243,241,246,0.45)" />
                <Mesh cy={LAYERS[2].y} wave={0} stroke="rgba(12,11,12,0.16)" />
              </g>
            </g>
            <g data-layer>
              <g className="bob" style={{ animationDelay: "-1s" }}>
                <Mesh cy={LAYERS[1].y} wave={5} stroke="rgba(255,255,255,0.16)" />
                <Beads cy={LAYERS[1].y} fill="rgba(214,226,240,0.85)" />
              </g>
            </g>
            <g data-layer>
              <g className="bob">
                <Slab cy={LAYERS[0].y} depth={10} top="url(#lg-glass)" side="rgba(170,181,229,0.3)" />
                <polygon points={poly(LAYERS[0].y, 14)} stroke="rgba(255,255,255,0.55)" strokeWidth="0.8" />
              </g>
            </g>

            <g className="hidden md:block">
              {LAYERS.map((l) => (
                <Label key={l.key} y={l.y} title={l.title} sub={l.sub} side={l.side} />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
