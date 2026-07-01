import { StatCard, Sparkline } from "@signalfoundry/ui";

export const Default = () => (
  <div className="bg-bg p-6">
    <div className="w-64">
      <StatCard label="Total Capital Open" value="$423K" sub="Available to deploy" />
    </div>
  </div>
);

export const WithSparkline = () => (
  <div className="bg-bg p-6">
    <div className="w-64">
      <StatCard
        label="Avg. Signal Strength"
        value="72"
        unit="/100"
        sub="Building"
        accent
      >
        <Sparkline data={[61, 64, 62, 69, 66, 72, 70, 76]} />
      </StatCard>
    </div>
  </div>
);

export const Plain = () => (
  <div className="bg-bg p-6">
    <div className="w-64">
      <StatCard label="Total Opportunities" value="5" sub="Across all sectors" />
    </div>
  </div>
);
