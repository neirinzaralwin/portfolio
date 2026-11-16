"use client";

import { ReactNode, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { HoverSwap } from "./hover-swap";
import { useInertiaHover } from "./use-inertia-hover";
import { cn } from "@/utils/cn";

interface MainButtonProps {
  children: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: "light" | "ghost";
  size?: "md" | "sm";
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode | false;
  className?: string;
}

/** Pill button: liquid fill, character swap and an inertia nudge on hover. */
export function MainButton({
  children,
  href,
  onClick,
  variant = "light",
  size = "md",
  type = "button",
  disabled,
  external,
  icon,
  className,
}: MainButtonProps) {
  const ref = useRef<HTMLElement>(null);
  useInertiaHover(ref);

  const classes = cn(
    "main-btn",
    variant === "ghost" && "main-btn--ghost",
    size === "sm" && "main-btn--sm",
    className
  );

  const content = (
    <>
      <span className="main-btn__bg" aria-hidden />
      <HoverSwap key={children}>{children}</HoverSwap>
      {icon !== false && (
        <span className="main-btn__icon" aria-hidden>
          {icon ?? <ArrowUpRight size={size === "sm" ? 14 : 16} />}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        className={classes}
        data-hover-trigger
        data-cursor="hide"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      data-hover-trigger
      data-cursor="hide"
    >
      {content}
    </button>
  );
}
