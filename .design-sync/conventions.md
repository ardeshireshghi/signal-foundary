# SignalFoundry UI — build conventions

Dark, data-dense product UI. Blue-slate surfaces, one warm amber accent.
Build with the real components below; style your own layout glue with the
Tailwind token utilities.

## Setup

Import the stylesheet once at the app root — it defines the design tokens and
the utility classes every component relies on:

```tsx
import "@signalfoundry/ui/styles.css";
```

No provider or theme wrapper is needed — there is no context. Components are
pure and prop-driven; render them anywhere. Put a dark surface behind them
(the tokens assume a dark canvas): set the page background to `bg-bg`.

## Styling idiom — Tailwind utilities over design tokens

Style layout and custom elements with these utility families (all read CSS
custom properties compiled into `styles.css`). Use the token utilities; do not
invent raw hex.

| Family | Utilities |
|--------|-----------|
| Surfaces | `bg-bg`, `bg-surface`, `bg-surface-2`, `bg-elevated` |
| Borders | `border-line`, `border-line-strong` |
| Text | `text-fg`, `text-fg-soft`, `text-muted`, `text-muted-2` |
| Accent | `text-accent`, `bg-accent`, `bg-accent/12`, `text-accent-bright` |
| Helpers | `.eyebrow` (uppercase micro-label), `.tnum` (tabular numerals) |

**The accent is a scalpel, not paint.** Reserve amber (`accent`) for the single
most important thing on a surface — the active gate, the primary metric, the
primary action. Everything else lives in the `fg`/`muted` ramp. Never use
red/green for status — use the `StatusPill` variants or accent weight.

## Where the truth lives

- Tokens + helper classes: read `styles.css` (the compiled `dist/styles.css`).
- Per-component API: each component's `.d.ts` (its `Props` interface) and
  `.prompt.md` usage doc.

## One idiomatic snippet

```tsx
import { StatCard, Sparkline, SignalSpine } from "@signalfoundry/ui";

<div className="bg-bg p-6 grid gap-3">
  <StatCard label="Avg. Signal Strength" value="72" unit="/100" sub="Building" accent>
    <Sparkline data={[61, 64, 62, 69, 66, 72, 70, 76]} />
  </StatCard>

  <SignalSpine
    steps={[
      { label: "Market map", caption: "done", status: "done" },
      { label: "Interviews", caption: "done", status: "done" },
      { label: "Landing test", caption: "$5K open", status: "open" },
      { label: "Prototype", status: "locked" },
      { label: "Pilot", status: "locked" },
    ]}
  />
</div>
```
