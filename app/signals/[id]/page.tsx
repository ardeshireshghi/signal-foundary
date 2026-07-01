import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getSignal, allSignalIds, getThesis, SIGNALS } from "@/lib/data";
import { AppShell } from "@/components/AppShell";

export function generateStaticParams() {
  return allSignalIds().map((id) => ({ id }));
}

export default async function SignalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const signal = getSignal(id);
  if (!signal) notFound();

  const thesis = signal.thesisId ? getThesis(signal.thesisId) : undefined;
  const related = SIGNALS.filter(
    (s) => s.id !== signal.id && s.category === signal.category,
  ).slice(0, 3);

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-6 py-6">
        <Link
          href="/signals"
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-fg"
        >
          <ArrowLeft size={15} />
          Signals Radar
        </Link>

        <header className="border-b border-line pb-5">
          <div className="flex items-center gap-2">
            <span className="eyebrow text-accent">{signal.category}</span>
            <span className="text-muted-2">·</span>
            <span className="text-xs text-muted">
              {signal.source} · {signal.detectedAt}
            </span>
          </div>
          <h1 className="mt-2 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-fg">
            {signal.headline}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="h-2 w-40 overflow-hidden rounded-full bg-elevated">
              <span
                className="block h-full rounded-full bg-accent"
                style={{ width: `${signal.strength}%` }}
              />
            </span>
            <span className="tnum text-sm font-medium text-accent">
              {signal.strength}
            </span>
            <span className="eyebrow">signal strength</span>
          </div>
        </header>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-5">
            <div>
              <p className="eyebrow mb-1">Market</p>
              <p className="text-[15px] text-fg-soft">{signal.market}</p>
            </div>
            <div>
              <p className="eyebrow mb-1">Why it matters</p>
              <p className="text-[15px] leading-relaxed text-fg-soft">
                {signal.painHint}.
              </p>
            </div>
            <div>
              <p className="eyebrow mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {signal.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs text-fg-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div>
                <p className="eyebrow mb-2">Related signals</p>
                <ul className="space-y-2">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={`/signals/${r.id}`}
                        className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-4 py-3 transition hover:border-line-strong"
                      >
                        <span className="truncate text-sm text-fg-soft">
                          {r.headline}
                        </span>
                        <span className="flex shrink-0 items-center gap-2">
                          <span className="tnum text-xs text-muted">{r.strength}</span>
                          <ArrowUpRight
                            size={13}
                            className="text-muted-2 opacity-0 transition group-hover:opacity-100"
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Originated thesis */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="eyebrow mb-3">Originated thesis</p>
              {thesis ? (
                <>
                  <p className="text-sm font-medium text-fg">{thesis.title}</p>
                  <p className="mt-1 text-xs text-muted">{thesis.sector}</p>
                  <Link
                    href={`/thesis/${thesis.id}`}
                    className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-bg transition hover:bg-accent-bright"
                  >
                    View the thesis
                    <ArrowUpRight size={15} />
                  </Link>
                </>
              ) : (
                <p className="text-sm text-muted">
                  Not yet converted into a thesis — an origination candidate.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
