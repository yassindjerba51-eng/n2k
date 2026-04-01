import React from "react";
import { CheckCircle2, Clock, ShieldCheck, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  isLast?: boolean;
  color: string;
}

const TimelineItem = ({ step, title, subtitle, description, icon: Icon, isLast, color }: TimelineItemProps) => (
  <div className="flex gap-6 md:gap-10 group">
    <div className="flex flex-col items-center">
      <div className={cn(
        "w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 relative z-10",
        color,
        "text-white"
      )}>
        <Icon className="w-6 h-6 md:w-8 md:h-8" />
      </div>
      {!isLast && <div className="w-1 h-full bg-border/30 my-2 rounded-full relative overflow-hidden">
        <div className={cn("absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700", color, "opacity-20")}></div>
      </div>}
    </div>
    <div className="pb-16 text-left">
      <span className="text-secondary font-black font-heading text-xs uppercase tracking-[0.3em] mb-3 block">
        {step}
      </span>
      <h3 className="text-2xl md:text-3xl font-black font-heading text-primary mb-2">
        {title}
      </h3>
      <p className="text-sm font-bold text-secondary uppercase mb-4 tracking-wider">
        {subtitle}
      </p>
      <div className="bg-surface-lowest p-6 rounded-2xl border border-border/50 shadow-sm max-w-xl group-hover:border-secondary transition-colors">
        <p className="text-on-surface-variant font-body leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
);

interface TimelineProps {
  items: Omit<TimelineItemProps, "isLast">[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="flex flex-col max-w-4xl mx-auto py-12">
      {items.map((item, idx) => (
        <TimelineItem 
          key={idx} 
          {...item} 
          isLast={idx === items.length - 1} 
        />
      ))}
    </div>
  );
}
