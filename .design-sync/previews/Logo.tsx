import { Logo } from "@signalfoundry/ui";

export const Default = () => (
  <div className="bg-bg p-6">
    <Logo />
  </div>
);

export const MarkOnly = () => (
  <div className="bg-bg p-6">
    <Logo showWordmark={false} size={40} />
  </div>
);
