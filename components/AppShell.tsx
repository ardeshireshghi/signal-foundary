import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

/** Shell for sub-pages that don't drive the sector filter. */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
