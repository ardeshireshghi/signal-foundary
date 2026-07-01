"use client";

import Link from "next/link";
import { Bookmark, MoreHorizontal } from "lucide-react";
import { Thesis, fmtMoney, openSprint } from "@/lib/data";
import { SignalSpine } from "./SignalSpine";
import { SignalStrength } from "./SignalStrength";

export function OpportunityCard({
  thesis,
  index,
}: {
  thesis: Thesis;
  index: number;
}) {
  const next = openSprint(thesis);

  return (
    <div className="group rounded-xl border border-line bg-surface p-5 transition hover:border-line-strong">
      <div className="flex gap-4">
        <span className="tnum select-none pt-0.5 text-sm text-muted-2">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="eyebrow">{thesis.sector}</span>
                <span className="text-muted-2">·</span>
                <SignalStrength value={thesis.signalStrength} />
              </div>
              <h3 className="mt-1.5 truncate text-base font-medium tracking-tight text-fg">
                {thesis.title}
              </h3>
              <p className="mt-0.5 max-w-2xl truncate text-sm text-muted">
                {thesis.wedge}
              </p>
            </div>

            <div className="flex shrink-0 items-start gap-3">
              <div className="text-right">
                <div className="eyebrow">Next gate</div>
                {next ? (
                  <>
                    <div className="tnum mt-0.5 text-lg font-semibold text-accent">
                      {fmtMoney(next.budget)}
                    </div>
                    <div className="text-[11px] text-muted">{next.short}</div>
                  </>
                ) : (
                  <>
                    <div className="mt-0.5 text-sm font-medium text-fg-soft">
                      Ready
                    </div>
                    <div className="text-[11px] text-muted">formation</div>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-1 opacity-0 transition group-hover:opacity-100">
                <button className="rounded-md p-1.5 text-muted transition hover:bg-elevated hover:text-fg">
                  <Bookmark size={15} />
                </button>
                <button className="rounded-md p-1.5 text-muted transition hover:bg-elevated hover:text-fg">
                  <MoreHorizontal size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Signal Spine */}
          <div className="mt-4">
            <SignalSpine sprints={thesis.sprints} />
          </div>

          {/* Action */}
          <div className="mt-4 flex justify-end">
            <Link
              href={`/thesis/${thesis.id}`}
              className="rounded-lg border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-sm font-medium text-accent transition hover:bg-accent/20"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
