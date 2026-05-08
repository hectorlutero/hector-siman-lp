"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { SmartCountUp } from "./ui/SmartCountUp";
import { CaseStudyModal } from "./CaseStudyModal";
import { Button } from "./ui/Button";

// --- DATA ---
const caseStudies = [
  {
    id: 1,
    taglinePt: "Gestão de acessos em operação de TI",
    taglineEn: "Access management in IT operations",
    metricValuePt: "R$ 19.500",
    metricValueEn: "R$ 19,500",
    metricLabelPt: "ECONOMIA ANUAL",
    metricLabelEn: "ANNUAL SAVINGS",
    stats: [
      { val: "12h → 5min (↓ 99%)", labelPt: "TEMPO SEMANAL", labelEn: "WEEKLY TIME" },
      { val: "+99%", labelPt: "EFICIÊNCIA", labelEn: "EFFICIENCY" }
    ],
    problemPt: [
      "12h/semana drenadas da equipe técnica.",
      "Gargalo crítico na abertura de novas lojas.",
      "Excesso de chamados 100% operacionais."
    ],
    problemEn: [
      "12h/week lost to manual technical tasks.",
      "Scalability bottleneck hindering new store openings.",
      "Technical team overwhelmed by repetitive operational tickets."
    ],
    solutionPt: [
      "Agente IA provisiona acessos via API.",
      "Fila de chamados zerada de forma autônoma.",
      "Tempo de execução cai para 5 minutos."
    ],
    solutionEn: [
      "AI agent automates access provisioning via API.",
      "Ticket queue processed autonomously.",
      "Processing time reduced to just 5 minutes."
    ],
    quotePt: "\"A IA mapeia a base e aloca permissões com poucas instruções.\"",
    quoteEn: "\"AI maps the database and allocates permissions with few instructions.\"",
  },
  {
    id: 2,
    taglinePt: "Arquitetura Multi-Agentes para Desenvolvimento SaaS",
    taglineEn: "Multi-Agent Architecture for SaaS Development",
    metricValuePt: "R$ 358.000",
    metricValueEn: "R$ 358,000",
    metricBadge: "↓ 83%",
    metricLabelPt: "ECONOMIA GERADA",
    metricLabelEn: "TOTAL SAVINGS",
    stats: [
      { val: "18m → 3m (↓ 83%)", labelPt: "TEMPO DE PROJETO", labelEn: "TIMELINE" },
      { val: "100%", labelPt: "COBERTURA DE TESTES", labelEn: "TEST COVERAGE" }
    ],
    problemPt: [
      "Ciclo de desenvolvimento estimado em 18 meses.",
      "Orçamento tradicional inviável (R$ 432.000)."
    ],
    problemEn: [
      "Estimated 18-month development cycle.",
      "Traditional development budget unfeasible (R$ 432,000)."
    ],
    solutionPt: [
      "Go-to-market alcançado em apenas 3 meses.",
      "Custo final do projeto reduzido em 83% com IA.",
      "Cobertura total de testes gerada automaticamente."
    ],
    solutionEn: [
      "Go-to-market achieved in just 3 months.",
      "Total project cost reduced by 83% using AI.",
      "Automated test coverage integrated from day one."
    ],
    quotePt: "\"O custo e o tempo despencaram de forma simultânea, garantindo um lançamento rápido e tecnicamente impecável.\"",
    quoteEn: "\"Cost and time plummeted simultaneously, ensuring a fast and technically impeccable launch.\"",
  },
  {
    id: 3,
    taglinePt: "Motor de Conteúdo SEO em Larga Escala",
    taglineEn: "Large-Scale SEO Content Engine",
    metricValuePt: "8h → 5min",
    metricValueEn: "8h → 5min",
    metricBadge: "↓ 99%",
    metricLabelPt: "TEMPO POR ARTIGO",
    metricLabelEn: "TIME PER ARTICLE",
    stats: [
      { val: "40/dia (40x)", labelPt: "POSTS POR USUÁRIO", labelEn: "OUTPUT PER USER" },
      { val: "100%", labelPt: "ADEQUAÇÃO EEAT", labelEn: "EEAT COMPLIANCE" }
    ],
    problemPt: [
      "8 horas para criar 1 único artigo de alta performance.",
      "Gargalo cruzado entre editor, designer e SEO."
    ],
    problemEn: [
      "8 hours required to produce a single high-performance article.",
      "Operational bottleneck between editing, design, and SEO teams."
    ],
    solutionPt: [
      "IA orquestra pesquisa, copy EEAT e imagens.",
      "Tempo de produção reduzido para 5 minutos.",
      "1 único operador gera até 40 posts por dia."
    ],
    solutionEn: [
      "AI orchestrates research, EEAT-compliant copy, and visuals.",
      "Production timeline slashed to 5 minutes.",
      "A single operator now generates up to 40 posts daily."
    ],
    quotePt: "\"Reduzimos o trabalho de dias de uma equipe inteira para apenas 5 minutos, multiplicando a capacidade de entrega da agência.\"",
    quoteEn: "\"We transformed days of manual work into a 5-minute automated process, exponentially increasing the agency's delivery capacity.\"",
  }
];

