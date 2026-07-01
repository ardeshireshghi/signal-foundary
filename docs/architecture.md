# Architecture

This document proposes a system architecture for the SignalFoundry platform. It
is intentionally staged: the concierge MVP needs very little of it, and each
phase adds capability only when a metric justifies it.

## Principles

- **Cash-first, not a financial product.** The MVP sells validation work and
  intelligence. No securities flows in early phases (see
  [risk-architecture.md](risk-architecture.md)).
- **Evidence Graph is the center of gravity.** Every feature reads from or
  writes to it. Treat it as the source of truth, not a side effect.
- **Agents assist, humans decide.** AI structures work and critiques outputs;
  investors and expert reviewers make gate decisions.
- **Start concierge.** Phase 0 can be mostly humans + AI tooling behind a thin
  app. Automate only the paths that repeat.

## High-level components

```
┌─────────────────────────────────────────────────────────────┐
│                        Web app (SPA)                          │
│  Investor console · Operator workspace · Reviewer console     │
└───────────────┬─────────────────────────────────┬────────────┘
                │ REST/GraphQL                     │
┌───────────────▼─────────────────────────────────▼────────────┐
│                        API / BFF layer                        │
│  Auth · Thesis · Sprint · Operator · Scoring · Formation      │
└───┬───────────────┬───────────────┬───────────────┬──────────┘
    │               │               │               │
┌───▼────┐   ┌──────▼──────┐  ┌─────▼──────┐  ┌─────▼─────────┐
│Postgres│   │ Evidence    │  │  Agent     │  │ Object store  │
│(OLTP)  │   │ Graph store │  │  services  │  │ (artifacts)   │
└────────┘   └─────────────┘  └────────────┘  └───────────────┘
```

### Agent services

Discrete, individually testable jobs — not one monolithic agent:

- **Radar agent** — ingests sources, emits `Signal`s, clusters into `Thesis` drafts.
- **Brief agent** — drafts investor-readable thesis memos with source-backed claims and confidence ratings.
- **Sprint agent** — proposes sprint breakdowns, rubrics, and decision gates from a thesis.
- **Scoring agent** — pre-scores operator submissions against the rubric; human reviewer confirms.

All agent output is **source-backed and confidence-rated** before it reaches an
investor, and human expert review is required for sponsored sprints.

> LLM/agent implementation should default to the latest Claude models (e.g.
> Opus 4.8) for reasoning-heavy briefing and scoring work. Keep provider
> integration behind an interface so models can be swapped per task.

## Proposed stack (pragmatic default)

| Concern | Choice | Rationale |
|---------|--------|-----------|
| Web | TypeScript + React (Next.js) | Fast to build the three consoles; SSR for shareable thesis memos. |
| API | Next.js route handlers / Node service | Single language across stack for a small team. |
| DB | PostgreSQL | Relational core (theses, sprints, scores) with JSONB for flexible evidence payloads. |
| Graph queries | Postgres + recursive CTEs initially; dedicated graph DB later | Avoid premature infra; the graph is small in early phases. |
| Auth | Managed provider (e.g. Clerk/Auth0) or NextAuth | Investor/operator/reviewer roles. |
| Agents | Claude API behind an internal `AgentService` interface | Swappable, testable, task-scoped. |
| Object store | S3-compatible | Prototype artifacts, uploads, generated reports. |

This stack is a recommendation, not a commitment. Confirm before scaffolding —
the [roadmap](roadmap.md) Phase 0 can start as a concierge tool with far less.

## Environments & non-functionals

- **Auditability** — every gate decision, score, and agent output is logged and
  attributable (supports investor trust + IP/ownership disputes).
- **Access control** — theses and evidence are confidential per investor until
  published; operators see only assigned sprints.
- **Data retention** — sprint agreements dictate IP assignment; store agreement
  terms alongside sprint records.
