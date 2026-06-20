import { CheckCircle } from "lucide-react";
import { isHomologatedName } from "@/data/homologations";
import HomologationBadges from "@/components/ui/HomologationBadges";

export default function ProductStepCard({
  step,
  name,
  type,
  description,
  features,
  accentColor = "text-n2k-secondary",
  accentBg = "bg-n2k-secondary",
}: {
  step: string;
  name: string;
  type: string;
  description: string;
  features: string[];
  accentColor?: string;
  accentBg?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-border/50 shadow-ambient relative overflow-hidden">
      {/* Step Badge */}
      {step && (
        <div
          className={`absolute top-0 end-0 ${accentBg} text-white px-5 py-1.5 rounded-es-xl font-black uppercase tracking-widest text-[10px] font-heading`}
        >
          {step}
        </div>
      )}

      {/* Header */}
      <div className="mb-4 mt-1">
        <h3 className="text-xl md:text-2xl font-black font-heading text-n2k-primary">
          {name}
        </h3>
        <p
          className={`${accentColor} font-bold uppercase tracking-widest text-[10px] font-heading mt-1`}
        >
          {type}
        </p>
      </div>

      {/* Description */}
      <p className="text-n2k-on-surface-variant font-body text-sm md:text-base leading-relaxed mb-5">
        {description}
      </p>

      {/* Features */}
      <ul className="space-y-3 font-body">
        {features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 text-n2k-on-surface-variant leading-snug"
          >
            <CheckCircle
              className={`${accentColor} shrink-0 w-4 h-4 mt-0.5`}
            />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Regulatory approval badges (homologated products only) */}
      {isHomologatedName(name) && (
        <HomologationBadges variant="compact" className="mt-5" />
      )}
    </div>
  );
}
