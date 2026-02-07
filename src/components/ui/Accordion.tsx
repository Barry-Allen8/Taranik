"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <div key={index} className="sharp-card overflow-hidden border border-slate-700/45 bg-slate-900/45">
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-800/25"
          >
            <span className="text-sm font-semibold text-slate-100">{item.title}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-primary transition-transform duration-300",
                openIndex === index && "rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden px-5 text-sm leading-relaxed text-slate-300 transition-all duration-300",
              openIndex === index ? "max-h-[360px] pb-5" : "max-h-0"
            )}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
