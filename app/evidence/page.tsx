"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, Share2 } from "lucide-react";
import {
  graphStages,
  allEvidence,
  MOAT_LAYERS,
  SECTORS,
} from "@/lib/data";
import { AppShell } from "@/components/AppShell";
import { EvidenceFlywheel } from "@/components/EvidenceFlywheel";

export default function EvidenceGraphPage() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<string>("all");

  const stages = graphStages();
  const evidence = allEvidence();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return evidence.filter((e) => {
      if (sector !== "all" && e.sector !== sector) return false;
      if (q && !e.text.toLowerCase().includes(q) && !e.thesisTitle.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [evidence, query, sector]);

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-6 py-6">
        <header className="border-b border-line pb-5">
          <span className="eyebrow flex items-center gap-1.5">
            <Share2 size={13} /> Evidence Graph
          </span>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-fg">
            The compounding data asset
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Every sprint adds market findings, operator proof, and investor
            preference data. The graph gets more defensible with each one.
          </p>
        </header>

        {/* Flywheel */}
        <section className="mt-6">
          <p className="eyebrow mb-3">The flywheel</p>
          <EvidenceFlywheel stages={stages} />
          <p className="mt-3 text-xs text-muted-2">
            Each completed sprint improves opportunity, operator, and investor
            matching data — and feeds the next stage.
          </p>
        </section>

        {/* Moat layers */}
        <section className="mt-8">
          <p className="eyebrow mb-3">How the moat compounds</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {MOAT_LAYERS.map((m) => (
              <li
                key={m.layer}
                className="rounded-xl border border-line bg-surface p-4"
              >
                <p className="text-sm font-medium text-fg">{m.layer}</p>
                <p className="mt-1 text-[13px] leading-snug text-muted">
                  {m.compounds}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Evidence browser */}
        <section className="mt-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow">
              Evidence stream · {filtered.length} of {evidence.length}
            </p>
            <div className="flex w-full max-w-xs items-center gap-2 rounded-lg border border-line bg-bg px-3 py-2 text-sm text-muted focus-within:border-line-strong">
              <Search size={14} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search evidence…"
                className="w-full bg-transparent text-fg placeholder:text-muted-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-1.5">
            <FilterChip active={sector === "all"} onClick={() => setSector("all")}>
              All sectors
            </FilterChip>
            {SECTORS.map((s) => (
              <FilterChip key={s} active={sector === s} onClick={() => setSector(s)}>
                {s}
              </FilterChip>
            ))}
          </div>

          <ul className="space-y-2">
            {filtered.map((e) => (
              <li key={e.id}>
                <Link
                  href={`/sprint/${e.sprintId}`}
                  className="group block rounded-lg border border-line bg-surface px-4 py-3 transition hover:border-line-strong"
                >
                  <p className="text-[13px] leading-snug text-fg-soft">{e.text}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-xs text-muted">
                      <span className="eyebrow">{e.sector}</span>
                      <span className="text-muted-2">·</span>
                      {e.thesisTitle}
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-muted-2">
                      {e.sprintTitle}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 transition group-hover:opacity-100"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="rounded-lg border border-line bg-surface px-4 py-10 text-center text-sm text-muted">
                No evidence matches.
              </li>
            )}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-2.5 py-1.5 text-[13px] transition ${
        active
          ? "bg-accent/15 font-medium text-accent"
          : "text-muted hover:bg-elevated hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}
