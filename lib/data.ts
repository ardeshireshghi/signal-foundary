// Domain types + seed data for the Investor console.
// Shaped by docs/data-model.md — the Evidence Graph.

export type SprintStatus = "done" | "open" | "locked";
export type Confidence = "high" | "medium" | "low";
export type Ticket = "S" | "M" | "L"; // sponsor commitment band

export interface Sprint {
  phase: number; // 1..5, genuinely sequential
  title: string;
  short: string; // spine label
  budget: number;
  status: SprintStatus;
  gate: string; // decision gate question this sprint answers
  evidence: string[]; // produced only when status === "done"
}

export interface MemoRisk {
  text: string;
  confidence: Confidence;
}

export interface Thesis {
  id: string;
  title: string;
  buyer: string;
  wedge: string;
  market: string;
  sector: string;
  ticket: Ticket;
  signalStrength: number; // 0..100
  memo: {
    pain: string;
    wedge: string;
    whyNow: string;
    risks: MemoRisk[];
    comps: string[];
  };
  sprints: Sprint[];
}

// The five validation stages are fixed and ordered.
export const PHASES = [
  "Market map",
  "Interviews",
  "Landing test",
  "Prototype",
  "Pilot",
] as const;

export const SECTORS = [
  "Healthcare ops",
  "Fintech compliance",
  "Climate / energy",
  "Vertical B2B SaaS",
  "Regulated SMB AI",
] as const;

export const TICKET_LABEL: Record<Ticket, string> = {
  S: "$2K–8K",
  M: "$8K–20K",
  L: "$20K+",
};

/** The next fundable step: first sprint whose gate is open. */
export function openSprint(t: Thesis): Sprint | undefined {
  return t.sprints.find((s) => s.status === "open");
}

export function fmtMoney(n: number): string {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1000) return "$" + Math.round(n / 100) / 10 + "K";
  return "$" + n;
}

// ---------------------------------------------------------------------------
// Investor identity + portfolio analytics that back the console dashboard.
// Kept here (not in JSX) so the UI stays data-driven.
// ---------------------------------------------------------------------------

export interface Investor {
  name: string;
  role: string;
  initials: string;
}

export const INVESTOR: Investor = {
  name: "Ardeshir E.",
  role: "Partner",
  initials: "AE",
};

export interface Portfolio {
  totalBudget: number;
  allocated: number;
  deployed: number;
}

export const PORTFOLIO: Portfolio = {
  totalBudget: 5_000_000,
  allocated: 1_200_000,
  deployed: 3_377_000,
};

/** Capital not yet allocated or deployed — available to sponsor new sprints. */
export function openCapital(p: Portfolio = PORTFOLIO): number {
  return p.totalBudget - p.allocated - p.deployed;
}

/** Recent avg-signal trend for the KPI sparkline. */
export const SIGNAL_TREND = [61, 64, 62, 69, 66, 72, 70, 74, 73, 76];

export const AVG_TIME_TO_GATE_DAYS = 14;

export interface SignalDriver {
  label: string;
  delta: number; // percentage-point contribution
}

export const SIGNAL_DRIVERS: SignalDriver[] = [
  { label: "Regulation changes", delta: 24 },
  { label: "Workflow pain", delta: 18 },
  { label: "Capital flowing in", delta: 15 },
  { label: "Tech unlock (AI)", delta: 12 },
  { label: "Talent availability", delta: 8 },
];

export interface Preferences {
  sectors: string[];
  stageFocus: string;
  ticket: string;
  geography: string;
}

export const PREFERENCES: Preferences = {
  sectors: ["Healthcare", "Fintech", "Climate"],
  stageFocus: "Validation, Early traction",
  ticket: "$2K – $20K",
  geography: "North America",
};

// ---- Derived selectors over the thesis set -------------------------------

export function totalCapitalOpen(theses: Thesis[] = THESES): number {
  // Portfolio capital available to deploy.
  return openCapital();
}

export function avgSignalStrength(theses: Thesis[] = THESES): number {
  if (theses.length === 0) return 0;
  return Math.round(
    theses.reduce((s, t) => s + t.signalStrength, 0) / theses.length,
  );
}

export interface SignalBucket {
  label: string;
  min: number;
  max: number;
  count: number;
}

