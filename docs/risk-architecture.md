# Risk Architecture — build the clean version first

The risky version is a public investment marketplace where users buy equity in
AI-generated ideas. That creates trust and regulatory problems. The clean
version sells venture validation work and investor intelligence first.

> The correct MVP is not a financial product. It is a paid venture validation
> workflow product with optional future funding integrations.

## Risks and mitigations

| Risk | Why it matters | Mitigation |
|------|----------------|------------|
| **Securities regulation** | Investment transactions can trigger broker-dealer, crowdfunding, private-offering, and accreditation requirements. SEC Regulation Crowdfunding requires transactions through an SEC-registered intermediary and caps Reg CF fundraising at $5M in a 12-month period. | MVP avoids facilitating securities sales. Use paid contracts, software subscriptions, and legal partners for later investment rails. |
| **Idea / IP ownership** | Operators, investors, and the platform may dispute who owns the thesis, research, prototypes, and IP. | Clear sprint agreements: work-for-hire or license terms, confidentiality, assignment triggers, and formation rules — stored alongside each sprint. |
| **Investor trust** | AI-generated reports can be generic or wrong. | Source-backed briefs, human expert review for sponsored sprints, and explicit confidence ratings. |
| **Operator quality** | Marketplace output becomes noisy if anybody can apply. | Start curated. Invite operators from product, engineering, research, GTM, healthcare, fintech, climate, etc. |
| **Founder motivation** | If investors/platform take too much equity, founder-quality people reject the structure. | Keep equity light unless the platform provides studio-level capital and support. |

## Design implications

- No securities flows in Phase 0–2. Money moves as **service payments** (subscriptions + sprint budgets), not investments.
- Every agent-produced claim carries a **confidence rating** and, where possible, a **source link**.
- **Sponsored sprints require human expert review** before evidence is trusted.
- Sprint records store the **governing agreement terms** (IP assignment, confidentiality) to make ownership auditable.
- Operator onboarding is **invite/vetting-gated** until quality benchmarks are stable.
