"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, Zap } from "lucide-react";

const layers = [
  {
    layerPt: "Estratégico",
    layerEn: "Strategic",
    subtitlePt: "Decisão & Impacto Financeiro",
    subtitleEn: "Decision & Financial Impact",
    classes: {
      text: "text-warning",
      bg: "bg-warning",
      border: "border-warning",
      bgSubtle: "bg-warning/10",
      borderSubtle: "border-warning/20",
      shadow: "shadow-[0_0_15px_rgba(245,158,11,0.4)]",
      glow: "from-warning/10",
    },
    icon: TrendingUp,
    departments: [
      {
        namePt: "Controladoria & Finanças",
        nameEn: "Finance & Controlling",
        metric: "+25%",
        metricLabelPt: "Redução em Custos",
        metricLabelEn: "Cost Reduction",
        copyPt: "Decisões guiadas por análises em tempo real. A IA identifica gargalos instantaneamente, substituindo relatórios defasados.",
        copyEn: "Decisions guided by real-time analysis. AI identifies bottlenecks instantly, replacing outdated reports."
      },
      {
        namePt: "Diretoria de Vendas",
        nameEn: "Sales Leadership",
        metric: "95%",
        metricLabelPt: "Precisão em Forecast",
        metricLabelEn: "Forecast Accuracy",
        copyPt: "Modelos preditivos antecipam demandas de mercado, permitindo estratégias de expansão muito mais seguras.",
        copyEn: "Predictive models anticipate market demands, allowing for much safer expansion strategies."
      }
    ]
  },
  {
    layerPt: "Tático",
    layerEn: "Tactical",
    subtitlePt: "Gestão & Qualificação de Tempo",
    subtitleEn: "Management & Time Qualification",
    classes: {
      text: "text-accent",
      bg: "bg-accent",
      border: "border-accent",
      bgSubtle: "bg-accent/10",
      borderSubtle: "border-accent/20",
      shadow: "shadow-[0_0_15px_rgba(139,92,246,0.4)]",
      glow: "from-accent/10",
    },
    icon: Users,
    departments: [
      {
        namePt: "Gestão de Pessoas (RH)",
        nameEn: "HR & People",
        metric: "40%",
        metricLabelPt: "Tempo focado em Qualidade",
        metricLabelEn: "Time focused on Quality",
        copyPt: "Gestores deixam de ser tiradores de dúvidas (tarefa da IA) e passam a focar em cultura e desenvolvimento.",
        copyEn: "Managers stop being Q&A bots (now handled by AI) and focus on culture and development."
      },
      {
        namePt: "Logística & Supply",
        nameEn: "Logistics & Supply Chain",
        metric: "3x+",
        metricLabelPt: "Velocidade de Planejamento",
        metricLabelEn: "Planning Speed",
        copyPt: "Rotas, frota e estoque otimizados antecipadamente. Os coordenadores gerenciam a estratégia, a máquina resolve o fluxo.",
        copyEn: "Routes, fleet, and stock optimized in advance. Coordinators manage strategy, the machine solves the flow."
      }
    ]
  },
  {
    layerPt: "Operacional",
    layerEn: "Operational",
    subtitlePt: "Execução & Redução de Esforço",
    subtitleEn: "Execution & Effort Reduction",
    classes: {
      text: "text-success",
      bg: "bg-success",
      border: "border-success",
      bgSubtle: "bg-success/10",
      borderSubtle: "border-success/20",
      shadow: "shadow-[0_0_15px_rgba(16,185,129,0.4)]",
      glow: "from-success/10",
    },
    icon: Zap,
    departments: [
      {
        namePt: "Backoffice & Administrativo",
        nameEn: "Backoffice & Admin",
        metric: "40h",
        metricLabelPt: "Redução de Trabalho Braçal",
        metricLabelEn: "Manual Work Reduction",
        copyPt: "Leitura de notas fiscais e atualizações de permissões feitas em milissegundos com 0% de erro humano.",
        copyEn: "Invoice reading and permission updates done in milliseconds with 0% human error."
      },
      {
        namePt: "Atendimento & Operação",
        nameEn: "Support & Operations",
        metric: "2 Min",
        metricLabelPt: "Tempo de Resposta 24/7",
        metricLabelEn: "Response Time 24/7",
        copyPt: "IA qualifica leads e agenda reuniões instantaneamente. O time foca apenas no relacionamento e fechamento.",
        copyEn: "AI qualifies leads and books meetings instantly. The team focuses purely on relationship and closing."
      }
    ]
  }
];