/** Distribution of signal strength across four bands for the rail chart. */
export function signalDistribution(theses: Thesis[] = THESES): SignalBucket[] {
  const bands: SignalBucket[] = [
    { label: "0–40", min: 0, max: 40, count: 0 },
    { label: "41–60", min: 41, max: 60, count: 0 },
    { label: "61–80", min: 61, max: 80, count: 0 },
    { label: "81–100", min: 81, max: 100, count: 0 },
  ];
  for (const t of theses) {
    const b = bands.find((b) => t.signalStrength >= b.min && t.signalStrength <= b.max);
    if (b) b.count += 1;
  }
  return bands;
}

export function getThesis(id: string): Thesis | undefined {
  return THESES.find((t) => t.id === id);
}

// ===========================================================================
// Sprint detail layer (docs/product-roadmap.md §3.2).
// Additive: keeps Sprint.evidence: string[] intact for ThesisDetail, and
// derives the richer brief / operator / outcome from templates + stable ids so
// we don't hand-edit every seed sprint. All data lives here, not in JSX.
// ===========================================================================

/** Stable, route-safe id for a sprint within its thesis. */
export function sprintKey(thesisId: string, phase: number): string {
  return `${thesisId}-p${phase}`;
}

// Deterministic FNV-1a hash (no Math.random — keeps builds reproducible).
function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface SprintBrief {
  scope: string;
  deliverables: string[];
  rubric: string;
  successCriteria: string;
  timeline: string;
}

// One brief template per validation phase — the sprint's title/gate stay
// thesis-specific; the working shape is shared across ventures.
const PHASE_BRIEF: Record<number, SprintBrief> = {
  1: {
    scope:
      "Map the market: buyer segments, existing tools, regulation triggers, and pricing hypotheses.",
    deliverables: [
      "Buyer segmentation (3–5 segments)",
      "Competitor & substitute landscape",
      "Regulation / trigger map",
      "Pricing hypothesis memo",
    ],
    rubric:
      "Depth and correctness of segmentation, quality of the competitor teardown, and defensibility of pricing hypotheses.",
    successCriteria:
      "A clear, sourced view of who buys, what already exists, and where a wedge could sit.",
    timeline: "1 week",
  },
  2: {
    scope:
      "Run structured customer interviews to test pain frequency, budget ownership, and urgency.",
    deliverables: [
      "Interview guide",
      "≥ 20 completed interviews",
      "Pain-frequency & urgency synthesis",
      "Representative verbatim quotes",
    ],
    rubric:
      "Interview rigor, synthesis quality, evidence of real (not led) pull, and clarity on the budget owner.",
    successCriteria:
      "Evidence the pain is frequent, owned, and urgent enough to pay for.",
    timeline: "2 weeks",
  },
  3: {
    scope:
      "Test whether demand can be captured with a landing page and waitlist.",
    deliverables: [
      "Landing page",
      "2–3 messaging variants",
      "Waitlist conversion report",
      "Objection log",
    ],
    rubric:
      "Message–market fit signal, conversion versus benchmark, and quality of objection capture.",
    successCriteria:
      "A conversion signal strong enough to justify building a prototype.",
    timeline: "1 week",
  },
  4: {
    scope:
      "Build a clickable prototype and demonstrate the core workflow end to end.",
    deliverables: [
      "Clickable prototype",
      "Sample outputs on real inputs",
      "Risk review",
      "Demo walkthrough",
    ],
    rubric:
      "Whether the prototype shows real value, technical reasoning, and handling of edge cases and risk.",
    successCriteria:
      "A prototype that makes the value obvious to a target buyer.",
    timeline: "3 weeks",
  },
  5: {
    scope:
      "Design a pilot and select the founding operator shortlist.",
    deliverables: [
      "Pilot design + LOIs",
      "Operating plan",
      "Founder / operator shortlist",
      "Formation recommendation",
    ],
    rubric:
      "Pilot credibility, commercial judgment, and readiness to form the company.",
    successCriteria:
      "A go / no-go formation decision backed by pilot commitments.",
    timeline: "2 weeks",
  },
};

/** Sprint agreement terms — shown for auditability (risk-architecture.md). */
export const SPRINT_AGREEMENT = {
  basis: "Work-for-hire",
  ip: "All work product and IP assigns to the sponsoring venture entity on payment.",
  confidentiality: "Mutual NDA — thesis and evidence stay confidential until published.",
  formation:
    "Operators completing a phase-5 sprint are eligible for founding-role consideration.",
} as const;

