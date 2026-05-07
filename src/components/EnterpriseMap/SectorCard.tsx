"use client";

import { motion } from "framer-motion";
import { LAYER_STYLE, type Sector, type Layer } from "./data";
import { useLanguage } from "@/context/LanguageContext";

interface SectorCardProps {
  sector: Sector;
  index: number;
  className?: string;
}

const LAYER_HEX: Record<string, string> = {
  operacional: "#cd7f32",
  tatico: "#c0c8d0",
  estrategico: "#d4af37",
};

export function SectorCard({ sector, index, className = "" }: SectorCardProps) {
  const { t } = useLanguage();
  const Icon = sector.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.8, 0.25, 1] }}
      className={`glass-strong rounded-3xl p-7 md:p-8 border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.015] hover:-translate-y-0.5 group relative overflow-hidden ${className}`}
    >
      {/* Accent glow */}
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-accent/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          <Icon size={20} className="text-white/85" strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">
            {t(sector.namePt, sector.nameEn)}
          </h3>
          <p className="text-xs text-muted/70 mt-0.5">
            {t("3 camadas de impacto", "3 layers of impact")}
          </p>
        </div>
      </div>

      {/* Layer rows */}
      <div className="space-y-1 relative z-10">
        <LayerRow layer={sector.layers.op} cardIndex={index} layerIndex={0} t={t} />
        <LayerRow layer={sector.layers.tat} cardIndex={index} layerIndex={1} t={t} />
        <LayerRow layer={sector.layers.est} cardIndex={index} layerIndex={2} t={t} />
      </div>
    </motion.div>
  );
}

function LayerRow({
  layer,
  cardIndex,
  layerIndex,
  t,
}: {
  layer: Layer;
  cardIndex: number;
  layerIndex: number;
  t: (pt: string, en: string) => string;
}) {
  const style = LAYER_STYLE[layer.key];
  const color = LAYER_HEX[layer.key];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: cardIndex * 0.12 + 0.25 + layerIndex * 0.1,
        ease: "easeOut",
      }}
      className="flex items-baseline gap-3 py-3 border-l-2 pl-4 hover:bg-white/[0.02] transition-colors rounded-r-md"
      style={{ borderColor: color }}
    >
      <div className="flex-1 min-w-0">
        <div
          className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 flex items-center gap-1"
          style={{ color }}
        >
          <span>{style.iconUnicode}</span>
          <span>{style.label}</span>
        </div>
        <p className="text-sm text-foreground/85 leading-snug">
          {t(layer.descPt, layer.descEn)}
        </p>
      </div>
      <div className="text-success font-bold text-base md:text-lg whitespace-nowrap shrink-0">
        {t(layer.resultPt, layer.resultEn)}
      </div>
    </motion.div>
  );
}
