export interface SparklineProps {
  /** Series to plot; needs at least two points. */
  data: number[];
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Tiny inline trend line in the accent color. Driven entirely by the
 * `data` series — no axes, labels, or chrome.
 */
export function Sparkline({
  data,
  width = 72,
  height = 28,
  className = "",
}: SparklineProps) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / span) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg
      width={width}
      height={height}
      className={`overflow-visible ${className}`}
      aria-hidden
    >
      <polyline
        points={pts}
        fill="none"
        className="stroke-accent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
