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
  return "$" + (n >= 1000 ? `${Math.round(n / 100) / 10}K` : `${n}`);
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
    signalStrength: 52,
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
    signalStrength: 83,
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