// ---- Operators (minimal — enough for the assigned-operator section) -------

export type FounderReadiness = "emerging" | "strong" | "exceptional";

export interface Operator {
  id: string;
  name: string;
  initials: string;
  skills: string[];
  domains: string[];
  founderReadiness: FounderReadiness;
}

export const OPERATORS: Operator[] = [
  { id: "op-lena", name: "Lena Ortiz", initials: "LO", skills: ["Research", "GTM"], domains: ["Healthcare"], founderReadiness: "strong" },
  { id: "op-priya", name: "Priya Nair", initials: "PN", skills: ["Product", "Technical"], domains: ["Fintech"], founderReadiness: "exceptional" },
  { id: "op-marcus", name: "Marcus Reed", initials: "MR", skills: ["GTM", "Ops"], domains: ["Climate"], founderReadiness: "emerging" },
  { id: "op-dan", name: "Dan Whitfield", initials: "DW", skills: ["Research", "Product"], domains: ["Vertical SaaS"], founderReadiness: "strong" },
  { id: "op-aisha", name: "Aisha Khan", initials: "AK", skills: ["Technical", "Research"], domains: ["Regulated AI"], founderReadiness: "exceptional" },
];

// ---- Operator scoring dimensions (the 7 from the deck) --------------------

export interface Dimension {
  key: string;
  label: string;
}

export const DIMENSIONS: Dimension[] = [
  { key: "research", label: "Research depth" },
  { key: "empathy", label: "Customer empathy" },
  { key: "synthesis", label: "Synthesis quality" },
  { key: "speed", label: "Speed" },
  { key: "judgment", label: "Commercial judgment" },
  { key: "technical", label: "Technical reasoning" },
  { key: "ambiguity", label: "Ambiguity handling" },
];

export interface DimensionScore {
  key: string;
  label: string;
  score: number; // 0..100
}

export interface SprintOutcome {
  outcome: "passed" | "inconclusive";
  scores: DimensionScore[];
  overall: number;
  gateDecision: string;
  reviewerNotes: string;
}

/** Assigned operator: none for locked sprints; deterministic otherwise. */
export function operatorForSprint(
  thesisId: string,
  sprint: Sprint,
): Operator | null {
  if (sprint.status === "locked") return null;
  const idx = hashString(sprintKey(thesisId, sprint.phase)) % OPERATORS.length;
  return OPERATORS[idx];
}

/** Scored outcome for completed sprints; null while open/locked. */
export function outcomeForSprint(
  thesisId: string,
  sprint: Sprint,
): SprintOutcome | null {
  if (sprint.status !== "done") return null;
  const base = sprintKey(thesisId, sprint.phase);
  const scores = DIMENSIONS.map((d) => ({
    key: d.key,
    label: d.label,
    score: 66 + (hashString(base + d.key) % 30), // 66..95, stable
  }));
  const overall = Math.round(
    scores.reduce((s, d) => s + d.score, 0) / scores.length,
  );
  return {
    outcome: "passed",
    scores,
    overall,
    gateDecision: `Gate passed — ${sprint.gate.replace(/\?$/, "").toLowerCase()}: yes.`,
    reviewerNotes:
      "Human reviewer confirmed the AI pre-score. Evidence is source-backed and meets the rubric.",
  };
}

export function briefForSprint(sprint: Sprint): SprintBrief {
  return PHASE_BRIEF[sprint.phase];
}

export interface ResolvedSprint {
  id: string;
  thesis: Thesis;
  sprint: Sprint;
  brief: SprintBrief;
  operator: Operator | null;
  outcome: SprintOutcome | null;
}

/** Every sprint across all theses, with a stable id. */
export function allSprintIds(): string[] {
  return THESES.flatMap((t) => t.sprints.map((s) => sprintKey(t.id, s.phase)));
}

export function getSprint(id: string): ResolvedSprint | undefined {
  for (const thesis of THESES) {
    for (const sprint of thesis.sprints) {
      if (sprintKey(thesis.id, sprint.phase) === id) {
        return {
          id,
          thesis,
          sprint,
          brief: briefForSprint(sprint),
          operator: operatorForSprint(thesis.id, sprint),
          outcome: outcomeForSprint(thesis.id, sprint),
        };
      }
    }
  }
  return undefined;
}

