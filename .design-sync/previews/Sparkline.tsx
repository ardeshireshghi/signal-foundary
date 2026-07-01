import { Sparkline, Eyebrow } from "@signalfoundry/ui";

export const Default = () => (
  <div className="bg-bg p-6">
    <div className="w-52 rounded-xl border border-line bg-surface p-4">
      <Eyebrow>Avg. signal — 30d</Eyebrow>
      <div className="mt-3">
        <Sparkline data={[61, 64, 62, 69, 66, 72, 70, 74, 73, 76]} width={176} height={40} />
      </div>
    </div>
  </div>
);

export const Falling = () => (
  <div className="bg-bg p-6">
    <div className="w-52 rounded-xl border border-line bg-surface p-4">
      <Eyebrow>Burn — 30d</Eyebrow>
      <div className="mt-3">
        <Sparkline data={[82, 80, 78, 74, 71, 69, 64, 60, 55, 51]} width={176} height={40} />
      </div>
    </div>
  </div>
);
