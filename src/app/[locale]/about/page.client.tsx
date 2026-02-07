"use client";

import { teamMembers } from "@/data/team";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Target, Award, Users, Lightbulb, CheckCircle, MessageSquare, FileSearch, Rocket, Headphones, Clock, Shield, Users2, Linkedin, Github } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutPageClient() {
  const t = useTranslations("about");

  const values = [
    { key: "focus", icon: Target },
    { key: "quality", icon: Award },
    { key: "partnership", icon: Users },
    { key: "innovation", icon: Lightbulb },
  ];

  const approachIcons = [MessageSquare, FileSearch, Rocket, Headphones];
  const trustIcons = [Clock, Users2, Target, Shield];

  return (
    <div className="min-h-screen">
      <section className="section border-b border-primary/15 bg-black">
        <div className="container">
          <div className="max-w-5xl">
            <span className="mb-4 inline-block border border-primary/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              {"// COMPANY_INTEL"}
            </span>
            <h1 className="mb-6 text-5xl font-black text-white md:text-6xl">{t("title")}</h1>
            <p className="max-w-4xl text-xs uppercase tracking-[0.14em] text-[#5f5f5f]">{t("description")}</p>
          </div>
        </div>
      </section>

      <section className="section bg-[#050505]">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-3xl font-black text-white">{t("value_prop_title")}</h2>
            <p className="mb-8 text-xs uppercase tracking-[0.12em] text-[#6d6d6d]">{t("value_prop_intro")}</p>
            <ul className="space-y-4">
              {(t.raw("value_prop_points") as string[]).map((point) => (
                <li key={point} className="flex items-start gap-3 text-xs uppercase tracking-[0.1em] text-[#8a8a8a]">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-black">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-3xl font-black text-white">{t("story_title")}</h2>
            <div className="space-y-5 text-xs uppercase leading-relaxed tracking-[0.12em] text-[#6c6c6c]">
              <p>{t("story_p1")}</p>
              <p>{t("story_p2")}</p>
              <p>{t("story_p3")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#050505]">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-black text-white">{t("approach_title")}</h2>
              <p className="mx-auto max-w-4xl text-xs uppercase tracking-[0.12em] text-[#6c6c6c]">{t("approach_intro")}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {(t.raw("approach_steps") as Array<{ title: string; description: string }>).map((step, index) => {
                const Icon = approachIcons[index];
                return (
                  <Card key={step.title} className="sharp-card border-[#171717] bg-black p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-primary/35 bg-primary/10 text-primary">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-primary">0{index + 1}</p>
                        <h3 className="mb-2 text-lg font-black text-white">{step.title}</h3>
                        <p className="text-xs uppercase tracking-[0.1em] text-[#6d6d6d]">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-black">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-10 text-center text-3xl font-black text-white">{t("trust_title")}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {(t.raw("trust_signals") as Array<{ title: string; description: string }>).map((signal, index) => {
                const Icon = trustIcons[index];
                return (
                  <Card key={signal.title} className="sharp-card h-full border-[#171717] bg-[#050505] p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 text-base font-black text-white">{signal.title}</h3>
                    <p className="text-xs uppercase tracking-[0.1em] text-[#6d6d6d]">{signal.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#050505]">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-black text-white">{t("values_title")}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.key} className="sharp-card border-[#171717] bg-black p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-base font-black text-white">{t(`values.${value.key}.title`)}</h3>
                <p className="text-xs uppercase tracking-[0.1em] text-[#6d6d6d]">{t(`values.${value.key}.description`)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-black">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-black text-white">{t("team_title")}</h2>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => {
              const name = t(`team.${member.id}.name`);
              const position = t(`team.${member.id}.position`);
              const bio = t(`team.${member.id}.bio`);

              return (
                <Card key={member.id} className="sharp-card border-[#171717] bg-[#050505] p-6 text-center">
                  <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden border border-primary/30">
                    <Image
                      src={member.image}
                      alt={name}
                      fill
                      className="object-cover grayscale"
                      sizes="96px"
                    />
                  </div>
                  <h3 className="mb-1 text-base font-black text-white">{name}</h3>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">{position}</p>
                  <p className="text-xs uppercase tracking-[0.1em] text-[#6d6d6d]">{bio}</p>
                  {(member.social?.linkedin || member.social?.github) ? (
                    <div className="mt-4 flex items-center justify-center gap-3">
                      {member.social?.linkedin ? (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${name} on LinkedIn`}
                          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary hover:underline"
                        >
                          <Linkedin className="h-3.5 w-3.5" />
                          LinkedIn
                        </a>
                      ) : null}
                      {member.social?.github ? (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${name} on GitHub`}
                          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary hover:underline"
                        >
                          <Github className="h-3.5 w-3.5" />
                          GitHub
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-black via-primary/10 to-black">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">{t("cta_title")}</h2>
            <p className="mb-8 text-xs uppercase tracking-[0.16em] text-[#7c7c7c]">{t("cta_description")}</p>
            <Button size="lg" asChild className="px-10">
              <Link href="/contact">{t("cta_button")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