export const THESES: Thesis[] = [
  {
    id: "sf-dental-compliance",
    title: "AI compliance assistant for small dental clinics",
    buyer: "Practice owners at 1–5 chair clinics",
    wedge: "Turn HIPAA + state-board audits from a dreaded scramble into a standing, always-ready record.",
    market: "US dental practices",
    sector: "Healthcare ops",
    ticket: "M",
    signalStrength: 78,
    memo: {
      pain: "Small clinics carry the same compliance load as hospital groups but have no compliance staff. Audits are handled by the office manager the week they arrive — under-documented, stressful, and expensive when they go wrong.",
      wedge: "Start with the single most-dreaded workflow — audit readiness — and own the standing record rather than selling a broad practice-management suite.",
      whyNow: "State boards are digitising audit submissions, and AI can now read a clinic's existing records and keep the audit trail current with little manual entry.",
      risks: [
        { text: "Regulatory nuance varies by state board.", confidence: "medium" },
        { text: "Clinics may treat compliance as a grudge purchase with low willingness to pay.", confidence: "medium" },
        { text: "Incumbent PM suites could bundle this for free.", confidence: "low" },
      ],
      comps: ["Generic PM suites (Dentrix, Open Dental)", "Manual consultants", "Spreadsheets"],
    },
    sprints: [
      {
        phase: 1,
        title: "Market map + competitor scan",
        short: "Market map",
        budget: 3000,
        status: "done",
        gate: "Is the market worth interviews?",
        evidence: [
          "Buyer segments: solo-owner, small-group DSO, and franchise-affiliated clinics.",
          "Regulation triggers mapped across 6 representative state boards.",
          "Pricing hypotheses: $150–$400/mo per clinic; office manager is the champion, owner is the budget holder.",
        ],
      },
      {
        phase: 2,
        title: "30 customer interviews",
        short: "Interviews",
        budget: 7000,
        status: "done",
        gate: "Is there real pull?",
        evidence: [
          "23 of 30 owners called audit prep their single most stressful admin task.",
          "Budget owner confirmed as the practice owner; office manager drives adoption.",
          '"I would pay to never think about this again." — 3-chair clinic owner, TX',
        ],
      },
      {
        phase: 3,
        title: "Landing page + waitlist test",
        short: "Landing test",
        budget: 5000,
        status: "open",
        gate: "Can demand be captured?",
        evidence: [],
      },
      {
        phase: 4,
        title: "Prototype + demo workflow",
        short: "Prototype",
        budget: 15000,
        status: "locked",
        gate: "Can product value be shown?",
        evidence: [],
      },
      {
        phase: 5,
        title: "Pilot design + founding role selection",
        short: "Pilot",
        budget: 20000,
        status: "locked",
        gate: "Form the company or kill it?",
        evidence: [],
      },
    ],
  },
  {
    id: "sf-fbo-fuel",
    title: "Emissions-ledger for regional fuel distributors",
    buyer: "Compliance leads at mid-market fuel distributors",
    wedge: "Automate the quarterly low-carbon-fuel-standard filing that today eats a week of a controller's time.",
    market: "US regional fuel & energy distributors",
    sector: "Climate / energy",
    ticket: "L",
    signalStrength: 64,
    memo: {
      pain: "Low-carbon fuel programs demand exact, auditable emissions accounting. Distributors reconcile it by hand across disconnected fuel-purchase and blending records.",
      wedge: "Own the quarterly filing artifact and its audit trail; expand into trading-credit optimisation later.",
      whyNow: "More states are adopting clean-fuel standards, multiplying the filing burden faster than teams can hire.",
      risks: [
        { text: "Long enterprise sales cycles.", confidence: "high" },
        { text: "Regulatory regimes differ sharply by state.", confidence: "medium" },
      ],
      comps: ["Big-4 advisory", "Internal spreadsheets", "Horizontal carbon-accounting SaaS"],
    },
    sprints: [
      {
        phase: 1,
        title: "Market map + competitor scan",
        short: "Market map",
        budget: 4000,
        status: "done",
        gate: "Is the market worth interviews?",
        evidence: [
          "12 states with active or pending clean-fuel standards identified.",
          "Buyer is the compliance lead; controller signs off; CFO holds budget.",
        ],
      },
      {
        phase: 2,
        title: "20 operator interviews",
        short: "Interviews",
        budget: 8000,
        status: "open",
        gate: "Is there real pull?",
        evidence: [],
      },
      {
        phase: 3,
        title: "Landing page + waitlist test",
        short: "Landing test",
        budget: 6000,
        status: "locked",
        gate: "Can demand be captured?",
        evidence: [],
      },
      {
        phase: 4,
        title: "Prototype + demo workflow",
        short: "Prototype",
        budget: 16000,
        status: "locked",
        gate: "Can product value be shown?",
        evidence: [],
      },
      {
        phase: 5,
        title: "Pilot design + founding role selection",
        short: "Pilot",
        budget: 22000,
        status: "locked",
        gate: "Form the company or kill it?",
        evidence: [],
      },
    ],
  },
  {
    id: "sf-lender-kyb",
    title: "Continuous KYB monitoring for small-business lenders",
    buyer: "Risk operations leads at non-bank SMB lenders",
    wedge: "Replace the annual re-verification scramble with always-on business-identity monitoring.",
    market: "US non-bank SMB lenders",
    sector: "Fintech compliance",
    ticket: "M",
    signalStrength: 71,
    memo: {
      pain: "Lenders verify a business once at origination, then fly blind until an annual review or a default. Fraud and shell-company risk accumulate silently in between.",
      wedge: "Sell continuous monitoring keyed to the loan lifecycle, not a one-shot onboarding check.",
      whyNow: "Business-registry and beneficial-ownership data are becoming machine-readable, making continuous checks newly feasible.",
      risks: [
        { text: "Crowded KYC/KYB tooling market.", confidence: "high" },
        { text: "Data-source licensing costs could compress margin.", confidence: "medium" },
      ],
      comps: ["Onboarding-only KYB vendors", "Manual annual reviews", "Credit bureaus"],
    },
    sprints: [
      {
        phase: 1,
        title: "Market map + competitor scan",
        short: "Market map",
        budget: 3000,
        status: "done",
        gate: "Is the market worth interviews?",
        evidence: [
          "Wedge confirmed: incumbents optimise onboarding, not the ongoing lifecycle.",
          "Champion is the risk-ops lead; budget sits with the head of credit.",
        ],
      },
      {
        phase: 2,
        title: "25 customer interviews",
        short: "Interviews",
        budget: 7000,
        status: "done",
        gate: "Is there real pull?",
        evidence: [
          "18 of 25 lenders admitted they cannot detect mid-term ownership changes today.",
          "Two named the annual review their weakest control.",
        ],
      },
      {
        phase: 3,
        title: "Landing page + waitlist test",
        short: "Landing test",
        budget: 5000,
        status: "done",
        gate: "Can demand be captured?",
        evidence: [
          "Waitlist converted at 9.1% from a targeted risk-ops list.",
          "Top objection: proof of data freshness vs. incumbents.",
        ],
      },
      {
        phase: 4,
        title: "Prototype + demo workflow",
        short: "Prototype",
        budget: 15000,
        status: "open",
        gate: "Can product value be shown?",
        evidence: [],
      },
      {
        phase: 5,
        title: "Pilot design + founding role selection",
        short: "Pilot",
        budget: 20000,
        status: "locked",
        gate: "Form the company or kill it?",
        evidence: [],
      },
    ],
  },
  {
    id: "sf-field-service",
    title: "Quote-to-cash copilot for commercial HVAC contractors",
    buyer: "Owners of 10–50 tech commercial HVAC firms",
    wedge: "Compress the multi-day quoting cycle that loses contractors bids to faster competitors.",
    market: "US commercial HVAC contractors",
    sector: "Vertical B2B SaaS",
    ticket: "S",
    signalStrength: 62,
    memo: {
      pain: "Commercial HVAC quotes require site data, parts pricing, and labour estimates stitched together by hand. Slow quotes lose jobs to whoever responds first.",
      wedge: "Own the quote artifact; expand into scheduling and invoicing once trusted.",
      whyNow: "Field-service data is finally digitised enough for an assistant to draft an accurate quote from a site visit.",
      risks: [
        { text: "Fragmented buyers with low software appetite.", confidence: "high" },
        { text: "Accuracy bar is high — a wrong quote is worse than a slow one.", confidence: "medium" },
      ],
      comps: ["Horizontal FSM suites", "Spreadsheets", "Pen and paper"],
    },
    sprints: [
      {
        phase: 1,
        title: "Market map + competitor scan",
        short: "Market map",
        budget: 3000,
        status: "open",
        gate: "Is the market worth interviews?",
        evidence: [],
      },
      {
        phase: 2,
        title: "30 customer interviews",
        short: "Interviews",
        budget: 7000,
        status: "locked",
        gate: "Is there real pull?",
        evidence: [],
      },
      {
        phase: 3,
        title: "Landing page + waitlist test",
        short: "Landing test",
        budget: 5000,
        status: "locked",
        gate: "Can demand be captured?",
        evidence: [],
      },
      {
        phase: 4,
        title: "Prototype + demo workflow",
        short: "Prototype",
        budget: 14000,
        status: "locked",
        gate: "Can product value be shown?",
        evidence: [],
      },
      {
        phase: 5,
        title: "Pilot design + founding role selection",
        short: "Pilot",
        budget: 20000,
        status: "locked",
        gate: "Form the company or kill it?",
        evidence: [],
      },
    ],
  },
  {
    id: "sf-clinic-prior-auth",
    title: "Prior-authorization agent for independent specialty clinics",
    buyer: "Practice managers at independent specialty clinics",
    wedge: "Take the payer prior-auth back-and-forth off the front desk entirely.",
    market: "US independent specialty clinics",
    sector: "Regulated SMB AI",
    ticket: "M",
    signalStrength: 85,
    memo: {
      pain: "Prior authorization is a per-patient, per-payer maze. Front-desk staff spend hours on hold and in portals; denials delay care and revenue.",
      wedge: "Automate the payer interaction end to end for a narrow set of high-volume procedures first.",
      whyNow: "Payer portals and clinical records are integrable enough for an agent to assemble and submit auths with a human check.",
      risks: [
        { text: "Payer integrations are brittle and change often.", confidence: "high" },
        { text: "Clinical liability requires a human in the loop.", confidence: "high" },
      ],
      comps: ["RCM outsourcers", "Manual staff", "Broad RCM platforms"],
    },
    sprints: [
      {
        phase: 1,
        title: "Market map + competitor scan",
        short: "Market map",
        budget: 3000,
        status: "done",
        gate: "Is the market worth interviews?",
        evidence: [
          "Highest-volume procedure families ranked by auth burden.",
          "Champion is the practice manager; physician-owner holds budget.",
        ],
      },
      {
        phase: 2,
        title: "30 customer interviews",
        short: "Interviews",
        budget: 7000,
        status: "done",
        gate: "Is there real pull?",
        evidence: [
          "26 of 30 clinics ranked prior-auth their #1 admin cost.",
          "Average 12 staff-hours/week spent on auths at a 4-provider clinic.",
        ],
      },
      {
        phase: 3,
        title: "Landing page + waitlist test",
        short: "Landing test",
        budget: 5000,
        status: "done",
        gate: "Can demand be captured?",
        evidence: [
          "Waitlist converted at 14% — the strongest signal in the portfolio.",
          "Buyers asked specifically for denial-rate proof.",
        ],
      },
      {
        phase: 4,
        title: "Prototype + demo workflow",
        short: "Prototype",
        budget: 15000,
        status: "done",
        gate: "Can product value be shown?",
        evidence: [
          "Prototype assembled and submitted 8 of 10 test auths without staff edits.",
          "Two flagged for human review exactly as designed.",
        ],
      },
      {
        phase: 5,
        title: "Pilot design + founding role selection",
        short: "Pilot",
        budget: 20000,
        status: "open",
        gate: "Form the company or kill it?",
        evidence: [],
      },
    ],
  },
];

