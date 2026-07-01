export interface LogoProps {
  /** Show the "SignalFoundry" wordmark next to the mark. */
  showWordmark?: boolean;
  /** Mark size in pixels. */
  size?: number;
  className?: string;
}

/**
 * SignalFoundry hexagon "foundry" mark, optionally with the wordmark.
 * The mark inherits the accent color.
 */
export function Logo({ showWordmark = true, size = 26, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="text-accent"
        aria-hidden
      >
        <path
          d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 7.5 16.5 10v4L12 16.5 7.5 14v-4L12 7.5Z"
          fill="currentColor"
          fillOpacity="0.9"
        />
      </svg>
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-tight text-fg">
          Signal<span className="text-accent">Foundry</span>
        </span>
      )}
    </span>
  );
}
