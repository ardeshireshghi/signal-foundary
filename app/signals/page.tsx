"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Radar } from "lucide-react";
import {
  SIGNALS,
  signalsByCategory,
  SignalCategory,
  getThesis,
} from "@/lib/data";
import { AppShell } from "@/components/AppShell";

const CATEGORIES: (SignalCategory | "all")[] = [
  "all",
  "Regulation",
  "Workflow pain",
  "Tech unlock",
  "Funding",
  "Talent",
];

export default function SignalsRadarPage() {
  const [category, setCategory] = useState<SignalCategory | "all">("all");

  const rows = useMemo(
    () =>
      SIGNALS.filter((s) => category === "all" || s.category === category).sort(
        (a, b) => b.strength - a.strength,
      ),
    [category],
  );

  const breakdown = signalsByCategory();
  const maxCount = Math.max(...breakdown.map((b) => b.count), 1);

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-6 py-6">
        <header className="border-b border-line pb-5">
          <span className="eyebrow flex items-center gap-1.5">
            <Radar size={13} /> Signals Radar
          </span>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-fg">
            Market signals, before the pitch
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Detected shifts in regulation, workflow pain, tech, funding, and
            talent — the raw material the platform converts into fundable theses.
          </p>
        </header>

        {/* Category breakdown — single-hue magnitude bars */}
        <div className="mt-5 rounded-xl border border-line bg-surface p-4">
          <p className="eyebrow mb-3">Signals by category</p>
          <ul className="space-y-2">
            {breakdown.map((b) => (
              <li key={b.category} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-xs text-fg-soft">
                  {b.category}
                </span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-elevated">
                  <span
                    className="block h-full rounded-full bg-accent"
                    style={{ width: `${(b.count / maxCount) * 100}%` }}
                  />
                </span>
                <span className="tnum w-5 shrink-0 text-right text-xs text-muted">
                  {b.count}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Filter */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-md px-2.5 py-1.5 text-[13px] transition ${
                category === c
                  ? "bg-accent/15 font-medium text-accent"
                  : "text-muted hover:bg-elevated hover:text-fg"
              }`}
            >
              {c === "all" ? "All signals" : c}
            </button>
          ))}
        </div>

        {/* Signal cards */}
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {rows.map((s) => {
            const thesis = s.thesisId ? getThesis(s.thesisId) : undefined;
            return (
              <li key={s.id}>
                <Link
                  href={`/signals/${s.id}`}
                  className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition hover:border-line-strong"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="eyebrow text-accent">{s.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="tnum text-xs text-muted">{s.strength}</span>
                      <span className="h-2 w-16 overflow-hidden rounded-full bg-elevated">
                        <span
                          className="block h-full rounded-full bg-accent"
                          style={{ width: `${s.strength}%` }}
                        />
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-2 text-sm font-medium leading-snug text-fg">
                    {s.headline}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {s.source} · {s.detectedAt}
                  </p>
                  <p className="mt-2 text-[13px] leading-snug text-fg-soft">
                    {s.painHint}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 text-[11px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
                    <span className="text-xs text-muted">
                      {thesis ? (
                        <>
                          feeds{" "}
                          <span className="text-fg-soft">{thesis.sector}</span>
                        </>
                      ) : (
                        "unassigned signal"
                      )}
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
      </div>
    </AppShell>
  );
}
