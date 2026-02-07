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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <div key={index} className="sharp-card border border-[#1a1a1a] bg-black overflow-hidden">
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#050505]"
          >
            <span className="text-xs font-black uppercase tracking-[0.12em] text-white">{item.title}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-primary transition-transform duration-300",
                openIndex === index && "rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden px-5 text-xs uppercase tracking-[0.1em] text-[#6f6f6f] transition-all duration-300",
              openIndex === index ? "max-h-[340px] py-4" : "max-h-0"
            )}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
