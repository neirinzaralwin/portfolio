"use client";

import { CSSProperties, ReactNode, useEffect, useState } from "react";
import {
  Bot,
  Check,
  Crosshair,
  FlaskConical,
  GripVertical,
  Layers,
  Monitor,
  Rocket,
  Server,
  Smartphone,
} from "lucide-react";
import { useStep } from "@/components/motion/use-step";

/**
 * The hero backdrop: how a product gets built in an AI-native workflow,
 * drawn as a node graph. Inputs on the left feed one release in the middle;
 * once all four have landed, it ships to the surfaces on the right.
 *
 * Everything is laid out on a fixed 1440×900 stage that is scaled to cover
 * the hero, so wires and cards always share one coordinate system.
 */
const STAGE = { w: 1440, h: 900 };
const CORE = { x: 600, y: 572, w: 240, head: 46, row: 40 };
const rowY = (i: number) => CORE.y + CORE.head + CORE.row * i + CORE.row / 2;

const C = {
  ocean: "#668eab",
  sage: "#97b999",
  lavender: "#aab5e5",
  olive: "#b1ab86",
};

type Input = {
  id: string;
  title: string;
  icon: ReactNode;
  x: number;
  y: number;
  w: number;
  port: number; // port y offset inside the card
  portLabel: string;
  color: string;
  body: ReactNode;
};

const chip = "rounded-md bg-white/[0.07] px-1.5 py-0.5 text-[10px] text-white/70";

const INPUTS: Input[] = [
  {
    id: "intent",
    title: "Intent",
    icon: <Crosshair size={13} />,
    x: 36,
    y: 138,
    w: 216,
    port: 92,
    portLabel: "spec",
    color: C.ocean,
    body: (
      <>
        <p className="text-[11px] text-white/85">What does the user need?</p>
        <p className="text-[10px] text-white/45">Problem before solution</p>
      </>
    ),
  },
  {
    id: "context",
    title: "Context",
    icon: <Layers size={13} />,
    x: 24,
    y: 330,
    w: 226,
    port: 96,
    portLabel: "context",
    color: C.sage,
    body: (
      <div className="flex flex-wrap gap-1">
        <span className={chip}>repo</span>
        <span className={chip}>docs</span>
        <span className={chip}>designs</span>
        <span className={chip}>data</span>
      </div>
    ),
  },
  {
    id: "agents",
    title: "Agents",
    icon: <Bot size={13} />,
    x: 64,
    y: 520,
    w: 220,
    port: 92,
    portLabel: "agents",
    color: C.lavender,
    body: (
      <>
        <p className="text-[11px] text-white/85">Plan, build, review</p>
        <p className="text-[10px] text-white/45">I approve every merge</p>
      </>
    ),
  },
  {
    id: "evals",
    title: "Evals",
    icon: <FlaskConical size={13} />,
    x: 318,
    y: 650,
    w: 196,
    port: 92,
    portLabel: "evals",
    color: C.olive,
    body: (
      <>
        <p className="text-[11px] text-white/85">Tests and golden prompts</p>
        <p className="text-[10px] text-white/45">Run on every change</p>
      </>
    ),
  },
];

const ROWS = ["Spec", "Context", "Agents", "Evals"];

type Output = {
  id: string;
  title: string;
  icon: ReactNode;
  x: number;
  y: number;
  w: number;
  port: number;
  line: string;
  sub: string;
  color: string;
};

const OUTPUTS: Output[] = [
  {
    id: "mobile",
    title: "Mobile app",
    icon: <Smartphone size={13} />,
    x: 1186,
    y: 138,
    w: 218,
    port: 92,
    line: "iOS and Android",
    sub: "One codebase, two stores",
    color: C.ocean,
  },
  {
    id: "web",
    title: "Web app",
    icon: <Monitor size={13} />,
    x: 1176,
    y: 330,
    w: 228,
    port: 92,
    line: "Preview on every push",
    sub: "Shared design system",
    color: C.olive,
  },
  {
    id: "api",
    title: "API",
    icon: <Server size={13} />,
    x: 1150,
    y: 520,
    w: 220,
    port: 92,
    line: "Domain-driven services",
    sub: "Payments, auctions, sync",
    color: C.sage,
  },
];

const wire = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = Math.abs(x2 - x1) * 0.5;
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
};

function Header({ icon, title, tag }: { icon: ReactNode; title: string; tag?: string }) {
  return (
    <div className="flex items-center gap-2 px-3.5 pt-3 text-white/90">
      <span className="text-white/60">{icon}</span>
      <span className="text-[12px] font-medium">{title}</span>
      {tag && <span className="text-[10px] text-white/40">{tag}</span>}
      <GripVertical size={12} className="ml-auto text-white/20" />
    </div>
  );
}

