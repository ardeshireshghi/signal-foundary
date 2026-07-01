import { StatusPill } from "@signalfoundry/ui";

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-2 bg-bg p-6">
    <StatusPill variant="active" label="Gate open" />
    <StatusPill variant="complete" label="Passed" />
    <StatusPill variant="locked" label="Locked" />
    <StatusPill variant="neutral" label="Draft" />
  </div>
);

export const Active = () => (
  <div className="bg-bg p-6">
    <StatusPill variant="active" label="Gate open" />
  </div>
);
