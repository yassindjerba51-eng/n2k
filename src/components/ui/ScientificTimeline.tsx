import { ShieldCheck, Microscope, LucideIcon } from "lucide-react";

interface Phase {
  label: string;
  name: string;
  type: string;
  features: string[];
  badgeLabel: string;
  badge: string;
  icon: LucideIcon;
  color: "primary" | "secondary";
}

interface ScientificTimelineProps {
  phases: Phase[];
}

export default function ScientificTimeline({ phases }: ScientificTimelineProps) {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Central Vertical Line (Editorial Style) */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-n2k-outline-variant/20 -translate-x-1/2 hidden md:block"></div>
      
      <div className="space-y-24 relative">
        {phases.map((phase, idx) => {
          const isEven = idx % 2 === 0;
          const colorClass = phase.color === "secondary" ? "text-n2k-secondary" : "text-n2k-primary";
          const bgColorClass = phase.color === "secondary" ? "bg-n2k-secondary" : "bg-n2k-primary";
          const containerBgClass = phase.color === "secondary" ? "bg-n2k-secondary/5" : "bg-n2k-primary/5";
          
          return (
            <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-12 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
              {/* Timeline Marker */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-n2k-surface-high border-4 border-white flex items-center justify-center z-20 shadow-sm">
                <div className={`w-3 h-3 rounded-full ${bgColorClass}`}></div>
              </div>
              
              {/* Content Card */}
              <div className={`w-full md:w-[45%] group`}>
                <div className="bg-n2k-surface-lowest rounded-[2.5rem] p-8 md:p-10 shadow-ambient hover:shadow-ambient-lg transition-all duration-500 ghost-border relative overflow-hidden">
                  {/* Phase Label Badge */}
                  <div className={`absolute top-0 right-0 ${bgColorClass} text-white px-8 py-2 rounded-es-[2rem] font-black uppercase tracking-widest text-[10px] font-heading`}>
                    {phase.label}
                  </div>
                  
                  <div className="flex items-start gap-6 mb-10 mt-4">
                    <div className={`w-20 h-20 shrink-0 ${containerBgClass} rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                      <phase.icon className={`${colorClass} w-10 h-10`} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black font-heading text-n2k-primary mb-2">
                        {phase.name}
                      </h3>
                      <p className={`${colorClass} font-black uppercase tracking-widest text-xs font-heading`}>
                        {phase.type}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-5 mb-12 font-body text-base">
                    {phase.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-4 text-n2k-on-surface-variant leading-tight">
                        <ShieldCheck className={`${colorClass} shrink-0 w-6 h-6`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="p-6 bg-n2k-surface-low rounded-2xl flex flex-wrap items-center justify-between gap-4 border-s-4 border-n2k-outline-variant/30">
                    <span className="text-xs font-bold text-n2k-primary font-heading uppercase tracking-wider">
                      {phase.badgeLabel}
                    </span>
                    <span className={`${bgColorClass} text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest`}>
                      {phase.badge}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Spacer Placeholder for Mobile/Desktop layout consistency */}
              <div className="hidden md:block md:w-[45%]">
                {/* Optional descriptive text or diagrams could go here in future */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
