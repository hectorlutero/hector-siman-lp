"use client";

import { motion } from "framer-motion";
import { Banknote, Headphones, Users, Scale, Briefcase, Sparkles, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "../ui/Button";

interface Opportunity {
  impactPt: string;
  impactEn: string;
  processPt: string;
  processEn: string;
}

interface SectorBlock {
  id: string;
  icon: LucideIcon;
  namePt: string;
  nameEn: string;
  taglinePt: string;
  taglineEn: string;
  layers: {
    operacional: Opportunity;
    tatico: Opportunity;
    estrategico: Opportunity;
  };
}

const layerMeta = [
  {
    key: "operacional" as const,
    labelPt: "Operacional",
    labelEn: "Operational",
    text: "text-bronze",
    chipClass: "bg-bronze/15 border border-bronze/40 text-bronze",
  },
  {
    key: "tatico" as const,
    labelPt: "Tático",
    labelEn: "Tactical",
    text: "text-silver",
    chipClass: "bg-silver/15 border border-silver/40 text-silver",
  },
  {
    key: "estrategico" as const,
    labelPt: "Estratégico",
    labelEn: "Strategic",
    text: "text-gold",
    chipClass: "bg-gold/15 border border-gold/40 text-gold",
  },
];

const sectorBlocks: SectorBlock[] = [
  {
    id: "financas",
    icon: Banknote,
    namePt: "Finanças",
    nameEn: "Finance",
    taglinePt: "Controle de margem, fluxo de caixa e previsibilidade.",
    taglineEn: "Margin control, cash flow, and predictability.",
    layers: {
      operacional: {
        impactPt: "~120h/mês liberadas",
        impactEn: "~120h/month freed",
        processPt: "Conciliação bancária automatizada",
        processEn: "Automated bank reconciliation",
      },
      tatico: {
        impactPt: "R$ 15k/mês recuperados",
        impactEn: "R$ 15k/month recovered",
        processPt: "Análise de margem em tempo real",
        processEn: "Real-time margin analysis",
      },
      estrategico: {
        impactPt: "+8% na margem de lucro",
        impactEn: "+8% profit margin",
        processPt: "Modelagem de pricing dinâmico",
        processEn: "Dynamic pricing modeling",
      },
    },
  },
  {
    id: "atendimento",
    icon: Headphones,
    namePt: "Atendimento",
    nameEn: "Customer Support",
    taglinePt: "Suporte 24/7, NPS alto e demanda estruturalmente menor.",
    taglineEn: "24/7 support, high NPS, structurally lower demand.",
    layers: {
      operacional: {
        impactPt: "70% dos tickets sem humano",
        impactEn: "70% of tickets resolved AI-only",
        processPt: "Agente IA de 1ª linha 24/7",
        processEn: "24/7 AI tier-1 agent",
      },
      tatico: {
        impactPt: "Detecção precoce de churn",
        impactEn: "Early churn detection",
        processPt: "Análise de sentimento por conversa",
        processEn: "Per-conversation sentiment analysis",
      },
      estrategico: {
        impactPt: "Redução estrutural de tickets",
        impactEn: "Structural ticket reduction",
        processPt: "Mapa de causas-raiz da demanda",
        processEn: "Demand root-cause mapping",
      },
    },
  },
  {
    id: "rh",
    icon: Users,
    namePt: "Recursos Humanos",
    nameEn: "People & HR",
    taglinePt: "Recrutar mais rápido, reter mais e medir cultura em tempo real.",
    taglineEn: "Hire faster, retain more, measure culture in real time.",
    layers: {
      operacional: {
        impactPt: "100h/mês reduzidas de recrutamento",
        impactEn: "100h/month off recruiting",
        processPt: "Triagem de currículos por IA",
        processEn: "AI résumé screening",
      },
      tatico: {
        impactPt: "Retenção de talentos-chave",
        impactEn: "Key talent retention",
        processPt: "Análise preditiva de turnover",
        processEn: "Predictive turnover analysis",
      },
      estrategico: {
        impactPt: "Headcount alinhado a meta",
        impactEn: "Headcount aligned to goals",
        processPt: "Workforce planning data-driven",
        processEn: "Data-driven workforce planning",
      },
    },
  },
  {
    id: "juridico",
    icon: Scale,
    namePt: "Jurídico",
    nameEn: "Legal",
    taglinePt: "Análise contratual, compliance e mitigação de risco assistidos.",
    taglineEn: "Contract analysis, compliance, and risk mitigation, AI-assisted.",
    layers: {
      operacional: {
        impactPt: "~150h/mês liberadas",
        impactEn: "~150h/month freed",
        processPt: "Análise contratual por IA",
        processEn: "AI contract review",
      },
      tatico: {
        impactPt: "Zero perda de prazo",
        impactEn: "Zero missed deadlines",
        processPt: "Gestão automatizada de prazos e obrigações",
        processEn: "Automated deadline & obligation tracking",
      },
      estrategico: {
        impactPt: "Visão consolidada do risco",
        impactEn: "Consolidated risk view",
        processPt: "Mapa de exposição jurídica",
        processEn: "Legal exposure mapping",
      },
    },
  },
  {
    id: "diretoria",
    icon: Briefcase,
    namePt: "Diretoria",
    nameEn: "Executive Board",
    taglinePt: "Visibilidade total da empresa e decisão sem palpite.",
    taglineEn: "Full company visibility and zero-guesswork decisions.",
    layers: {
      operacional: {
        impactPt: "Tempo de leitura 5× menor",
        impactEn: "5× faster reading",
        processPt: "Reports executivos gerados por IA",
        processEn: "AI-generated executive reports",
      },
      tatico: {
        impactPt: "Empresa inteira em 1 tela",
        impactEn: "Whole company on one screen",
        processPt: "Dashboard de KPIs unificado",
        processEn: "Unified KPI dashboard",
      },
      estrategico: {
        impactPt: "95% de precisão em forecast",
        impactEn: "95% forecast accuracy",
        processPt: "Forecast estratégico de 12-36 meses",
        processEn: "12–36 month strategic forecasting",
      },
    },
  },
];

export function SectorOpportunities() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      {/* Disclaimer — research-based potential */}
      <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10">
        <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] text-muted/70">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
          {t(
            "Potencial estimado · baseado em pesquisas e benchmarks de mercado",
            "Estimated potential · based on research and industry benchmarks",
          )}
        </span>
      </div>

      <div className="space-y-8 md:space-y-10">
        {sectorBlocks.map((sector, idx) => {
          const Icon = sector.icon;
          return (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="rounded-2xl glass-strong border border-white/10 p-6 md:p-10"
            >
              <div className="flex items-start gap-4 md:gap-5 mb-6 md:mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
                  <Icon size={24} className="text-accent" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted/70 mb-1">
                    {t("Setor", "Sector")} · 0{idx + 1}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                    {t(sector.namePt, sector.nameEn)}
                  </h3>
                  <p className="text-sm md:text-base text-muted/85 mt-1.5 leading-snug">
                    {t(sector.taglinePt, sector.taglineEn)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {layerMeta.map((layer) => {
                  const opp = sector.layers[layer.key];
                  return (
                    <div
                      key={layer.key}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.015] p-6 md:p-7 flex flex-col"
                    >
                      <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] ${layer.text} mb-5 md:mb-6`}>
                        <span className="w-1 h-1 rounded-full bg-current" aria-hidden="true" />
                        {t(layer.labelPt, layer.labelEn)}
                      </div>
                      <div className="text-xl md:text-2xl font-semibold leading-[1.2] tracking-tight text-foreground/95 mb-6 md:mb-7">
                        {t(opp.impactPt, opp.impactEn)}
                      </div>
                      <div className="mt-auto pt-5 md:pt-6 border-t border-white/[0.08]">
                        <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.28em] text-muted/55 mb-3">
                          {t("Processo automatizado", "Process automated")}
                        </div>
                        <span
                          className={`inline-flex items-start text-sm md:text-base font-bold leading-snug tracking-tight rounded-lg px-3.5 py-2 ${layer.chipClass}`}
                        >
                          {t(opp.processPt, opp.processEn)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {/* Meta-proof card — this very site, built using the method */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[#2563eb] via-[#7c3aed] to-[#2563eb] shadow-[0_0_50px_rgba(37,99,235,0.25),0_0_100px_rgba(124,58,237,0.18)]"
        >
          <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-[#2563eb]/20 via-[#7c3aed]/15 to-transparent blur-3xl pointer-events-none" />
          <div className="relative rounded-2xl bg-background/95 backdrop-blur-xl p-6 md:p-10 overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#7c3aed]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#2563eb]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-start gap-4 md:gap-5 mb-6 md:mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#7c3aed] border border-white/20 flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(37,99,235,0.4)]">
                  <Sparkles size={22} className="text-white" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    {t("Prova ao vivo", "Live proof")}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                    {t("Inclusive este site é a prova.", "This very site is the proof.")}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/80 mt-2 leading-snug max-w-2xl">
                    {t(
                      "Estratégia, copy, design e desenvolvimento — em 30 minutos. Trabalho de uma agência inteira, feito por um único profissional com a nossa metodologia.",
                      "Strategy, copy, design, and development — in 30 minutes. An entire agency's worth of work, delivered by one professional using our method.",
                    )}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                {[
                  {
                    valuePt: "30 min",
                    valueEn: "30 min",
                    labelPt: "Tempo real de execução",
                    labelEn: "Actual delivery time",
                    accent: true,
                  },
                  {
                    valuePt: "1–3 meses",
                    valueEn: "1–3 months",
                    labelPt: "Caminho tradicional",
                    labelEn: "Traditional path",
                  },
                  {
                    valuePt: "~99,7%",
                    valueEn: "~99.7%",
                    labelPt: "Tempo economizado",
                    labelEn: "Time saved",
                    accent: true,
                  },
                  {
                    valuePt: "~US$ 48k",
                    valueEn: "~US$ 48k",
                    labelPt: "Custo evitado · taxa dev sênior EUA",
                    labelEn: "Cost avoided · US senior dev rate",
                    accent: true,
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 md:p-5"
                  >
                    <div
                      className={`text-2xl md:text-3xl font-bold leading-[1.1] tracking-tight tabular-nums mb-1.5 ${
                        stat.accent
                          ? "bg-gradient-to-br from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent"
                          : "text-foreground/85"
                      }`}
                    >
                      {t(stat.valuePt, stat.valueEn)}
                    </div>
                    <div className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-muted/65 leading-snug">
                      {t(stat.labelPt, stat.labelEn)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 pt-5 md:pt-6 border-t border-white/[0.08]">
                <p className="text-sm md:text-base text-muted/85 leading-relaxed flex-1">
                  {t(
                    "É a mesma metodologia que aplicamos na sua operação. O que demoraria meses passa a rodar em horas.",
                    "It's the same method we apply to your operation. What used to take months now runs in hours.",
                  )}
                </p>
                <Button
                  variant="primary"
                  href="https://calendar.app.google/WQGLZTfmwWmbo5AP7"
                  external
                >
                  {t("Quero o mesmo na minha empresa", "I want this for my company")}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
