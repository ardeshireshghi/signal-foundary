import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  unit,
  sub,
  icon: Icon,
  accentValue = false,
  children,
}: {
  label: string;
  value: string;
  unit?: string;
  sub?: string;
  icon: LucideIcon;
  accentValue?: boolean;
  children?: React.ReactNode; // optional sparkline / mini-viz
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-start justify-between">
        <span className="eyebrow">{label}</span>
        <Icon size={16} className="text-muted-2" />
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`tnum text-2xl font-semibold tracking-tight ${
              accentValue ? "text-accent" : "text-fg"
            }`}
          >
            {value}
          </span>
          {unit && <span className="tnum text-xs text-muted">{unit}</span>}
        </div>
        {children}
      </div>
      {sub && <p className="mt-2 text-xs text-muted">{sub}</p>}
    </div>
  );
}

/** Tiny inline sparkline driven by a numeric series. */
export function Sparkline({
  data,
  width = 72,
  height = 28,
}: {
  data: number[];
  width?: number;
  height?: number;
}) {
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
    <svg width={width} height={height} className="overflow-visible" aria-hidden>
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
