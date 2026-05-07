"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, X, Check } from "lucide-react";
import { SmartCountUp } from "./ui/SmartCountUp";

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
  const [[page, direction], setPage] = useState([0, 0]);

  // Bullet-proof modulo for negative numbers
  const activeIndex = ((page % caseStudies.length) + caseStudies.length) % caseStudies.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="py-32 px-6 relative bg-background">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/10 blur-[200px] rounded-full pointer-events-none opacity-50" />
      
      <div className="w-full max-w-[100vw] mx-auto relative z-10">
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
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
            {t(
              "Resultados Reais, Impacto Mensurável",
              "Real Results, Measurable Impact"
            )}
          </h2>
        </motion.div>

        {/* 3D Carousel Container */}
        <div className="relative w-full max-w-7xl mx-auto h-[900px] sm:h-[750px] md:h-[650px] lg:h-[600px] flex justify-center mt-16" style={{ perspective: 2000 }}>
          
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
                onDragEnd={(e, { offset: dragOffset, velocity }) => {
                  const swipe = swipePower(dragOffset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className={`absolute w-full max-w-5xl px-4 sm:px-0 ${isCenter ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
              >
                {/* Active Card Glow */}
                {isCenter && (
                  <div className="absolute inset-0 bg-accent/30 blur-[120px] -z-10 rounded-full transition-opacity duration-1000" />
                )}

                {/* THE CARD */}
                <div className={`glass rounded-[2.5rem] border overflow-hidden transition-colors duration-500 bg-card ${isCenter ? 'border-white/20 shadow-[0_0_50px_rgba(139,92,246,0.15)]' : 'border-white/5'}`}>
                  
                  {/* Card Header - Title Only */}
                  <div className="px-8 py-6 sm:px-14 sm:py-8 border-b border-card-border bg-white/[0.04] relative">
                    {/* Subtle top gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-60" />
                    
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-8 bg-accent rounded-full hidden md:block" />
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight tracking-tight">
                        {t(caseItem.taglinePt, caseItem.taglineEn)}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Top Metrics Banner */}
                  <div className="p-8 sm:px-14 sm:py-8 border-b border-card-border bg-black/20 flex flex-wrap items-center justify-between gap-6 md:gap-10 lg:gap-8">
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-success mb-2">
                        {t(caseItem.metricLabelPt, caseItem.metricLabelEn)}
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-success to-emerald-400 tracking-tighter">
                          <SmartCountUp text={t(caseItem.metricValuePt, caseItem.metricValueEn)} isVisible={isCenter} />
                        </span>
                        {caseItem.metricBadge && (
                          <span className="text-sm md:text-base px-3 py-1 rounded-full bg-success/10 text-success border border-success/20 font-bold whitespace-nowrap">
                            <SmartCountUp text={caseItem.metricBadge} isVisible={isCenter} />
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {caseItem.stats.map((stat, i) => (
                      <div key={i}>
                        <div className="text-xs font-black uppercase tracking-widest text-muted mb-2">
                          {t(stat.labelPt, stat.labelEn)}
                        </div>
                        <div className="text-2xl lg:text-3xl font-bold text-foreground whitespace-nowrap">
                          <SmartCountUp text={stat.val} isVisible={isCenter} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Body Details Section */}
                  <div className="p-10 sm:p-14 grid md:grid-cols-2 gap-12">
                    <div>
                      <span className="text-sm font-bold uppercase text-danger tracking-widest flex items-center gap-3 mb-6">
                        <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
                        {t("O Problema", "The Problem")}
                      </span>
                      <ul className="space-y-4">
                        {caseItem.problemPt.map((_, idx) => (
                          <li key={`prob-${idx}`} className="flex items-start gap-3">
                            <X className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                            <span className="text-base md:text-lg text-muted font-medium leading-relaxed">
                              <SmartCountUp text={t(caseItem.problemPt[idx], caseItem.problemEn[idx])} isVisible={isCenter} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-sm font-bold uppercase text-success tracking-widest flex items-center gap-3 mb-6">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        {t("A Solução", "The Solution")}
                      </span>
                      <ul className="space-y-4">
                        {caseItem.solutionPt.map((_, idx) => (
                          <li key={`sol-${idx}`} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                            <span className="text-base md:text-lg text-muted font-medium leading-relaxed">
                              <SmartCountUp text={t(caseItem.solutionPt[idx], caseItem.solutionEn[idx])} isVisible={isCenter} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer Quote */}
                  <div className="bg-background/40 p-8 flex justify-center border-t border-card-border/50">
                    <div className="max-w-3xl text-center px-4">
                      <Quote className="mx-auto text-white/10 mb-4" size={32} />
                      <p className="text-base md:text-lg italic text-muted/90 font-medium">
                        {t(caseItem.quotePt, caseItem.quoteEn)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Controls - Arrows (Desktop) */}
          <button
            className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 z-20 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-muted hover:text-white hover:bg-white/5 transition-all hidden md:flex hover:scale-110 active:scale-95"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 z-20 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-muted hover:text-white hover:bg-white/5 transition-all hidden md:flex hover:scale-110 active:scale-95"
            onClick={() => paginate(1)}
          >
            <ChevronRight size={24} />
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

      </div>
    </section>
  );
}
