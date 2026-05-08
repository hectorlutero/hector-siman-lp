"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, BarChart3, Rocket } from "lucide-react";
import { Highlight } from "./ui/Highlight";
import { Button } from "./ui/Button";

const layers = [
  {
    level: "Operacional",
    levelEn: "Operational",
    titlePt: "O Fim do Trabalho Invisível",
    titleEn: "The End of Invisible Work",
    subtitlePt: "Execução em fluxo contínuo, sem retrabalho.",
    subtitleEn: "Continuous execution, zero rework.",
    classes: {
      text: "text-bronze",
      bg: "bg-bronze",
      border: "border-bronze/30",
      bgSubtle: "bg-bronze/5",
      shadow: "shadow-[0_0_30px_rgba(205,127,50,0.25)]",
      gradient: "from-bronze/20 to-transparent",
      glow: "rgba(205,127,50,0.18)",
    },
    icon: Zap,
    departments: [
      {
        sectorPt: "Backoffice & Admin",
        sectorEn: "Backoffice & Admin",
        headlinePt: "Zero Erro Humano. Zero Retrabalho.",
        headlineEn: "Zero Human Error. Zero Rework.",
        copyPt: "Dados e documentos processados em milissegundos.",
        copyEn: "Data and documents processed in milliseconds."
      },
      {
        sectorPt: "Atendimento & Suporte",
        sectorEn: "Support & CX",
        headlinePt: "Menos de 2 min de Tempo de Resposta, 24/7.",
        headlineEn: "Sub-2 min Response Time, 24/7.",
        copyPt: "Dúvidas resolvidas na hora. Seu time entra quando empatia importa.",
        copyEn: "Queries resolved instantly. Your team steps in only when empathy matters."
      }
    ]
  },
  {
    level: "Tático",
    levelEn: "Tactical",
    titlePt: "Orquestração de Alta Performance",
    titleEn: "High-Performance Orchestration",
    subtitlePt: "Arquitetura de processos em tempo real.",
    subtitleEn: "Process architecture, in real time.",
    classes: {
      text: "text-silver",
      bg: "bg-silver",
      border: "border-silver/30",
      bgSubtle: "bg-silver/5",
      shadow: "shadow-[0_0_30px_rgba(192,200,208,0.25)]",
      gradient: "from-silver/20 to-transparent",
      glow: "rgba(192,200,208,0.18)",
    },
    icon: BarChart3,
    departments: [
      {
        sectorPt: "Gestão de Pessoas (RH)",
        sectorEn: "People & HR",
        headlinePt: "+40% de Foco em Cultura e Retenção.",
        headlineEn: "+40% Focus on Culture & Retention.",
        copyPt: "IA assume a burocracia. RH foca em cultura e retenção.",
        copyEn: "AI handles bureaucracy. HR focuses on culture and retention."
      },
      {
        sectorPt: "Logística & Supply",
        sectorEn: "Logistics & Supply",
        headlinePt: "3× Mais Velocidade no Processamento.",
        headlineEn: "3× Faster Processing.",
        copyPt: "Rotas e estoque recalculados em tempo real. Time foca em estratégia.",
        copyEn: "Routes and stock recalculated in real time. Team focuses on strategy."
      }
    ]
  },
  {
    level: "Estratégico",
    levelEn: "Strategic",
    titlePt: "Centro de Comando Preditivo",
    titleEn: "Predictive Command Center",
    subtitlePt: "Decisão dirigida por dados, sem chute.",
    subtitleEn: "Data-driven decisions, no guesswork.",
    classes: {
      text: "text-gold",
      bg: "bg-gold",
      border: "border-gold/30",
      bgSubtle: "bg-gold/5",
      shadow: "shadow-[0_0_30px_rgba(212,175,55,0.25)]",
      gradient: "from-gold/20 to-transparent",
      glow: "rgba(212,175,55,0.2)",
    },
    icon: Rocket,
    departments: [
      {
        sectorPt: "Finanças & ROI",
        sectorEn: "Finance & ROI",
        headlinePt: "+25% na Margem de Lucro.",
        headlineEn: "+25% Profit Margin.",
        copyPt: "Detecta vazamento de margem antes do fechamento do mês.",
        copyEn: "Detects margin leaks before month-end close."
      },
      {
        sectorPt: "Diretoria & Expansão",
        sectorEn: "Board & Expansion",
        headlinePt: "95% de Precisão em Forecast.",
        headlineEn: "95% Forecast Accuracy.",
        copyPt: "Cenários previstos com 95% de precisão. Decisão sem chute.",
        copyEn: "Scenarios forecast at 95% accuracy. Decisions without guesswork."
      }
    ]
  }
];

