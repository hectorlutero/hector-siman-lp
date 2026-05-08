"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { sectors, type Sector, type SectorId } from "./data";
import { SectorCard, type SectorPhase } from "./SectorCard";
import { SectorModal } from "./SectorModal";
import { TrendingUp } from "lucide-react";

// Per-card cascade timing (mobile — runs strictly in scroll order)
const RED_TO_BLUE_MS = 1100;
const BLUE_TO_GREEN_MS = 2000;
const POST_GREEN_PAUSE_MS = 300;

// Mobile shows a curated subset — most important sectors along the GTM funnel
const MOBILE_SECTOR_IDS: SectorId[] = ["marketing", "vendas", "atendimento", "financas"];
const MOBILE_SECTORS: Sector[] = MOBILE_SECTOR_IDS.map(
  (id) => sectors.find((s) => s.id === id)!,
);

interface CardProps {
  sector: Sector;
  phase: SectorPhase;
  onEnterView: (id: SectorId) => void;
  onClick: () => void;
}

/** Self-reports when it enters viewport. Phase is parent-controlled (queued). */
function MobileSectorCardItem({ sector, phase, onEnterView, onClick }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

  useEffect(() => {
    if (inView) onEnterView(sector.id);
  }, [inView, sector.id, onEnterView]);

  return (
    <div ref={ref}>
      <SectorCard sector={sector} index={0} phase={phase} onClick={onClick} />
    </div>
  );
}

export default function EnterpriseMapMobile() {
  const { t } = useLanguage();
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Phase per sector
  const [phases, setPhases] = useState<Record<SectorId, SectorPhase>>(() =>
    MOBILE_SECTORS.reduce(
      (acc, s) => {
        acc[s.id] = "idle";
        return acc;
      },
      {} as Record<SectorId, SectorPhase>,
    ),
  );

  // Sectors that have entered viewport (in order they did)
  const queueRef = useRef<SectorId[]>([]);
  const processingRef = useRef(false);

  const updatePhase = useCallback((id: SectorId, phase: SectorPhase) => {
    setPhases((prev) => ({ ...prev, [id]: phase }));
  }, []);

  const runCascade = useCallback(
    (id: SectorId): Promise<void> => {
      return new Promise((resolve) => {
        if (prefersReducedMotion) {
          updatePhase(id, "green");
          resolve();
          return;
        }
        updatePhase(id, "red");
        setTimeout(() => {
          updatePhase(id, "blue");
          setTimeout(() => {
            updatePhase(id, "green");
            setTimeout(resolve, POST_GREEN_PAUSE_MS);
          }, BLUE_TO_GREEN_MS - RED_TO_BLUE_MS);
        }, RED_TO_BLUE_MS);
      });
    },
    [prefersReducedMotion, updatePhase],
  );

  const processQueue = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    while (queueRef.current.length > 0) {
      const id = queueRef.current.shift()!;
      // Only run if still idle (in case of duplicate enter events)
      const isIdle = await new Promise<boolean>((resolve) => {
        setPhases((prev) => {
          resolve(prev[id] === "idle");
          return prev;
        });
      });
      if (isIdle) {
        await runCascade(id);
      }
    }
    processingRef.current = false;
  }, [runCascade]);

  const handleEnterView = useCallback(
    (id: SectorId) => {
      // Avoid duplicates in queue
      if (!queueRef.current.includes(id) && phases[id] === "idle") {
        queueRef.current.push(id);
        processQueue();
      }
    },
    [phases, processQueue],
  );

  return (
    <section
      aria-label="Mapa de impacto da automação por setor — versão mobile"
      id="enterprise-map-mobile"
      className="relative blueprint-glow py-20 px-4 overflow-hidden md:hidden"
    >
      {/* Soft transition fades */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent pointer-events-none z-[5]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none z-[5]" aria-hidden="true" />

      {/* Subtle ambient orbs */}
      <div className="aura-orb aura-orb-1" style={{ opacity: 0.18 }} />
      <div className="aura-orb aura-orb-2" style={{ opacity: 0.12 }} />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-md mx-auto text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-block"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent/80">
              // {t("Oportunidades de Impacto", "Impact Opportunities")}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-black mb-3 tracking-tight leading-tight"
          >
            {t("Onde o Dinheiro Está na Mesa", "Where the Money is on the Table")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-muted/85 leading-relaxed"
          >
            {t(
              "4 setores onde a IA gera ROI. Toque em um card para ver os detalhes.",
              "4 sectors where AI delivers ROI. Tap a card to see details.",
            )}
          </motion.p>
        </div>

        {/* Curated stack — strict scroll-driven sequential cascade */}
        <div className="max-w-md mx-auto flex flex-col gap-4">
          {MOBILE_SECTORS.map((sector) => (
            <MobileSectorCardItem
              key={sector.id}
              sector={sector}
              phase={phases[sector.id]}
              onEnterView={handleEnterView}
              onClick={() => setSelectedSector(sector)}
            />
          ))}
        </div>

        {/* Compact aggregate */}
        <CompactAggregate t={t} />
      </div>

      {/* Shared modal */}
      <SectorModal sector={selectedSector} onClose={() => setSelectedSector(null)} />
    </section>
  );
}

function CompactAggregate({ t }: { t: (pt: string, en: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className="mt-10 max-w-md mx-auto glass-strong rounded-2xl border-2 border-success/25 p-5 sm:p-6 relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
    >
      <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-success/12 blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-success/70 mb-2">
          // {t("Retorno Anualizado", "Annualized Return")}
        </div>
        <div className="text-3xl sm:text-4xl font-black text-success/90 tracking-tight leading-none mb-2 tabular-nums">
          +R$ 3,45M
          <span className="text-base opacity-60 font-medium ml-1">/{t("ano", "yr")}</span>
        </div>
        <div className="text-xs text-foreground/70 mb-5 leading-relaxed">
          {t("equivale a", "equals")}{" "}
          <span className="text-success font-semibold">+R$ 287.500</span>
          <span className="text-muted/80">/{t("mês", "mo")}</span>
          <span className="text-white/20 mx-2">·</span>
          <span className="font-semibold">{t("ROI em 6 meses", "ROI in 6mo")}</span>
        </div>

        <a
          href="#cta"
          className="w-full px-5 py-3 rounded-full bg-success text-background font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(34,197,94,0.5)] active:scale-95 transition-transform"
        >
          <TrendingUp size={14} />
          {t("Quero esse mapa", "Get this map")}
        </a>
      </div>
    </motion.div>
  );
}
