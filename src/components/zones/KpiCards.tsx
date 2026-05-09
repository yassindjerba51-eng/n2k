import { TrendingDown, Shield, Clock } from "lucide-react";

type KpiItem = {
  value: string;
  label: string;
  icon: "reduction" | "shield" | "clock";
};

const iconMap = {
  reduction: TrendingDown,
  shield: Shield,
  clock: Clock,
};

export default function KpiCards({
  items,
  accentColor = "text-n2k-secondary",
  accentBg = "bg-n2k-secondary/10",
}: {
  items: KpiItem[];
  accentColor?: string;
  accentBg?: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, idx) => {
        const Icon = iconMap[item.icon];
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-8 border border-border/50 shadow-ambient text-center group hover:-translate-y-1 transition-all duration-300"
          >
            <div
              className={`w-14 h-14 rounded-xl ${accentBg} flex items-center justify-center mx-auto mb-5`}
            >
              <Icon className={`w-7 h-7 ${accentColor}`} />
            </div>
            <p
              className={`text-3xl md:text-4xl font-black font-heading ${accentColor} mb-2`}
            >
              {item.value}
            </p>
            <p className="text-sm text-n2k-on-surface-variant font-body leading-relaxed">
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
