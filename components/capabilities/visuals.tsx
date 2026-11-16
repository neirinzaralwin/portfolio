"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Check, Sparkles } from "lucide-react";
import { prefersReducedMotion } from "@/lib/gsap";

/** Cycles an integer between two bounds while the element is on screen. */
function useTicker(from: number, to: number, interval = 220) {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(id);
      if (entry.isIntersecting) {
        id = setInterval(
          () => setValue((v) => (v >= to ? from : v + 1)),
          interval
        );
      }
    });
    io.observe(el);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [from, to, interval]);

  return { value, ref };
}

const ACCENT = "var(--cap)";

/** Mobile: rings pulse out of a device, a metric chip keeps climbing. */
export function MobileVisual() {
  const { value, ref } = useTicker(35, 53);
  return (
    <div ref={ref} className="relative h-full w-full">
      <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
        <g stroke="rgba(255,255,255,0.55)" strokeWidth="1">
          <ellipse className="cap-ring" cx="100" cy="78" rx="62" ry="38" />
          <ellipse className="cap-ring" cx="100" cy="84" rx="44" ry="27" />
          <ellipse className="cap-ring" cx="100" cy="90" rx="27" ry="16" />
        </g>
        <g className="cap-node">
          <circle cx="100" cy="108" r="15" fill={ACCENT} />
          <rect x="94.5" y="99" width="11" height="18" rx="3" stroke="#0c0b0c" strokeWidth="1.6" />
          <line x1="98" y1="113.5" x2="102" y2="113.5" stroke="#0c0b0c" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      </svg>
      <div className="cap-chip absolute right-[-10%] top-[47%] flex items-center gap-1 rounded-xl bg-white px-2.5 py-1.5 text-[#0c0b0c] shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
        <ArrowUp size={12} strokeWidth={2.5} />
        <span className="text-xs font-semibold tabular-nums">+{value}%</span>
      </div>
      <p className="absolute inset-x-0 bottom-[11%] text-center text-[0.7rem] text-white/75">
        Design. Build. Ship.
      </p>
      <div className="absolute left-[-7%] top-[-7%] grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-[#151417] text-[var(--cap)]">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <rect className="cap-bar" x="1" y="5" width="2.4" height="8" rx="1.2" />
          <rect className="cap-bar" style={{ animationDelay: "-1.6s" }} x="5.8" y="1" width="2.4" height="12" rx="1.2" />
          <rect className="cap-bar" style={{ animationDelay: "-3.2s" }} x="10.6" y="3.5" width="2.4" height="9.5" rx="1.2" />
        </svg>
      </div>
    </div>
  );
}

/** Backend: requests circle a service loop and come back 200. */
export function BackendVisual() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" fill="none">
        <path
          d="M 44 60 H 156 A 28 28 0 0 1 156 116 H 44 A 28 28 0 0 1 44 60 Z"
          stroke="var(--cap)" strokeOpacity="0.4"
          strokeWidth="1"
        />
        <path
          d="M 44 48 H 156 A 40 40 0 0 1 156 128 H 44 A 40 40 0 0 1 44 48 Z"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
        <circle className="cap-orbit-dot" r="5" fill={ACCENT} />
        <circle className="cap-orbit-dot cap-orbit-dot--b" r="3" fill="#fff" opacity="0.7" />
      </svg>
      <div className="absolute left-1/2 top-[44%] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 backdrop-blur-sm">
        <span className="cap-blink h-1.5 w-1.5 rounded-full bg-[#97b999]" />
        <span className="whitespace-nowrap text-[0.7rem] font-medium text-white/90">
          POST /orders
        </span>
      </div>
      <div className="cap-chip absolute bottom-[14%] left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-xl bg-white px-2.5 py-1.5 text-[#0c0b0c] shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
        <Check size={12} strokeWidth={3} />
        <span className="text-xs font-semibold tabular-nums">200 OK</span>
      </div>
    </div>
  );
}

/** Data & AI: two curves redraw over breathing bars. */
export function DataVisual() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
        <g fill="rgba(255,255,255,0.07)">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              className="cap-bar"
              style={{ animationDelay: `${-i * 1.1}s` }}
              x={38 + i * 33}
              y={70}
              width="24"
              height="86"
              rx="8"
            />
          ))}
        </g>
        <path
          className="cap-draw"
          pathLength={1}
          d="M 22 150 C 55 140, 70 96, 100 92 S 140 70, 180 46"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          className="cap-draw cap-draw--b"
          pathLength={1}
          d="M 22 128 C 60 126, 82 132, 108 108 S 150 96, 180 78"
          stroke="var(--cap)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <g fill="#fff">
          <circle className="cap-blink" cx="100" cy="92" r="2.6" />
          <circle className="cap-blink" style={{ animationDelay: "-0.6s" }} cx="146" cy="68" r="2.6" />
          <circle className="cap-blink" style={{ animationDelay: "-1.2s" }} cx="62" cy="128" r="2.6" />
        </g>
      </svg>
      <div className="cap-node absolute left-[-7%] top-[-7%] grid h-10 w-10 place-items-center rounded-full bg-[var(--cap)] text-[#0c0b0c]">
        <Sparkles size={16} />
      </div>
      <div className="cap-chip absolute bottom-[10%] right-[-8%] rounded-xl bg-white px-2.5 py-1.5 text-xs font-semibold text-[#0c0b0c] shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
        acc 0.80
      </div>
    </div>
  );
}

/** Frontend: a layout that keeps re-flowing itself. */
export function FrontendVisual() {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-[13%]">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        <span className="ml-auto text-[0.65rem] text-white/50">
          &lt;App /&gt;
          <span className="cap-caret ml-0.5 inline-block h-2.5 w-px translate-y-0.5 bg-white/80" />
        </span>
      </div>
      <div className="flex flex-1 gap-2">
        <div className="cap-block flex-1 rounded-lg bg-[var(--cap)]" />
        <div
          className="cap-block flex-1 rounded-lg bg-white/15"
          style={{ animationDelay: "-2.3s" }}
        />
      </div>
      <div className="flex flex-1 gap-2">
        <div
          className="cap-block flex-1 rounded-lg bg-white/15"
          style={{ animationDelay: "-4.6s" }}
        />
        <div
          className="cap-block flex-1 rounded-lg bg-white/[0.08]"
          style={{ animationDelay: "-1.2s" }}
        />
        <div
          className="cap-block flex-1 rounded-lg bg-[var(--cap-deep)]"
          style={{ animationDelay: "-3.4s" }}
        />
      </div>
    </div>
  );
}
