"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  badge?: string;
}

export default function FAQ({ items, title, badge }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {badge && (
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
          <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">{badge}</span>
        </div>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl font-black font-heading text-n2k-primary tracking-tight mb-10">{title}</h2>
      )}
      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`bg-white rounded-xl border transition-all duration-300 ${
                isOpen ? "border-n2k-secondary/30 shadow-ambient" : "border-n2k-outline-variant/20"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-heading font-bold text-n2k-primary text-base pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-n2k-outline shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-n2k-secondary" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="h-px bg-n2k-outline-variant/20 mb-4" />
                  <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
