import { SignalStrength } from "@signalfoundry/ui";

export const Levels = () => (
  <div className="flex flex-col gap-4 bg-bg p-6">
    <SignalStrength value={85} />
    <SignalStrength value={64} />
    <SignalStrength value={38} />
  </div>
);

export const WithoutValue = () => (
  <div className="bg-bg p-6">
    <SignalStrength value={72} showValue={false} />
  </div>
);
