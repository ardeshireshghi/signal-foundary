import { notFound } from "next/navigation";
import { allSprintIds, getSprint } from "@/lib/data";
import { AppShell } from "@/components/AppShell";
import { SprintDetail } from "@/components/SprintDetail";

export function generateStaticParams() {
  return allSprintIds().map((id) => ({ id }));
}

export default async function SprintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resolved = getSprint(id);
  if (!resolved) notFound();

  return (
    <AppShell>
      <SprintDetail resolved={resolved} />
    </AppShell>
  );
}