// ===========================================================================
// Operator profile layer (docs/product-roadmap.md §3.3).
// Aggregates an operator's proof-of-work across every sprint assigned to them
// by operatorForSprint — no new stored data, all derived.
// ===========================================================================

export interface OperatorSprintRecord {
  sprintId: string;
  thesisId: string;
  thesisTitle: string;
  sector: string;
  phase: number;
  title: string;
  status: SprintStatus;
  outcome: SprintOutcome | null;
}

/** Every sprint this operator is assigned to, newest phase first. */
export function sprintsForOperator(operatorId: string): OperatorSprintRecord[] {
  const records: OperatorSprintRecord[] = [];
  for (const thesis of THESES) {
    for (const sprint of thesis.sprints) {
      const op = operatorForSprint(thesis.id, sprint);
      if (op?.id !== operatorId) continue;
      records.push({
        sprintId: sprintKey(thesis.id, sprint.phase),
        thesisId: thesis.id,
        thesisTitle: thesis.title,
        sector: thesis.sector,
        phase: sprint.phase,
        title: sprint.title,
        status: sprint.status,
        outcome: outcomeForSprint(thesis.id, sprint),
      });
    }
  }
  return records;
}

export interface OperatorProfileData {
  operator: Operator;
  /** Per-dimension average across the operator's completed sprints. */
  dimensions: DimensionScore[];
  /** Overall average of the dimension averages (0 if no completed sprints). */
  overall: number;
  sprintsCompleted: number;
  sprintsActive: number;
  records: OperatorSprintRecord[];
  /** A few evidence samples pulled from completed sprints. */
  evidenceSamples: { text: string; thesisTitle: string }[];
}

