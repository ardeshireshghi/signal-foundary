# Data Model — The Evidence Graph

The Evidence Graph is the platform's compounding data asset. As sprints
complete, it learns which market signals produce sponsor interest, which sprints
predict later traction, which operators produce reliable evidence, and which
investors prefer which venture patterns.

## Core entities

### Signal
A detected market shift, pain, regulation change, funding event, or workflow gap.

- `id`, `source`, `detected_at`
- `market`, `buyer_hint`, `pain_hint`
- `strength` (score), `tags[]`
- → aggregated into one or more **Theses**

### Thesis
An investor-readable opportunity memo derived from one or more signals.

- `id`, `title`, `created_by` (agent or investor)
- `buyer`, `pain`, `wedge`, `why_now`
- `risks[]`, `comps[]`
- `market`, `regulation`, `competitor_density`, `funding_context`
- `status` (draft / published / sponsored / formed / killed)
- → owns many **Sprints**

### Sprint
A small paid validation task with scope, rubric, timeline, and success criteria.

- `id`, `thesis_id`, `phase` (1–5), `title`
- `budget`, `scope`, `deliverables[]`, `rubric`
- `timeline`, `success_criteria`, `decision_gate`
- `sponsor_id` (Investor), `operator_id` (Operator)
- `status` (open / assigned / in_review / scored / passed / failed)
- → produces **EvidenceItems** and one **SprintOutcome**

### Operator
A PM, researcher, designer, engineer, GTM operator, or domain expert.

- `id`, `name`, `skills[]`, `domains[]`
- `proof_profile` → aggregated **OperatorScores**
- `founder_readiness` (derived signal)
- `status` (invited / vetted / active)

### Investor
An angel, syndicate, micro-VC, studio, or corporate innovation team.

- `id`, `type`, `subscription_tier`
- `preference_graph` → sectors, risks, ticket sizes, formation paths
- `sponsored_sprints[]`

### EvidenceItem
An atomic finding produced by a sprint (interview quote, conversion metric,
competitor entry, prototype artifact, risk note).

- `id`, `sprint_id`, `type`, `payload`, `confidence`
- `source_backed` (bool), `reviewed_by`

### SprintOutcome
The scored result of a completed sprint.

- `id`, `sprint_id`, `outcome` (pass / fail / inconclusive)
- `operator_scores` (per dimension — see below)
- `gate_decision`, `reviewer_notes`

### OperatorScore
Per-dimension scoring attached to an operator via a sprint outcome.

- Dimensions: `research_depth`, `customer_empathy`, `synthesis_quality`,
  `speed`, `commercial_judgment`, `technical_reasoning`, `ambiguity_handling`

### Formation
A validated opportunity converted toward a company.

- `id`, `thesis_id`, `founder_shortlist[]` (Operators)
- `roles[]`, `cap_table_plan`, `funding_steps[]`
- `status`

## Relationships (flywheel)

```
Signal ──aggregates──▶ Thesis ──breaks into──▶ Sprint ──produces──▶ EvidenceItem
                          │                        │
                          │                        ├──scores──▶ OperatorScore ──▶ Operator.proof_profile
                          │                        └──records──▶ SprintOutcome
                          │
Investor ──sponsors──────┘                     Thesis ──graduates──▶ Formation
   │                                                                     │
   └──preference_graph learns from every sponsorship & outcome ◀────────┘
```

## Moat layers (what compounds)

| Moat layer | How it compounds |
|------------|------------------|
| Proprietary opportunity data | Every thesis tagged by market, buyer, workflow, pain, regulation, competitor density, funding context. |
| Sprint outcome benchmarks | Learns what good discovery / prototype / GTM validation looks like, by category. |
| Operator proof profiles | Talent ranked by real outputs → a founder-quality talent graph. |
| Investor preference graph | Learns which investors sponsor which sectors, risks, ticket sizes, formation paths. |
| Workflow templates | Repeated sprints become structured venture playbooks per industry. |
