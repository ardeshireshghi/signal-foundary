export interface SignalStrengthProps {
  /** Strength on a 0–100 scale. */
  value: number;
  /** Show the numeric value beside the bars. */
  showValue?: boolean;
  className?: string;
}

/**
 * Signal-strength readout — a sequential muted→accent bar meter with an
 * optional numeric label. Never a red/green semaphore.
 */
export function SignalStrength({
  value,
  showValue = true,
  className = "",
}: SignalStrengthProps) {
  const bars = 4;
  const filled = Math.max(1, Math.round((value / 100) * bars));
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-end gap-[3px]" aria-hidden>
        {Array.from({ length: bars }).map((_, i) => (
          <span
            key={i}
            className={`w-[3px] rounded-sm ${i < filled ? "bg-accent" : "bg-faint"}`}
            style={{ height: `${5 + i * 3}px` }}
          />
        ))}
      </div>
      {showValue && (
        <span className="tnum text-xs font-medium text-fg-soft">{value}</span>
      )}
    </div>
  );
}
