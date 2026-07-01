import { DimensionScore } from "@/lib/data";

// Lightweight SVG radar for the operator's per-dimension proof profile.
// Pure/deterministic — no chart dependency. The viewBox carries generous
// horizontal padding and labels wrap word-per-line so long axis names
// ("Synthesis quality") never collide with the plot or clip at the edge.
export function RadarChart({
  dimensions,
  size = 240,
}: {
  dimensions: DimensionScore[];
  size?: number;
}) {
  const padX = 68; // room for side labels
  const padY = 34; // room for top/bottom labels
  const w = size + padX * 2;
  const h = size + padY * 2;
  const cx = w / 2;
  const cy = h / 2;
  const r = size / 2;
  const n = dimensions.length;

  const angleFor = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const point = (i: number, radius: number) => {
    const a = angleFor(i);
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius] as const;
  };

  const rings = [0.25, 0.5, 0.75, 1];
  const polygon = (radius: number) =>
    dimensions
      .map((_, i) => {
        const [x, y] = point(i, radius);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  const dataPoints = dimensions.map((d, i) => point(i, (d.score / 100) * r));
  const dataPath =
    dataPoints
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
      .join(" ") + " Z";

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      className="overflow-visible"
      role="img"
      aria-label="Operator proof profile radar"
    >
      {/* rings */}
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={polygon(r * ring)}
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
      <path
        d={dataPath}
        className="fill-accent/20 stroke-accent"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {dataPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" className="fill-accent" />
      ))}
      {/* labels — wrapped word-per-line, anchored away from the plot */}
      {dimensions.map((d, i) => {
        const [x, y] = point(i, r + 16);
        const cos = Math.cos(angleFor(i));
        const anchor = Math.abs(cos) < 0.3 ? "middle" : cos > 0 ? "start" : "end";
        const words = d.label.split(" ");
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            className="fill-muted text-[10px]"
          >
            {words.map((word, wi) => (
              <tspan
                key={wi}
                x={x}
                dy={wi === 0 ? (words.length > 1 ? -5 : 0) : 11}
              >
                {word}
              </tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
}
