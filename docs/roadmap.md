# Roadmap

Start narrow. A broad marketplace will look unfocused and untrusted. The first
version should serve a small group of angels, micro-VCs, venture studios, and
corporate innovation teams who already pay for research, scouts, or expert
validation.

## Phased plan

| Phase | Build | Target metric |
|-------|-------|---------------|
| **0–3 months** | Concierge MVP: 20 curated opportunities, 10 investors, 50 vetted operators, manual sprint management supported by AI. | 5–10 paid sprint sponsors |
| **3–6 months** | Self-serve investor thesis board, sprint templates, operator profiles, evidence scoring, report generation. | 50+ completed sprints, 20%+ repeat sponsor rate |
| **6–12 months** | Marketplace liquidity, expert reviewers, venture formation playbooks, legal partner integrations. | $500K–$1M annualized revenue run-rate |
| **12–24 months** | Data product, sector-specific playbooks, formation fees, selective equity upside, premium investor seats. | $2M–$6M ARR / annual revenue |

## Pick a specific first vertical

Do not launch as a general startup platform. Pick one or two high-urgency areas
where investors already care and domain validation matters:

- AI workflow automation for regulated SMBs
- Healthcare administration
- Vertical B2B SaaS
- Climate / energy operations
- Fintech compliance

## Concierge MVP — recommended first build

Per the pitch's recommended next step:

- **10 investors**, **50 vetted operators**, **20 curated opportunities**, **10 paid validation sprints**.
- Thin app over a mostly-manual workflow; AI assists with radar, briefs, sprint design, and pre-scoring.
- Success is commercial, not technical: **5–10 paid sprint sponsors** who come back.

### Suggested first engineering slices

1. **Thesis + Sprint records** — CRUD over the core [data model](data-model.md) entities; investor and operator views.
2. **Sprint lifecycle** — assign → submit → review → score → gate decision, with an audit log.
3. **Operator proof profile** — aggregate per-dimension scores across sprints.
4. **Brief agent (assisted)** — generate a source-backed thesis memo draft with confidence ratings; human edits before publish.
5. **Evidence Graph reads** — surface "what markets want, what investors fund, who can build" from accumulated sprint data.

> The platform should be revenue-positive before building a large two-sided
> marketplace. Sell limited investor memberships first, then take 20% of sprint
> budgets.
