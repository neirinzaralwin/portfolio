/**
 * Brand design tokens — keep in sync with the main portfolio brand palette.
 * Use full Tailwind class strings so the compiler can detect them.
 */

export const brandStops = {
  ocean: { from: "#668eab", to: "#003862" },
  sage: { from: "#97b999", to: "#005972" },
  lavender: { from: "#aab5e5", to: "#432e5b" },
  slateOlive: { from: "#456882", to: "#B1AB86" },
} as const;

export type BrandGradientKey = keyof typeof brandStops;

/** Tailwind classes for fills. Cycle with `brandGradientAt(i)`. */
export const BRAND_GRADIENT_CLASSES = [
  "bg-gradient-to-r from-[#668eab] to-[#003862]",
  "bg-gradient-to-r from-[#97b999] to-[#005972]",
  "bg-gradient-to-r from-[#aab5e5] to-[#432e5b]",
  "bg-gradient-to-r from-[#456882] to-[#B1AB86]",
] as const;

export function brandGradientAt(
  index: number
): (typeof BRAND_GRADIENT_CLASSES)[number] {
  return BRAND_GRADIENT_CLASSES[index % BRAND_GRADIENT_CLASSES.length];
}

export const BRAND_GRADIENT_STOPS = [
  brandStops.ocean,
  brandStops.sage,
  brandStops.lavender,
  brandStops.slateOlive,
] as const;
