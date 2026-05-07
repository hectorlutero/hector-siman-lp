"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FloorPlanDesktop } from "./FloorPlanDesktop";
import { FloorPlanMobile } from "./FloorPlanMobile";
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
      className="relative bg-background border-t border-white/5 py-24 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20"
          >
            <span className="text-xs font-bold uppercase text-accent tracking-widest">
              {t("Oportunidades de Impacto", "Impact Opportunities")}
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            {t("Onde o Dinheiro Está na Mesa", "Where the Money is on the Table")}
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-base font-medium opacity-80">
            {t(
              "Onde a IA gera ROI real em cada setor — em 3 camadas.",
              "Where AI generates real ROI per sector — across 3 layers.",
            )}
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <div className="hidden md:block w-full">
            <FloorPlanDesktop inView={inView} />
          </div>
          <div className="md:hidden w-full max-w-md mx-auto">
            <FloorPlanMobile inView={inView} />
          </div>
        </div>

        <AggregateCard inView={inView} />
      </div>
    </section>
  );
}
