import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Lock,
  CircleDot,
  Download,
  Upload,
  Gavel,
  ShieldCheck,
  FileText,
} from "lucide-react";
import {
  ResolvedSprint,
  Sprint,
  Operator,
  SprintOutcome,
  SPRINT_AGREEMENT,
  fmtMoney,
} from "@/lib/data";

function StatusPill({ status }: { status: Sprint["status"] }) {
  const map = {
    open: { label: "Gate open", cls: "bg-accent/12 text-accent", icon: CircleDot },
    done: { label: "Passed", cls: "bg-elevated text-fg-soft", icon: Check },
    locked: { label: "Locked", cls: "bg-surface-2 text-muted", icon: Lock },
  } as const;
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${s.cls}`}>
      <s.icon size={13} />
      {s.label}
    </span>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="eyebrow mb-2">{label}</p>
      {children}
    </section>
  );
}

function OperatorCard({ operator }: { operator: Operator }) {
  const readinessTone =
    operator.founderReadiness === "exceptional"
      ? "text-accent"
      : operator.founderReadiness === "strong"
        ? "text-fg-soft"
        : "text-muted";
  return (
    <Link
      href={`/operators/${operator.id}`}
      className="group block rounded-xl border border-line bg-surface p-4 transition hover:border-line-strong"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="eyebrow">Assigned operator</p>
        <ArrowUpRight
          size={13}
          className="text-muted-2 opacity-0 transition group-hover:opacity-100"
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
          {operator.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-fg">{operator.name}</p>
          <p className="truncate text-xs text-muted">
            {operator.skills.join(" · ")} · {operator.domains.join(", ")}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <span className="text-xs text-muted">Founder readiness</span>
        <span className={`text-xs font-medium capitalize ${readinessTone}`}>
          {operator.founderReadiness}
        </span>
      </div>
    </Link>
  );
}

function ScoreBars({ outcome }: { outcome: SprintOutcome }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="eyebrow">Operator proof score</p>
          <p className="mt-0.5 text-xs text-muted">{outcome.gateDecision}</p>
        </div>
        <div className="text-right">
          <span className="tnum text-2xl font-semibold text-accent">
            {outcome.overall}
          </span>
          <span className="tnum text-xs text-muted">/100</span>
        </div>
      </div>
      <ul className="space-y-2.5">
        {outcome.scores.map((d) => (
          <li key={d.key} className="flex items-center gap-3">
            <span className="w-36 shrink-0 text-xs text-fg-soft">{d.label}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-elevated">
              <span
                className="block h-full rounded-full bg-accent"
                style={{ width: `${d.score}%` }}
              />
            </span>
            <span className="tnum w-7 shrink-0 text-right text-xs text-muted">
              {d.score}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-start gap-1.5 border-t border-line pt-3 text-xs text-muted">
        <ShieldCheck size={13} className="mt-0.5 shrink-0 text-muted-2" />
        {outcome.reviewerNotes}
      </p>
    </div>
  );
}

export function SprintDetail({ resolved }: { resolved: ResolvedSprint }) {
  const { thesis, sprint, brief, operator, outcome } = resolved;
  const open = sprint.status === "open";
  const done = sprint.status === "done";
  const locked = sprint.status === "locked";

  return (
    <div className="mx-auto max-w-5xl px-6 py-6">
      <Link
        href={`/thesis/${thesis.id}`}
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-fg"
      >
        <ArrowLeft size={15} />
        {thesis.title}
      </Link>

      <header className="border-b border-line pb-5">
        <div className="flex items-center gap-2">
          <span className="eyebrow">{thesis.sector}</span>
          <span className="text-muted-2">·</span>
          <span className="eyebrow">Phase 0{sprint.phase}</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-fg">
            {sprint.title}
          </h1>
          <StatusPill status={sprint.status} />
        </div>
        <div className="tnum mt-2 flex items-center gap-4 text-sm text-muted">
          <span>
            Budget <span className="font-medium text-fg-soft">{fmtMoney(sprint.budget)}</span>
          </span>
          <span>
            Timeline <span className="font-medium text-fg-soft">{brief.timeline}</span>
          </span>
        </div>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main */}
        <div className="space-y-6">
          <Block label="Scope">
            <p className="text-[15px] leading-relaxed text-fg-soft">{brief.scope}</p>
          </Block>

          <Block label="Deliverables">
            <ul className="grid gap-2 sm:grid-cols-2">
              {brief.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-fg-soft"
                >
                  <Check size={14} className="mt-0.5 shrink-0 text-muted-2" />
                  {d}
                </li>
              ))}
            </ul>
          </Block>

          <div className="grid gap-6 sm:grid-cols-2">
            <Block label="Scoring rubric">
              <p className="text-sm leading-relaxed text-fg-soft">{brief.rubric}</p>
            </Block>
            <Block label="Success criteria">
              <p className="text-sm leading-relaxed text-fg-soft">
                {brief.successCriteria}
              </p>
            </Block>
          </div>

          <Block label="Decision gate">
            <div className="rounded-lg border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-fg">
              {sprint.gate}
            </div>
          </Block>

          {/* Evidence */}
          <Block label="Evidence produced">
            {done && sprint.evidence.length > 0 ? (
              <ul className="space-y-2">
                {sprint.evidence.map((e, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-line bg-surface px-4 py-3"
                  >
                    <p className="text-[13px] leading-snug text-fg-soft">{e}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="eyebrow rounded bg-accent/12 px-1.5 py-0.5 text-accent">
                        source-backed
                      </span>
                      <span className="eyebrow text-muted-2">
                        reviewed · high confidence
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-lg border border-dashed border-line bg-surface px-4 py-6 text-center text-sm text-muted">
                {open
                  ? "No evidence yet — this gate is open for sponsorship."
                  : "Locked until the previous gate closes."}
              </div>
            )}
          </Block>

          {/* Outcome & scoring */}
          {outcome && <ScoreBars outcome={outcome} />}

          {/* Agreement terms */}
          <Block label="Agreement terms">
            <dl className="grid gap-3 rounded-xl border border-line bg-surface p-4 sm:grid-cols-2">
              {[
                ["Basis", SPRINT_AGREEMENT.basis],
                ["IP assignment", SPRINT_AGREEMENT.ip],
                ["Confidentiality", SPRINT_AGREEMENT.confidentiality],
                ["Formation", SPRINT_AGREEMENT.formation],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="mt-0.5 text-[13px] leading-snug text-fg-soft">{v}</dd>
                </div>
              ))}
            </dl>
          </Block>
        </div>

        {/* Action rail */}
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="eyebrow mb-3">
              {open ? "Next fundable step" : done ? "Outcome" : "Status"}
            </p>
            {open && (
              <>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-fg">Sponsor this sprint</span>
                  <span className="tnum text-lg font-semibold text-accent">
                    {fmtMoney(sprint.budget)}
                  </span>
                </div>
                <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-bg transition hover:bg-accent-bright">
                  Sponsor this sprint
                  <ArrowUpRight size={15} />
                </button>
                <p className="mt-3 text-center text-[11px] text-muted-2">
                  20% platform take rate · paid validation, not a securities offer
                </p>
              </>
            )}
            {done && (
              <>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-fg">Gate passed</span>
                  <span className="tnum text-lg font-semibold text-accent">
                    {outcome?.overall}
                    <span className="text-xs text-muted">/100</span>
                  </span>
                </div>
                <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-line bg-surface-2 px-4 py-2.5 text-sm font-medium text-fg-soft transition hover:border-line-strong">
                  <Download size={15} />
                  Download evidence pack
                </button>
              </>
            )}
            {locked && (
              <div className="rounded-lg border border-line bg-bg px-4 py-3 text-sm text-muted">
                Unlocks once the previous gate closes.
              </div>
            )}
          </div>

          {operator && <OperatorCard operator={operator} />}

          {/* Role actions — reflect the three personas from the deck. */}
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="eyebrow mb-3">Actions</p>
            <div className="space-y-2">
              <RoleAction icon={Upload} label="Submit deliverable" role="Operator" enabled={open} />
              <RoleAction icon={Gavel} label="Score & set gate" role="Reviewer" enabled={open || done} />
              <RoleAction icon={FileText} label="View sprint agreement" role="All" enabled />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function RoleAction({
  icon: Icon,
  label,
  role,
  enabled,
}: {
  icon: typeof Upload;
  label: string;
  role: string;
  enabled: boolean;
}) {
  return (
    <button
      disabled={!enabled}
      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition ${
        enabled
          ? "border-line bg-surface-2 text-fg-soft hover:border-line-strong"
          : "cursor-not-allowed border-line/60 text-muted-2"
      }`}
    >
      <span className="flex items-center gap-2">
        <Icon size={15} />
        {label}
      </span>
      <span className="eyebrow">{role}</span>
    </button>
  );
}
