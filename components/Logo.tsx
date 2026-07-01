// Hexagon "foundry" mark. Uses the accent token via currentColor.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="26"
        height="26"
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
      <span className="text-[15px] font-semibold tracking-tight text-fg">
        Signal<span className="text-accent">Foundry</span>
      </span>
    </span>
  );
}
