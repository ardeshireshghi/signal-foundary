import { ScoreBars } from "@signalfoundry/ui";

const OPERATOR_SCORES = [
  { label: "Research depth", score: 88 },
  { label: "Customer empathy", score: 82 },
  { label: "Synthesis quality", score: 77 },
  { label: "Speed", score: 71 },
  { label: "Commercial judgment", score: 84 },
  { label: "Technical reasoning", score: 69 },
  { label: "Ambiguity handling", score: 79 },
];

export const OperatorProof = () => (
  <div className="bg-bg p-6">
    <div className="w-96">
      <ScoreBars
        title="Operator proof score"
        caption="Gate passed — is there real pull: yes."
        overall={79}
        scores={OPERATOR_SCORES}
      />
    </div>
  </div>
);

export const WithoutOverall = () => (
  <div className="bg-bg p-6">
    <div className="w-96">
      <ScoreBars title="Dimension scores" scores={OPERATOR_SCORES.slice(0, 4)} />
    </div>
  </div>
);
