"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { sectors, type Sector, type SectorId } from "./data";
import { SectorCard, type SectorPhase } from "./SectorCard";
import { BlueprintBackground } from "./BlueprintBackground";
import { AggregateCard } from "./AggregateCard";
import { SectorModal } from "./SectorModal";

// Cascade cadence — pairs of non-adjacent sectors animate in parallel,
// each pair fully resolves (red → blue → green) before the next starts.
// Pair selection is intentionally non-sequential: top/bottom rows alternate
// and column positions are spread, avoiding visual clusters.
const PAIRS: ReadonlyArray<readonly [SectorId, SectorId]> = [
  ["marketing", "rh"], // top col 0  ↔ bottom col 2
  ["atendimento", "diretoria"], // top col 2 ↔ top col 3
  ["vendas", "financas"], // top col 1 ↔ bottom col 0
  ["operacoes", "ti"], // bottom col 1 ↔ bottom col 3
];

const ENTER_OFFSET_MS = 800; // delay before pair 0 starts
const INTRA_PAIR_OFFSET_MS = 200; // tiny stagger between the two cards in a pair
const RED_TO_BLUE_MS = 2000; // gargalo → padronização
const BLUE_TO_GREEN_MS = 3800; // gargalo → automação (final)
const PAIR_GAP_MS = 500; // breath between consecutive pairs
const PAIR_DURATION_MS = INTRA_PAIR_OFFSET_MS + BLUE_TO_GREEN_MS;

function buildInitialPhases(): Record<SectorId, SectorPhase> {
  return sectors.reduce(
    (acc, s) => {
      acc[s.id] = "idle";
      return acc;
    },
    {} as Record<SectorId, SectorPhase>,
  );
}

export default function EnterpriseMap() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [phases, setPhases] = useState<Record<SectorId, SectorPhase>>(buildInitialPhases);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      setPhases(
        sectors.reduce(
          (acc, s) => {
            acc[s.id] = "green";
            return acc;
          },
          {} as Record<SectorId, SectorPhase>,
        ),
      );
      return;
    }

    const updatePhase = (id: SectorId, phase: SectorPhase) =>
      setPhases((prev) => ({ ...prev, [id]: phase }));

    const timers: number[] = [];
    PAIRS.forEach((pair, pairIdx) => {
      const pairStart = ENTER_OFFSET_MS + pairIdx * (PAIR_DURATION_MS + PAIR_GAP_MS);
      pair.forEach((sectorId, intraIdx) => {
        const startMs = pairStart + intraIdx * INTRA_PAIR_OFFSET_MS;
        timers.push(window.setTimeout(() => updatePhase(sectorId, "red"), startMs));
        timers.push(window.setTimeout(() => updatePhase(sectorId, "blue"), startMs + RED_TO_BLUE_MS));
        timers.push(window.setTimeout(() => updatePhase(sectorId, "green"), startMs + BLUE_TO_GREEN_MS));
      });
    });
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [inView, prefersReducedMotion]);

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

      <div className="relative z-10">
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

        {/* Top row: cards 01–04 — staggered offsets, overlap blueprint top */}
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-end relative z-20 -mb-28 lg:-mb-44">
          <div className="lg:translate-y-2 lg:rotate-[-0.4deg]">
            <SectorCard sector={sectors[0]} index={0} phase={phases[sectors[0].id]} onClick={() => setSelectedSector(sectors[0])} />
          </div>
          <div className="lg:translate-y-10 lg:rotate-[0.5deg]">
            <SectorCard sector={sectors[1]} index={1} phase={phases[sectors[1].id]} onClick={() => setSelectedSector(sectors[1])} />
          </div>
          <div className="lg:-translate-y-3 lg:rotate-[-0.3deg]">
            <SectorCard sector={sectors[2]} index={2} phase={phases[sectors[2].id]} onClick={() => setSelectedSector(sectors[2])} />
          </div>
          <div className="lg:translate-y-14 lg:rotate-[0.6deg]">
            <SectorCard sector={sectors[3]} index={3} phase={phases[sectors[3].id]} onClick={() => setSelectedSector(sectors[3])} />
          </div>
        </div>

        {/* Blueprint inline — full-bleed, sits behind cards */}
        <div className="relative w-full -mx-4 z-0">
          <BlueprintBackground phases={phases} />
        </div>

        {/* Bottom row: cards 05–08 — staggered offsets, overlap blueprint bottom */}
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-start relative z-20 -mt-28 lg:-mt-44">
          <div className="lg:translate-y-6 lg:rotate-[0.3deg]">
            <SectorCard sector={sectors[4]} index={4} phase={phases[sectors[4].id]} onClick={() => setSelectedSector(sectors[4])} />
          </div>
          <div className="lg:-translate-y-4 lg:rotate-[-0.5deg]">
            <SectorCard sector={sectors[5]} index={5} phase={phases[sectors[5].id]} onClick={() => setSelectedSector(sectors[5])} />
          </div>
          <div className="lg:translate-y-12 lg:rotate-[0.4deg]">
            <SectorCard sector={sectors[6]} index={6} phase={phases[sectors[6].id]} onClick={() => setSelectedSector(sectors[6])} />
          </div>
          <div className="lg:-translate-y-1 lg:rotate-[-0.3deg]">
            <SectorCard sector={sectors[7]} index={7} phase={phases[sectors[7].id]} onClick={() => setSelectedSector(sectors[7])} />
          </div>
        </div>

        {/* Aggregate card */}
        <div className="max-w-7xl mx-auto mt-24">
          <AggregateCard inView={inView} />
        </div>
      </div>

      {/* Sector detail modal */}
      <SectorModal sector={selectedSector} onClose={() => setSelectedSector(null)} />
    </section>
  );
}
