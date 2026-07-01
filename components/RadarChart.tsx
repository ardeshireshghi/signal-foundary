import { DimensionScore } from "@/lib/data";

// Lightweight SVG radar for the operator's per-dimension proof profile.
// Pure/deterministic — no chart dependency.
export function RadarChart({
  dimensions,
  size = 260,
}: {
  dimensions: DimensionScore[];
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 34; // padding for labels
  const n = dimensions.length;

  const angleFor = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const point = (i: number, radius: number) => {
    const a = angleFor(i);
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius] as const;
  };

  const rings = [0.25, 0.5, 0.75, 1];

  const dataPoints = dimensions.map((d, i) => point(i, (d.score / 100) * r));
  const dataPath =
    dataPoints.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ") + " Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {/* rings */}
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={dimensions
            .map((_, i) => {
              const [x, y] = point(i, r * ring);
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(" ")}
          fill="none"
          className="stroke-line"
          strokeWidth="1"
        />
      ))}
      {/* spokes */}
      {dimensions.map((_, i) => {
        const [x, y] = point(i, r);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            className="stroke-line"
            strokeWidth="1"
          />
        );
      })}
      {/* data polygon */}
      <path d={dataPath} className="fill-accent/20 stroke-accent" strokeWidth="1.5" strokeLinejoin="round" />
      {dataPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" className="fill-accent" />
      ))}
      {/* labels */}
      {dimensions.map((d, i) => {
        const [x, y] = point(i, r + 18);
        const a = angleFor(i);
        const anchor =
          Math.abs(Math.cos(a)) < 0.3 ? "middle" : Math.cos(a) > 0 ? "start" : "end";
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            className="fill-muted text-[9px]"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