// Variants are no longer needed as we map and animate directly based on relative index.

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function CaseStudy() {
  const { t } = useLanguage();
  const [[page], setPage] = useState([0, 0]);
  const [openCaseId, setOpenCaseId] = useState<number | null>(null);

  // Bullet-proof modulo for negative numbers
  const activeIndex = ((page % caseStudies.length) + caseStudies.length) % caseStudies.length;
  const openCase = caseStudies.find((c) => c.id === openCaseId) ?? null;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="py-32 px-6 relative bg-background overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/10 blur-[200px] rounded-full pointer-events-none opacity-50 max-w-full" />

      <div className="w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-32"
        >
          <span className="text-sm font-bold uppercase text-accent tracking-widest mb-4 block">
            {t("Estudos de Caso", "Case Studies")}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60 max-w-5xl mx-auto leading-[1.05]">
            {t(
              "Resultados Reais, Impacto Mensurável",
              "Real Results, Measurable Impact"
            )}
          </h2>
        </motion.div>

        {/* 3D Carousel Container */}
        <div className="relative w-full max-w-7xl mx-auto h-[420px] sm:h-[380px] md:h-[480px] flex justify-center mt-16" style={{ perspective: 2000 }}>
          
          {caseStudies.map((caseItem, index) => {
            // Calculate relative offset (-1, 0, 1)
            let offset = index - activeIndex;
            if (offset === 2) offset = -1;
            if (offset === -2) offset = 1;
            
            const isCenter = offset === 0;

            return (
              <motion.div
                key={caseItem.id}
                animate={{
                  x: offset === 0 ? "0%" : offset > 0 ? "35%" : "-35%",
                  scale: offset === 0 ? 1 : 0.85,
                  rotateY: offset === 0 ? 0 : offset > 0 ? -15 : 15,
                  opacity: offset === 0 ? 1 : 0.25,
                  filter: offset === 0 ? "blur(0px)" : "blur(12px)",
                  zIndex: offset === 0 ? 10 : 0,
                }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 250,
                  damping: 25
                }}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_, { offset: dragOffset, velocity }) => {
                  const swipe = swipePower(dragOffset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className={`absolute w-full max-w-5xl px-4 sm:px-0 ${isCenter ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
              >
                {/* Active card glow — toned down */}
                {isCenter && (
                  <div className="absolute inset-0 bg-accent/12 blur-[140px] -z-10 rounded-full transition-opacity duration-1000" />
                )}

                {/* THE CARD — compact: header + hero metric + sub-stats + CTA */}
                <div className={`glass rounded-3xl border overflow-hidden transition-colors duration-500 ${isCenter ? 'border-white/15 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]' : 'border-white/5'}`}>
                  {/* Header */}
                  <div className="px-6 py-5 sm:px-10 sm:py-6 border-b border-white/5">
                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent/70 mb-1.5">
                      {t("Estudo de Caso", "Case Study")} · 0{caseItem.id}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground leading-tight tracking-tight">
                      {t(caseItem.taglinePt, caseItem.taglineEn)}
                    </h3>
                  </div>

                  {/* Hero metric + sub-stats */}
                  <div className="px-6 py-6 sm:px-10 sm:py-7 flex flex-wrap items-baseline justify-between gap-4 sm:gap-8">
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-success/70 mb-1.5">
                        {t(caseItem.metricLabelPt, caseItem.metricLabelEn)}
                      </div>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-success/90 tracking-tight tabular-nums">
                          <SmartCountUp text={t(caseItem.metricValuePt, caseItem.metricValueEn)} isVisible={isCenter} />
                        </span>
                        {caseItem.metricBadge && (
                          <span className="text-[11px] sm:text-xs px-2 py-0.5 rounded-full bg-success/10 text-success/85 border border-success/20 font-semibold whitespace-nowrap">
                            <SmartCountUp text={caseItem.metricBadge} isVisible={isCenter} />
                          </span>
                        )}
                      </div>
                    </div>

                    {caseItem.stats.map((stat, i) => (
                      <div key={i} className="min-w-0">
                        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted/70 mb-1.5">
                          {t(stat.labelPt, stat.labelEn)}
                        </div>
                        <div className="text-base sm:text-lg md:text-xl font-semibold text-foreground/90 whitespace-nowrap tabular-nums">
                          <SmartCountUp text={stat.val} isVisible={isCenter} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop-only detail row — problem + solution snippets */}
                  <div className="hidden md:grid grid-cols-2 gap-8 px-10 pb-6 pt-2 border-t border-white/5">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-danger/70 mb-3">
                        // {t("O Problema", "The Problem")}
                      </div>
                      <ul className="space-y-2">
                        {caseItem.problemPt.slice(0, 2).map((_, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                            <span className="w-1 h-1 rounded-full bg-danger/55 shrink-0 mt-2" aria-hidden="true" />
                            <span>{t(caseItem.problemPt[i], caseItem.problemEn[i])}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-success/70 mb-3">
                        // {t("A Solução", "The Solution")}
                      </div>
                      <ul className="space-y-2">
                        {caseItem.solutionPt.slice(0, 2).map((_, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                            <span className="w-1 h-1 rounded-full bg-success/60 shrink-0 mt-2" aria-hidden="true" />
                            <span>{t(caseItem.solutionPt[i], caseItem.solutionEn[i])}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA — opens modal with full details */}
                  <div className="px-6 pb-5 sm:px-10 sm:pb-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => isCenter && setOpenCaseId(caseItem.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-sm font-semibold text-foreground/90 transition-colors"
                    >
                      {t("Ver detalhes", "See details")}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Controls — Chevrons (always visible) */}
          <button
            type="button"
            aria-label={t("Anterior", "Previous")}
            className="absolute top-1/2 -translate-y-1/2 left-1 sm:left-2 md:-left-12 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass border border-white/10 flex items-center justify-center text-muted hover:text-white hover:bg-white/5 transition-all hover:scale-110 active:scale-95"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft size={20} className="sm:hidden" />
            <ChevronLeft size={24} className="hidden sm:block" />
          </button>
          <button
            type="button"
            aria-label={t("Próximo", "Next")}
            className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-2 md:-right-12 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass border border-white/10 flex items-center justify-center text-muted hover:text-white hover:bg-white/5 transition-all hover:scale-110 active:scale-95"
            onClick={() => paginate(1)}
          >
            <ChevronRight size={20} className="sm:hidden" />
            <ChevronRight size={24} className="hidden sm:block" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {caseStudies.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const newDirection = i > activeIndex ? 1 : -1;
                setPage([page + (i - activeIndex), newDirection]);
              }}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === activeIndex 
                  ? "w-8 bg-accent" 
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Section CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-16 md:mt-20 text-center"
        >
          <Button
            variant="primary"
            href="https://calendar.app.google/WQGLZTfmwWmbo5AP7"
            external
          >
            {t("Conversar sobre meu caso", "Talk about my case")}
          </Button>
        </motion.div>

      </div>

      {/* Detail modal */}
      <CaseStudyModal caseItem={openCase} onClose={() => setOpenCaseId(null)} />
    </section>
  );
}
