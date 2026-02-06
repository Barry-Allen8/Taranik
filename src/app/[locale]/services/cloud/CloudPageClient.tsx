"use client";

import ServiceDetailTemplate from "@/components/sections/ServiceDetailTemplate";
import { Cloud, Server, ShieldCheck, BellRing, Wallet } from "lucide-react";

export default function CloudPageClient() {
  return (
    <ServiceDetailTemplate
      serviceKey="cloud"
      serviceIcon={Cloud}
      benefitKeys={["scalability", "reliability", "security", "automation"]}
      packageKeys={["starter", "migration", "managed"]}
      trustIcons={[Server, ShieldCheck, BellRing, Wallet]}
    />
  );
}