export function ThinkingGraph({ className }: { className?: string }) {
  // 0 idle · 1–4 inputs land · 5 ships · 6–7 hold
  const { ref, step } = useStep<HTMLDivElement>(8, 1150, 5);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () =>
      setScale(Math.max(el.clientWidth / STAGE.w, el.clientHeight / STAGE.h));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  const landed = Math.min(step, 4);
  const shipped = step >= 5;

  return (
    <div ref={ref} className={className} aria-hidden>
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: STAGE.w,
          height: STAGE.h,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <svg
          className="absolute inset-0"
          width={STAGE.w}
          height={STAGE.h}
          viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
          fill="none"
        >
          {/* Canvas guides */}
          <g stroke="rgba(255,255,255,0.06)" strokeDasharray="4 6">
            {[120, 310, 500, 690].map((y) => (
              <line key={y} x1="0" y1={y} x2={STAGE.w} y2={y} />
            ))}
            {[300, 560, 880, 1140].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2={STAGE.h} />
            ))}
          </g>

          {INPUTS.map((n, i) => {
            const d = wire(n.x + n.w, n.y + n.port, CORE.x, rowY(i));
            return (
              <g key={n.id}>
                <path d={d} stroke="rgba(255,255,255,0.14)" strokeDasharray="3 5" />
                <path
                  className="wire-live"
                  data-on={landed > i}
                  d={d}
                  pathLength={1}
                  stroke={n.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            );
          })}
          {OUTPUTS.map((n, i) => {
            const d = wire(CORE.x + CORE.w, rowY(i), n.x, n.y + n.port);
            return (
              <g key={n.id}>
                <path d={d} stroke="rgba(255,255,255,0.14)" strokeDasharray="3 5" />
                <path
                  className="wire-live"
                  data-on={shipped}
                  d={d}
                  pathLength={1}
                  stroke={n.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ transitionDelay: shipped ? `${i * 0.15}s` : "0s" }}
                />
              </g>
            );
          })}
        </svg>

        {/* Inputs */}
        {INPUTS.map((n, i) => (
          <div
            key={n.id}
            className="node-card"
            data-on={landed > i}
            style={
              {
                left: n.x,
                top: n.y,
                width: n.w,
                minHeight: n.port + 20,
                "--node": n.color,
              } as CSSProperties
            }
          >
            <Header icon={n.icon} title={n.title} />
            <div className="space-y-0.5 px-3.5 pb-2 pt-2">{n.body}</div>
            <div
              className="absolute right-0 flex items-center gap-2 text-[10px] text-white/50"
              style={{ top: n.port, transform: "translate(5.5px, -50%)" }}
            >
              {n.portLabel}
              <span className="port" data-on={landed > i} />
            </div>
          </div>
        ))}

        {/* The release everything feeds */}
        <div
          className="node-card"
          data-on={shipped}
          style={
            {
              left: CORE.x,
              top: CORE.y,
              width: CORE.w,
              "--node": C.sage,
            } as CSSProperties
          }
        >
          <div style={{ height: CORE.head - 8 }}>
            <Header icon={<Rocket size={13} />} title="Release" tag="this sprint" />
          </div>
          <div className="mx-1.5 mt-2 rounded-xl bg-black/40">
            {ROWS.map((label, i) => {
              const on = landed > i;
              return (
                <div
                  key={label}
                  className="relative flex h-10 items-center justify-between px-4 text-[12px]"
                  style={{ "--node": INPUTS[i].color } as CSSProperties}
                >
                  <span
                    className="port absolute left-0 top-1/2 -translate-x-[calc(50%+6px)] -translate-y-1/2"
                    data-on={on}
                  />
                  <span
                    className="transition-colors duration-500"
                    style={{ color: on ? "#fff" : "rgba(255,255,255,0.45)" }}
                  >
                    {label}
                  </span>
                  <Check
                    size={13}
                    strokeWidth={2.5}
                    className="transition-all duration-500"
                    style={{
                      color: INPUTS[i].color,
                      opacity: on ? 1 : 0,
                      transform: on ? "scale(1)" : "scale(0.4)",
                    }}
                  />
                  {i < 3 && (
                    <span
                      className="port absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(50%+6px)]"
                      data-on={shipped}
                      style={{ "--node": OUTPUTS[i].color } as CSSProperties}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2 px-4 py-3 text-[10px] text-white/50">
            <span
              className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
              style={{ background: shipped ? C.sage : "rgba(255,255,255,0.35)" }}
            />
            {shipped ? "Shipped to production" : `Awaiting inputs · ${landed}/4`}
          </div>
        </div>

        {/* Where it ships */}
        {OUTPUTS.map((n) => (
          <div
            key={n.id}
            className="node-card"
            data-on={shipped}
            style={
              {
                left: n.x,
                top: n.y,
                width: n.w,
                minHeight: n.port + 20,
                "--node": n.color,
              } as CSSProperties
            }
          >
            <Header icon={n.icon} title={n.title} />
            <div className="space-y-0.5 px-3.5 pb-2 pt-2">
              <p className="text-[11px] text-white/85">{n.line}</p>
              <p className="text-[10px] text-white/45">{n.sub}</p>
            </div>
            <div
              className="absolute left-0 flex items-center gap-2 text-[10px] text-white/50"
              style={{ top: n.port, transform: "translate(-5.5px, -50%)" }}
            >
              <span className="port" data-on={shipped} />
              <span
                className="h-1 w-1 rounded-full"
                style={{ background: shipped ? n.color : "rgba(255,255,255,0.3)" }}
              />
              {shipped ? "Live" : "Waiting for release"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
