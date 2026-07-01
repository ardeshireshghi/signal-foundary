export type SpineStatus = "done" | "open" | "locked";

export interface SpineStep {
  /** Short step label (e.g. "Market map"). */
  label: string;
  /** Optional caption beneath the label (e.g. "$5K open", "done"). */
  caption?: string;
  /** Step state. Exactly one `open` step reads as the next actionable gate. */
  status: SpineStatus;
}

export interface SignalSpineProps {
  /** Ordered steps, rendered left to right. */
  steps: SpineStep[];
  className?: string;
}

function Node({ status }: { status: SpineStatus }) {
  if (status === "done") {
    return <span className="h-2 w-2 rounded-full bg-muted" />;
  }
  if (status === "open") {
    return (
      <span className="relative flex h-3.5 w-3.5 items-center justify-center">
        <span className="absolute h-3.5 w-3.5 rounded-full bg-accent/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-accent/30" />
      </span>
    );
  }
  return (
    <span className="h-2 w-2 rounded-full border border-line-strong bg-surface" />
  );
}

/**
 * The Signal Spine — a horizontal assay readout of a staged process.
 * Each step is done / open / locked; the accent appears at full
 * saturation only on the open step, pointing to the next actionable gate.
 */
export function SignalSpine({ steps, className = "" }: SignalSpineProps) {
  return (
    <div className={`flex items-stretch ${className}`}>
      {steps.map((s, i) => {
        const done = s.status === "done";
        const open = s.status === "open";
        return (
          <div key={i} className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex items-center">
              <Node status={s.status} />
              {i < steps.length - 1 && (
                <span className="h-px flex-1 bg-line-strong" />
              )}
            </div>
            <div className="pr-2">
              <div
                className={`truncate text-[11px] leading-tight ${
                  open
                    ? "font-medium text-accent"
                    : done
                      ? "text-fg-soft"
                      : "text-muted-2"
                }`}
              >
                {s.label}
              </div>
              {s.caption && (
                <div
                  className={`tnum text-[10px] leading-tight ${
                    open ? "text-accent" : "text-muted-2"
                  }`}
                >
                  {s.caption}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
