"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  INVESTOR,
  PREFERENCES,
  SECTORS,
  TICKET_LABEL,
  Ticket,
} from "@/lib/data";
import { AppShell } from "@/components/AppShell";

// Map the display sectors to the preference labels used on the dashboard.
const PREF_SECTORS = [
  "Healthcare",
  "Fintech",
  "Climate",
  "Vertical SaaS",
  "Regulated AI",
];

const STAGE_OPTIONS = [
  "Signal / origination",
  "Validation, Early traction",
  "Near formation",
];

const GEOGRAPHIES = ["North America", "Europe", "Global"];

export default function SettingsPage() {
  const [sectors, setSectors] = useState<string[]>(PREFERENCES.sectors);
  const [stage, setStage] = useState(PREFERENCES.stageFocus);
  const [ticket, setTicket] = useState<Ticket>("M");
  const [geography, setGeography] = useState(PREFERENCES.geography);
  const [saved, setSaved] = useState(false);

  const toggleSector = (s: string) => {
    setSaved(false);
    setSectors((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 py-6">
        <header className="border-b border-line pb-5">
          <span className="eyebrow">Settings</span>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-fg">
            Investor preferences
          </h1>
          <p className="mt-1 text-sm text-muted">
            Tune what SignalFoundry surfaces first — sectors, stage, ticket size,
            and geography.
          </p>
        </header>

        {/* Profile */}
        <section className="mt-6 flex items-center gap-4 rounded-xl border border-line bg-surface p-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-base font-semibold text-accent">
            {INVESTOR.initials}
          </span>
          <div>
            <p className="text-sm font-medium text-fg">{INVESTOR.name}</p>
            <p className="text-xs text-muted">{INVESTOR.role} · Investor membership</p>
          </div>
          <span className="ml-auto rounded-md bg-accent/12 px-2.5 py-1 text-xs font-medium text-accent">
            $1.5K / mo
          </span>
        </section>

        <div className="mt-6 space-y-7">
          {/* Sectors */}
          <Field label="Preferred sectors" hint="Opportunities in these surface first.">
            <div className="flex flex-wrap gap-2">
              {PREF_SECTORS.map((s) => {
                const on = sectors.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleSector(s)}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition ${
                      on
                        ? "border-accent/40 bg-accent/12 text-accent"
                        : "border-line bg-surface text-muted hover:border-line-strong hover:text-fg"
                    }`}
                  >
                    {on && <Check size={13} />}
                    {s}
                  </button>
                );
              })}
            </div>
          </Field>

          {/* Stage focus */}
          <Field label="Stage focus">
            <div className="flex flex-wrap gap-2">
              {STAGE_OPTIONS.map((s) => (
                <Radio key={s} active={stage === s} onClick={() => { setStage(s); setSaved(false); }}>
                  {s}
                </Radio>
              ))}
            </div>
          </Field>

          {/* Ticket size */}
          <Field label="Sprint ticket size">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(TICKET_LABEL) as Ticket[]).map((t) => (
                <Radio key={t} active={ticket === t} onClick={() => { setTicket(t); setSaved(false); }}>
                  {TICKET_LABEL[t]}
                </Radio>
              ))}
            </div>
          </Field>

          {/* Geography */}
          <Field label="Geography">
            <div className="flex flex-wrap gap-2">
              {GEOGRAPHIES.map((g) => (
                <Radio key={g} active={geography === g} onClick={() => { setGeography(g); setSaved(false); }}>
                  {g}
                </Radio>
              ))}
            </div>
          </Field>
        </div>

        <div className="mt-8 flex items-center gap-3 border-t border-line pt-5">
          <button
            onClick={() => setSaved(true)}
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-bg transition hover:bg-accent-bright"
          >
            Save preferences
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-accent">
              <Check size={15} /> Saved
            </span>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="text-sm font-medium text-fg">{label}</p>
      {hint && <p className="mb-2 mt-0.5 text-xs text-muted">{hint}</p>}
      <div className={hint ? "" : "mt-2"}>{children}</div>
    </section>
  );
}

function Radio({
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
      className={`rounded-lg border px-3 py-1.5 text-sm transition ${
        active
          ? "border-accent/40 bg-accent/12 text-accent"
          : "border-line bg-surface text-muted hover:border-line-strong hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}
