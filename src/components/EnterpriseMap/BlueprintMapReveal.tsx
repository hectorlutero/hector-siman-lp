"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { sectors, type Sector, type SectorId } from "./data";
import { SectorCard, type SectorPhase } from "./SectorCard";
import { BlueprintBackground } from "./BlueprintBackground";
import { AggregateCard } from "./AggregateCard";
import { SectorModal } from "./SectorModal";

const PAIRS: ReadonlyArray<readonly [SectorId, SectorId]> = [
  ["marketing", "rh"],
  ["atendimento", "diretoria"],
  ["vendas", "financas"],
  ["operacoes", "ti"],
];

const ENTER_OFFSET_MS = 400;
const INTRA_PAIR_OFFSET_MS = 200;
const RED_TO_BLUE_MS = 2000;
const BLUE_TO_GREEN_MS = 3800;
const PAIR_GAP_MS = 500;
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

interface Props {
  active: boolean;
}

export function BlueprintMapReveal({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [phases, setPhases] = useState<Record<SectorId, SectorPhase>>(buildInitialPhases);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);

  useEffect(() => {
    if (!active || !inView) return;

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
  }, [active, inView, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative">
      {/* Top row */}
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

      {/* Blueprint inline */}
      <div className="relative w-full -mx-4 z-0">
        <BlueprintBackground phases={phases} />
      </div>

      {/* Bottom row */}
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

      <div className="max-w-7xl mx-auto mt-24">
        <AggregateCard inView={inView} />
      </div>

      <SectorModal sector={selectedSector} onClose={() => setSelectedSector(null)} />
    </div>
  );
}
