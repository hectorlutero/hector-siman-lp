"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { LAYER_STYLE, type Sector, type Layer } from "./data";
import { useLanguage } from "@/context/LanguageContext";

export type SectorPhase = "idle" | "red" | "blue" | "green";

interface SectorCardProps {
  sector: Sector;
  index: number;
  phase: SectorPhase;
  onClick?: () => void;
  className?: string;
}

const LAYER_HEX: Record<string, string> = {
  operacional: "#cd7f32",
  tatico: "#c0c8d0",
  estrategico: "#d4af37",
};

const PHASE_BORDER: Record<SectorPhase, string> = {
  idle: "rgba(239,68,68,0.0)",
  red: "rgba(239,68,68,0.55)",
  blue: "rgba(59,130,246,0.55)",
  green: "rgba(34,197,94,0.5)",
};
const PHASE_GLOW: Record<SectorPhase, string> = {
  idle: "rgba(239,68,68,0)",
  red: "rgba(239,68,68,0.32)",
  blue: "rgba(59,130,246,0.32)",
  green: "rgba(34,197,94,0.28)",
};
const PHASE_SHADOW: Record<SectorPhase, string> = {
  idle: "0 20px 50px -15px rgba(0,0,0,0.5)",
  red: "0 20px 50px -15px rgba(0,0,0,0.5), 0 8px 24px -6px rgba(239,68,68,0.4)",
  blue: "0 20px 50px -15px rgba(0,0,0,0.5), 0 8px 24px -6px rgba(59,130,246,0.4)",
  green: "0 20px 50px -15px rgba(0,0,0,0.5), 0 8px 24px -6px rgba(34,197,94,0.35)",
};

const PHASE_LABEL_PREFIX: Record<SectorPhase, string | null> = {
  idle: null,
  red: "GARGALO",
  blue: "PADRONIZANDO",
  green: null, // use original layer label
};
const PHASE_LABEL_COLOR: Record<SectorPhase, string | null> = {
  idle: "#ef4444",
  red: "#ef4444",
  blue: "#3b82f6",
  green: null, // use bronze/silver/gold per layer
};
const PHASE_ICON: Record<SectorPhase, string | null> = {
  idle: "✕",
  red: "✕",
  blue: "▢",
  green: null, // use original layer icon
};

export function SectorCard({ sector, index, phase, onClick, className = "" }: SectorCardProps) {
  const { t } = useLanguage();
  const Icon = sector.icon;
  const visible = phase !== "idle";
  const interactive = phase === "green" && !!onClick;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32, borderColor: PHASE_BORDER.idle, boxShadow: PHASE_SHADOW.idle }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 32,
        borderColor: PHASE_BORDER[phase],
        boxShadow: PHASE_SHADOW[phase],
      }}
      transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
      onClick={interactive ? onClick : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : -1}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      aria-label={
        interactive
          ? `${t(sector.namePt, sector.nameEn)} — ${t("Ver detalhes", "View details")}`
          : undefined
      }
      className={`glass-strong rounded-xl p-4 w-full border-2 transition-colors duration-300 hover:scale-[1.01] hover:-translate-y-0.5 group relative overflow-hidden ${interactive ? "cursor-pointer" : ""} ${className}`}
    >
      {/* Phase glow — full card aura */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl"
        animate={{ backgroundColor: PHASE_GLOW[phase] }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{ filter: "blur(28px)", opacity: 0.6 }}
      />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3 relative z-10">
        <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
          <Icon size={14} className="text-white/85" strokeWidth={1.5} />
        </div>
        <h3 className="text-base md:text-lg font-bold tracking-tight leading-tight flex-1 min-w-0">
          {t(sector.namePt, sector.nameEn)}
        </h3>
        {/* Click affordance — only visible when card is interactive */}
        <AnimatePresence>
          {interactive && (
            <motion.div
              key="click-hint"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="w-6 h-6 rounded-full bg-success/15 border border-success/40 flex items-center justify-center shrink-0 group-hover:bg-success/25 group-hover:scale-110 transition-all"
              aria-hidden="true"
            >
              <Plus size={12} className="text-success" strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Layer rows */}
      <div className="relative z-10 space-y-0.5">
        <LayerRow layer={sector.layers.op} phase={phase} t={t} />
        <LayerRow layer={sector.layers.tat} phase={phase} t={t} />
        <LayerRow layer={sector.layers.est} phase={phase} t={t} />
      </div>
    </motion.div>
  );
}

function LayerRow({
  layer,
  phase,
  t,
}: {
  layer: Layer;
  phase: SectorPhase;
  t: (pt: string, en: string) => string;
}) {
  const style = LAYER_STYLE[layer.key];
  const baseColor = LAYER_HEX[layer.key];
  const labelColor = PHASE_LABEL_COLOR[phase] ?? baseColor;
  const labelPrefix = PHASE_LABEL_PREFIX[phase];
  const labelText = labelPrefix ? `${labelPrefix} ${style.label}` : style.label;
  const phaseIcon = PHASE_ICON[phase] ?? style.iconUnicode;
  const isGreen = phase === "green";

  return (
    <motion.div
      layout
      animate={{ borderColor: labelColor }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="flex items-baseline gap-2 py-1.5 border-l-2 pl-2.5 rounded-r"
    >
      <div className="flex-1 min-w-0">
        <motion.div
          animate={{ color: labelColor }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-1"
        >
          <span>{phaseIcon}</span>
          <span>{labelText}</span>
        </motion.div>

        {/* Title (short headline) — only in green */}
        <AnimatePresence>
          {isGreen && (
            <motion.p
              key="title"
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-[13px] text-foreground/90 font-semibold leading-snug mt-0.5"
            >
              {t(layer.titlePt, layer.titleEn)}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Right column metric — gargalo loss (red) or automation result (green) */}
      <AnimatePresence mode="wait">
        {phase === "red" && (
          <motion.div
            key="loss"
            initial={{ opacity: 0, x: 8, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -6, scale: 0.92 }}
            transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
            className="text-red-400 font-bold text-sm md:text-base whitespace-nowrap shrink-0"
          >
            {t(layer.gargaloMetricPt, layer.gargaloMetricEn)}
          </motion.div>
        )}
        {isGreen && (
          <motion.div
            key="result"
            initial={{ opacity: 0, x: 8, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
            className="text-success font-bold text-sm md:text-base whitespace-nowrap shrink-0"
          >
            {t(layer.resultPt, layer.resultEn)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
