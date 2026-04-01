import { LucideIcon } from "lucide-react";

interface RiskCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  riskLabel: string;
  riskPercent: number;
}

export default function RiskCard({
  title,
  description,
  icon: Icon,
  riskLabel,
  riskPercent,
}: RiskCardProps) {
  return (
    <div className="group flex flex-col h-full bg-n2k-surface-lowest rounded-3xl overflow-hidden shadow-ambient hover:shadow-ambient-lg transition-all duration-500 ghost-border">
      {/* Header Area — surface-high background */}
      <div className="bg-n2k-surface-high p-8 flex items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
          <Icon className="text-n2k-secondary w-7 h-7" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-black font-heading text-n2k-primary leading-tight">
          {title}
        </h3>
      </div>
      
      {/* Content Area — surface-lowest background with spacing gap */}
      <div className="p-8 pt-10 flex flex-col flex-grow">
        <p className="text-n2k-on-surface-variant leading-relaxed mb-10 font-body text-base">
          {description}
        </p>
        
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-3">
            <span className="label-md text-n2k-secondary">
              {riskLabel}
            </span>
            <span className="text-xs font-black font-heading text-n2k-primary">
              {riskPercent}%
            </span>
          </div>
          
          <div className="h-1.5 w-full bg-n2k-surface-container rounded-full overflow-hidden">
            <div 
              className="h-full bg-n2k-secondary rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${riskPercent}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

