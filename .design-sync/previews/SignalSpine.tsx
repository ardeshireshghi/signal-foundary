import { SignalSpine } from "@signalfoundry/ui";

export const MidValidation = () => (
  <div className="bg-bg p-6">
    <div className="w-[560px]">
      <SignalSpine
        steps={[
          { label: "Market map", caption: "done", status: "done" },
          { label: "Interviews", caption: "done", status: "done" },
          { label: "Landing test", caption: "$5K open", status: "open" },
          { label: "Prototype", status: "locked" },
          { label: "Pilot", status: "locked" },
        ]}
      />
    </div>
  </div>
);

export const EarlyStage = () => (
  <div className="bg-bg p-6">
    <div className="w-[560px]">
      <SignalSpine
        steps={[
          { label: "Market map", caption: "$3K open", status: "open" },
          { label: "Interviews", status: "locked" },
          { label: "Landing test", status: "locked" },
          { label: "Prototype", status: "locked" },
          { label: "Pilot", status: "locked" },
        ]}
      />
    </div>
  </div>
);

export const NearFormation = () => (
  <div className="bg-bg p-6">
    <div className="w-[560px]">
      <SignalSpine
        steps={[
          { label: "Market map", caption: "done", status: "done" },
          { label: "Interviews", caption: "done", status: "done" },
          { label: "Landing test", caption: "done", status: "done" },
          { label: "Prototype", caption: "done", status: "done" },
          { label: "Pilot", caption: "$20K open", status: "open" },
        ]}
      />
    </div>
  </div>
);
