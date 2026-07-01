import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Circle } from "lucide-react";
import {
  getFormation,
  allFormationIds,
  OPERATORS,
  fmtMoney,
  CapTableEntry,
} from "@/lib/data";
import { AppShell } from "@/components/AppShell";

export function generateStaticParams() {
  return allFormationIds().map((id) => ({ id }));
}

// Cap table — one accent segment (the founders) + graded neutrals, direct-labeled.
const SEGMENT_CLS = ["bg-accent", "bg-steel-2", "bg-steel-3", "bg-faint"];

function CapTable({ entries }: { entries: CapTableEntry[] }) {
  return (
    <div>
      <div className="flex h-3 overflow-hidden rounded-full">
        {entries.map((e, i) => (
          <span
            key={e.holder}
            className={SEGMENT_CLS[i % SEGMENT_CLS.length]}
            style={{ width: `${e.pct}%` }}
          />
        ))}
      </div>
      <ul className="mt-3 space-y-1.5">
        {entries.map((e, i) => (
          <li key={e.holder} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-fg-soft">
              <span
                className={`h-2 w-2 rounded-full ${SEGMENT_CLS[i % SEGMENT_CLS.length]}`}
              />
              {e.holder}
            </span>
            <span className="tnum text-muted">{e.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function FormationWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const f = getFormation(id);
  if (!f) notFound();

  const opName = (opId?: string) =>
    opId ? OPERATORS.find((o) => o.id === opId) : undefined;

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-6 py-6">
        <Link
          href="/formation"
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-fg"
        >
          <ArrowLeft size={15} />
          Formation
        </Link>

        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow">{f.sector}</span>
              <span className="text-muted-2">·</span>
              <span
                className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                  f.status === "forming"
                    ? "bg-accent/15 text-accent"
                    : "bg-elevated text-fg-soft"
                }`}
              >
                {f.status === "forming" ? "Forming" : "Candidate"}
              </span>
            </div>
            <h1 className="mt-2 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-fg">
              {f.thesisTitle}
            </h1>
            <Link
              href={`/thesis/${f.thesisId}`}
              className="mt-1 inline-flex items-center gap-1 text-xs text-muted transition hover:text-fg"
            >
              View the validated thesis <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="text-right">
            <div className="eyebrow">Formation fee</div>
            <div className="tnum text-2xl font-semibold text-fg">
              {fmtMoney(f.formationFee)}
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-7">
            {/* Roles */}
            <section>
              <p className="eyebrow mb-2.5">Founding roles</p>
              <ul className="space-y-2">
                {f.roles.map((r) => {
                  const op = opName(r.operatorId);
                  return (
                    <li
                      key={r.title}
                      className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-4 py-3"
                    >
                      <span className="text-sm text-fg">{r.title}</span>
                      {op ? (
                        <Link
                          href={`/operators/${op.id}`}
                          className="group flex items-center gap-2 text-sm text-fg-soft transition hover:text-fg"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-[10px] font-semibold text-accent">
                            {op.initials}
                          </span>
                          {op.name}
                          <ArrowUpRight
                            size={12}
                            className="text-muted-2 opacity-0 transition group-hover:opacity-100"
                          />
                        </Link>
                      ) : (
                        <span className="eyebrow text-muted-2">open role</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Founder shortlist */}
            <section>
              <p className="eyebrow mb-2.5">Founder shortlist</p>
              <div className="flex flex-wrap gap-2">
                {f.founderShortlist.map((o) => (
                  <Link
                    key={o.id}
                    href={`/operators/${o.id}`}
                    className="group flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 transition hover:border-line-strong"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-[10px] font-semibold text-accent">
                      {o.initials}
                    </span>
                    <span>
                      <span className="block text-sm text-fg">{o.name}</span>
                      <span className="block text-xs capitalize text-muted">
                        {o.founderReadiness}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Funding path */}
            <section>
              <p className="eyebrow mb-2.5">Funding path</p>
              <ol className="space-y-2">
                {f.fundingSteps.map((step) => (
                  <li
                    key={step.label}
                    className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3"
                  >
                    {step.done ? (
                      <Check size={15} className="text-accent" />
                    ) : (
                      <Circle size={15} className="text-muted-2" />
                    )}
                    <span
                      className={`text-sm ${step.done ? "text-fg-soft" : "text-muted"}`}
                    >
                      {step.label}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* Cap table + action */}
          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="eyebrow mb-3">Proposed cap table</p>
              <CapTable entries={f.capTable} />
              <p className="mt-3 border-t border-line pt-3 text-[11px] text-muted-2">
                Light equity — the platform keeps a small stake, used only where
                it truly contributes to formation.
              </p>
            </div>

            <button className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-bg transition hover:bg-accent-bright">
              Begin formation
              <ArrowUpRight size={15} />
            </button>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
