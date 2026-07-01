import { Meter } from "@signalfoundry/ui";

export const WithLabel = () => (
  <div className="bg-bg p-6">
    <div className="w-72 rounded-xl border border-line bg-surface p-4">
      <Meter value={77} label="Research depth" valueLabel="77" />
    </div>
  </div>
);

export const Stacked = () => (
  <div className="bg-bg p-6">
    <div className="flex w-72 flex-col gap-3 rounded-xl border border-line bg-surface p-4">
      <Meter value={88} label="Customer empathy" valueLabel="88" />
      <Meter value={71} label="Synthesis quality" valueLabel="71" />
      <Meter value={64} label="Speed" valueLabel="64" />
    </div>
  </div>
);

export const Bare = () => (
  <div className="bg-bg p-6">
    <div className="w-72">
      <Meter value={45} />
    </div>
  </div>
);
