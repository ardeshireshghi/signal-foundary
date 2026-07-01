export interface ScoreEntry {
  /** Dimension label (e.g. "Research depth"). */
  label: string;
  /** Score on a 0–100 scale. */
  score: number;
}

export interface ScoreBarsProps {
  /** One row per scored dimension. */
  scores: ScoreEntry[];
  /** Optional overall score shown in the header. */
  overall?: number;
  /** Optional caption under the header (e.g. a gate decision). */
  caption?: string;
  /** Header title. */
  title?: string;
  className?: string;
}

/**
 * Multi-dimension score readout — a titled panel of labelled accent bars
 * with an optional overall score. Used for operator proof scoring.
 */
export function ScoreBars({
  scores,
  overall,
  caption,
  title = "Score",
  className = "",
}: ScoreBarsProps) {
  return (
    <div className={`rounded-xl border border-line bg-surface p-4 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="eyebrow">{title}</p>
          {caption && <p className="mt-0.5 text-xs text-muted">{caption}</p>}
        </div>
        {overall !== undefined && (
          <div className="text-right">
            <span className="tnum text-2xl font-semibold text-accent">
              {overall}
            </span>
            <span className="tnum text-xs text-muted">/100</span>
          </div>
        )}
      </div>
      <ul className="space-y-2.5">
        {scores.map((d) => (
          <li key={d.label} className="flex items-center gap-3">
            <span className="w-36 shrink-0 text-xs text-fg-soft">{d.label}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-elevated">
              <span
                className="block h-full rounded-full bg-accent"
                style={{ width: `${Math.max(0, Math.min(100, d.score))}%` }}
              />
            </span>
            <span className="tnum w-7 shrink-0 text-right text-xs text-muted">
              {d.score}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
