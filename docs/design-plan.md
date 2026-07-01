# Design Plan — Investor Console

First pass of the frontend-design process: decide the design *before* coding, then
critique it against the brief. The goal is a distinctive, intentional interface —
not a templated SaaS dashboard.

## 1. Brief (the one thing this screen does)

- **Subject:** curated venture opportunities and the evidence behind them.
- **Audience:** investors — angels, syndicates, micro-VCs, studios. Sophisticated,
  skeptical, time-poor. They read intelligence, they don't play games.
- **The page's single job:** let an investor **scan curated opportunities and decide
  which next validation sprint to sponsor.**

## 2. The world we're pulling from

SignalFoundry's vernacular is **assay and intelligence**: signals, evidence,
dossiers, decision gates, proof, scores. The interface should feel like an
**instrument for judgment** — a situation board where each opportunity is an
evidence dossier moving through five gated stages. Not a trading desk (cliché),
not a friendly consumer app (wrong audience). Precise, evidentiary, calm.

## 3. Palette — deliberately avoiding the AI defaults

The skill warns against warm cream + terracotta, dark + acid-green, and broadsheet
layouts. We also avoid red/green traffic-lights (cliché + colorblind-hostile).

| Token | Value | Use |
|-------|-------|-----|
| `ink` | `#141719` | Primary text, dense data |
| `paper` | `#FAFAF7` | Reading surface (neutral bone, **not** cream) |
| `surface` | `#FFFFFF` | Cards / dossiers |
| `line` | `#E4E3DD` | Hairline dividers, structure |
| `steel-1..4` | `#8A9099 → #3A4149` | Muted structural greys, secondary data |
| `signal` | `#1F3AE0` | **The single accent.** Cobalt. Primary action + active gate + signal strength. Used sparingly. |
| `signal-wash` | `#EEF1FE` | Tint for confidence fills, hovered rows |

Confidence and signal strength are encoded with a **sequential steel→cobalt scale**
(tint + weight), never a red/green semaphore.

## 4. Typography — a deliberate trio (not one default sans)

Each face maps to how the content is *read*:

- **Display / headings — `Space Grotesk`.** Geometric, a little idiosyncratic;
  reads as tech-intelligence, not generic Inter.
- **Memo prose — `Newsreader` (serif).** Thesis memos are read like intelligence
  briefs; a serif gives them editorial authority and confidence ratings room to breathe.
- **Data / numerics — `IBM Plex Mono`.** Budgets, scores, signal strength, phase
  ticks — the "instrument readout" voice. Tabular figures.

Intentional scale: large confident dossier titles, tight tracking on labels,
generous line-height in memo prose.

## 5. The one memorable signature: the **Signal Spine**

Every opportunity carries a horizontal **Signal Spine** — a five-tick assay readout
showing where the venture sits in the validation loop (Phase 1–5), how much evidence
has accumulated, and which decision gate is currently **open**. It is the single
bold, distinctive element; everything around it stays disciplined.

```
Market map ●──── Interviews ●──── Landing test ◐──── Prototype ○──── Pilot ○
   $3K done      $7K done         $5K  OPEN         —            —
                                  ▲ gate: "Can demand be captured?"
```

The open gate is the only place cobalt appears at full saturation in a row — the eye
goes straight to *the next fundable step*, which is the product's whole thesis.

## 6. Layout — a situation board, not a card grid

- **Left rail (quiet):** filters — market, phase, ticket size, signal strength,
  sector. Structure via labels + hairlines only.
- **Main (the ledger):** a calm, dense list of **opportunity dossiers**. Each row:
  title · buyer · wedge · Signal Spine · next gate · budget-to-sponsor · one primary
  action (**Sponsor next sprint**).
- **Detail (dossier):** the full thesis memo in serif prose with source-backed
  claims and explicit confidence ratings, the sprint ladder, and accumulated evidence.

Numbering (Phase 1–5), dividers, and labels appear **only where they encode real
information architecture** — the five stages are genuinely sequential, so we number
them; nothing is numbered for decoration.

## 7. Motion — only where it means something

- Sponsoring a sprint **advances the Signal Spine** and opens the next gate.
- Completed sprints **reveal their evidence** on expand.
- No parallax, no scattered fade-ins, nothing that reads as auto-generated.

## 8. Copy — design material, active voice

- "Sponsor the market map — $3K" not "Create funding item".
- "This gate is open" / "30 interviews revealed strong pull".
- Describe what the investor controls and sees, never system mechanics.

---

## Self-critique (second pass, before code)

- **Does it avoid the named AI aesthetics?** Yes — cool bone paper (not cream), a
  single cobalt accent (not acid-green/terracotta), ledger layout (not broadsheet),
  sequential confidence scale (not red/green).
- **Is there exactly one signature?** Yes — the Signal Spine. Dossiers, rail, and
  memo view are deliberately restrained so it stands out.
- **Does structure serve content?** The five numbered phases and gates are real
  domain structure, not decoration.
- **Risk: cobalt-on-white can feel generic-tech.** Mitigate by restraint — cobalt
  only for the open gate and the single primary action; everything else lives in
  ink + steel, so the accent carries meaning, not vibe.
- **Risk: three typefaces can fight.** Mitigate with strict roles (grotesk=UI,
  serif=memo prose only, mono=numerics only) and a tight type scale.

## Build target

Next.js + TypeScript + Tailwind. First screen: the **Investor console** — the
dossier ledger with working Signal Spine, filters, and a dossier detail view,
rendered from seed data shaped by [`docs/data-model.md`](data-model.md).
