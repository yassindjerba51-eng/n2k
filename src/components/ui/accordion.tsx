"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export function Accordion({ children, className }: AccordionProps) {
  return <div className={cn("space-y-4", className)}>{children}</div>;
}

export function AccordionItem({ title, children, className, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className={cn("border border-border/50 rounded-2xl overflow-hidden bg-surface-lowest shadow-sm transition-all duration-300", 
      isOpen ? "shadow-lg border-secondary/30 ring-1 ring-secondary/10" : "hover:border-secondary/20",
      className
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left group transition-colors"
      >
        <span className={cn(
          "text-lg font-black font-heading transition-colors",
          isOpen ? "text-secondary" : "text-primary group-hover:text-secondary"
        )}>
          {title}
        </span>
        <ChevronDown className={cn(
          "w-6 h-6 transition-transform duration-500",
          isOpen ? "rotate-180 text-secondary" : "text-primary group-hover:scale-110"
        )} />
      </button>
      <div className={cn(
        "grid transition-all duration-500 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <div className="px-8 pb-8 pt-0 font-body text-on-surface-variant leading-relaxed border-t border-border/10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
