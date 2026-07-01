import { Eyebrow } from "@signalfoundry/ui";

export const Default = () => (
  <div className="bg-bg p-6">
    <Eyebrow>Capital Snapshot</Eyebrow>
  </div>
);

export const AsSectionHeads = () => (
  <div className="flex flex-col gap-3 bg-bg p-6">
    <Eyebrow>Next gate</Eyebrow>
    <Eyebrow>Validation sprints</Eyebrow>
    <Eyebrow>Top signal drivers</Eyebrow>
  </div>
);