export function operatorProfile(operatorId: string): OperatorProfileData | undefined {
  const operator = OPERATORS.find((o) => o.id === operatorId);
  if (!operator) return undefined;

  const records = sprintsForOperator(operatorId);
  const completed = records.filter((r) => r.outcome);

  // Average each dimension across completed sprints.
  const sums: Record<string, number> = {};
  for (const r of completed) {
    for (const d of r.outcome!.scores) {
      sums[d.key] = (sums[d.key] ?? 0) + d.score;
    }
  }
  const dimensions: DimensionScore[] = DIMENSIONS.map((d) => ({
    key: d.key,
    label: d.label,
    score: completed.length ? Math.round(sums[d.key] / completed.length) : 0,
  }));
  const overall = completed.length
    ? Math.round(dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length)
    : 0;

  const evidenceSamples: { text: string; thesisTitle: string }[] = [];
  for (const thesis of THESES) {
    for (const sprint of thesis.sprints) {
      if (operatorForSprint(thesis.id, sprint)?.id !== operatorId) continue;
      if (sprint.status !== "done") continue;
      for (const e of sprint.evidence) {
        if (evidenceSamples.length < 4)
          evidenceSamples.push({ text: e, thesisTitle: thesis.title });
      }
    }
  }

  return {
    operator,
    dimensions,
    overall,
    sprintsCompleted: completed.length,
    sprintsActive: records.filter((r) => r.status === "open").length,
    records,
    evidenceSamples,
  };
}

