import type { ReactNode } from "react";

export type TagTone = "default" | "accent" | "muted";

export interface TagProps {
  /** Tag label. */
  children: ReactNode;
  /** Visual emphasis. `accent` draws the eye; use it rarely. */
  tone?: TagTone;
  className?: string;
}

const TONES: Record<TagTone, string> = {
  default: "border border-line bg-surface text-fg-soft",
  accent: "bg-accent/12 text-accent",
  muted: "bg-surface-2 text-muted",
};

/**
 * Compact inline label for metadata — comparables, categories, and
 * status badges such as "source-backed".
 */
export function Tag({ children, tone = "default", className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
