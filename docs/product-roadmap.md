# Product Roadmap — Pages & Detail Pages

Owner: Product · Date: 2026-07-01 · Status: proposed

This plan turns the SignalFoundry deck into a concrete, buildable set of pages.
It extends today's single screen — the **Investor Console** (`app/page.tsx`) — into
a navigable product that walks the core loop:

```
Signal scan → Thesis brief → Sprint design → Operator proof → Funding path
```

Grounding docs: [product-spec](product-spec.md) · [data-model](data-model.md) ·
[business-model](business-model.md) · [risk-architecture](risk-architecture.md) ·
[roadmap](roadmap.md). Current code: `app/page.tsx`, `lib/data.ts`,
`components/{SignalSpine,SignalStrength,DossierDetail}.tsx`.

Design constraint carried from the existing app: the console is an
"intelligence ledger" — serif memo prose, the five-tick **Signal Spine**, and
cobalt (`signal`) used at full saturation **only** on the next fundable gate.
Every new page must respect that vocabulary. Per `risk-architecture.md`, there
are **no securities flows** — money moves only as subscriptions and sprint
budgets, and every agent claim carries a **confidence rating**.

---

## 1. Sitemap / Page inventory

Persona key: **INV** = Investor · **OPR** = Operator · **PLT** = Platform/ops (concierge admin).

### List / index pages

| # | Page | Route | Persona | One job | Key UI sections | Deck / data-model source |
|---|------|-------|---------|---------|-----------------|--------------------------|
| 1 | **Investor Console** (exists) | `/` | INV | Rank open opportunities by signal and find the next fundable gate | Filter rail (sector / gate / ticket), opportunity ledger w/ Signal Spine, dossier peek | product-spec five-stage loop · `Thesis`, `Sprint` |
| 2 | **Signals Radar** | `/radar` | INV, PLT | See raw market signals *before* they become theses; promote a signal to a thesis | Signal stream (source, strength, tags), market/sector heat filters, "promote to thesis" action | Module: Opportunity Radar · `Signal` |
| 3 | **Operator Marketplace** | `/operators` | INV, PLT | Browse the vetted talent graph; compare operators by proof, not resume | Roster grid/list, skill + domain + founder-readiness filters, proof-score sparklines | Module: Operator Marketplace · `Operator`, `OperatorScore` |
| 4 | **Portfolio** | `/portfolio` | INV | Track sprints this investor sponsored: spend, gate status, outcomes | Sponsored-sprint table, spend + gate summary, formation candidates, repeat-sponsor prompts | business-model (take rate) · `Investor.sponsored_sprints`, `Sprint`, `SprintOutcome` |
| 5 | **Formation Board** | `/formation` | INV, PLT | See which validated theses are ready to become companies | Formation candidate cards (thesis + founder shortlist + roles), stage pipeline | Module: Formation Layer · `Formation`, `Thesis(status=formed)` |
| 6 | **Evidence Graph Explorer** | `/evidence` | INV, PLT | Query "what markets want, what investors fund, who can build" across accumulated evidence | Faceted evidence search, market/operator/investor lenses, benchmark charts | data-model moat layers · `EvidenceItem`, `SprintOutcome`, all entities |
| 7 | **Sprint Board** (ops) | `/sprints` | PLT, OPR | Run the sprint lifecycle: open → assigned → in_review → scored → gate | Kanban by status, review queue, audit log | roadmap slice 2 · `Sprint`, `SprintOutcome` |

### Detail pages

| # | Page | Route | Persona | One job | Key UI sections | Deck / data-model source |
|---|------|-------|---------|---------|-----------------|--------------------------|
| 8 | **Opportunity / Thesis detail** | `/thesis/[id]` | INV | Read the full investor memo and sponsor the next gate | Memo prose (buyer/pain/wedge/why-now/risks+confidence/comps), Signal Spine, sprint ladder, sponsor CTA, source signals | product-spec worked example · `Thesis`, `Sprint`, `Signal` |
| 9 | **Sprint detail** | `/sprint/[id]` | INV, OPR, PLT | Show one sprint's scope, rubric, evidence, and gate decision | Header (phase/budget/status), scope + deliverables + rubric, success criteria + decision gate, evidence list w/ confidence, assigned operator, agreement terms, outcome/score | product-spec sprint design/proof · `Sprint`, `EvidenceItem`, `SprintOutcome` |
| 10 | **Operator profile / proof** | `/operators/[id]` | INV, PLT | Judge an operator by compounded proof-of-work | Header (name/skills/domains/status), per-dimension proof profile (radar), sprint history w/ outcomes, founder-readiness, evidence samples | product-spec operator scoring · `Operator`, `OperatorScore`, `SprintOutcome` |
| 11 | **Formation workspace** | `/formation/[id]` | INV, PLT | Design the company a validated thesis graduates into | Founder shortlist, role plan, cap-table plan, funding steps, evidence pack link, formation-fee summary | Module: Formation Layer · `Formation`, `Operator`, `Thesis` |
| 12 | **Signal detail** | `/radar/[id]` | INV, PLT | Inspect one signal's source/strength and theses it feeds | Source + detected_at + strength, market/buyer/pain hints, tags, linked theses, promote action | data-model `Signal` |
| 13 | **Investor settings / preferences** | `/settings` | INV | Tune the preference graph that curates the ledger | Sector/risk/ticket preferences, formation-path appetite, subscription tier + billing, notification prefs | business-model subscription · `Investor.preference_graph`, `subscription_tier` |
| 14 | **Investor account / membership** | `/settings/membership` | INV | Manage tier, seats, and sprint-sponsorship rights | Plan card ($500–$15K/mo bands), take-rate disclosure, invoices | business-model streams 1–2 |

