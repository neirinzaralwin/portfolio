"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/utils/cn";

const BRAND = ["#668eab", "#97b999", "#aab5e5", "#b1ab86"];

interface CanvasTextProps {
  text: string;
  className?: string;
  /** Line colours, cycled top to bottom. */
  colors?: string[];
  /** Seconds per full wave cycle. */
  animationDuration?: number;
  lineWidth?: number;
  /** Vertical gap between lines, in px. */
  lineGap?: number;
  /** How far the curves bend, in px. */
  curveIntensity?: number;
}

/**
 * Text whose letterforms are filled with flowing, coloured curves. Lines are
 * drawn on a canvas and then clipped to the glyphs with `destination-in`,
 * using the element's own computed font so it lines up with real text.
 */
export function CanvasText({
  text,
  className,
  colors = BRAND,
  animationDuration = 7,
  lineWidth = 3,
  lineGap = 4.4,
  curveIntensity = 46,
}: CanvasTextProps) {
  const wrap = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!el || !canvas || !ctx) return;

    let raf = 0;
    let visible = false;
    let cancelled = false;
    let m = { w: 0, h: 0, pad: 0, baseline: 0, font: "", spacing: "0px", dpr: 1 };

    const measure = () => {
      const cs = getComputedStyle(el);
      const fontSize = parseFloat(cs.fontSize);
      const pad = Math.ceil(fontSize * 0.3);
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const spacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;

      canvas.width = Math.round((w + pad * 2) * dpr);
      canvas.height = Math.round((h + pad * 2) * dpr);
      canvas.style.width = `${w + pad * 2}px`;
      canvas.style.height = `${h + pad * 2}px`;
      canvas.style.left = `${-pad}px`;
      canvas.style.top = `${-pad}px`;

      ctx.font = font;
      const tm = ctx.measureText(text);
      const ascent = tm.fontBoundingBoxAscent ?? fontSize * 0.8;
      const descent = tm.fontBoundingBoxDescent ?? fontSize * 0.2;
      // CSS centres the font's content area inside the line box.
      const baseline = pad + (h - (ascent + descent)) / 2 + ascent;
      m = { w, h, pad, baseline, font, spacing, dpr };
    };

    const draw = (ms: number) => {
      const W = m.w + m.pad * 2;
      const H = m.h + m.pad * 2;
      const phase = (ms / 1000 / animationDuration) * Math.PI * 2;

      ctx.setTransform(m.dpr, 0, 0, m.dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(255,255,255,0.34)";
      ctx.fillRect(0, 0, W, H);

      ctx.lineWidth = lineWidth;
      let i = 0;
      for (let y = -curveIntensity; y < H + curveIntensity; y += lineGap, i++) {
        ctx.strokeStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.moveTo(-10, y);
        ctx.bezierCurveTo(
          W * 0.33,
          y + Math.sin(phase + i * 0.33) * curveIntensity,
          W * 0.66,
          y + Math.cos(phase * 0.9 + i * 0.27) * curveIntensity,
          W + 10,
          y + Math.sin(phase * 0.7 + i * 0.21) * curveIntensity * 0.5
        );
        ctx.stroke();
      }

      // Keep only what falls inside the glyphs.
      ctx.globalCompositeOperation = "destination-in";
      ctx.font = m.font;
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
        m.spacing;
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#000";
      ctx.fillText(text, m.pad, m.baseline);
    };

    const loop = (ms: number) => {
      if (visible) draw(ms);
      raf = requestAnimationFrame(loop);
    };

    const refresh = () => {
      if (cancelled) return;
      measure();
      draw(performance.now());
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);
    const ro = new ResizeObserver(refresh);
    ro.observe(el);

    document.fonts.ready.then(() => {
      refresh();
      if (!prefersReducedMotion() && !cancelled) raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [text, colors, animationDuration, lineWidth, lineGap, curveIntensity]);

  return (
    <span ref={wrap} className={cn("relative inline-block", className)}>
      <span className="text-transparent">{text}</span>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute"
      />
    </span>
  );
}
