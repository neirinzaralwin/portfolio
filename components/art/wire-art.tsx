"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

type Shape = "knot" | "sphere" | "torus";
type P3 = [number, number, number];

/** Each shape is a set of closed 3D polylines, roughly inside a unit sphere. */
function build(shape: Shape): P3[][] {
  const lines: P3[][] = [];
  const TAU = Math.PI * 2;

  if (shape === "knot") {
    // A (2,3) torus knot, drawn as a ribbon of parallel strands.
    for (let k = 0; k < 11; k++) {
      const s = 0.78 + k * 0.045;
      const pts: P3[] = [];
      for (let i = 0; i <= 280; i++) {
        const t = (i / 280) * TAU;
        const r = Math.cos(3 * t) * s + 2;
        pts.push([
          (r * Math.cos(2 * t)) / 3,
          (r * Math.sin(2 * t)) / 3,
          (-Math.sin(3 * t) * s) / 3 + (k - 5) * 0.012,
        ]);
      }
      lines.push(pts);
    }
  } else if (shape === "sphere") {
    for (let k = 1; k < 14; k++) {
      const phi = (k / 14) * Math.PI;
      const pts: P3[] = [];
      for (let i = 0; i <= 96; i++) {
        const th = (i / 96) * TAU;
        pts.push([Math.sin(phi) * Math.cos(th), Math.cos(phi), Math.sin(phi) * Math.sin(th)]);
      }
      lines.push(pts);
    }
    for (let k = 0; k < 16; k++) {
      const th = (k / 16) * TAU;
      const pts: P3[] = [];
      for (let i = 0; i <= 64; i++) {
        const phi = (i / 64) * Math.PI;
        pts.push([Math.sin(phi) * Math.cos(th), Math.cos(phi), Math.sin(phi) * Math.sin(th)]);
      }
      lines.push(pts);
    }
  } else {
    const R = 0.68;
    const r = 0.3;
    for (let k = 0; k < 30; k++) {
      const u = (k / 30) * TAU;
      const pts: P3[] = [];
      for (let i = 0; i <= 40; i++) {
        const v = (i / 40) * TAU;
        pts.push([(R + r * Math.cos(v)) * Math.cos(u), r * Math.sin(v), (R + r * Math.cos(v)) * Math.sin(u)]);
      }
      lines.push(pts);
    }
    for (let k = 0; k < 10; k++) {
      const v = (k / 10) * TAU;
      const pts: P3[] = [];
      for (let i = 0; i <= 120; i++) {
        const u = (i / 120) * TAU;
        pts.push([(R + r * Math.cos(v)) * Math.cos(u), r * Math.sin(v), (R + r * Math.cos(v)) * Math.sin(u)]);
      }
      lines.push(pts);
    }
  }
  return lines;
}

interface WireArtProps {
  shape?: Shape;
  className?: string;
  /** "r,g,b" */
  color?: string;
  speed?: number;
}

/**
 * Slowly turning wireframe form, drawn in hairlines — background art for
 * sections that are otherwise only type.
 */
export function WireArt({
  shape = "knot",
  className,
  color = "214,226,240",
  speed = 1,
}: WireArtProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const lines = build(shape);
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = false;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    const draw = (ms: number) => {
      const t = (ms / 1000) * 0.12 * speed;
      const ay = t;
      const ax = 0.5 + Math.sin(t * 0.7) * 0.25;
      const cy = Math.cos(ay);
      const sy = Math.sin(ay);
      const cx = Math.cos(ax);
      const sx = Math.sin(ax);
      const scale = Math.min(w, h) * 0.46;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 0.7;

      for (const line of lines) {
        let px = 0;
        let py = 0;
        for (let i = 0; i < line.length; i++) {
          const [x0, y0, z0] = line[i];
          const x1 = x0 * cy - z0 * sy;
          const z1 = x0 * sy + z0 * cy;
          const y2 = y0 * cx - z1 * sx;
          const z2 = y0 * sx + z1 * cx;
          const persp = 1 / (2.6 - z2);
          const X = w / 2 + x1 * scale * persp * 2.4;
          const Y = h / 2 + y2 * scale * persp * 2.4;
          if (i > 0) {
            const depth = (z2 + 1) / 2;
            ctx.strokeStyle = `rgba(${color},${0.06 + depth * depth * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(X, Y);
            ctx.stroke();
          }
          px = X;
          py = Y;
        }
      }
    };

    const loop = (ms: number) => {
      if (visible) draw(ms);
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);
    resize();

    if (prefersReducedMotion()) draw(9000);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [shape, color, speed]);

  return <canvas ref={ref} className={className} aria-hidden />;
}

/** Faint drafting grid that fades out toward its edges. */
export function GridBackdrop({ className }: { className?: string }) {
  return <div aria-hidden className={`grid-backdrop ${className ?? ""}`} />;
}
