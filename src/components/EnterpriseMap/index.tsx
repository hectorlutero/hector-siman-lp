"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FloorPlanDesktop } from "./FloorPlanDesktop";
import { FloorPlanMobile } from "./FloorPlanMobile";
import { AggregateCard } from "./AggregateCard";

export default function EnterpriseMap() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      aria-label="Mapa de impacto da automação por setor"
      id="enterprise-map"
      className="relative bg-background border-t border-white/5"
      style={{ minHeight: "250vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-start py-12 px-4 overflow-hidden">
        <div className="text-center mb-6 max-w-7xl">
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
              "Role pra ver onde a IA gera ROI real em cada setor — em 3 camadas.",
              "Scroll to see where AI generates real ROI per sector — across 3 layers.",
            )}
          </p>
        </div>

        <div className="w-full max-w-6xl flex-1 flex items-center justify-center">
          <div className="hidden lg:block w-full">
            <FloorPlanDesktop scrollYProgress={scrollYProgress} />
          </div>
          <div className="lg:hidden w-full">
            <FloorPlanMobile scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>

      <div className="relative -mt-32 max-w-7xl mx-auto px-4 pb-24">
        <AggregateCard scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
