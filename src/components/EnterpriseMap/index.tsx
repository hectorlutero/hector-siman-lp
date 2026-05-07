"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { sectors } from "./data";
import { SectorCard } from "./SectorCard";
import { BlueprintBackground } from "./BlueprintBackground";
import { AggregateCard } from "./AggregateCard";

export default function EnterpriseMap() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      aria-label="Mapa de impacto da automação por setor"
      id="enterprise-map"
      className="relative blueprint-glow border-t border-white/5 py-48 px-4 overflow-hidden hidden md:block"
    >
      {/* Ambient orbs — tinted blueprint blue */}
      <div className="aura-orb aura-orb-1" style={{ opacity: 0.35 }} />
      <div className="aura-orb aura-orb-2" style={{ opacity: 0.22 }} />

      {/* Blueprint backdrop — glowing architectural drawing */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 z-0">
        <BlueprintBackground />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20"
          >
            <span className="text-xs font-bold uppercase text-accent tracking-widest">
              {t("Oportunidades de Impacto", "Impact Opportunities")}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black mb-5 tracking-tight"
          >
            {t("Onde o Dinheiro Está na Mesa", "Where the Money is on the Table")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted max-w-2xl mx-auto text-base md:text-lg font-medium opacity-80"
          >
            {t(
              "Cada setor da empresa tem 3 camadas onde a IA gera ROI real. O blueprint mostra a estrutura — os cards mostram onde o dinheiro está.",
              "Every business sector has 3 layers where AI generates real ROI. The blueprint shows the structure — the cards show where the money is.",
            )}
          </motion.p>
        </div>

        {/* Cards in Z-pattern grid (2x2 with bigger offsets for breathing room) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start justify-items-center md:justify-items-start [&>:nth-child(2)]:md:justify-self-end [&>:nth-child(4)]:md:justify-self-end">
          <SectorCard sector={sectors[0]} index={0} />
          <SectorCard sector={sectors[1]} index={1} className="md:mt-24" />
          <SectorCard sector={sectors[2]} index={2} className="md:-mt-8" />
          <SectorCard sector={sectors[3]} index={3} className="md:mt-16" />
        </div>

        {/* Aggregate card */}
        <div className="mt-32">
          <AggregateCard inView={inView} />
        </div>
      </div>
    </section>
  );
}
