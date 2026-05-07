"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, Zap, BarChart3, ShieldCheck, Rocket } from "lucide-react";

// Number Ticker Component for ROI
const NumberTicker = ({ value, prefix = "", suffix = "" }: { value: string, prefix?: string, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = parseInt(value.replace(/[^0-9]/g, ""));

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = targetValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setDisplayValue(targetValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetValue]);

  return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
};

const layers = [
  {
    level: "Operacional",
    levelEn: "Operational",
    titlePt: "O Fim do Trabalho Invisível",
    titleEn: "The End of Invisible Work",
    subtitlePt: "De Execução Manual para Fluxo Contínuo 24/7",
    subtitleEn: "From Manual Execution to 24/7 Continuous Flow",
    classes: {
      text: "text-success",
      bg: "bg-success",
      border: "border-success/30",
      bgSubtle: "bg-success/5",
      shadow: "shadow-[0_0_30px_rgba(16,185,129,0.2)]",
      gradient: "from-success/20 to-transparent",
    },
    icon: Zap,
    departments: [
      {
        namePt: "Backoffice & Admin",
        nameEn: "Backoffice & Admin",
        metric: "0%",
        metricLabelPt: "Erro Humano e Retrabalho",
        metricLabelEn: "Human Error & Rework",
        copyPt: "Processamento de dados e documentos em milissegundos. O que era 'trabalho braçal' agora flui de forma impecável.",
        copyEn: "Data and document processing in milliseconds. What used to be 'manual labor' now flows flawlessly."
      },
      {
        namePt: "Atendimento & Suporte",
        nameEn: "Support & CX",
        metric: "2min",
        metricLabelPt: "Tempo de Resposta 24/7",
        metricLabelEn: "Response Time 24/7",
        copyPt: "Resolução imediata de dúvidas. O seu time só entra em cena quando a empatia e a negociação são indispensáveis.",
        copyEn: "Immediate query resolution. Your team only steps in when empathy and negotiation are indispensable."
      }
    ]
  },
  {
    level: "Tático",
    levelEn: "Tactical",
    titlePt: "Orquestração de Alta Performance",
    titleEn: "High-Performance Orchestration",
    subtitlePt: "De Gestores de Crise para Arquitetos de Processos",
    subtitleEn: "From Crisis Managers to Process Architects",
    classes: {
      text: "text-accent",
      bg: "bg-accent",
      border: "border-accent/30",
      bgSubtle: "bg-accent/5",
      shadow: "shadow-[0_0_30px_rgba(139,92,246,0.2)]",
      gradient: "from-accent/20 to-transparent",
    },
    icon: BarChart3,
    departments: [
      {
        namePt: "Gestão de Pessoas (RH)",
        nameEn: "People & HR",
        metric: "+40%",
        metricLabelPt: "Foco em Cultura e Retenção",
        metricLabelEn: "Focus on Culture & Retention",
        copyPt: "A IA cuida da triagem técnica e burocracia. O RH deixa de ser um departamento de papéis e passa a ser o motor de talentos.",
        copyEn: "AI handles technical screening and bureaucracy. HR stops being a paper department and becomes a talent engine."
      },
      {
        namePt: "Logística & Supply",
        nameEn: "Logistics & Supply",
        metric: "3x+",
        metricLabelPt: "Velocidade de Processamento",
        metricLabelEn: "Processing Speed",
        copyPt: "Recalque de rotas e estoque em tempo real. A máquina resolve a complexidade para que o time foque na estratégia.",
        copyEn: "Real-time route and stock recalculation. The machine solves complexity so the team can focus on strategy."
      }
    ]
  },
  {
    level: "Estratégico",
    levelEn: "Strategic",
    titlePt: "Centro de Comando Preditivo",
    titleEn: "Predictive Command Center",
    subtitlePt: "Da Intuição para a Certeza Baseada em Dados",
    subtitleEn: "From Intuition to Data Certainty",
    classes: {
      text: "text-warning",
      bg: "bg-warning",
      border: "border-warning/30",
      bgSubtle: "bg-warning/5",
      shadow: "shadow-[0_0_30px_rgba(245,158,11,0.2)]",
      gradient: "from-warning/20 to-transparent",
    },
    icon: Rocket,
    departments: [
      {
        namePt: "Finanças & ROI",
        nameEn: "Finance & ROI",
        metric: "+25%",
        metricLabelPt: "Aumento na Margem de Lucro",
        metricLabelEn: "Profit Margin Increase",
        copyPt: "A IA identifica onde você está perdendo dinheiro antes mesmo do fechamento do mês. Decisões guiadas por previsibilidade real.",
        copyEn: "AI identifies where you're losing money even before the month ends. Decisions guided by real predictability."
      },
      {
        namePt: "Diretoria & Expansão",
        nameEn: "Board & Expansion",
        metric: "95%",
        metricLabelPt: "Precisão em Forecast",
        metricLabelEn: "Forecast Accuracy",
        copyPt: "Simulação de cenários futuros seguros. Decisões de investimento agressivas baseadas no comportamento real do mercado.",
        copyEn: "Secure future scenario simulation. Aggressive investment decisions based on real market behavior."
      }
    ]
  }
];

export default function BeforeAfter() {
  const { t } = useLanguage();
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
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-success/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-warning/10 blur-[150px] rounded-full" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <span className="text-xs font-bold uppercase text-accent tracking-[0.3em] mb-4 block">
            {t("Escada de Maturidade", "Maturity Ladder")}
          </span>
          <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight tracking-tighter">
            {t(
              "A Evolução da sua Operação.",
              "The Evolution of your Operation."
            )}
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto font-medium">
            {t(
              "Não instalamos ferramentas. Construímos camadas de inteligência que transformam o esforço braçal em lucratividade estratégica.",
              "We don't install tools. We build intelligence layers that transform manual effort into strategic profitability."
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
            className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-success via-accent to-warning shadow-[0_0_20px_rgba(255,255,255,0.2)] origin-top z-0 md:-translate-x-1/2"
          />

          <div className="space-y-32">
            {layers.map((layer, idx) => {
              const Icon = layer.icon;
              const isEven = idx % 2 === 0;

              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-center gap-12 md:gap-0">
                  
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
                                <div className="flex justify-between items-start mb-8">
                                   <h4 className="font-bold text-xl text-foreground/90">{t(dept.namePt, dept.nameEn)}</h4>
                                   <div className={`text-3xl font-black ${layer.classes.text} tracking-tighter`}>
                                      {dept.metric}
                                   </div>
                                </div>
                                
                                <div className="mb-6">
                                   <div className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">
                                      Impacto Localizado
                                   </div>
                                   <div className="text-xs font-bold text-foreground/70">
                                      {t(dept.metricLabelPt, dept.metricLabelEn)}
                                   </div>
                                </div>

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
      </div>
    </section>
  );
}
