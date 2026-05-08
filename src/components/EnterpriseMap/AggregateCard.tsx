"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, animate } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "../ui/Button";

interface Props {
  inView: boolean;
}

export function AggregateCard({ inView }: Props) {
  const { t } = useLanguage();
  const opacity = useMotionValue(0);
  const y = useMotionValue(20);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      opacity.set(1);
      y.set(0);
      return;
    }

    const opCtl = animate(opacity, 1, { duration: 0.5, ease: "easeOut" });
    const yCtl = animate(y, 0, { duration: 0.5, ease: "easeOut" });

    return () => {
      opCtl.stop();
      yCtl.stop();
    };
  }, [inView, prefersReducedMotion, opacity, y]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="relative glass-strong rounded-2xl p-8 md:p-12 border-2 border-success/30 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),0_10px_30px_-8px_rgba(34,197,94,0.25)] overflow-hidden"
    >
      {/* Soft success aura behind */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-success/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      {/* Blueprint-style monospace strip */}
      <div className="relative z-10 flex items-center justify-between mb-8 text-[10px] font-mono uppercase tracking-[0.3em] text-success/60">
        <span>// {t("Impacto Total Estimado", "Total Estimated Impact")}</span>
        <span className="hidden md:inline">
          A-001 · 8 {t("SETORES", "SECTORS")} · 24 {t("AUTOMAÇÕES", "AUTOMATIONS")}
        </span>
      </div>

      <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-10 items-end">
        {/* Hero numbers */}
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.4em] text-success/70 mb-3">
            {t("Retorno Anualizado", "Annualized Return")}
          </div>
          <div className="text-5xl md:text-7xl font-black text-success tracking-tighter leading-[0.95]">
            +R$ 3,45M
            <span className="text-xl md:text-3xl opacity-60 font-medium ml-1">/{t("ano", "yr")}</span>
          </div>
          <div className="mt-4 text-sm md:text-base text-foreground/70 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              {t("equivale a", "equals")}{" "}
              <span className="text-success font-bold">+R$ 287.500</span>
              <span className="text-muted">/{t("mês", "mo")}</span>
            </span>
            <span className="text-white/20">·</span>
            <span>
              <span className="text-foreground font-bold">{t("ROI em 6 meses", "ROI in 6 months")}</span>
            </span>
          </div>
        </div>

        {/* CTA */}
        <Button
          variant="primary"
          href="https://calendar.app.google/WQGLZTfmwWmbo5AP7"
          external
          leadingIcon={TrendingUp}
        >
          {t("Quero esse mapa", "Get this map")}
        </Button>
      </div>

      {/* Blueprint corner ticks */}
      <CornerTicks />
    </motion.div>
  );
}

function CornerTicks() {
  const tick =
    "absolute w-4 h-4 border-success/40 pointer-events-none";
  return (
    <>
      <span className={`${tick} top-2 left-2 border-l-2 border-t-2 rounded-tl-md`} />
      <span className={`${tick} top-2 right-2 border-r-2 border-t-2 rounded-tr-md`} />
      <span className={`${tick} bottom-2 left-2 border-l-2 border-b-2 rounded-bl-md`} />
      <span className={`${tick} bottom-2 right-2 border-r-2 border-b-2 rounded-br-md`} />
    </>
  );
}
