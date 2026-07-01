"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Briefcase,
  Radar,
  Users,
  Share2,
  Stethoscope,
  Landmark,
  Leaf,
  Boxes,
  Bot,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "./Logo";
import { SECTORS } from "@/lib/data";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const OVERVIEW: NavItem[] = [
  { label: "Opportunities", href: "/", icon: LayoutGrid },
  { label: "Portfolio", href: "/portfolio", icon: Briefcase },
  { label: "Signals Radar", href: "/signals", icon: Radar },
  { label: "Operator Network", href: "/operators", icon: Users },
  { label: "Evidence Graph", href: "/evidence", icon: Share2 },
];

const SECTOR_ICONS: Record<string, LucideIcon> = {
  "Healthcare ops": Stethoscope,
  "Fintech compliance": Landmark,
  "Climate / energy": Leaf,
  "Vertical B2B SaaS": Boxes,
  "Regulated SMB AI": Bot,
};

export function Sidebar({
  activeSector = "all",
  onSector,
}: {
  activeSector?: string;
  onSector?: (s: string) => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-surface md:flex">
      <div className="px-5 py-5">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <Section title="Overview">
          {OVERVIEW.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
                  active
                    ? "bg-accent/10 font-medium text-accent"
                    : "text-muted hover:bg-elevated hover:text-fg"
                }`}
              >
                <item.icon size={16} strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}
        </Section>

        <Section title="Sectors">
          <SectorRow
            label="All sectors"
            icon={Boxes}
            active={activeSector === "all"}
            onClick={() => onSector?.("all")}
          />
          {SECTORS.map((s) => (
            <SectorRow
              key={s}
              label={s}
              icon={SECTOR_ICONS[s] ?? Boxes}
              active={activeSector === s}
              onClick={() => onSector?.(s)}
            />
          ))}
        </Section>
      </nav>

      {/* Promo card with the deck's own line. */}
      <div className="relative m-3 overflow-hidden rounded-lg border border-line bg-surface-2 p-4">
        <div className="accent-glow pointer-events-none absolute inset-0" />
        <div className="relative">
          <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-md bg-accent/15 text-accent">
            <Radar size={15} />
          </div>
          <p className="text-sm font-medium leading-snug text-fg">
            Investors don&apos;t wait. They validate.
          </p>
          <button className="mt-3 flex items-center gap-1.5 rounded-md bg-accent/15 px-2.5 py-1.5 text-xs font-medium text-accent transition hover:bg-accent/25">
            SignalFoundry
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <p className="eyebrow px-3 pb-2 pt-3">{title}</p>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

function SectorRow({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition ${
        active
          ? "bg-accent/10 font-medium text-accent"
          : "text-muted hover:bg-elevated hover:text-fg"
      }`}
    >
      <Icon size={16} strokeWidth={2} />
      {label}
    </button>
  );
}
