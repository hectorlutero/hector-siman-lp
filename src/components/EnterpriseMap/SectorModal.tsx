"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, ArrowRight, AlertTriangle } from "lucide-react";
import { LAYER_STYLE, METHODOLOGY_STEPS, type Sector, type Layer } from "./data";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  sector: Sector | null;
  onClose: () => void;
}

const LAYER_HEX: Record<string, string> = {
  operacional: "#cd7f32",
  tatico: "#c0c8d0",
  estrategico: "#d4af37",
};

export function SectorModal({ sector, onClose }: Props) {
  // Lock body scroll while open
  useEffect(() => {
    if (!sector) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sector]);

  // ESC closes
  useEffect(() => {
    if (!sector) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sector, onClose]);

  return (
    <AnimatePresence>
      {sector && <ModalContent sector={sector} onClose={onClose} />}
    </AnimatePresence>
  );
}

function ModalContent({ sector, onClose }: { sector: Sector; onClose: () => void }) {
  const { t } = useLanguage();
  const Icon = sector.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t(sector.namePt, sector.nameEn)}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-md" />

      {/* Modal card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl glass-strong rounded-2xl border-2 border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] my-auto"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t("Fechar", "Close")}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors z-10"
        >
          <X size={16} className="text-white/80" />
        </button>

        <div className="p-6 md:p-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Icon size={22} className="text-white/90" strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent/70 mb-1">
                {t("Setor", "Sector")} · 0{sector.order}
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
                {t(sector.namePt, sector.nameEn)}
              </h2>
            </div>
          </div>

          {/* Industry research stat */}
          <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/[0.06] p-5 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />
            <div className="relative flex items-start gap-3">
              <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" strokeWidth={2} />
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-red-400/80 mb-2">
                  {t("Realidade do mercado", "Industry reality")}
                </div>
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                  {t(sector.industryStatPt, sector.industryStatEn)}
                </p>
                <div className="mt-2 text-[11px] font-mono text-red-400/60 uppercase tracking-wider">
                  {t("Fonte", "Source")}: {t(sector.sourcePt, sector.sourceEn)}
                </div>
              </div>
            </div>
          </div>

          {/* Methodology label */}
          <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/50">
            // {t("Camadas e Metodologia", "Layers & Methodology")}
          </div>

          {/* 3 Layer journey cards */}
          <div className="space-y-3 mb-8">
            <LayerJourney layer={sector.layers.op} t={t} />
            <LayerJourney layer={sector.layers.tat} t={t} />
            <LayerJourney layer={sector.layers.est} t={t} />
          </div>

          {/* CTA */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-white/5">
            <div className="text-xs md:text-sm text-muted/80">
              {t(
                "Pronto para mapear o impacto na sua operação?",
                "Ready to map the impact on your operation?",
              )}
            </div>
            <a
              href="#cta"
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-success text-background font-bold text-sm hover:scale-105 active:scale-100 transition-transform inline-flex items-center gap-2 shadow-[0_8px_24px_-6px_rgba(34,197,94,0.5)] shrink-0"
            >
              <TrendingUp size={16} />
              {t("Quero esse mapa", "Get this map")}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function LayerJourney({
  layer,
  t,
}: {
  layer: Layer;
  t: (pt: string, en: string) => string;
}) {
  const style = LAYER_STYLE[layer.key];
  const layerColor = LAYER_HEX[layer.key];

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
      {/* Layer header */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5"
        style={{
          backgroundColor: `${layerColor}10`,
          borderLeft: `3px solid ${layerColor}`,
        }}
      >
        <span className="text-base" style={{ color: layerColor }}>
          {style.iconUnicode}
        </span>
        <span
          className="text-xs font-black uppercase tracking-[0.2em]"
          style={{ color: layerColor }}
        >
          {style.label}
        </span>
        <span className="text-xs font-medium text-foreground/85 ml-1">
          · {t(layer.titlePt, layer.titleEn)}
        </span>
      </div>

      {/* Journey: Gargalo → Padronização → Op.Assistida → Automação */}
      <div className="p-4">
        {/* Step 1: Gargalo */}
        <JourneyStep
          icon="✕"
          color="#ef4444"
          bg="rgba(239,68,68,0.1)"
          border="rgba(239,68,68,0.3)"
          label={t("Gargalo", "Bottleneck")}
          body={t(layer.gargaloPt, layer.gargaloEn)}
        />

        {/* Connector */}
        <Connector />

        {/* Steps 2-3: Methodology — Padronização & Op.Assistida */}
        {METHODOLOGY_STEPS.slice(0, 2).map((step, i) => (
          <div key={step.key}>
            <JourneyStep
              icon={step.icon}
              color={step.color}
              bg={step.bg}
              border={step.border}
              label={t(step.labelPt, step.labelEn)}
              body={t(step.descPt, step.descEn)}
            />
            {i < 2 && <Connector />}
          </div>
        ))}

        {/* Step 4: Automação (final) — show methodology desc + result metric */}
        <JourneyStep
          icon={METHODOLOGY_STEPS[2].icon}
          color={METHODOLOGY_STEPS[2].color}
          bg={METHODOLOGY_STEPS[2].bg}
          border={METHODOLOGY_STEPS[2].border}
          label={t(METHODOLOGY_STEPS[2].labelPt, METHODOLOGY_STEPS[2].labelEn)}
          body={t(METHODOLOGY_STEPS[2].descPt, METHODOLOGY_STEPS[2].descEn)}
          metric={t(layer.resultPt, layer.resultEn)}
        />
      </div>
    </div>
  );
}

function JourneyStep({
  icon,
  color,
  bg,
  border,
  label,
  body,
  metric,
}: {
  icon: string;
  color: string;
  bg: string;
  border: string;
  label: string;
  body: string;
  metric?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 mt-0.5"
        style={{ backgroundColor: bg, border: `1px solid ${border}`, color }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className="text-[10px] font-black uppercase tracking-[0.2em]"
            style={{ color }}
          >
            {label}
          </span>
          {metric && (
            <span
              className="text-sm md:text-base font-black ml-auto"
              style={{ color }}
            >
              <ArrowRight size={12} className="inline mr-1" />
              {metric}
            </span>
          )}
        </div>
        <p className="text-[12.5px] text-foreground/75 leading-snug mt-0.5">{body}</p>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex items-center pl-3 my-2">
      <div className="w-px h-4 bg-gradient-to-b from-white/20 to-white/5" />
    </div>
  );
}
