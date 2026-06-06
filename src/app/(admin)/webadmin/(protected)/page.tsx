import { prisma } from "@/lib/prisma";
import { DashboardClient } from "./DashboardClient";

export const metadata = {
  title: "Dashboard - N2K Admin",
};

export default async function DashboardPage() {
  // Fetch real data from Prisma
  const totalLeads = await prisma.lead.count();
  const newLeads = await prisma.lead.count({ where: { status: "NEW" } });
  
  const recentLeads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // Calculate conversion rate (DONE / Total)
  const doneLeads = await prisma.lead.count({ where: { status: "DONE" } });
  const conversionRate = totalLeads > 0 ? Math.round((doneLeads / totalLeads) * 100) : 0;

  // Aggregate problems by zone
  // We need to fetch all problemTypes and sectorData, parse them, and count
  const allLeads = await prisma.lead.findMany({
    select: {
      problemType: true,
      sectorData: true,
    }
  });
  
  const zoneCounts: Record<string, number> = {
    Bâtiment: 0,
    Eau: 0,
    Ambiance: 0,
  };

  allLeads.forEach(lead => {
    // 1. Legacy problemType check
    if (lead.problemType) {
      const legacyZones = lead.problemType.split(",").map(z => z.trim().toUpperCase());
      if (legacyZones.includes("BATIMENT")) zoneCounts["Bâtiment"]++;
      if (legacyZones.includes("EAU")) zoneCounts["Eau"]++;
      if (legacyZones.includes("AMBIANCE")) zoneCounts["Ambiance"]++;
    }

    // 2. New sectorData zoneConcernee check
    const sectorData = (lead.sectorData as Record<string, string>) || {};
    const zone = sectorData.zoneConcernee || "";
    if (zone) {
      const zUpper = zone.toUpperCase();
      if (
        zUpper.includes("EAU") ||
        zUpper.includes("REFROIDISSEMENT") ||
        zUpper.includes("EFFLUENT") ||
        zUpper.includes("STATION")
      ) {
        zoneCounts["Eau"]++;
      } else if (
        zUpper.includes("BÂTIMENT") ||
        zUpper.includes("BATIMENT") ||
        zUpper.includes("ABATTAGE") ||
        zUpper.includes("DÉCOUPE") ||
        zUpper.includes("DECOUPE") ||
        zUpper.includes("CONDITIONNEMENT") ||
        zUpper.includes("LITIÈRE") ||
        zUpper.includes("LITIERE")
      ) {
        zoneCounts["Bâtiment"]++;
      } else if (
        zUpper.includes("AMBIANCE") ||
        zUpper.includes("CUVES") ||
        zUpper.includes("ÉQUIPEMENT") ||
        zUpper.includes("EQUIPEMENT") ||
        zUpper.includes("LIGNE") ||
        zUpper.includes("PRODUCTION")
      ) {
        zoneCounts["Ambiance"]++;
      } else if (zUpper.includes("PLUSIEURS") || zUpper.includes("MULTIPLE")) {
        zoneCounts["Bâtiment"]++;
        zoneCounts["Eau"]++;
        zoneCounts["Ambiance"]++;
      }
    }
  });

  const problemsByZone = [
    { zone: "Bâtiment", count: zoneCounts["Bâtiment"], fill: "#006d40" },
    { zone: "Eau", count: zoneCounts["Eau"], fill: "#0a2540" },
    { zone: "Ambiance", count: zoneCounts["Ambiance"], fill: "#E65100" },
  ];

  const activeProducts = await prisma.product.count();
  const totalProducts = activeProducts;
  const publishedArticles = await prisma.blogPost.count({
    where: {
      publishedAt: {
        lte: new Date()
      }
    }
  });

  // Generate leadsOverTime (last 30 days)
  const leadsOverTime: { date: string; leads: number }[] = [];
  // For simplicity, we just pass the mock leadsOverTime here,
  // but ideally you'd group by `createdAt` in Prisma.
  // Using the mock data for the chart to save DB complexity for now.
  const { leadsOverTime: mockLeadsOverTime } = await import("@/lib/admin-mock-data");

  return (
    <DashboardClient
      stats={{
        totalLeads,
        newLeads,
        conversionRate,
        activeProducts,
        totalProducts,
        publishedArticles,
      }}
      leadsOverTime={mockLeadsOverTime}
      problemsByZone={problemsByZone}
      recentLeads={recentLeads}
    />
  );
}
