"use client";

import {
  Users,
  TrendingUp,
  Package,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  dashboardStats,
  leadsOverTime,
  problemsByZone,
  mockLeads,
} from "@/lib/admin-mock-data";

const leadsChartConfig = {
  leads: {
    label: "Leads",
    color: "#2BB673",
  },
} satisfies ChartConfig;

const zoneChartConfig = {
  Bâtiment: {
    label: "Bâtiment",
    color: "#006d40",
  },
  Eau: {
    label: "Eau",
    color: "#0a2540",
  },
  Ambiance: {
    label: "Ambiance",
    color: "#E65100",
  },
} satisfies ChartConfig;

const kpis = [
  {
    title: "Total Leads",
    value: dashboardStats.totalLeads,
    change: dashboardStats.leadsGrowth,
    changeLabel: "vs mois dernier",
    icon: Users,
    positive: true,
    format: "number",
  },
  {
    title: "Taux de conversion",
    value: dashboardStats.conversionRate,
    change: dashboardStats.conversionGrowth,
    changeLabel: "vs mois dernier",
    icon: TrendingUp,
    positive: true,
    format: "percent",
  },
  {
    title: "Produits actifs",
    value: `${dashboardStats.activeProducts}/${dashboardStats.totalProducts}`,
    change: null,
    changeLabel: "Tous disponibles",
    icon: Package,
    positive: true,
    format: "text",
  },
  {
    title: "Articles publiés",
    value: dashboardStats.publishedArticles,
    change: dashboardStats.newArticlesThisMonth,
    changeLabel: "ce mois",
    icon: FileText,
    positive: true,
    format: "number",
  },
];

const statusLabels: Record<string, { label: string; className: string }> = {
  NEW: {
    label: "Nouveau",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  CONTACTED: {
    label: "Contacté",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  DONE: {
    label: "Terminé",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
};

export default function DashboardPage() {
  const recentLeads = mockLeads.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Vue d&apos;ensemble de l&apos;activité Les Laboratoires N2K
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card
            key={kpi.title}
            className="border-slate-200/80 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {kpi.format === "percent" ? `${kpi.value}%` : kpi.value}
                  </p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100">
                  <kpi.icon className="w-5 h-5 text-slate-600" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                {kpi.change !== null ? (
                  <>
                    <Badge
                      variant="outline"
                      className={
                        kpi.positive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold text-[11px]"
                          : "bg-red-50 text-red-700 border-red-200 font-semibold text-[11px]"
                      }
                    >
                      {kpi.positive ? (
                        <ArrowUpRight className="w-3 h-3 me-0.5" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 me-0.5" />
                      )}
                      {kpi.change > 0 ? "+" : ""}
                      {kpi.format === "percent"
                        ? `${kpi.change}%`
                        : kpi.change}
                    </Badge>
                    <span className="text-[11px] text-slate-400">
                      {kpi.changeLabel}
                    </span>
                  </>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    {kpi.changeLabel}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Leads Growth - Area Chart */}
        <Card className="lg:col-span-2 border-slate-200/80 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900">
              Croissance des leads
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              30 derniers jours
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={leadsChartConfig} className="h-[280px] w-full">
              <AreaChart data={leadsOverTime} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2BB673" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2BB673" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={false}
                  width={30}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="#2BB673"
                  strokeWidth={2.5}
                  fill="url(#leadsGradient)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Problems by Zone - Bar Chart */}
        <Card className="border-slate-200/80 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900">
              Problèmes par zone
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Répartition des diagnostics demandés
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={zoneChartConfig} className="h-[280px] w-full">
              <BarChart data={problemsByZone} layout="vertical" margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  dataKey="zone"
                  type="category"
                  tick={{ fontSize: 12, fill: "#475569", fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={28} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads Table */}
      <Card className="border-slate-200/80 shadow-sm bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-slate-900">
                Leads récents
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Les 5 dernières demandes de diagnostic
              </CardDescription>
            </div>
            <a
              href="/webadmin/leads"
              className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Voir tout →
            </a>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-start py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Exploitation
                  </th>
                  <th className="text-start py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Zone
                  </th>
                  <th className="text-start py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="text-start py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3">
                      <p className="font-medium text-slate-800">{lead.name}</p>
                      <p className="text-xs text-slate-500">{lead.region}</p>
                    </td>
                    <td className="py-3">
                      <Badge
                        variant="outline"
                        className={
                          lead.problemType === "BATIMENT"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : lead.problemType === "EAU"
                            ? "bg-cyan-50 text-cyan-700 border-cyan-200"
                            : "bg-orange-50 text-orange-700 border-orange-200"
                        }
                      >
                        {lead.problemType === "BATIMENT"
                          ? "Bâtiment"
                          : lead.problemType === "EAU"
                          ? "Eau"
                          : "Ambiance"}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge
                        variant="outline"
                        className={statusLabels[lead.status].className}
                      >
                        {statusLabels[lead.status].label}
                      </Badge>
                    </td>
                    <td className="py-3 text-xs text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
