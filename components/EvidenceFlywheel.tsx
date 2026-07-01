import { GraphStage } from "@/lib/data";
import { ChevronRight } from "lucide-react";

// The moat flywheel: Signal → Thesis → Sprint → Evidence → Operator → Formation.
// Single-accent magnitude (count size), neutral structure — one system.
export function EvidenceFlywheel({ stages }: { stages: GraphStage[] }) {
  return (
    <div className="flex flex-wrap items-stretch gap-2">
      {stages.map((s, i) => (
        <div key={s.key} className="flex items-stretch gap-2">
          <div className="flex min-w-[128px] flex-1 flex-col justify-between rounded-xl border border-line bg-surface p-4">
            <span className="eyebrow">{s.label}</span>
            <div className="mt-3">
              <span className="tnum text-2xl font-semibold text-accent">
                {s.count}
              </span>
              <span className="ml-1 text-xs text-muted">{s.sub}</span>
            </div>
          </div>
          {i < stages.length - 1 && (
            <div className="flex items-center">
              <ChevronRight size={16} className="text-muted-2" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