export default function BeforeAfter() {
  const { t, lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animated Path going from bottom to top (reversed scroll)
  const pathHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.2]);

  return (
    <section className="py-32 px-6 relative overflow-hidden" id="resultados">
      {/* Dynamic Background Aura */}
      <motion.div 
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-bronze/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-silver/10 blur-[150px] rounded-full" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gold/10 blur-[150px] rounded-full" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <span className="text-xs font-bold uppercase text-accent tracking-[0.3em] mb-4 block">
            {t("3 Camadas de Atuação", "3 Layers of Action")}
          </span>
          <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight tracking-tighter">
            {t(
              "Operacional, Tático e Estratégico — atuando juntos.",
              "Operational, Tactical, and Strategic — working together."
            )}
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto font-medium">
            {lang === "pt" ? (
              <>
                Em todo setor, a IA opera nas <Highlight>três camadas simultaneamente</Highlight>. Cada camada com sua <Highlight>ação</Highlight> e seu <Highlight>impacto</Highlight>.
              </>
            ) : (
              <>
                In every sector, AI operates across <Highlight>all three layers simultaneously</Highlight>. Each layer with its <Highlight>action</Highlight> and its <Highlight>impact</Highlight>.
              </>
            )}
          </p>
        </motion.div>

        {/* The Refinery Spine */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto flex flex-col">
          
          {/* Central Path (Background) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2" />
          
          {/* Central Path (Animated) - Path goes DOWN as you scroll, but logic is Operational -> Strategic */}
          <motion.div 
            style={{ height: pathHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-bronze via-silver to-gold shadow-[0_0_20px_rgba(255,255,255,0.2)] origin-top z-0 md:-translate-x-1/2"
          />

          <div className="space-y-32">
            {layers.map((layer, idx) => {
              const Icon = layer.icon;
              const isEven = idx % 2 === 0;

              return (
                <div key={idx} className="relative isolate flex flex-col md:flex-row items-center gap-12 md:gap-0">

                  {/* Layer-specific background glow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    aria-hidden="true"
                    className={`pointer-events-none absolute -z-10 rounded-full blur-[140px] w-[80%] h-[120%] top-1/2 -translate-y-1/2 ${isEven ? 'right-0' : 'left-0'}`}
                    style={{ backgroundColor: layer.classes.glow }}
                  />

                  {/* Node */}
                  <div className={`absolute left-6 md:left-1/2 top-0 w-6 h-6 -translate-x-[11px] md:-translate-x-3 rounded-full bg-background border-2 ${layer.classes.border} z-20 flex items-center justify-center ${layer.classes.shadow}`}>
                     <div className={`w-2 h-2 rounded-full ${layer.classes.bg} animate-pulse`} />
                  </div>

                  {/* Level Header (Mobile) */}
                  <div className="pl-16 w-full md:hidden mb-4">
                     <span className={`text-xs font-black uppercase tracking-widest ${layer.classes.text}`}>
                        Level {idx + 1}: {t(layer.level, layer.levelEn)}
                     </span>
                  </div>

                  {/* Left Side: Meta Info (Desktop) */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`hidden md:flex w-1/2 flex-col ${isEven ? 'items-end pr-16 text-right' : 'order-last items-start pl-16 text-left'}`}
                  >
                     <div className={`w-20 h-20 rounded-2xl ${layer.classes.bgSubtle} border border-white/5 flex items-center justify-center mb-6 ${layer.classes.shadow}`}>
                        <Icon size={40} className={layer.classes.text} strokeWidth={1.5} />
                     </div>
                     <span className={`text-sm font-bold uppercase tracking-[0.2em] mb-2 ${layer.classes.text}`}>
                        {t(layer.level, layer.levelEn)}
                     </span>
                     <h3 className="text-3xl font-black mb-4 tracking-tight">
                        {t(layer.titlePt, layer.titleEn)}
                     </h3>
                     <p className="text-muted font-medium text-lg leading-relaxed max-w-sm">
                        {t(layer.subtitlePt, layer.subtitleEn)}
                     </p>
                  </motion.div>

                  {/* Right Side: Bento Grid (Desktop) / Cards (Mobile) */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16 md:order-first'} pl-16 md:pl-0`}>
                     <div className={`text-[10px] font-mono uppercase tracking-[0.25em] text-muted/60 mb-4 ${isEven ? '' : 'md:text-right'}`}>
                        // {t("Exemplos por setor", "Examples by sector")}
                     </div>
                     <div className="grid grid-cols-1 gap-6">
                        {layer.departments.map((dept, dIdx) => (
                          <motion.div 
                            key={dIdx} 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: dIdx * 0.1 }}
                            className="glass rounded-3xl p-8 border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
                          >
                             {/* Hover Glow */}
                             <div className={`absolute -inset-1 bg-gradient-to-br ${layer.classes.gradient} opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none`} />
                             
                             <div className="relative z-10">
                                <div className={`text-[10px] font-mono uppercase tracking-[0.3em] mb-3 ${layer.classes.text} opacity-80`}>
                                   {t(dept.sectorPt, dept.sectorEn)}
                                </div>
                                <h4 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-[1.15] mb-5">
                                   {t(dept.headlinePt, dept.headlineEn)}
                                </h4>
                                <p className="text-sm text-muted leading-relaxed font-medium">
                                   {t(dept.copyPt, dept.copyEn)}
                                </p>
                             </div>
                          </motion.div>
                        ))}
                     </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Bridge CTA — connects to EnterpriseMap (outside spine so the vertical line ends with the layers) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-24 md:mt-32 text-center"
        >
          <div className="inline-flex flex-col items-center max-w-2xl mx-auto">
            <p className="text-sm md:text-base text-muted/85 mb-5">
              {t(
                "Essas 3 camadas se aplicam a cada setor da sua empresa.",
                "These 3 layers apply to every sector in your company.",
              )}
            </p>
            <Button
              variant="primary"
              href="https://calendar.app.google/WQGLZTfmwWmbo5AP7"
              external
            >
              {t("Conversar com Especialista", "Talk to an Expert")}
            </Button>
            <div className="mt-5">
              <Button variant="tertiary" href="#enterprise-map">
                {t("Ver onde isso vira ROI por setor", "See where this becomes ROI per sector")}
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
