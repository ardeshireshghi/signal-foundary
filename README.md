# SignalFoundry

**The venture assembly layer for the AI economy.**

SignalFoundry reverses the startup funding funnel. Instead of waiting for the
perfect founder pitch, investors sponsor small paid **validation sprints**,
discover founder-quality **operators** through proof of work, and graduate
validated market opportunities into fundable startups.

> One-line pitch: SignalFoundry lets investors fund the smallest useful next
> step of a startup before committing to the full company.

This is not an open marketplace for random AI ideas. It is a curated venture
assembly system: market signals are converted into structured opportunities,
those opportunities are broken into validation sprints, and operators compete
on real work rather than resumes.

---

## The core loop

```
Signal scan  →  Thesis brief  →  Sprint design  →  Operator proof  →  Funding path
   (market       (investor-       (small paid       (scored real       (budget, roles,
    shifts)       readable memo)    tasks + rubric)   startup work)      formation)
```

Every sprint produces compounding evidence: **market data + operator proof +
investor preference data**. That evidence graph is the moat.

## Who it serves

| Stakeholder | Current pain | SignalFoundry answer |
|-------------|--------------|----------------------|
| **Investors** | Too many pitches, too little objective validation. | Sponsor low-cost validation sprints and see evidence before a larger check. |
| **Operators** | Capable people may lack an idea, network, or founder credential. | Earn founder access through proof of work: research, GTM, product, technical validation. |
| **New startups** | Companies form before the idea, market, or team is de-risked. | Form the company only after market evidence, role clarity, and operator quality are visible. |

## Core modules

| Module | What it does |
|--------|--------------|
| **Opportunity Radar** | Continuously scans markets and generates prioritized venture theses. |
| **Sprint Builder** | Converts each thesis into 1–4 week validation tasks with deliverables and rubrics. |
| **Operator Marketplace** | Matches PMs, researchers, designers, engineers, GTM operators, and domain experts to sprints. |
| **Evidence Graph** | Stores market findings, customer proof, sprint outcomes, operator scores, and investor preferences. |
| **Formation Layer** | Converts validated opportunities into companies, roles, cap-table plans, and funding steps. |

## Business model — cash first, equity second

The early business makes money from software access and services before relying
on long-term equity outcomes.

1. **Investor subscription** — $500–$5K/mo (angels/syndicates/micro-VCs); $5K–$15K/mo (studios/corporate innovation).
2. **Sprint take rate** — 15–30% of sponsored sprint budgets (base model 20%).
3. **Formation fee** — $5K–$25K when a validated opportunity becomes a company.
4. **Founder/operator placement** — $10K–$50K when an operator graduates into a founding role.
5. **Equity/carry upside** — light (0.5–3%), used only when the platform truly contributes to venture formation.

Most realistic 3–5 year target if the wedge works: **$10M–$30M annual cash
revenue**, with separate long-term equity upside.

## Why now

- **More signals** — AI, job change, regulation, data, and vertical SaaS create constant new opportunities.
- **Less trust** — AI-generated ideas are cheap; validated evidence is scarce.
- **Better tools** — Agents can structure research, sprints, rubrics, and comparisons at scale.

> The market does not need more startup ideas. It needs a repeatable way to
> convert opportunity signals into validated startup evidence and
> founder-quality talent.

## Build the clean version first

The risky version is a public investment marketplace where users buy equity in
AI-generated ideas — that creates trust and regulatory problems. The clean MVP
sells **venture validation work and investor intelligence first**, with optional
future funding integrations. See [`docs/risk-architecture.md`](docs/risk-architecture.md).

---

## Documentation

| Doc | Purpose |
|-----|---------|
| [`docs/product-spec.md`](docs/product-spec.md) | Product scope, the five-stage venture loop, worked example. |
| [`docs/architecture.md`](docs/architecture.md) | System architecture and proposed tech stack. |
| [`docs/data-model.md`](docs/data-model.md) | The Evidence Graph — core entities and relationships. |
| [`docs/business-model.md`](docs/business-model.md) | Revenue streams and scenario modeling. |
| [`docs/risk-architecture.md`](docs/risk-architecture.md) | Regulatory, IP, trust, and quality risks with mitigations. |
| [`docs/roadmap.md`](docs/roadmap.md) | Phased MVP plan from concierge to marketplace. |

## Status

Greenfield. This repository currently captures the concept as an actionable
project foundation. Next step per the pitch: a **concierge MVP** — 10 investors,
50 vetted operators, 20 curated opportunities, and 10 paid validation sprints.

---

*Derived from the SignalFoundry strategic pitch memo (June 2026). This is not
legal, securities, tax, or investment advice.*
