"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CaseItem {
  id: number;
  taglinePt: string;
  taglineEn: string;
  metricValuePt: string;
  metricValueEn: string;
  metricLabelPt: string;
  metricLabelEn: string;
  metricBadge?: string;
  stats: { val: string; labelPt: string; labelEn: string }[];
  problemPt: string[];
  problemEn: string[];
  solutionPt: string[];
  solutionEn: string[];
  quotePt: string;
  quoteEn: string;
}

interface Props {
  caseItem: CaseItem | null;
  onClose: () => void;
}

export function CaseStudyModal({ caseItem, onClose }: Props) {
  useEffect(() => {
    if (!caseItem) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [caseItem]);

  useEffect(() => {
    if (!caseItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [caseItem, onClose]);

  return (
    <AnimatePresence>
      {caseItem && <ModalContent caseItem={caseItem} onClose={onClose} />}
    </AnimatePresence>
  );
}

function ModalContent({ caseItem, onClose }: { caseItem: CaseItem; onClose: () => void }) {
  const { t } = useLanguage();

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
      aria-label={t(caseItem.taglinePt, caseItem.taglineEn)}
    >
      <div className="fixed inset-0 bg-background/80 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl glass-strong rounded-2xl border-2 border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] my-auto"
      >
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
          <div className="mb-6">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent/70 mb-2">
              {t("Estudo de Caso", "Case Study")} · 0{caseItem.id}
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-tight pr-10">
              {t(caseItem.taglinePt, caseItem.taglineEn)}
            </h2>
          </div>

          {/* Metrics */}
          <div className="mb-8 rounded-xl border border-success/20 bg-success/[0.04] p-5">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-success/70 mb-2">
              {t(caseItem.metricLabelPt, caseItem.metricLabelEn)}
            </div>
            <div className="flex flex-wrap items-baseline gap-3 mb-4">
              <span className="text-3xl md:text-4xl font-bold text-success/90 tracking-tight tabular-nums">
                {t(caseItem.metricValuePt, caseItem.metricValueEn)}
              </span>
              {caseItem.metricBadge && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-success/10 text-success/85 border border-success/20 font-semibold whitespace-nowrap">
                  {caseItem.metricBadge}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              {caseItem.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted/70 mb-1">
                    {t(stat.labelPt, stat.labelEn)}
                  </div>
                  <div className="text-base md:text-lg font-semibold text-foreground/90 tabular-nums">
                    {stat.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Problem & Solution */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-danger/70 mb-4 block">
                // {t("O Problema", "The Problem")}
              </span>
              <ul className="space-y-3">
                {caseItem.problemPt.map((_, idx) => (
                  <li key={`prob-${idx}`} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-danger/50 shrink-0 mt-2.5" aria-hidden="true" />
                    <span className="text-sm text-muted leading-relaxed">
                      {t(caseItem.problemPt[idx], caseItem.problemEn[idx])}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-success/70 mb-4 block">
                // {t("A Solução", "The Solution")}
              </span>
              <ul className="space-y-3">
                {caseItem.solutionPt.map((_, idx) => (
                  <li key={`sol-${idx}`} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-success/55 shrink-0 mt-2.5" aria-hidden="true" />
                    <span className="text-sm text-muted leading-relaxed">
                      {t(caseItem.solutionPt[idx], caseItem.solutionEn[idx])}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quote */}
          <div className="pt-6 border-t border-white/5">
            <Quote className="text-white/15 mb-3" size={20} />
            <p className="text-sm md:text-base italic text-muted/85 leading-relaxed">
              {t(caseItem.quotePt, caseItem.quoteEn)}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
