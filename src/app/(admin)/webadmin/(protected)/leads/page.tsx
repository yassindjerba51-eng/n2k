import { prisma } from "@/lib/prisma";
import { LeadsClient } from "./LeadsClient";

export const metadata = {
  title: "Demande de diagnostic - N2K Admin",
};

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <LeadsClient initialLeads={leads} />;
}