App shell: add a persistent left nav (Console · Radar · Operators · Portfolio ·
Formation · Evidence · Settings) so the console stops being an island.

---

## 2. Prioritized build order

Tied to `roadmap.md` phases. **P0 = Concierge MVP (0–3 mo)**, **P1 = Self-serve (3–6 mo)**, **P2 = Marketplace/formation (6–12 mo+)**.

### P0 — Concierge MVP (ship the loop end-to-end, thin over manual ops)

| Page | Rationale |
|------|-----------|
| **Thesis detail** `/thesis/[id]` | Deep-links today's dossier peek; the artifact an investor actually reads before sponsoring. Highest-leverage single page. |
| **Sprint detail** `/sprint/[id]` | The unit of revenue (20% take). Sponsors need scope + rubric + evidence + gate in one place; concierge team runs lifecycle here. |
| **Operator profile** `/operators/[id]` | Proof-of-work is the deck's core differentiator vs. a job board. Needed to justify placement value even with 50 hand-picked operators. |
| App shell + nav | Cheap; unblocks every subsequent page. |

### P1 — Self-serve investor + operator surfaces

| Page | Rationale |
|------|-----------|
| **Operator Marketplace** `/operators` | Roadmap 3–6mo names "operator profiles"; the index that makes profiles browsable/comparable. |
| **Portfolio** `/portfolio` | Drives the 20%+ **repeat sponsor** metric — investors need to see spend, outcomes, and the next gate across their sponsorships. |
| **Signals Radar** `/radar` + `/radar/[id]` | Turns curated theses into a living top-of-funnel; supports self-serve thesis board. |
| **Sprint Board** `/sprints` | Formalizes the assign→review→score→gate lifecycle + audit log (roadmap slice 2). |
| **Investor settings** `/settings` | Preference graph starts curating; subscription becomes self-serve (first revenue motion). |

### P2 — Formation, evidence product, marketplace liquidity

| Page | Rationale |
|------|-----------|
| **Formation Board** `/formation` + **workspace** `/formation/[id]` | Formation fees are a 6–12mo revenue stream; only relevant once theses reach phase 5. |
| **Evidence Graph Explorer** `/evidence` | The moat/data product (12–24mo). Needs volume of completed sprints to be non-trivial. |
| **Membership / billing** `/settings/membership` | Real billing infra can wait behind concierge invoicing. |

---

## 3. Top-3 detail-page specs

### 3.1 Thesis detail — `/thesis/[id]` (P0)

Full-page expansion of `components/DossierDetail.tsx` (reuse its memo/spine/ladder markup).

| Section | Fields (source) | Notes |
|---------|-----------------|-------|
| Header | `Thesis.title`, `.sector`, `.signalStrength`, `.ticket`, memo `status` | Signal Spine (`components/SignalSpine`) across the 5 sprints |
| Investor memo | `memo.pain`, `memo.wedge`, `memo.whyNow`, `memo.risks[] {text, confidence}`, `memo.comps[]`, `.buyer`, `.market` | Serif prose, existing `ConfidenceTag` |
| Source signals | linked `Signal[]` (`source`, `strength`, `detected_at`) | **New** — "why this thesis exists"; link to `/radar/[id]` |
| Validation sprints | `sprints[] {phase,title,budget,status,gate,evidence[]}` | Each row deep-links to `/sprint/[id]` |
| Outcome strip | derived from each sprint's `SprintOutcome.outcome` | Pass/fail/inconclusive per completed gate |

Primary actions: **Sponsor next gate** (`fmtMoney(openSprint(t).budget)`) · Watch/save · Request a bespoke sprint.
New data/types: `Thesis` needs `id` on sprints (see §4), `status` field, and `signalIds: string[]`.

### 3.2 Sprint detail — `/sprint/[id]` (P0)

The revenue unit and the audit surface required by `risk-architecture.md`.

