"use client";

import { useMemo, useState } from "react";
import {
  Sun,
  LayoutGrid,
  List,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Wallet,
  Activity,
  Clock,
} from "lucide-react";
import {
  THESES,
  TICKET_LABEL,
  Ticket,
  INVESTOR,
  SIGNAL_TREND,
  AVG_TIME_TO_GATE_DAYS,
  fmtMoney,
  openSprint,
  totalCapitalOpen,
  avgSignalStrength,
} from "@/lib/data";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { StatCard, Sparkline } from "@/components/StatCard";
import { OpportunityCard } from "@/components/OpportunityCard";
import { RightRail } from "@/components/RightRail";

type SectorFilter = string;
type StageFilter = "all" | "open" | "late";

export default function InvestorConsole() {
  const [sector, setSector] = useState<SectorFilter>("all");
  const [stage, setStage] = useState<StageFilter>("all");
  const [ticket, setTicket] = useState<"all" | Ticket>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  const firstName = INVESTOR.name.split(" ")[0];
  const avg = avgSignalStrength(rows.length ? rows : THESES);
  const avgLabel = avg >= 75 ? "Strong" : avg >= 55 ? "Building" : "Early";

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeSector={sector} onSector={setSector} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />

        <div className="flex flex-1 overflow-hidden">
          {/* Main column */}
          <main className="flex-1 overflow-y-auto px-6 py-6">
            {/* Greeting + controls */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-fg">
                  <Sun size={20} className="text-accent" />
                  Good morning, {firstName}
                </h1>
                <p className="mt-1 text-sm text-muted">
                  {rows.length} opportunit{rows.length === 1 ? "y" : "ies"} sorted
                  by <span className="text-accent">Signal Strength</span>
                  <ChevronDown size={13} className="ml-0.5 inline text-muted" />
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-lg border border-line bg-surface p-0.5">
                  <ToggleBtn active={view === "grid"} onClick={() => setView("grid")}>
                    <LayoutGrid size={16} />
                  </ToggleBtn>
                  <ToggleBtn active={view === "list"} onClick={() => setView("list")}>
                    <List size={16} />
                  </ToggleBtn>
                </div>
                <button
                  onClick={() => setFiltersOpen((v) => !v)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                    filtersOpen || stage !== "all" || ticket !== "all"
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-line bg-surface text-fg-soft hover:border-line-strong"
                  }`}
                >
                  <SlidersHorizontal size={15} />
                  Filters
                </button>
              </div>
            </div>

            {/* Filter drawer */}
            {filtersOpen && (
              <div className="mt-4 flex flex-wrap gap-6 rounded-xl border border-line bg-surface p-4">
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
              </div>
            )}

            {/* KPI cards */}
            <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
              <StatCard
                label="Total Opportunities"
                value={String(rows.length)}
                sub="Across all sectors"
                icon={Layers}
              />
              <StatCard
                label="Total Capital Open"
                value={fmtMoney(totalCapitalOpen())}
                sub="Available to deploy"
                icon={Wallet}
              />
              <StatCard
                label="Avg. Signal Strength"
                value={String(avg)}
                unit="/100"
                sub={avgLabel}
                icon={Activity}
                accentValue
              >
                <Sparkline data={SIGNAL_TREND} />
              </StatCard>
              <StatCard
                label="Avg. Time to Next Gate"
                value={String(AVG_TIME_TO_GATE_DAYS)}
                unit="days"
                sub="Across open opportunities"
                icon={Clock}
              />
            </div>

            {/* Opportunity list */}
            <div className={`mt-5 grid gap-3 ${view === "grid" ? "" : "gap-2"}`}>
              {rows.map((t, i) => (
                <OpportunityCard key={t.id} thesis={t} index={i} />
              ))}
              {rows.length === 0 && (
                <div className="rounded-xl border border-line bg-surface px-6 py-16 text-center text-sm text-muted">
                  No opportunities match these filters.
                </div>
              )}
            </div>

            <p className="mt-6 text-center text-xs text-muted-2">
              Showing {rows.length} of {THESES.length} opportunities
            </p>
          </main>

          {/* Right analytics rail */}
          <aside className="hidden w-80 shrink-0 overflow-y-auto border-l border-line bg-bg px-5 py-6 xl:block">
            <RightRail />
          </aside>
        </div>
      </div>
    </div>
  );
}

function ToggleBtn({
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
      className={`rounded-md p-1.5 transition ${
        active ? "bg-accent/15 text-accent" : "text-muted hover:text-fg"
      }`}
    >
      {children}
    </button>
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
    <div>
      <p className="eyebrow mb-2">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
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
