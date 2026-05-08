"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Map } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Highlight } from "../ui/Highlight";
import { Button } from "../ui/Button";
import { SectorOpportunities } from "./SectorOpportunities";
import { BlueprintMapReveal } from "./BlueprintMapReveal";

export default function EnterpriseMap() {
  const { t, lang } = useLanguage();
  const [showBlueprint, setShowBlueprint] = useState(false);

  return (
    <section
      aria-label="Mapa de oportunidades de impacto por setor"
      id="enterprise-map"
      className="relative py-32 md:py-40 px-4 overflow-hidden"
    >

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent pointer-events-none z-[5]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-[5]" aria-hidden="true" />

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20 px-4">
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
            className="text-4xl md:text-6xl font-black mb-5 tracking-tight leading-[1.05]"
          >
            {t("Onde a IA Vira ROI em Cada Setor", "Where AI Becomes ROI in Every Sector")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted max-w-2xl mx-auto text-base md:text-lg font-medium"
          >
            {lang === "pt" ? (
              <>
                Para cada setor, mapeamos oportunidades nas <Highlight>3 camadas de atuação</Highlight> — Operacional, Tático e Estratégico — com <Highlight>estimativa de impacto</Highlight>.
              </>
            ) : (
              <>
                For each sector, we map opportunities across the <Highlight>3 layers of action</Highlight> — Operational, Tactical, and Strategic — with <Highlight>estimated impact</Highlight>.
              </>
            )}
          </motion.p>
        </div>

        <SectorOpportunities />

        {/* CTA — reveal full blueprint map */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mt-16 md:mt-20 text-center px-4"
        >
          <p className="text-sm md:text-base text-muted/85 mb-5">
            {t(
              "Quer ver tudo isso em um único mapa? Visualize as 3 fases do método aplicadas a cada sala da sua empresa.",
              "Want to see all of this on a single map? Visualize the 3 method phases applied to every room of your company.",
            )}
          </p>
          <Button
            variant="secondary"
            onClick={() => setShowBlueprint((v) => !v)}
            ariaExpanded={showBlueprint}
            ariaControls="enterprise-map-blueprint"
            leadingIcon={Map}
            trailingIcon={ChevronDown}
          >
            {showBlueprint
              ? t("Recolher mapa", "Collapse map")
              : t("Ver mapa completo", "See the full map")}
          </Button>
        </motion.div>

        {/* Expandable blueprint + cards */}
        <AnimatePresence initial={false}>
          {showBlueprint && (
            <motion.div
              key="blueprint-reveal"
              id="enterprise-map-blueprint"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.55, ease: [0.25, 0.8, 0.25, 1] }}
              className="relative blueprint-glow mt-20 md:mt-24 rounded-3xl overflow-hidden"
            >
              <div className="aura-orb aura-orb-1" style={{ opacity: 0.18 }} />
              <div className="aura-orb aura-orb-2" style={{ opacity: 0.12 }} />
              <div className="relative z-10">
                <BlueprintMapReveal active={showBlueprint} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
