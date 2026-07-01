import Link from "next/link";
import { Pencil } from "lucide-react";
import {
  PORTFOLIO,
  openCapital,
  fmtMoney,
  SIGNAL_DRIVERS,
  PREFERENCES,
  signalDistribution,
  avgSignalStrength,
} from "@/lib/data";

export function RightRail() {
  return (
    <div className="flex flex-col gap-4">
      <CapitalSnapshot />
      <SignalDistribution />
      <SignalDrivers />
      <PreferencesCard />
    </div>
  );
}

function Card({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-line bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="eyebrow">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

/* ---- Capital snapshot donut ------------------------------------------- */

function CapitalSnapshot() {
  const open = openCapital();
  const { allocated, deployed, totalBudget } = PORTFOLIO;

  const segments = [
    { label: "Open Capital", value: open, cls: "stroke-accent", dot: "bg-accent" },
    { label: "Allocated", value: allocated, cls: "stroke-accent/45", dot: "bg-accent/45" },
    { label: "Deployed", value: deployed, cls: "stroke-faint", dot: "bg-faint" },
  ];

  const r = 42;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <Card title="Capital Snapshot">
      <div className="flex items-center gap-4">
        <div className="relative h-28 w-28 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r={r} fill="none" className="stroke-line" strokeWidth="10" />
            {segments.map((s) => {
              const frac = s.value / totalBudget;
              const dash = frac * c;
              const el = (
                <circle
                  key={s.label}
                  cx="50"
                  cy="50"
                  r={r}
                  fill="none"
                  className={s.cls}
                  strokeWidth="10"
                  strokeDasharray={`${dash} ${c - dash}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="butt"
                />
              );
              offset += dash;
              return el;
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="tnum text-lg font-semibold text-fg">
              {fmtMoney(totalBudget)}
            </span>
            <span className="text-[10px] text-muted">Total Budget</span>
          </div>
        </div>

        <ul className="flex-1 space-y-2">
          {segments.map((s) => (
            <li key={s.label} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-xs text-muted">
                <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                {s.label}
              </span>
              <span className="tnum text-xs font-medium text-fg">
                {fmtMoney(s.value)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

/* ---- Signal strength distribution ------------------------------------- */

function SignalDistribution() {
  const buckets = signalDistribution();
  const avg = avgSignalStrength();
  const max = Math.max(...buckets.map((b) => b.count), 1);
  // Highlight the band the average falls into.
  const activeIdx = buckets.findIndex((b) => avg >= b.min && avg <= b.max);

  return (
    <Card title="Signal Strength Distribution">
      <div className="flex h-28 items-end gap-3">
        {buckets.map((b, i) => {
          const active = i === activeIdx;
          const h = 12 + (b.count / max) * 76;
          return (
            <div key={b.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative flex w-full flex-1 items-end justify-center">
                {active && (
                  <span className="tnum absolute -top-1 text-[10px] font-semibold text-accent">
                    {avg}
                  </span>
                )}
                <div
                  className={`w-full rounded-t ${active ? "bg-accent" : "bg-elevated"}`}
                  style={{ height: `${h}px` }}
                />
              </div>
              <span className="text-[10px] text-muted">{b.label}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ---- Top signal drivers ----------------------------------------------- */

function SignalDrivers() {
  return (
    <Card title="Top Signal Drivers">
      <ul className="space-y-2.5">
        {SIGNAL_DRIVERS.map((d) => (
          <li key={d.label} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2.5 text-sm text-fg-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {d.label}
            </span>
            <span className="tnum text-sm font-medium text-accent">
              +{d.delta}%
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---- Investor preferences --------------------------------------------- */

function PreferencesCard() {
  const p = PREFERENCES;
  const rows = [
    { label: "Preferred sectors", value: p.sectors.join(", ") },
    { label: "Stage focus", value: p.stageFocus },
    { label: "Ticket size", value: p.ticket },
    { label: "Geography", value: p.geography },
  ];
  return (
    <Card
      title="Your Preferences"
      action={
        <Link
          href="/settings"
          className="flex items-center gap-1 text-xs text-accent transition hover:text-accent-bright"
        >
          <Pencil size={12} />
          Edit
        </Link>
      }
    >
      <dl className="space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-xs text-muted">{r.label}</dt>
            <dd className="mt-0.5 text-sm text-fg-soft">{r.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
