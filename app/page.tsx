"use client";

import { useMemo, useState } from "react";
import {
  THESES,
  SECTORS,
  TICKET_LABEL,
  Ticket,
  fmtMoney,
  openSprint,
} from "@/lib/data";
import { SignalSpine } from "@/components/SignalSpine";
import { SignalStrength } from "@/components/SignalStrength";
import { DossierDetail } from "@/components/DossierDetail";

type SectorFilter = "all" | (typeof SECTORS)[number];
type StageFilter = "all" | "open" | "late";

export default function InvestorConsole() {
  const [sector, setSector] = useState<SectorFilter>("all");
  const [stage, setStage] = useState<StageFilter>("all");
  const [ticket, setTicket] = useState<"all" | Ticket>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const rows = useMemo(() => {
    return THESES.filter((t) => {
      if (sector !== "all" && t.sector !== sector) return false;
      if (ticket !== "all" && t.ticket !== ticket) return false;
      if (stage === "open" && !openSprint(t)) return false;
      if (stage === "late") {
        const next = openSprint(t);
        if (!next || next.phase < 4) return false;
      }
      return true;
    }).sort((a, b) => b.signalStrength - a.signalStrength);
  }, [sector, ticket, stage]);

  const selected = THESES.find((t) => t.id === selectedId) ?? null;
  const openCount = THESES.filter((t) => openSprint(t)).length;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Masthead */}
      <header className="border-b border-line px-6 py-4">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-[15px] font-semibold tracking-tight">
              Signal<span className="text-signal">Foundry</span>
            </span>
            <span className="eyebrow">Investor Console</span>
          </div>
          <div className="tnum flex items-center gap-4 text-xs text-steel-2">
            <span>
              <span className="text-ink">{openCount}</span> gates open
            </span>
            <span>
              <span className="text-ink">{THESES.length}</span> opportunities
            </span>
          </div>
        </div>
        <p className="mt-1 max-w-xl font-serif text-[13px] italic leading-snug text-steel-2">
          Fund the smallest useful next step of a startup before committing to
          the full company.
        </p>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Filter rail */}
        <aside className="hidden w-56 shrink-0 border-r border-line px-5 py-5 lg:block">
          <FilterGroup label="Sector">
            <Chip active={sector === "all"} onClick={() => setSector("all")}>
              All sectors
            </Chip>
            {SECTORS.map((s) => (
              <Chip key={s} active={sector === s} onClick={() => setSector(s)}>
                {s}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Next gate">
            <Chip active={stage === "all"} onClick={() => setStage("all")}>
              Any stage
            </Chip>
            <Chip active={stage === "open"} onClick={() => setStage("open")}>
              Has an open gate
            </Chip>
            <Chip active={stage === "late"} onClick={() => setStage("late")}>
              Near formation
            </Chip>
          </FilterGroup>

          <FilterGroup label="Sprint ticket">
            <Chip active={ticket === "all"} onClick={() => setTicket("all")}>
              Any size
            </Chip>
            {(Object.keys(TICKET_LABEL) as Ticket[]).map((t) => (
              <Chip key={t} active={ticket === t} onClick={() => setTicket(t)}>
                {TICKET_LABEL[t]}
              </Chip>
            ))}
          </FilterGroup>
        </aside>

        {/* Ledger */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-3">
            <span className="eyebrow">
              {rows.length} opportunit{rows.length === 1 ? "y" : "ies"} · sorted
              by signal
            </span>
          </div>

          <ul>
            {rows.map((t) => {
              const next = openSprint(t);
              const isSel = t.id === selectedId;
              return (
                <li key={t.id}>
                  <button
                    onClick={() => setSelectedId(isSel ? null : t.id)}
                    className={`w-full border-b border-line px-6 py-4 text-left transition ${
                      isSel ? "bg-signal-wash/40" : "hover:bg-paper"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="eyebrow">{t.sector}</span>
                          <span className="text-steel-1">·</span>
                          <SignalStrength value={t.signalStrength} />
                        </div>
                        <h3 className="mt-1.5 truncate text-[15px] font-medium tracking-tight">
                          {t.title}
                        </h3>
                        <p className="mt-0.5 max-w-xl truncate text-[13px] text-steel-2">
                          {t.wedge}
                        </p>
                      </div>
                      {next ? (
                        <div className="shrink-0 text-right">
                          <div className="eyebrow text-signal-ink">
                            next gate
                          </div>
                          <div className="tnum mt-0.5 text-sm font-medium text-signal">
                            {fmtMoney(next.budget)}
                          </div>
                          <div className="text-[11px] text-steel-2">
                            {next.short}
                          </div>
                        </div>
                      ) : (
                        <div className="shrink-0 text-right">
                          <div className="eyebrow text-steel-2">complete</div>
                          <div className="mt-0.5 text-[11px] text-steel-2">
                            formation ready
                          </div>
                        </div>
                      )}
                    </div>

                    {/* The Signal Spine — signature element */}
                    <div className="mt-4">
                      <SignalSpine sprints={t.sprints} />
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {rows.length === 0 && (
            <div className="px-6 py-16 text-center text-sm text-steel-2">
              No opportunities match these filters.
            </div>
          )}
        </main>

        {/* Dossier detail */}
        {selected && (
          <div className="hidden w-[440px] shrink-0 border-l border-line xl:block">
            <div className="sticky top-0 h-screen">
              <DossierDetail
                thesis={selected}
                onClose={() => setSelectedId(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <p className="eyebrow mb-2">{label}</p>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function Chip({
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
      className={`rounded px-2 py-1 text-left text-[13px] transition ${
        active
          ? "bg-signal-wash font-medium text-signal-ink"
          : "text-steel-2 hover:bg-paper hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
