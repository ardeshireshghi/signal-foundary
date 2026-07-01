import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Quote } from "lucide-react";
import {
  OperatorProfileData,
  FounderReadiness,
  SprintStatus,
} from "@/lib/data";
import { RadarChart } from "./RadarChart";

const READINESS: Record<FounderReadiness, { label: string; cls: string }> = {
  exceptional: { label: "Exceptional", cls: "bg-accent/15 text-accent" },
  strong: { label: "Strong", cls: "bg-elevated text-fg-soft" },
  emerging: { label: "Emerging", cls: "bg-surface-2 text-muted" },
};

function SprintStatusTag({ status }: { status: SprintStatus }) {
  const map = {
    done: { label: "Passed", cls: "text-fg-soft" },
    open: { label: "In progress", cls: "text-accent" },
    locked: { label: "Queued", cls: "text-muted-2" },
  } as const;
  const s = map[status];
  return <span className={`eyebrow ${s.cls}`}>{s.label}</span>;
}

export function OperatorProfile({ data }: { data: OperatorProfileData }) {
  const { operator, dimensions, overall, sprintsCompleted, sprintsActive, records, evidenceSamples } = data;
  const readiness = READINESS[operator.founderReadiness];

  return (
    <div className="mx-auto max-w-5xl px-6 py-6">
      <Link
        href="/operators"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-fg"
      >
        <ArrowLeft size={15} />
        Operator Network
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-lg font-semibold text-accent">
            {operator.initials}
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-fg">
              {operator.name}
            </h1>
            <p className="mt-0.5 text-sm text-muted">
              {operator.skills.join(" · ")} · {operator.domains.join(", ")}
            </p>
            <span
              className={`mt-2 inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${readiness.cls}`}
            >
              {readiness.label} founder-readiness
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="eyebrow">Proof score</div>
          <div className="tnum text-3xl font-semibold text-accent">{overall}</div>
          <div className="tnum text-xs text-muted">
            {sprintsCompleted} passed · {sprintsActive} active
          </div>
        </div>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-[340px_1fr]">
        {/* Proof profile radar */}
        <section>
          <p className="eyebrow mb-2">Proof profile</p>
          <div className="rounded-xl border border-line bg-surface p-4">
            {sprintsCompleted > 0 ? (
              <RadarChart dimensions={dimensions} />
            ) : (
              <p className="py-10 text-center text-sm text-muted">
                No completed sprints yet.
              </p>
            )}
          </div>
        </section>

        {/* Dimension bars + sprint history */}
        <div className="space-y-7">
          <section>
            <p className="eyebrow mb-2.5">Dimension scores</p>
            <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {dimensions.map((d) => (
                <li key={d.key} className="flex items-center gap-3">
                  <span className="w-32 shrink-0 text-xs text-fg-soft">{d.label}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-elevated">
                    <span
                      className="block h-full rounded-full bg-accent"
                      style={{ width: `${d.score}%` }}
                    />
                  </span>
                  <span className="tnum w-6 shrink-0 text-right text-xs text-muted">
                    {d.score}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="eyebrow mb-2.5">Sprint history</p>
            <ul className="space-y-2">
              {records.map((r) => (
                <li key={r.sprintId}>
                  <Link
                    href={`/sprint/${r.sprintId}`}
                    className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-4 py-3 transition hover:border-line-strong"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="tnum text-xs text-muted-2">0{r.phase}</span>
                        <span className="truncate text-sm text-fg">{r.title}</span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted">
                        {r.thesisTitle} · {r.sector}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      {r.outcome ? (
                        <span className="tnum text-sm font-medium text-accent">
                          {r.outcome.overall}
                        </span>
                      ) : (
                        <SprintStatusTag status={r.status} />
                      )}
                      <ArrowUpRight
                        size={13}
                        className="text-muted-2 opacity-0 transition group-hover:opacity-100"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {evidenceSamples.length > 0 && (
            <section>
              <p className="eyebrow mb-2.5">Evidence samples</p>
              <ul className="space-y-2">
                {evidenceSamples.map((e, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-line bg-surface px-4 py-3"
                  >
                    <p className="flex gap-2 text-[13px] leading-snug text-fg-soft">
                      <Quote size={13} className="mt-0.5 shrink-0 text-muted-2" />
                      {e.text}
                    </p>
                    <p className="mt-1.5 pl-5 text-xs text-muted-2">{e.thesisTitle}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