export default function BeforeAfter() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 px-6 relative overflow-hidden" id="resultados">
      {/* Background Gradient Layer Simulation */}
      <div className="absolute inset-0 z-0 pointer-events-none flex flex-col opacity-20">
        <div className="flex-1 bg-gradient-to-b from-warning/30 to-transparent" />
        <div className="flex-1 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
        <div className="flex-1 bg-gradient-to-t from-success/30 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span className="text-xs font-bold uppercase text-accent tracking-widest mb-3 block">
            {t("O Mapa da Empresa", "The Business Map")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
            {t(
              "A IA aumenta drasticamente a velocidade de entrega dos seus projetos.",
              "AI drastically increases your project delivery speed."
            )}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {t(
              "Impacto medido e validado em três camadas de resolução dentro da sua operação, da base até a diretoria.",
              "Impact measured and validated across three resolution layers within your operation, from floor to board."
            )}
          </p>
        </motion.div>

        {/* The Blueprint Map */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          
          {/* Central Spine (Background Track) */}
          <div className="absolute left-6 md:left-[30%] top-8 bottom-12 w-[2px] bg-white/5" />
          
          {/* Central Spine (Animated Light Path) */}
          <motion.div 
            style={{ height: pathHeight }}
            className="absolute left-6 md:left-[30%] top-8 w-[2px] bg-gradient-to-b from-warning via-accent to-success shadow-[0_0_15px_rgba(255,255,255,0.3)] origin-top z-0"
          />

          <div className="space-y-16 sm:space-y-24">
            {layers.map((layer, idx) => {
              const Icon = layer.icon;
              return (
                <div key={idx} className="relative flex flex-col md:flex-row gap-8 md:gap-16">
                  
                  {/* Glowing Node on the Spine */}
                  <div className={`absolute left-6 md:left-[30%] top-10 w-4 h-4 -translate-x-[7px] rounded-full bg-background border-2 ${layer.classes.border} z-10 flex items-center justify-center ${layer.classes.shadow}`}>
                     <div className={`w-1.5 h-1.5 rounded-full ${layer.classes.bg} animate-pulse`} />
                  </div>

                  {/* Left Column: Layer Details & Icon */}
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="pl-16 md:pl-0 md:w-[30%] md:pr-12 md:text-right pt-7 flex flex-col md:items-end"
                  >
                     <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-[2rem] ${layer.classes.bgSubtle} border border-white/10 shadow-2xl mb-6 flex-shrink-0 group ${layer.classes.shadow} flex items-center justify-center overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-3xl`}>
                        {/* Ambient Glow */}
                        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${layer.classes.glow} via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
                        
                        {/* Icon */}
                        <Icon size={56} className={`${layer.classes.text} drop-shadow-[0_0_15px_currentColor] relative z-10 transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-1`} strokeWidth={1.5} />
                     </div>
                     <h3 className={`text-3xl font-black ${layer.classes.text} uppercase tracking-tight`}>
                       {t(layer.layerPt, layer.layerEn)}
                     </h3>
                     <p className="text-sm text-foreground font-semibold mt-2 opacity-80 uppercase tracking-wider">
                       {t(layer.subtitlePt, layer.subtitleEn)}
                     </p>
                  </motion.div>

                  {/* Right Column: Departments Grid */}
                  <div className="pl-16 md:pl-8 md:w-[70%] grid sm:grid-cols-2 gap-6 pb-2">
                     {layer.departments.map((dept, dIdx) => (
                       <motion.div 
                         key={dIdx} 
                         initial={{ opacity: 0, y: 30 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true, margin: "-50px" }}
                         transition={{ duration: 0.5, delay: dIdx * 0.15 }}
                         className="glass rounded-2xl p-8 border-t border-card-border/50 hover:bg-white/[0.03] transition-colors relative overflow-hidden group"
                       >
                          {/* Ambient Glow */}
                          <div className={`absolute -inset-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${layer.classes.glow} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl`} />
                          
                          <div className="relative z-10">
                             <h4 className="font-bold text-lg mb-6 text-foreground/90">{t(dept.namePt, dept.nameEn)}</h4>
                             <div className="mb-5">
                               <div className={`text-5xl font-extrabold ${layer.classes.text} leading-none mb-2 tracking-tighter drop-shadow-sm`}>
                                 {dept.metric}
                               </div>
                               <div className="text-[10px] font-black uppercase tracking-widest text-muted">
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
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

