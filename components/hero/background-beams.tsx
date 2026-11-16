const COLORS = ["#668eab", "#97b999", "#aab5e5", "#b1ab86"];

const BEAMS = Array.from({ length: 16 }, (_, i) => ({
  d: `M ${-320 + i * 42} 960 C ${80 + i * 44} 620, ${660 + i * 34} ${
    520 - i * 12
  }, ${1500 + i * 22} ${-120 + i * 34}`,
  color: COLORS[i % COLORS.length],
  dur: 7 + ((i * 37) % 9),
  delay: -((i * 53) % 11),
}));

/**
 * Fan of faint curves crossing the hero; a short bright segment travels
 * along each one at its own pace.
 */
export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {BEAMS.map((b, i) => (
        <g key={i}>
          <path d={b.d} stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
          <path
            className="beam"
            d={b.d}
            pathLength={1}
            stroke={b.color}
            strokeWidth="1.4"
            strokeLinecap="round"
            style={
              {
                "--beam-dur": `${b.dur}s`,
                "--beam-delay": `${b.delay}s`,
              } as React.CSSProperties
            }
          />
        </g>
      ))}
    </svg>
  );
}
