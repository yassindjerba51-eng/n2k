"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqAccordion({ items, columns = 1 }: { items: FaqItem[]; columns?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={columns === 2 ? "grid grid-cols-1 lg:grid-cols-2 gap-3" : "space-y-3"}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-border/50 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group"
            >
              <span className="text-sm md:text-base font-bold font-heading text-n2k-primary leading-snug">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-n2k-on-surface-variant shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm md:text-base text-n2k-on-surface-variant font-body leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
