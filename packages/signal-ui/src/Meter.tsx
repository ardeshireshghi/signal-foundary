export interface MeterProps {
  /** Fill percentage, 0–100. */
  value: number;
  /** Optional label shown above the track. */
  label?: string;
  /** Optional right-aligned value text (e.g. "77"). */
  valueLabel?: string;
  className?: string;
}

/**
 * Single horizontal progress bar in the accent color, with optional
 * label and value. The building block for score readouts.
 */
export function Meter({ value, label, valueLabel, className = "" }: MeterProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      {(label || valueLabel) && (
        <div className="mb-1 flex items-center justify-between text-xs">
          {label && <span className="text-fg-soft">{label}</span>}
          {valueLabel && <span className="tnum text-muted">{valueLabel}</span>}
        </div>
      )}
      <span className="block h-1.5 overflow-hidden rounded-full bg-elevated">
        <span
          className="block h-full rounded-full bg-accent"
          style={{ width: `${pct}%` }}
        />
      </span>
    </div>
  );
}
