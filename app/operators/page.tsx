import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OPERATORS, operatorProfile, FounderReadiness } from "@/lib/data";
import { AppShell } from "@/components/AppShell";

const READINESS: Record<FounderReadiness, string> = {
  exceptional: "bg-accent/15 text-accent",
  strong: "bg-elevated text-fg-soft",
  emerging: "bg-surface-2 text-muted",
};

export default function OperatorNetworkPage() {
  const operators = OPERATORS.map((o) => operatorProfile(o.id)!).sort(
    (a, b) => b.overall - a.overall,
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-6 py-6">
        <header className="border-b border-line pb-5">
          <span className="eyebrow">Operator Network</span>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-fg">
            Founder-quality operators, ranked by proof of work
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Every operator is scored on real validation sprints — not a resume.
            Sorted by proof score.
          </p>
        </header>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {operators.map((p) => (
            <li key={p.operator.id}>
              <Link
                href={`/operators/${p.operator.id}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition hover:border-line-strong"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
                      {p.operator.initials}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-fg">{p.operator.name}</p>
                      <p className="text-xs text-muted">
                        {p.operator.skills.join(" · ")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="tnum text-xl font-semibold text-accent">
                      {p.overall}
                    </div>
                    <div className="eyebrow">proof</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-medium capitalize ${READINESS[p.operator.founderReadiness]}`}
                  >
                    {p.operator.founderReadiness}
                  </span>
                  <span className="tnum flex items-center gap-1.5 text-xs text-muted">
                    {p.sprintsCompleted} passed · {p.sprintsActive} active
                    <ArrowUpRight
                      size={13}
                      className="text-muted-2 opacity-0 transition group-hover:opacity-100"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
