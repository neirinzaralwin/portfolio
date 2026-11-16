"use client";

import { CSSProperties, ReactNode, useRef } from "react";
import { cn } from "@/utils/cn";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** CSS colour for the light and the hover border. */
  color?: string;
  lift?: boolean;
  as?: "div" | "article" | "figure";
}

/** Card with a soft light that tracks the pointer and tints the border. */
export function SpotlightCard({
  children,
  className,
  color,
  lift = false,
  as: Tag = "div",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMove}
      className={cn("spot", lift && "spot--lift", className)}
      style={color ? ({ "--spot": color } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