| Section | Fields (source: `Sprint`, `EvidenceItem`, `SprintOutcome`) | Notes |
|---------|------------------------------------------------------------|-------|
| Header | `phase`, `title`, `budget`, `status`, parent `thesis_id` | Status pill: open/assigned/in_review/scored/passed/failed |
| Brief | `scope`, `deliverables[]`, `rubric`, `timeline`, `success_criteria`, `decision_gate` | Most are **new** fields (today only `gate` exists) |
| Assigned operator | `operator_id` → `Operator {name, skills, founder_readiness}` | Links to `/operators/[id]`; empty state if open |
| Evidence | `EvidenceItem[] {type, payload, confidence, source_backed, reviewed_by}` | **New** entity; replaces today's `evidence: string[]`. Show confidence + source-backed badge |
| Outcome & scoring | `SprintOutcome {outcome, operator_scores, gate_decision, reviewer_notes}` | **New**; per-dimension `OperatorScore` bars |
| Agreement terms | IP assignment, confidentiality, work-for-hire (risk-arch) | **New**; makes ownership auditable |

Primary actions: **Sponsor this sprint** (INV) · Submit deliverable (OPR) · Score & set gate (PLT reviewer) · Download evidence pack.
New data/types: `Sprint.id`, `EvidenceItem`, `SprintOutcome`, `OperatorScore`, sprint `scope/deliverables/rubric/timeline/successCriteria/operatorId/agreement`.

### 3.3 Operator profile / proof — `/operators/[id]` (P0)

Makes proof-of-work legible; the anti-resume.

| Section | Fields (source: `Operator`, `OperatorScore`, `SprintOutcome`) | Notes |
|---------|---------------------------------------------------------------|-------|
| Header | `name`, `skills[]`, `domains[]`, `status` (invited/vetted/active) | Vetting badge |
| Proof profile | aggregated `OperatorScore` across 7 dimensions (`research_depth`, `customer_empathy`, `synthesis_quality`, `speed`, `commercial_judgment`, `technical_reasoning`, `ambiguity_handling`) | Radar or 7 bars; the signature visual |
| Founder readiness | `founder_readiness` (derived) | Single derived score + drivers |
| Sprint history | completed `Sprint`s w/ `SprintOutcome.outcome` and per-sprint scores | Links to `/sprint/[id]` |
| Evidence samples | select `EvidenceItem`s authored by operator | Proof, not claims |

Primary actions: **Invite to sprint** (INV/PLT) · Shortlist for formation · Message.
New data/types: entire `Operator`, `OperatorScore` model + seed for ~6–8 operators; join from `Sprint.operatorId`.

---

## 4. Data-model gaps in `lib/data.ts`

Today `lib/data.ts` models only `Thesis` and `Sprint` (with `evidence` as a
flat `string[]`). The following data-model.md entities are **missing** and block
the pages above:

| Gap | Needed for | Suggested shape |
|-----|-----------|-----------------|
| **Stable IDs on `Sprint`** | Any `/sprint/[id]` route | add `id: string`; today sprints are keyed only by `phase` within a thesis |
| **`Signal`** entity | Radar, Signal detail, Thesis "source signals" | `{ id, source, detectedAt, market, buyerHint, painHint, strength, tags[] }` |
| **`Thesis` extensions** | Thesis detail, Formation | add `status` ("draft"\|"published"\|"sponsored"\|"formed"\|"killed"), `signalIds[]`, `regulation`, `competitorDensity`, `fundingContext` |
| **`Sprint` extensions** | Sprint detail brief | add `scope`, `deliverables[]`, `rubric`, `timeline`, `successCriteria`, `sponsorId`, `operatorId`, `agreement` (IP/confidentiality terms) |
| **`EvidenceItem`** | Sprint detail, Evidence Explorer, Operator samples | `{ id, sprintId, type, payload, confidence, sourceBacked, reviewedBy }` — replaces flat `evidence: string[]` |
| **`SprintOutcome`** | Sprint outcome, Portfolio, Operator history | `{ id, sprintId, outcome, operatorScores, gateDecision, reviewerNotes }` |
| **`OperatorScore`** | Operator proof profile | per-dimension record over the 7 dimensions listed in §3.3 |
| **`Operator`** | Marketplace + profile | `{ id, name, skills[], domains[], proofProfile, founderReadiness, status }` |
| **`Investor`** | Portfolio, settings | `{ id, type, subscriptionTier, preferenceGraph, sponsoredSprintIds[] }` |
| **`Formation`** | Formation board + workspace | `{ id, thesisId, founderShortlist[], roles[], capTablePlan, fundingSteps[], status }` |

Migration note: keep it additive. Introduce `Sprint.id` and an `EvidenceItem[]`
table first (unblocks P0 detail pages), then layer `Operator`/`SprintOutcome`
so operator proof and portfolio can join across the graph. The existing
`evidence: string[]` can be temporarily preserved and mirrored into
`EvidenceItem.payload` to avoid breaking `DossierDetail`.

Seed data to add for a credible concierge demo: ~6 `Signal`s feeding the 5
existing theses, ~6–8 `Operator`s with scored histories, `SprintOutcome`s for
every `done` sprint, and 1–2 `Formation`s (the prior-auth thesis at phase 5 is
the natural first formation candidate).
