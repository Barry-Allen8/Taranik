"use client";

import ServiceDetailTemplate from "@/components/sections/ServiceDetailTemplate";
import { Lightbulb, Scale, Target, FileText, Handshake } from "lucide-react";

export default function ConsultingPageClient() {
  return (
    <ServiceDetailTemplate
      serviceKey="consulting"
      serviceIcon={Lightbulb}
      benefitKeys={["audit", "strategy", "optimization", "training"]}
      packageKeys={["audit", "strategy", "advisory"]}
      trustIcons={[Scale, Target, FileText, Handshake]}
    />
  );
}