export function allOperatorIds(): string[] {
  return OPERATORS.map((o) => o.id);
}

// ===========================================================================
// Portfolio layer (docs/product-roadmap.md — P1).
// The investor's consolidated view. Concierge MVP is single-investor, so the
// portfolio spans all theses; committed capital = budgets of completed sprints.
// ===========================================================================

export interface PortfolioRow {
  thesis: Thesis;
  committed: number; // sum of completed sprint budgets
  next?: Sprint; // the open sprint, if any
  phasesDone: number;
}

export function portfolioRows(): PortfolioRow[] {
  return THESES.map((thesis) => {
    const done = thesis.sprints.filter((s) => s.status === "done");
    return {
      thesis,
      committed: done.reduce((sum, s) => sum + s.budget, 0),
      next: openSprint(thesis),
      phasesDone: done.length,
    };
  }).sort((a, b) => b.thesis.signalStrength - a.thesis.signalStrength);
}

export interface PortfolioSummary {
  totalCommitted: number;
  openToSponsor: number;
  sprintsSponsored: number;
  formationReady: number;
}

export function portfolioSummary(): PortfolioSummary {
  const rows = portfolioRows();
  return {
    totalCommitted: rows.reduce((s, r) => s + r.committed, 0),
    openToSponsor: rows.reduce((s, r) => s + (r.next?.budget ?? 0), 0),
    sprintsSponsored: THESES.reduce(
      (s, t) => s + t.sprints.filter((sp) => sp.status === "done").length,
      0,
    ),
    // A venture is formation-ready when its open gate is the phase-5 pilot,
    // or every gate has closed.
    formationReady: rows.filter((r) => !r.next || r.next.phase === 5).length,
  };
}

// ===========================================================================
// Signals layer (docs/product-roadmap.md — Signals Radar; data-model.md Signal).
// Market signals feed theses. Detected-at is a fixed relative label (no RNG /
// Date so builds stay reproducible).
// ===========================================================================

export type SignalCategory =
  | "Regulation"
  | "Funding"
  | "Workflow pain"
  | "Tech unlock"
  | "Talent";

