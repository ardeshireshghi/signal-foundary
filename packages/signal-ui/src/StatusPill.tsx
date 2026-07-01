export type StatusVariant = "active" | "complete" | "locked" | "neutral";

export interface StatusPillProps {
  /** Semantic state. `active` is the only one that uses the accent. */
  variant: StatusVariant;
  /** Pill label. */
  label: string;
  className?: string;
}

const VARIANTS: Record<StatusVariant, string> = {
  active: "bg-accent/12 text-accent",
  complete: "bg-elevated text-fg-soft",
  locked: "bg-surface-2 text-muted",
  neutral: "bg-surface-2 text-fg-soft",
};

/**
 * Small status pill. Encodes lifecycle state with color weight rather
 * than a red/green semaphore — only `active` reaches full accent.
 */
export function StatusPill({ variant, label, className = "" }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${VARIANTS[variant]} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          variant === "active"
            ? "bg-accent"
            : variant === "complete"
              ? "bg-fg-soft"
              : "bg-muted"
        }`}
      />
      {label}
    </span>
  );
}
