"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SmartCountUp } from "./ui/SmartCountUp";

export default function About() {
  const { t } = useLanguage();
  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });

  const tags = [
    t("Varejo", "Retail"),
    t("Transportes", "Transport"),
    "Business Intelligence",
    "Marketing",
    "Software Houses",
  ];

  const bullets = [
    { pt: "Programação & Arquitetura de Agentes de IA", en: "Programming & AI Agent Architecture" },
    { pt: "Conhecimento das limitações dos modelos", en: "In-depth understanding of model limitations" },
    { pt: "Treinamento e mentoria do time", en: "Team training & strategic mentoring" },
    { pt: "Experiência em operações reais — não só laboratório", en: "Real-world operational experience — beyond the lab" },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-strong rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-start gap-10"
        >
          {/* Photo */}
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-accent/30 glow-accent">
              <Image
                src="/images/profile.png"
                alt="Hector Siman"
                width={160}
                height={160}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <span className="text-xs font-bold uppercase text-accent tracking-wider">
              {t("Especialista Estratégico", "Strategic Specialist")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-1">
              Hector Siman
            </h2>
            <p className="text-sm text-muted mb-4" ref={aboutRef}>
              <SmartCountUp 
                text={t(
                  "Desenvolvedor Full Stack & Especialista em Arquitetura de Agentes de IA · 6+ anos",
                  "Full Stack Developer & AI Agent Architect · 6+ Years of Experience"
                )}
                isVisible={isAboutInView}
              />
            </p>

            {/* Bullets */}
            <ul className="space-y-2 mb-5">
              {bullets.map((b) => (
                <li key={b.pt} className="flex items-start gap-2 text-sm text-muted">
                  <span className="text-accent mt-0.5 shrink-0">✓</span>
                  {t(b.pt, b.en)}
                </li>
              ))}
            </ul>

            {/* Sector tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Quote */}
            <div className="border-l-2 border-accent pl-4">
              <p className="text-sm italic text-muted">
                {t(
                  '"Eu implemento IA na sua empresa, treino seu time e acompanho até dar resultado. Programação, limitações dos modelos, mentoria — tudo numa mão só."',
                  '"I deploy AI within your organization, train your team, and ensure measurable results. From programming to mentoring, I provide end-to-end expertise."'
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
