import { Tag } from "@signalfoundry/ui";

export const Tones = () => (
  <div className="flex flex-wrap items-center gap-2 bg-bg p-6">
    <Tag>Spreadsheets</Tag>
    <Tag tone="accent">source-backed</Tag>
    <Tag tone="muted">Manual consultants</Tag>
  </div>
);

export const Comparables = () => (
  <div className="flex flex-wrap items-center gap-2 bg-bg p-6">
    <Tag>Generic PM suites (Dentrix, Open Dental)</Tag>
    <Tag>Manual consultants</Tag>
    <Tag>Spreadsheets</Tag>
  </div>
);
