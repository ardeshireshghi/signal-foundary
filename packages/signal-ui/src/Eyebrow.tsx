import type { ReactNode } from "react";

export interface EyebrowProps {
  /** Label text. */
  children: ReactNode;
  className?: string;
}

/**
 * Small uppercase micro-label used to head sections and encode
 * information architecture. Use sparingly — labels earn their place.
 */
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}