export interface Signal {
  id: string;
  headline: string;
  source: string;
  detectedAt: string; // relative label
  category: SignalCategory;
  market: string;
  painHint: string;
  strength: number; // 0..100
  tags: string[];
  thesisId?: string; // the thesis this signal helped originate
}

export const SIGNALS: Signal[] = [
  {
    id: "sig-dental-boards",
    headline: "State dental boards move audit submissions online",
    source: "Regulatory tracker",
    detectedAt: "2 days ago",
    category: "Regulation",
    market: "US dental practices",
    painHint: "Audit prep is manual and dreaded at small clinics",
    strength: 82,
    tags: ["healthcare", "compliance", "SMB"],
    thesisId: "sf-dental-compliance",
  },
  {
    id: "sig-priorauth-load",
    headline: "Specialty clinics report prior-auth as #1 admin cost",
    source: "Provider survey digest",
    detectedAt: "5 days ago",
    category: "Workflow pain",
    market: "US independent specialty clinics",
    painHint: "12+ staff-hours/week lost to payer portals",
    strength: 88,
    tags: ["healthcare", "RCM", "agents"],
    thesisId: "sf-clinic-prior-auth",
  },
  {
    id: "sig-clean-fuel",
    headline: "Three more states adopt low-carbon-fuel standards",
    source: "Policy feed",
    detectedAt: "1 week ago",
    category: "Regulation",
    market: "US fuel & energy distributors",
    painHint: "Quarterly emissions filing done by hand",
    strength: 64,
    tags: ["climate", "compliance", "mid-market"],
    thesisId: "sf-fbo-fuel",
  },
  {
    id: "sig-kyb-registry",
    headline: "Beneficial-ownership registries become machine-readable",
    source: "Data-source changelog",
    detectedAt: "1 week ago",
    category: "Tech unlock",
    market: "US non-bank SMB lenders",
    painHint: "Lenders can't detect mid-term ownership changes",
    strength: 71,
    tags: ["fintech", "KYB", "risk"],
    thesisId: "sf-lender-kyb",
  },
  {
    id: "sig-hvac-quoting",
    headline: "Commercial HVAC contractors losing bids to slow quotes",
    source: "Trade forum analysis",
    detectedAt: "3 days ago",
    category: "Workflow pain",
    market: "US commercial HVAC contractors",
    painHint: "Multi-day quoting cycle loses jobs to faster rivals",
    strength: 52,
    tags: ["vertical-saas", "field-service"],
    thesisId: "sf-field-service",
  },
  {
    id: "sig-ai-agents-ga",
    headline: "Tool-using agents reach production reliability for narrow tasks",
    source: "Model release notes",
    detectedAt: "4 days ago",
    category: "Tech unlock",
    market: "Regulated SMB workflows",
    painHint: "Repetitive payer/records tasks now automatable with review",
    strength: 79,
    tags: ["AI", "agents", "automation"],
  },
  {
    id: "sig-compliance-hiring",
    headline: "SMB compliance roles stay unfilled 60+ days",
    source: "Job-postings index",
    detectedAt: "6 days ago",
    category: "Talent",
    market: "US SMB services",
    painHint: "No staff to own compliance — software must",
    strength: 58,
    tags: ["talent", "compliance", "SMB"],
  },
  {
    id: "sig-vertical-funding",
    headline: "Vertical AI seed rounds concentrate in regulated SMB",
    source: "Funding data",
    detectedAt: "2 weeks ago",
    category: "Funding",
    market: "Vertical AI",
    painHint: "Capital chasing narrow, defensible wedges",
    strength: 67,
    tags: ["funding", "vertical-ai"],
  },
];

export function getSignal(id: string): Signal | undefined {
  return SIGNALS.find((s) => s.id === id);
}

export function allSignalIds(): string[] {
  return SIGNALS.map((s) => s.id);
}

export function signalsForThesis(thesisId: string): Signal[] {
  return SIGNALS.filter((s) => s.thesisId === thesisId);
}

export interface SignalCategoryCount {
  category: SignalCategory;
  count: number;
}

export function signalsByCategory(): SignalCategoryCount[] {
  const cats: SignalCategory[] = [
    "Regulation",
    "Workflow pain",
    "Tech unlock",
    "Funding",
    "Talent",
  ];
  return cats.map((category) => ({
    category,
    count: SIGNALS.filter((s) => s.category === category).length,
  }));
}
