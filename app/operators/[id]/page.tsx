import { notFound } from "next/navigation";
import { allOperatorIds, operatorProfile } from "@/lib/data";
import { AppShell } from "@/components/AppShell";
import { OperatorProfile } from "@/components/OperatorProfile";

export function generateStaticParams() {
  return allOperatorIds().map((id) => ({ id }));
}

export default async function OperatorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = operatorProfile(id);
  if (!data) notFound();

  return (
    <AppShell>
      <OperatorProfile data={data} />
    </AppShell>
  );
}
