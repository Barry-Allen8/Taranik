"use client";

import ServiceDetailTemplate from "@/components/sections/ServiceDetailTemplate";
import { Brain, Rocket, ShieldCheck, GraduationCap, BarChart3 } from "lucide-react";

export default function AiSolutionsPageClient() {
  return (
    <ServiceDetailTemplate
      serviceKey="ai_solutions"
      serviceIcon={Brain}
      benefitKeys={["automation", "analytics", "personalization", "efficiency"]}
      packageKeys={["discovery", "assistant", "automation"]}
      trustIcons={[Rocket, ShieldCheck, GraduationCap, BarChart3]}
      showUseCases
    />
  );
}
