import Link from "next/link";
import { ArrowUpRight, Wallet, Layers, CircleDot, Rocket } from "lucide-react";
import {
  portfolioRows,
  portfolioSummary,
  PORTFOLIO,
  openCapital,
  fmtMoney,
} from "@/lib/data";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";

export default function PortfolioPage() {
  const rows = portfolioRows();
  const summary = portfolioSummary();

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-6 py-6">
        <header className="border-b border-line pb-5">
          <span className="eyebrow">Portfolio</span>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-fg">
            Your sponsored ventures
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Capital committed to validation, and where each opportunity sits on
            the path to formation.
          </p>
        </header>

        {/* Summary */}
        <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
          <StatCard
            label="Committed to validation"
            value={fmtMoney(summary.totalCommitted)}
            sub={`of ${fmtMoney(PORTFOLIO.totalBudget)} budget`}
            icon={Wallet}
          />
          <StatCard
            label="Open to sponsor"
            value={fmtMoney(summary.openToSponsor)}
            sub="Next gates available"
            icon={CircleDot}
            accentValue
          />
          <StatCard
            label="Sprints sponsored"
            value={String(summary.sprintsSponsored)}
            sub="Completed with evidence"
            icon={Layers}
          />
          <StatCard
            label="Formation-ready"
            value={String(summary.formationReady)}
            sub="At or past pilot"
            icon={Rocket}
          />
        </div>

        {/* Holdings table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-line">
          <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-line bg-surface px-5 py-2.5">
            <span className="eyebrow">Opportunity</span>
            <span className="eyebrow text-right">Progress</span>
            <span className="eyebrow text-right">Committed</span>
            <span className="eyebrow text-right">Next gate</span>
          </div>
          <ul>
            {rows.map((r) => (
              <li key={r.thesis.id}>
                <Link
                  href={`/thesis/${r.thesis.id}`}
                  className="group grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-line bg-surface px-5 py-4 transition last:border-b-0 hover:bg-elevated"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="eyebrow">{r.thesis.sector}</span>
                      <span className="text-muted-2">·</span>
                      <span className="tnum text-xs text-muted">
                        signal {r.thesis.signalStrength}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm font-medium text-fg">
                      {r.thesis.title}
                    </p>
                  </div>

                  {/* Progress dots */}
                  <div className="flex items-center gap-1.5">
                    {r.thesis.sprints.map((s) => (
                      <span
                        key={s.phase}
                        className={`h-1.5 w-1.5 rounded-full ${
                          s.status === "done"
                            ? "bg-muted"
                            : s.status === "open"
                              ? "bg-accent"
                              : "bg-faint"
                        }`}
                      />
                    ))}
                    <span className="tnum ml-1 text-xs text-muted-2">
                      {r.phasesDone}/5
                    </span>
                  </div>

                  <span className="tnum text-right text-sm text-fg-soft">
                    {fmtMoney(r.committed)}
                  </span>

                  <span className="flex items-center justify-end gap-1.5 text-right">
                    {r.next ? (
                      <>
                        <span className="text-[11px] text-muted">{r.next.short}</span>
                        <span className="tnum text-sm font-medium text-accent">
                          {fmtMoney(r.next.budget)}
                        </span>
                      </>
                    ) : (
                      <span className="eyebrow text-fg-soft">Ready</span>
                    )}
                    <ArrowUpRight
                      size={13}
                      className="text-muted-2 opacity-0 transition group-hover:opacity-100"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-center text-xs text-muted-2">
          {fmtMoney(openCapital())} uncommitted capital available to deploy
        </p>
      </div>
    </AppShell>
  );
}
