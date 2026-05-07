"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export function AggregateCard({ scrollYProgress }: Props) {
  const { t } = useLanguage();
  const opacity = useTransform(scrollYProgress, [0.92, 0.98], [0, 1]);
  const y = useTransform(scrollYProgress, [0.92, 0.98], [20, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="mt-12 max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-6 glass rounded-[2.5rem] p-8 md:p-10 border-success/30"
    >
      <div className="flex-1 flex flex-col justify-center gap-2">
        <span className="text-xs font-black uppercase tracking-[0.4em] text-success/80">
          {t("Impacto Total Estimado", "Total Estimated Impact")}
        </span>
        <div className="text-4xl md:text-6xl font-black text-success tracking-tighter">
          +R$ 287.500
          <span className="text-lg md:text-2xl opacity-60 font-medium">/mês</span>
        </div>
        <span className="text-xs text-muted/80">
          {t("4 setores · 12 automações · ROI em 6 meses", "4 sectors · 12 automations · 6mo ROI")}
        </span>
      </div>

      <div className="hidden md:block w-px bg-white/10 self-stretch" />

      <div className="flex-1 flex flex-col gap-3 justify-center">
        <span className="text-xs uppercase tracking-widest text-muted">{t("Distribuição por camada", "Layer breakdown")}</span>
        <div className="space-y-2">
          <LayerBar label={t("Operacional", "Operational")} pct={40} color="var(--color-bronze)" />
          <LayerBar label={t("Tático", "Tactical")} pct={35} color="var(--color-silver)" />
          <LayerBar label={t("Estratégico", "Strategic")} pct={25} color="var(--color-gold)" />
        </div>
      </div>

      <div className="hidden md:block w-px bg-white/10 self-stretch" />

      <div className="flex flex-col items-center justify-center gap-3">
        <a
          href="#cta"
          className="px-6 py-3 rounded-full bg-success text-background font-bold text-sm hover:scale-105 transition-transform inline-flex items-center gap-2"
        >
          <TrendingUp size={16} />
          {t("Quero esse mapa", "Get this map")}
        </a>
      </div>
    </motion.div>
  );
}

function LayerBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted w-20 shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold w-10 text-right" style={{ color }}>{pct}%</span>
    </div>
  );
}
