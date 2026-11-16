"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

type Point = { x: number; y: number; z: number; seed: number };

function fibonacciSphere(count: number): Point[] {
  const pts: Point[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push({
      x: Math.cos(theta) * r,
      y,
      z: Math.sin(theta) * r,
      seed: Math.random() * Math.PI * 2,
    });
  }
  return pts;
}

/**
 * A slowly breathing sphere of dots, drawn on a 2D canvas. Waves travel
 * across the surface and the whole form leans toward the pointer.
 */
export function ParticleOrb({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = prefersReducedMotion();
    const small = window.innerWidth < 768;
    const points = fibonacciSphere(small ? 900 : 2200);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    const draw = (ms: number) => {
      const t = ms / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const radius = Math.min(width, height) * 0.36;
      const cx = width / 2;
      const cy = height / 2;
      const rotY = t * 0.12 + pointer.x * 0.6;
      const rotX = -0.25 + pointer.y * 0.4;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        // Layered waves push the surface in and out.
        const wave =
          Math.sin(p.x * 3.1 + t * 0.9) * 0.09 +
          Math.sin(p.y * 4.3 - t * 0.7) * 0.08 +
          Math.sin(p.z * 2.7 + t * 0.5 + p.seed * 0.15) * 0.07;
        const r = 1 + wave;

        let x = p.x * r;
        let y = p.y * r;
        let z = p.z * r;

        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        x = x1;
        z = z1;
        const y1 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        y = y1;
        z = z2;

        const depth = (z + 1.3) / 2.6; // 0 (far) → 1 (near)
        const persp = 1 / (1.9 - z * 0.45);
        const sx = cx + x * radius * persp * 1.55;
        const sy = cy + y * radius * persp * 1.55;
        const size = (0.35 + depth * 1.25) * (small ? 0.85 : 1);
        const alpha = 0.08 + depth * depth * 0.85;

        // Far side cools toward blue, near side warms toward lavender.
        const red = Math.round(120 + depth * 70);
        const green = Math.round(128 + depth * 62);
        const blue = Math.round(214 + depth * 30);
        ctx.fillStyle = `rgba(${red},${green},${blue},${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (ms: number) => {
      if (visible) draw(ms);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      draw(4000);
    } else {
      window.addEventListener("mousemove", onMove, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
