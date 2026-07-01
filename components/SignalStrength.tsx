// Signal strength as a sequential muted→accent readout — never a red/green semaphore.
export function SignalStrength({
  value,
  showValue = true,
}: {
  value: number;
  showValue?: boolean;
}) {
  const bars = 4;
  const filled = Math.max(1, Math.round((value / 100) * bars));
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-end gap-[3px]" aria-hidden>
        {Array.from({ length: bars }).map((_, i) => {
          const on = i < filled;
          return (
            <span
              key={i}
              className={`w-[3px] rounded-sm ${on ? "bg-accent" : "bg-faint"}`}
              style={{ height: `${5 + i * 3}px` }}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="tnum text-xs font-medium text-fg-soft">{value}</span>
      )}
    </div>
  );
}
