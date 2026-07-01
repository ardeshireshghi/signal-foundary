# @signalfoundry/ui

The **SignalFoundry design system** — presentational primitives and design
tokens, extracted from the SignalFoundry app so they can be shared, versioned,
and synced to Claude Design.

Dark blue-slate surfaces with a single warm amber accent. Components are
prop-driven and self-contained (no app data or routing coupling).

## Install & build

```bash
npm install
npm run build   # -> dist/index.es.js, dist/index.d.ts, dist/styles.css
```

## Usage

```tsx
import { StatCard, SignalSpine, Sparkline } from "@signalfoundry/ui";
import "@signalfoundry/ui/styles.css";

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
```

## Styling idiom

Tailwind utility classes that read the design tokens. Key token families
(defined in `styles.css`, compiled into `dist/styles.css`):

| Family | Examples |
|--------|----------|
| Surfaces | `bg-bg`, `bg-surface`, `bg-surface-2`, `bg-elevated` |
| Structure | `border-line`, `border-line-strong` |
| Text | `text-fg`, `text-fg-soft`, `text-muted`, `text-muted-2` |
| Accent | `text-accent`, `bg-accent`, `bg-accent/12`, `text-accent-bright` |
| Helpers | `.eyebrow` (uppercase micro-label), `.tnum` (tabular numerals) |

The single accent (`--color-accent`, amber) is reserved for the one thing that
matters on a surface — the active gate, the primary metric — never as decoration.

## Components

| Component | Purpose |
|-----------|---------|
| `Logo` | Hexagon foundry mark + optional wordmark |
| `Eyebrow` | Uppercase section micro-label |
| `Tag` | Inline metadata / badge chip |
| `StatusPill` | Lifecycle state pill (active / complete / locked / neutral) |
| `SignalStrength` | 0–100 bar meter with numeric readout |
| `Sparkline` | Tiny inline trend line |
| `Meter` | Single labelled progress bar |
| `StatCard` | KPI card (value, unit, sub, icon, inline visual) |
| `SignalSpine` | Staged-process assay readout (the signature element) |
| `ScoreBars` | Multi-dimension score panel with overall |
