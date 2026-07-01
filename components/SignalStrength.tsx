// Signal strength as a sequential steel→cobalt readout — never a red/green semaphore.
export function SignalStrength({ value }: { value: number }) {
  const bars = 5;
  const filled = Math.round((value / 100) * bars);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-end gap-[3px]" aria-hidden>
        {Array.from({ length: bars }).map((_, i) => {
          const on = i < filled;
          return (
            <span
              key={i}
              className={`w-[3px] rounded-sm ${on ? "bg-signal" : "bg-line-strong"}`}
              style={{ height: `${6 + i * 3}px` }}
            />
          );
        })}
      </div>
      <span className="tnum text-xs text-steel-2">{value}</span>
    </div>
  );
}
