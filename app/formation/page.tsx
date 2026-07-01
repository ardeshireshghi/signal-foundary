import Link from "next/link";
import { ArrowUpRight, Rocket } from "lucide-react";
import { formationsForBoard, fmtMoney, FormationStatus } from "@/lib/data";
import { AppShell } from "@/components/AppShell";

const STATUS: Record<FormationStatus, { label: string; cls: string }> = {
  forming: { label: "Forming", cls: "bg-accent/15 text-accent" },
  candidate: { label: "Candidate", cls: "bg-elevated text-fg-soft" },
};

export default function FormationBoardPage() {
  const formations = formationsForBoard();

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-6 py-6">
        <header className="border-b border-line pb-5">
          <span className="eyebrow flex items-center gap-1.5">
            <Rocket size={13} /> Formation
          </span>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-fg">
            Validated ventures, ready to become companies
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Once demand and operator quality are proven, an opportunity graduates
            into a company — with roles, a cap table, and a funding path.
          </p>
        </header>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {formations.map((f) => {
            const s = STATUS[f.status];
            return (
              <li key={f.thesisId}>
                <Link
                  href={`/formation/${f.thesisId}`}
                  className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition hover:border-line-strong"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="eyebrow">{f.sector}</span>
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-medium ${s.cls}`}
                    >
                      {s.label}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-medium leading-snug text-fg">
                    {f.thesisTitle}
                  </h3>

                  {/* Founder shortlist avatars */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="eyebrow">Founders</span>
                    <div className="flex -space-x-2">
                      {f.founderShortlist.map((o) => (
                        <span
                          key={o.id}
                          title={o.name}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-surface bg-accent/15 text-[10px] font-semibold text-accent"
                        >
                          {o.initials}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
                    <span className="tnum text-xs text-muted">
                      {f.phasesDone}/5 validated · fee {fmtMoney(f.formationFee)}
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="text-muted-2 opacity-0 transition group-hover:opacity-100"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {formations.length === 0 && (
          <div className="mt-5 rounded-xl border border-line bg-surface px-6 py-16 text-center text-sm text-muted">
            No ventures are formation-ready yet — they qualify once demand is
            captured (phase 3+).
          </div>
        )}
      </div>
    </AppShell>
  );
}
