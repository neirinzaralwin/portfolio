"use client";

import { Bot, Check, GitPullRequest, Loader2 } from "lucide-react";
import { useStep } from "@/components/motion/use-step";
import { cn } from "@/utils/cn";

const ease = "duration-700 ease-[cubic-bezier(.22,1,.36,1)]";
const panel = "rounded-xl bg-black/35 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]";

/* ---------------------------------------------------------------- Backlog */

const STORIES = [
  { text: "Bid notifications", pts: 3 },
  { text: "QR payment retry", pts: 5 },
  { text: "Listing photo upload", pts: 2 },
  { text: "Seller payout report", pts: 8 },
];
// Position of each story at every step — the list re-ranks itself.
const ORDERS = [
  [0, 1, 2, 3],
  [1, 0, 2, 3],
  [1, 2, 0, 3],
  [2, 1, 0, 3],
];

export function BacklogScene() {
  const { ref, step } = useStep<HTMLDivElement>(4, 1500, 0);
  const order = ORDERS[step];
  return (
    <div ref={ref} className="relative h-[176px]">
      {STORIES.map((s, i) => {
        const slot = order.indexOf(i);
        const top = slot === 0;
        return (
          <div
            key={s.text}
            className={cn(
              panel,
              "absolute inset-x-0 flex h-10 items-center gap-3 px-3 text-xs transition-[transform,box-shadow,background-color]",
              ease,
              top && "bg-white/[0.06] shadow-[inset_0_0_0_1px_var(--spot)]"
            )}
            style={{ transform: `translateY(${slot * 45}px)` }}
          >
            <span className="w-3 text-white/35 tabular-nums">{slot + 1}</span>
            <span className={top ? "text-white" : "text-white/65"}>{s.text}</span>
            {top && (
              <span className="rounded-full bg-[var(--spot)] px-1.5 py-0.5 text-[10px] font-medium text-[#0c0b0c]">
                Next up
              </span>
            )}
            <span className="ml-auto rounded-md bg-white/[0.07] px-1.5 py-0.5 text-[10px] text-white/60 tabular-nums">
              {s.pts} pts
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------ Sprint board */

const TICKETS = [
  { text: "Auction countdown", cols: [1, 2, 2, 2, 2] },
  { text: "Payment review screen", cols: [0, 1, 2, 2, 2] },
  { text: "Push on outbid", cols: [0, 0, 1, 2, 2] },
  { text: "Commission invoice", cols: [0, 0, 0, 1, 2] },
];
const COLS = ["To do", "In progress", "Done"];

export function SprintScene() {
  const { ref, step } = useStep<HTMLDivElement>(5, 1400, 2);
  // Slot of each ticket inside its column at this step.
  const slots = TICKETS.map(
    (t, i) => TICKETS.slice(0, i).filter((o) => o.cols[step] === t.cols[step]).length
  );
  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center justify-between text-[11px] text-white/45">
        <span>Sprint 14</span>
        <span className="tabular-nums">Day {step * 2 + 2} of 10</span>
      </div>
      <div className="relative grid h-[168px] grid-cols-3 gap-2">
        {COLS.map((c, ci) => (
          <div key={c} className={cn(panel, "px-2.5 pt-2 text-[11px] text-white/45")}>
            {c}
            <span className="ml-1.5 tabular-nums text-white/30">
              {TICKETS.filter((t) => t.cols[step] === ci).length}
            </span>
          </div>
        ))}
        {TICKETS.map((t, i) => {
          const col = t.cols[step];
          return (
            <div
              key={t.text}
              className={cn(
                "absolute left-0 top-8 w-[calc((100%-1rem)/3)] px-1.5 transition-transform",
                ease
              )}
              style={{
                transform: `translate(calc(${col} * (100% + 0.5rem)), ${slots[i] * 33}px)`,
              }}
            >
              <div
                className={cn(
                  "flex h-7 items-center gap-1.5 rounded-lg bg-white/[0.08] px-2 text-[11px] text-white/85 transition-colors duration-500",
                  col === 1 && "bg-[color-mix(in_srgb,var(--spot)_35%,transparent)]"
                )}
              >
                <span
                  className={cn(
                    "grid h-3 w-3 shrink-0 place-items-center rounded-full border border-white/30 transition-colors duration-500",
                    col === 2 && "border-transparent bg-[var(--spot)] text-[#0c0b0c]"
                  )}
                >
                  {col === 2 && <Check size={8} strokeWidth={4} />}
                </span>
                <span className="truncate">{t.text}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Stand-up */

const UPDATES = [
  { label: "Yesterday", text: "Merged the payment review flow." },
  { label: "Today", text: "Wiring outbid push notifications." },
  { label: "Blocked by", text: "Nothing. QR sandbox keys arrived." },
];

export function StandupScene() {
  const { ref, step } = useStep<HTMLDivElement>(5, 1300, 3);
  return (
    <div ref={ref} className="flex h-[176px] flex-col justify-end gap-2">
      {UPDATES.map((u, i) => {
        const shown = step > i;
        const typing = step === i;
        return (
          <div
            key={u.label}
            className={cn(
              "flex items-start gap-2 transition-[opacity,transform]",
              ease,
              shown || typing ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
          >
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--spot)] text-[9px] font-semibold text-[#0c0b0c]">
              NR
            </span>
            <div className={cn(panel, "min-h-[2.4rem] rounded-2xl rounded-tl-md px-3 py-2 text-xs")}>
              {typing ? (
                <span className="flex h-4 items-center gap-1">
                  <span className="typing-dot h-1 w-1 rounded-full bg-white/70" />
                  <span className="typing-dot h-1 w-1 rounded-full bg-white/70" />
                  <span className="typing-dot h-1 w-1 rounded-full bg-white/70" />
                </span>
              ) : (
                <>
                  <span className="text-[var(--spot)]">{u.label}</span>{" "}
                  <span className="text-white/80">{u.text}</span>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- Pipeline */

const STAGES = ["Lint", "Tests", "Build", "Preview"];

export function PipelineScene() {
  const { ref, step } = useStep<HTMLDivElement>(7, 900, 5);
  const done = Math.min(step, 4);
  return (
    <div ref={ref} className="flex h-[176px] flex-col justify-center">
      <div className="mb-4 flex items-center gap-2 text-[11px] text-white/50">
        <GitPullRequest size={13} className="text-[var(--spot)]" />
        <span className="text-white/80">feat: outbid notifications</span>
        <span className="ml-auto tabular-nums">#128</span>
      </div>
      <div className="relative flex items-center justify-between">
        <div className="absolute inset-x-4 top-4 h-px bg-white/10">
          <div
            className={cn("h-full origin-left bg-[var(--spot)] transition-transform", ease)}
            style={{ transform: `scaleX(${Math.max(0, Math.min(done, 3)) / 3})` }}
          />
        </div>
        {STAGES.map((s, i) => {
          const state = done > i ? "done" : done === i ? "run" : "wait";
          return (
            <div key={s} className="relative flex flex-col items-center gap-2">
              <span
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full bg-[#1b1a1e] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] transition-[background-color,transform] duration-500",
                  state === "done" && "scale-110 bg-[var(--spot)] text-[#0c0b0c]",
                  state === "run" && "text-[var(--spot)]"
                )}
              >
                {state === "done" && <Check size={14} strokeWidth={3} />}
                {state === "run" && <Loader2 size={14} className="spin-slow" />}
              </span>
              <span
                className={cn(
                  "text-[11px] transition-colors duration-500",
                  state === "wait" ? "text-white/35" : "text-white/85"
                )}
              >
                {s}
              </span>
            </div>
          );
        })}
      </div>
      <div
        className={cn(
          panel,
          "mt-5 flex items-center gap-2 px-3 py-2 text-[11px] transition-[opacity,transform]",
          ease,
          done >= 4 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--spot)]" />
        <span className="text-white/80">Preview ready for review</span>
        <span className="ml-auto text-white/40 tabular-nums">1m 42s</span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Review */

const DIFF = [
  { sign: " ", code: "async function placeBid(bid) {" },
  { sign: "-", code: "  await save(bid)" },
  { sign: "+", code: "  if (bid.amount <= highest) throw TooLow" },
  { sign: "+", code: "  await save(bid)" },
  { sign: "+", code: "  await notifyOutbid(previous)" },
  { sign: " ", code: "}" },
];

export function ReviewScene() {
  const { ref, step } = useStep<HTMLDivElement>(10, 800, 8);
  return (
    <div ref={ref} className="grid h-[176px] grid-cols-1 gap-3 sm:grid-cols-[1.4fr_1fr]">
      <div className={cn(panel, "overflow-hidden py-2 font-mono text-[11px] leading-[1.55rem]")}>
        {DIFF.map((l, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-2 px-3 transition-[opacity,transform] duration-500",
              step > i ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
              l.sign === "+" && "bg-[color-mix(in_srgb,var(--sage)_16%,transparent)] text-[var(--sage)]",
              l.sign === "-" && "bg-white/[0.04] text-white/35 line-through",
              l.sign === " " && "text-white/60"
            )}
          >
            <span className="w-2 shrink-0 no-underline">{l.sign}</span>
            <span className="truncate">{l.code}</span>
          </div>
        ))}
      </div>
      <div className="hidden flex-col justify-end gap-2 sm:flex">
        <div
          className={cn(
            panel,
            "px-3 py-2 text-[11px] transition-[opacity,transform]",
            ease,
            step >= 6 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          )}
        >
          <span className="mb-1 flex items-center gap-1.5 text-[var(--spot)]">
            <Bot size={12} /> Agent
          </span>
          <span className="text-white/75">
            Added a guard for bids below the current highest.
          </span>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl bg-[var(--spot)] px-3 py-2 text-[11px] font-medium text-[#0c0b0c] transition-[opacity,transform]",
            ease,
            step >= 8 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          )}
        >
          <Check size={13} strokeWidth={3} /> Approved by Nei Rin
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Retro */

const BURN = [34, 31, 27, 26, 20, 15, 11, 6, 2, 0];

export function RetroScene() {
  const { ref, step } = useStep<HTMLDivElement>(12, 500, 10);
  const day = Math.min(step, 9);
  const x = (i: number) => 8 + (i * 324) / 9;
  const y = (v: number) => 10 + (1 - v / 34) * 100;
  const points = BURN.slice(0, day + 1)
    .map((v, i) => `${x(i)},${y(v)}`)
    .join(" ");
  return (
    <div ref={ref} className="h-[176px]">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-white/45">Points left</div>
          <div className="heading text-3xl text-white tabular-nums">{BURN[day]}</div>
        </div>
        <div className="text-right text-[11px] text-white/45">
          Velocity
          <div className="text-sm text-[var(--spot)] tabular-nums">34 pts</div>
        </div>
      </div>
      <svg viewBox="0 0 340 120" className="mt-1 h-[118px] w-full" fill="none">
        <line x1={x(0)} y1={y(34)} x2={x(9)} y2={y(0)} stroke="rgba(255,255,255,0.18)" strokeDasharray="3 4" />
        <polyline
          points={points}
          stroke="var(--spot)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={x(day)} cy={y(BURN[day])} r="3.5" fill="var(--spot)" />
      </svg>
    </div>
  );
}
