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
      ? "text-signal-ink bg-signal-wash"
      : c === "medium"
        ? "text-steel-3 bg-line/60"
        : "text-steel-2 bg-line/30";
  return (
    <span className={`eyebrow rounded px-1.5 py-0.5 ${tone}`}>
      {CONF_LABEL[c]}
    </span>
  );
}

function SprintRow({ s }: { s: Sprint }) {
  const open = s.status === "open";
  const done = s.status === "done";
  return (
    <li
      className={`rounded-md border px-4 py-3 ${
        open ? "border-signal/40 bg-signal-wash/50" : "border-line bg-surface"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-2.5 min-w-0">
          <span
            className={`tnum text-xs ${open ? "text-signal" : "text-steel-1"}`}
          >
            0{s.phase}
          </span>
          <span
            className={`truncate text-sm ${
              done ? "text-steel-3" : "text-ink"
            }`}
          >
            {s.title}
          </span>
        </div>
        <span
          className={`tnum shrink-0 text-xs ${
            open ? "font-medium text-signal" : "text-steel-2"
          }`}
        >
          {fmtMoney(s.budget)}
        </span>
      </div>

      <div className="mt-1.5 flex items-center gap-2">
        <span
          className={`eyebrow ${
            done ? "text-steel-2" : open ? "text-signal-ink" : "text-steel-1"
          }`}
        >
          {done ? "closed" : open ? "gate open" : "locked"}
        </span>
        <span className="text-xs text-steel-2">{s.gate}</span>
      </div>

      {done && s.evidence.length > 0 && (
        <ul className="mt-2.5 space-y-1.5 border-t border-line pt-2.5">
          {s.evidence.map((e, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-snug text-steel-3">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-steel-1" />
              <span>{e}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function DossierDetail({
  thesis,
  onClose,
}: {
  thesis: Thesis;
  onClose: () => void;
}) {
  const next = openSprint(thesis);
  return (
    <aside className="flex h-full w-full flex-col overflow-hidden bg-surface">
      <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow">{thesis.sector}</span>
            <span className="text-steel-1">·</span>
            <SignalStrength value={thesis.signalStrength} />
          </div>
          <h2 className="mt-2 max-w-md text-xl font-semibold leading-snug tracking-tight">
            {thesis.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 rounded-md border border-line px-2 py-1 text-xs text-steel-2 transition hover:border-line-strong hover:text-ink"
          aria-label="Close dossier"
        >
          Close
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        {/* Memo prose — serif, read like an intelligence brief. */}
        <section className="max-w-prose">
          <p className="eyebrow mb-1">Buyer</p>
          <p className="font-serif text-[15px] leading-relaxed text-ink">
            {thesis.buyer}
          </p>

          <p className="eyebrow mb-1 mt-5">The pain</p>
          <p className="font-serif text-[15px] leading-relaxed text-steel-4">
            {thesis.memo.pain}
          </p>

          <p className="eyebrow mb-1 mt-5">The wedge</p>
          <p className="font-serif text-[15px] leading-relaxed text-steel-4">
            {thesis.memo.wedge}
          </p>

          <p className="eyebrow mb-1 mt-5">Why now</p>
          <p className="font-serif text-[15px] leading-relaxed text-steel-4">
            {thesis.memo.whyNow}
          </p>

          <p className="eyebrow mb-2 mt-5">Risks</p>
          <ul className="space-y-2">
            {thesis.memo.risks.map((r, i) => (
              <li key={i} className="flex items-start justify-between gap-3">
                <span className="font-serif text-[15px] leading-snug text-steel-4">
                  {r.text}
                </span>
                <ConfidenceTag c={r.confidence} />
              </li>
            ))}
          </ul>
        </section>

        {/* Sprint ladder */}
        <section className="mt-7">
          <p className="eyebrow mb-2.5">Validation sprints</p>
          <ol className="space-y-2">
            {thesis.sprints.map((s) => (
              <SprintRow key={s.phase} s={s} />
            ))}
          </ol>
        </section>
      </div>

      {/* Primary action — the single full-saturation cobalt in the panel. */}
      <footer className="border-t border-line px-6 py-4">
        {next ? (
          <button className="flex w-full items-center justify-between rounded-md bg-signal px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-signal-ink">
            <span>
              Sponsor the {next.short.toLowerCase()} —{" "}
              <span className="tnum">{fmtMoney(next.budget)}</span>
            </span>
            <span className="text-white/80">{next.gate}</span>
          </button>
        ) : (
          <div className="rounded-md border border-line bg-paper px-4 py-3 text-sm text-steel-2">
            All gates closed — this venture is ready for a formation decision.
          </div>
        )}
      </footer>
    </aside>
  );
}
