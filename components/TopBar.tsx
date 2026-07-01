"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import { INVESTOR } from "@/lib/data";

export function TopBar() {
  return (
    <header className="flex items-center gap-6 border-b border-line bg-surface px-6 py-3">
      <div className="hidden min-w-0 flex-col lg:flex">
        <span className="eyebrow">Investor Console</span>
        <span className="truncate text-sm text-muted">
          Fund the smallest useful next step of a startup before committing to
          the full company.
        </span>
      </div>

      {/* Search */}
      <div className="flex flex-1 justify-center">
        <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-line bg-bg px-3 py-2 text-sm text-muted transition focus-within:border-line-strong">
          <Search size={15} />
          <input
            className="w-full bg-transparent text-fg placeholder:text-muted-2 focus:outline-none"
            placeholder="Search opportunities, sectors, or signals…"
          />
          <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 text-[10px] text-muted-2 sm:block">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative rounded-md p-2 text-muted transition hover:bg-elevated hover:text-fg">
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-semibold text-bg">
            3
          </span>
        </button>

        <button className="flex items-center gap-2.5 rounded-md py-1 pl-1 pr-2 transition hover:bg-elevated">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent">
            {INVESTOR.initials}
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-medium leading-tight text-fg">
              {INVESTOR.name}
            </span>
            <span className="block text-xs leading-tight text-muted">
              {INVESTOR.role}
            </span>
          </span>
          <ChevronDown size={15} className="text-muted" />
        </button>
      </div>
    </header>
  );
}
