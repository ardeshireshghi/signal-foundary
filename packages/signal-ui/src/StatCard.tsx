import type { ReactNode } from "react";

export interface StatCardProps {
  /** Uppercase label above the value. */
  label: string;
  /** The headline value, pre-formatted (e.g. "$423K", "72"). */
  value: string;
  /** Optional unit suffix shown after the value (e.g. "/100", "days"). */
  unit?: string;
  /** Optional supporting line beneath the value. */
  sub?: string;
  /** Optional icon rendered top-right (any node — e.g. a lucide icon). */
  icon?: ReactNode;
  /** Render the value in the accent color. */
  accent?: boolean;
  /** Optional inline visual (e.g. a Sparkline) shown beside the value. */
  children?: ReactNode;
  className?: string;
}

/**
 * KPI stat card — a labelled headline metric with an optional unit,
 * sub-line, corner icon, and inline visual such as a Sparkline.
 */
export function StatCard({
  label,
  value,
  unit,
  sub,
  icon,
  accent = false,
  children,
  className = "",
}: StatCardProps) {
  return (
    <div className={`rounded-xl border border-line bg-surface p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <span className="eyebrow">{label}</span>
        {icon && <span className="text-muted-2">{icon}</span>}
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`tnum text-2xl font-semibold tracking-tight ${
              accent ? "text-accent" : "text-fg"
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
