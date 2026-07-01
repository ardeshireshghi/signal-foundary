import { notFound } from "next/navigation";
import { THESES, getThesis } from "@/lib/data";
import { AppShell } from "@/components/AppShell";
import { ThesisDetail } from "@/components/ThesisDetail";

export function generateStaticParams() {
  return THESES.map((t) => ({ id: t.id }));
}

export default async function ThesisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const thesis = getThesis(id);
  if (!thesis) notFound();

  return (
    <AppShell>
      <ThesisDetail thesis={thesis} />
    </AppShell>
  );
}
