"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Building2, 
  Users, 
  Briefcase, 
  Cpu, 
  Truck, 
  TrendingUp, 
  ShieldCheck, 
  Headset,
  Zap,
  Target
} from "lucide-react";

interface Sector {
  id: string;
  namePt: string;
  nameEn: string;
  descriptionPt: string;
  descriptionEn: string;
  roiPt: string;
  roiEn: string;
  icon: any;
  color: string;
  gridPos: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

const sectors: Sector[] = [
  {
    id: "executive",
    namePt: "Diretoria",
    nameEn: "Executive",
    descriptionPt: "Alertas de desvios em tempo real com diagnóstico de causa raiz. Decisões estratégicas baseadas em dados vivos.",
    descriptionEn: "Real-time variance alerts with root cause diagnosis. Strategic decisions based on live data.",
    roiPt: "Até R$ 88k/mês em eficiência decisória.",
    roiEn: "Up to $15k/mo in decision efficiency.",
    icon: Target,
    color: "var(--color-warning)",
    gridPos: { x: 4, y: 0, w: 4, h: 2 },
  },
  {
    id: "finance",
    namePt: "Finanças",
    nameEn: "Finance",
    descriptionPt: "Automação total de contas a pagar/receber e conciliação. Eliminação de 90% do trabalho manual.",
    descriptionEn: "Full AP/AR automation and reconciliation. 90% elimination of manual work.",
    roiPt: "Economia de R$ 13.500/mês.",
    roiEn: "Savings of $2,500/mo.",
    icon: TrendingUp,
    color: "var(--color-success)",
    gridPos: { x: 0, y: 0, w: 3, h: 3 },
  },
  {
    id: "sales",
    namePt: "Vendas & Growth",
    nameEn: "Sales & Growth",
    descriptionPt: "Qualificação de leads e resposta imediata 24/7. Velocidade que dobra as taxas de conversão.",
    descriptionEn: "Lead qualification and 24/7 immediate response. Speed that doubles conversion rates.",
    roiPt: "Ganho de R$ 18.000/mês.",
    roiEn: "Gain of $3,500/mo.",
    icon: Zap,
    color: "var(--color-accent)",
    gridPos: { x: 9, y: 0, w: 3, h: 4 },
  },
  {
    id: "operations",
    namePt: "Operações",
    nameEn: "Operations",
    descriptionPt: "Otimização de fluxos e documentação automática. Eliminação de gargalos invisíveis.",
    descriptionEn: "Workflow optimization and automatic documentation. Elimination of invisible bottlenecks.",
    roiPt: "35% mais eficiência produtiva.",
    roiEn: "35% more productive efficiency.",
    icon: Cpu,
    color: "var(--color-accent-light)",
    gridPos: { x: 4, y: 3, w: 4, h: 3 },
  },
  {
    id: "hr",
    namePt: "RH",
    nameEn: "HR",
    descriptionPt: "Triagem inteligente de currículos (Semanas -> Horas). Foco total em cultura e retenção.",
    descriptionEn: "Intelligent resume screening (Weeks -> Hours). Total focus on culture and retention.",
    roiPt: "Economia de R$ 9.450/mês.",
    roiEn: "Savings of $1,800/mo.",
    icon: Users,
    color: "var(--color-accent)",
    gridPos: { x: 0, y: 4, w: 3, h: 4 },
  },
  {
    id: "logistics",
    namePt: "Logística",
    nameEn: "Logistics",
    descriptionPt: "Roteirização inteligente e previsão de demanda. Redução drástica de desperdício.",
    descriptionEn: "Intelligent routing and demand forecasting. Drastic reduction in waste.",
    roiPt: "Redução de 25% nos custos.",
    roiEn: "25% reduction in costs.",
    icon: Truck,
    color: "var(--color-warning)",
    gridPos: { x: 4, y: 7, w: 4, h: 1 },
  },
  {
    id: "it",
    namePt: "TI & Segurança",
    nameEn: "IT & Security",
    descriptionPt: "Automação de 80% dos chamados N1. Monitoramento proativo anti-interrupções.",
    descriptionEn: "Automation of 80% of L1 tickets. Proactive anti-interruption monitoring.",
    roiPt: "Economia de R$ 10.800/mês.",
    roiEn: "Savings of $2,000/mo.",
    icon: ShieldCheck,
    color: "var(--color-success)",
    gridPos: { x: 8, y: 5, w: 4, h: 3 },
  },
  {
    id: "cs",
    namePt: "Customer Success",
    nameEn: "Customer Success",
    descriptionPt: "Identificação proativa de churn e atendimento ultra-rápido via IA.",
    descriptionEn: "Proactive churn identification and ultra-fast AI support.",
    roiPt: "Redução de 15% no Churn.",
    roiEn: "15% reduction in Churn.",
    icon: Headset,
    color: "var(--color-accent-light)",
    gridPos: { x: 9, y: 4, w: 3, h: 1 },
  }
];

export default function EnterpriseMap() {
  const { t } = useLanguage();
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden border-t border-white/5">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
           style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20"
          >
            <span className="text-xs font-bold uppercase text-accent tracking-widest">
              {t("Oportunidades de Impacto", "Impact Opportunities")}
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-6 tracking-tight"
          >
            {t("Onde o Dinheiro Está na Mesa", "Where the Money is on the Table")}
          </motion.h2>
          <p className="text-muted max-w-2xl mx-auto text-lg font-medium opacity-80">
            {t(
              "O Blueprint da empresa moderna: visualize o impacto monetário real em cada m² da sua operação.",
              "The modern enterprise blueprint: visualize the real monetary impact in every m² of your operation."
            )}
          </p>
        </div>

        {/* Main Container with better aspect ratio control */}
        <div className="relative w-full max-w-6xl mx-auto">
          
          <div className="relative aspect-[16/10] md:aspect-[2/1] lg:aspect-[2.4/1] w-full glass rounded-[2.5rem] border-white/10 p-2 md:p-6 shadow-3xl">
            
            {/* Technical Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <svg width="100%" height="100%" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  {[...Array(13)].map((_, i) => (
                    <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="800" stroke="var(--color-accent)" strokeWidth="1" />
                  ))}
                  {[...Array(9)].map((_, i) => (
                    <line key={`h-${i}`} x1="0" y1={i * 100} x2="1200" y2={i * 100} stroke="var(--color-accent)" strokeWidth="1" />
                  ))}
               </svg>
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-12 grid-rows-8 gap-1.5 md:gap-3 h-full relative z-10">
              {sectors.map((sector) => {
                const Icon = sector.icon;
                const isHovered = hoveredSector === sector.id;

                return (
                  <motion.div
                    key={sector.id}
                    style={{
                      gridColumn: `${sector.gridPos.x + 1} / span ${sector.gridPos.w}`,
                      gridRow: `${sector.gridPos.y + 1} / span ${sector.gridPos.h}`,
                      borderColor: isHovered ? sector.color : "rgba(255,255,255,0.1)",
                      backgroundColor: isHovered ? `${sector.color}20` : "rgba(255,255,255,0.03)"
                    }}
                    onMouseEnter={() => setHoveredSector(sector.id)}
                    onMouseLeave={() => setHoveredSector(null)}
                    className="relative border rounded-xl md:rounded-2xl transition-all duration-300 cursor-pointer group flex items-center justify-center"
                  >
                    {/* Small Sector Label */}
                    <div className="absolute top-1.5 left-2 md:top-2 md:left-3 opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="text-[7px] md:text-[9px] font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: sector.color }}>
                        {t(sector.namePt, sector.nameEn)}
                      </span>
                    </div>

                    {/* Icon with scaling */}
                    <motion.div
                      animate={{ 
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? [0, -5, 5, 0] : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="p-1.5 md:p-3 rounded-xl relative z-10"
                      style={{ color: sector.color }}
                    >
                      <Icon className="w-5 h-5 md:w-8 md:h-8" strokeWidth={1.5} />
                    </motion.div>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 md:w-72 glass-strong p-5 rounded-3xl z-[100] shadow-4xl border-white/10 pointer-events-none"
                        >
                           <div className="flex items-center gap-3 mb-3">
                             <div className="p-2 rounded-lg bg-white/5" style={{ color: sector.color }}>
                               <Icon size={16} />
                             </div>
                             <h4 className="font-bold text-xs md:text-sm">{t(sector.namePt, sector.nameEn)}</h4>
                           </div>
                           
                           <p className="text-[11px] md:text-[13px] text-muted leading-relaxed mb-4">
                             {t(sector.descriptionPt, sector.descriptionEn)}
                           </p>

                           <div className="pt-3 border-t border-white/5">
                              <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-1">Impacto Financeiro</div>
                              <div className={`text-xs md:text-sm font-bold ${sector.id === 'executive' ? 'text-warning' : 'text-foreground'}`}>
                                 {t(sector.roiPt, sector.roiEn)}
                              </div>
                           </div>
                           
                           <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white/10" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Global Impact Card - Positioned Below */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 glass rounded-[2.5rem] p-8 md:px-12 border-warning/20 shadow-2xl"
          >
             <div className="flex flex-col gap-2">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-warning/80">Custo de Ineficiência (Mensal)</span>
                <div className="text-4xl md:text-6xl font-black text-warning tracking-tighter flex items-baseline gap-2">
                   R$ 64.250,00
                   <span className="text-lg md:text-2xl opacity-50 font-medium">/mês</span>
                </div>
             </div>
             
             <div className="w-full md:w-[45%]">
                <p className="text-sm md:text-base text-muted font-medium leading-relaxed">
                   {t(
                     "Este é o capital que sua empresa deixa de lucrar mensalmente ao não automatizar esses 8 centros de custo.",
                     "This is the capital your company stops profiting monthly by not automating these 8 cost centers."
                   )}
                </p>
                <div className="mt-4 flex items-center gap-2 text-warning/80 text-xs font-bold uppercase tracking-wider">
                   <TrendingUp size={16} />
                   ROI Estimado em 6 Meses
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
