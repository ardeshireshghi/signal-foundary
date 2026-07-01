import { Sprint, fmtMoney } from "@/lib/data";

// The signature element (docs/design-plan.md §5).
// Five-tick assay readout: done ● / open ◉(accent glow) / locked ○.
// Accent appears at full saturation ONLY on the open gate — the next fundable step.

function Node({ status }: { status: Sprint["status"] }) {
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

export function SignalSpine({ sprints }: { sprints: Sprint[] }) {
  return (
    <div className="flex items-stretch">
      {sprints.map((s, i) => {
        const done = s.status === "done";
        const open = s.status === "open";
        return (
          <div key={s.phase} className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex items-center">
              <Node status={s.status} />
              {i < sprints.length - 1 && (
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
                {s.short}
              </div>
              <div
                className={`tnum text-[10px] leading-tight ${
                  open ? "text-accent" : "text-muted-2"
                }`}
              >
                {done ? "done" : open ? `${fmtMoney(s.budget)} open` : "—"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
