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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
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
              "Cada setor da empresa tem 3 camadas onde a IA gera ROI real. Os cards estão alinhados com a sala correspondente no blueprint.",
              "Every business sector has 3 layers where AI generates real ROI. Each card aligns with its room in the blueprint.",
            )}
          </motion.p>
        </div>

        {/* Top row: cards 01–04 (Marketing, Vendas, Atendimento, Diretoria) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-end mb-8">
          <SectorCard sector={sectors[0]} index={0} />
          <SectorCard sector={sectors[1]} index={1} />
          <SectorCard sector={sectors[2]} index={2} />
          <SectorCard sector={sectors[3]} index={3} />
        </div>

        {/* Blueprint inline — center of the diagram, columns aligned with cards */}
        <div className="relative">
          <BlueprintBackground />
        </div>

        {/* Bottom row: cards 05–08 (Finanças, Operações, RH, TI) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-start mt-8">
          <SectorCard sector={sectors[4]} index={4} />
          <SectorCard sector={sectors[5]} index={5} />
          <SectorCard sector={sectors[6]} index={6} />
          <SectorCard sector={sectors[7]} index={7} />
        </div>

        {/* Aggregate card */}
        <div className="mt-24">
          <AggregateCard inView={inView} />
        </div>
      </div>
    </section>
  );
}
