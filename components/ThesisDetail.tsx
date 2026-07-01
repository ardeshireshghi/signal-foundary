import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  Thesis,
  Sprint,
  Confidence,
  fmtMoney,
  openSprint,
} from "@/lib/data";
import { SignalStrength } from "./SignalStrength";

const CONF_LABEL: Record<Confidence, string> = {
  high: "high confidence",
  medium: "medium confidence",
  low: "low confidence",
};

function ConfidenceTag({ c }: { c: Confidence }) {
  const tone =
    c === "high"
      ? "text-accent bg-accent/12"
      : c === "medium"
        ? "text-fg-soft bg-elevated"
        : "text-muted bg-surface-2";
  return <span className={`eyebrow rounded px-1.5 py-0.5 ${tone}`}>{CONF_LABEL[c]}</span>;
}

function SprintRow({ s }: { s: Sprint }) {
  const open = s.status === "open";
  const done = s.status === "done";
  return (
    <li
      className={`rounded-lg border px-4 py-3 ${
        open ? "border-accent/40 bg-accent/5" : "border-line bg-surface"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex min-w-0 items-baseline gap-2.5">
          <span className={`tnum text-xs ${open ? "text-accent" : "text-muted-2"}`}>
            0{s.phase}
          </span>
          <span className={`truncate text-sm ${done ? "text-muted" : "text-fg"}`}>
            {s.title}
          </span>
        </div>
        <span
          className={`tnum shrink-0 text-xs ${
            open ? "font-medium text-accent" : "text-muted"
          }`}
        >
          {fmtMoney(s.budget)}
        </span>
      </div>

      <div className="mt-1.5 flex items-center gap-2">
        <span
          className={`eyebrow ${
            done ? "text-muted" : open ? "text-accent" : "text-muted-2"
          }`}
        >
          {done ? "closed" : open ? "gate open" : "locked"}
        </span>
        <span className="text-xs text-muted">{s.gate}</span>
      </div>

      {done && s.evidence.length > 0 && (
        <ul className="mt-2.5 space-y-1.5 border-t border-line pt-2.5">
          {s.evidence.map((e, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-snug text-fg-soft">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-2" />
              <span>{e}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Prose({ label, children, serif = true }: { label: string; children: React.ReactNode; serif?: boolean }) {
  return (
    <div>
      <p className="eyebrow mb-1">{label}</p>
      <p className={`${serif ? "font-serif" : ""} text-[15px] leading-relaxed text-fg-soft`}>
        {children}
      </p>
    </div>
  );
}

export function ThesisDetail({ thesis }: { thesis: Thesis }) {
  const next = openSprint(thesis);

  return (
    <div className="mx-auto max-w-5xl px-6 py-6">
      <Link
        href="/"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-fg"
      >
        <ArrowLeft size={15} />
        Opportunities
      </Link>

      <header className="border-b border-line pb-5">
        <div className="flex items-center gap-2">
          <span className="eyebrow">{thesis.sector}</span>
          <span className="text-muted-2">·</span>
          <SignalStrength value={thesis.signalStrength} />
        </div>
        <h1 className="mt-2 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-fg">
          {thesis.title}
        </h1>
        <p className="mt-1 text-sm text-muted">{thesis.buyer}</p>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Memo prose */}
        <div className="space-y-5">
          <Prose label="The pain">{thesis.memo.pain}</Prose>
          <Prose label="The wedge">{thesis.memo.wedge}</Prose>
          <Prose label="Why now">{thesis.memo.whyNow}</Prose>

          <div>
            <p className="eyebrow mb-2">Risks</p>
            <ul className="space-y-2">
              {thesis.memo.risks.map((r, i) => (
                <li key={i} className="flex items-start justify-between gap-3">
                  <span className="font-serif text-[15px] leading-snug text-fg-soft">
                    {r.text}
                  </span>
                  <ConfidenceTag c={r.confidence} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-2">Comparables</p>
            <div className="flex flex-wrap gap-2">
              {thesis.memo.comps.map((c) => (
                <span
                  key={c}
                  className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs text-fg-soft"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Sprint ladder */}
          <div className="pt-2">
            <p className="eyebrow mb-2.5">Validation sprints</p>
            <ol className="space-y-2">
              {thesis.sprints.map((s) => (
                <SprintRow key={s.phase} s={s} />
              ))}
            </ol>
          </div>
        </div>

        {/* Action rail */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="eyebrow mb-3">Next fundable step</p>
            {next ? (
              <>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-fg">{next.title}</span>
                  <span className="tnum text-lg font-semibold text-accent">
                    {fmtMoney(next.budget)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">{next.gate}</p>
                <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-bg transition hover:bg-accent-bright">
                  Sponsor this sprint
                  <ArrowUpRight size={15} />
                </button>
                <p className="mt-3 text-center text-[11px] text-muted-2">
                  20% platform take rate · paid validation, not a securities offer
                </p>
              </>
            ) : (
              <div className="rounded-lg border border-line bg-bg px-4 py-3 text-sm text-muted">
                All gates closed — this venture is ready for a formation decision.
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
