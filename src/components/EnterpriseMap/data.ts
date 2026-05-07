// landing-page/src/components/EnterpriseMap/data.ts
import type { LucideIcon } from "lucide-react";
import { Megaphone, Zap, Headset, TrendingUp, Briefcase, Cog, Users, ShieldCheck } from "lucide-react";

export type LayerKey = "operacional" | "tatico" | "estrategico";

export type SectorId =
  | "marketing"
  | "vendas"
  | "atendimento"
  | "financas"
  | "diretoria"
  | "operacoes"
  | "rh"
  | "ti";

export interface Layer {
  key: LayerKey;
  titlePt: string;
  titleEn: string;
  descPt: string;
  descEn: string;
  resultPt: string;
  resultEn: string;
}

export interface Sector {
  id: SectorId;
  namePt: string;
  nameEn: string;
  icon: LucideIcon;
  order: number;
  layers: { op: Layer; tat: Layer; est: Layer };
}

export const LAYER_STYLE: Record<
  LayerKey,
  {
    stroke: string;
    fill: string;
    headerBg: string;
    label: string;
    iconUnicode: string;
  }
> = {
  operacional: {
    stroke: "var(--color-bronze)",
    fill: "rgba(205,127,50,0.06)",
    headerBg: "rgba(205,127,50,0.18)",
    label: "OPERACIONAL",
    iconUnicode: "⚙",
  },
  tatico: {
    stroke: "var(--color-silver)",
    fill: "rgba(192,200,208,0.06)",
    headerBg: "rgba(192,200,208,0.18)",
    label: "TÁTICO",
    iconUnicode: "◆",
  },
  estrategico: {
    stroke: "var(--color-gold)",
    fill: "rgba(212,175,55,0.06)",
    headerBg: "rgba(212,175,55,0.18)",
    label: "ESTRATÉGICO",
    iconUnicode: "★",
  },
};

export const sectors: Sector[] = [
  {
    id: "marketing",
    namePt: "Marketing",
    nameEn: "Marketing",
    icon: Megaphone,
    order: 1,
    layers: {
      op: {
        key: "operacional",
        titlePt: "SEO automático",
        titleEn: "Automated SEO",
        descPt: "Geração e agendamento auto. de conteúdo SEO",
        descEn: "AI-driven SEO content generation and scheduling",
        resultPt: "-3h/dia",
        resultEn: "-3h/day",
      },
      tat: {
        key: "tatico",
        titlePt: "Atribuição IA",
        titleEn: "AI Attribution",
        descPt: "Atribuição multi-touch IA cruzando canais",
        descEn: "Multi-touch AI attribution across channels",
        resultPt: "-25% CAC",
        resultEn: "-25% CAC",
      },
      est: {
        key: "estrategico",
        titlePt: "Posicionamento estratégico",
        titleEn: "Strategic positioning",
        descPt: "Cenários macro & posicionamento de mercado",
        descEn: "Macro scenarios & market positioning",
        resultPt: "+12% mkt share",
        resultEn: "+12% mkt share",
      },
    },
  },
  {
    id: "vendas",
    namePt: "Vendas",
    nameEn: "Sales",
    icon: Zap,
    order: 2,
    layers: {
      op: {
        key: "operacional",
        titlePt: "Qualificação 24/7",
        titleEn: "24/7 Lead qualification",
        descPt: "Qualificação de leads e resposta 24/7",
        descEn: "AI lead qualification and 24/7 response",
        resultPt: "+R$ 18k/mês",
        resultEn: "+$3.5k/mo",
      },
      tat: {
        key: "tatico",
        titlePt: "Forecasting de pipeline",
        titleEn: "Pipeline forecasting",
        descPt: "Forecasting de pipeline e priorização",
        descEn: "Pipeline forecasting and AI prioritization",
        resultPt: "+30% conversão",
        resultEn: "+30% conversion",
      },
      est: {
        key: "estrategico",
        titlePt: "Expansão de TAM",
        titleEn: "TAM expansion",
        descPt: "Identificação de TAM e expansão de mercado",
        descEn: "TAM identification and market expansion",
        resultPt: "+R$ 2M/ano",
        resultEn: "+$400k/yr",
      },
    },
  },
  {
    id: "atendimento",
    namePt: "Atendimento",
    nameEn: "Customer Support",
    icon: Headset,
    order: 3,
    layers: {
      op: {
        key: "operacional",
        titlePt: "Triagem automática",
        titleEn: "Auto triage",
        descPt: "Triagem inicial e respostas automáticas",
        descEn: "Initial triage and automated responses",
        resultPt: "-70% tempo",
        resultEn: "-70% time",
      },
      tat: {
        key: "tatico",
        titlePt: "Detecção de churn",
        titleEn: "Churn detection",
        descPt: "Detecção proativa de risco de cancelamento",
        descEn: "Proactive cancellation risk detection",
        resultPt: "-15% churn",
        resultEn: "-15% churn",
      },
      est: {
        key: "estrategico",
        titlePt: "Insights de produto",
        titleEn: "Product insights",
        descPt: "Insights de produto a partir de feedback",
        descEn: "Product insights from feedback patterns",
        resultPt: "+R$ 800k/ano",
        resultEn: "+$160k/yr",
      },
    },
  },
  {
    id: "financas",
    namePt: "Finanças",
    nameEn: "Finance",
    icon: TrendingUp,
    order: 4,
    layers: {
      op: {
        key: "operacional",
        titlePt: "Conciliação automática",
        titleEn: "Auto reconciliation",
        descPt: "Conciliação bancária e AP/AR automatizados",
        descEn: "Bank reconciliation and AP/AR automation",
        resultPt: "+R$ 13,5k/mês",
        resultEn: "+$2.5k/mo",
      },
      tat: {
        key: "tatico",
        titlePt: "Cash flow live",
        titleEn: "Live cash flow",
        descPt: "Forecast de fluxo de caixa em tempo real",
        descEn: "Real-time cash flow forecasting",
        resultPt: "-30% capital giro",
        resultEn: "-30% working capital",
      },
      est: {
        key: "estrategico",
        titlePt: "Cenários M&A",
        titleEn: "M&A scenarios",
        descPt: "Cenários de M&A e alocação estratégica",
        descEn: "M&A scenarios and strategic allocation",
        resultPt: "+R$ 2M/ano",
        resultEn: "+$400k/yr",
      },
    },
  },
  {
    id: "diretoria",
    namePt: "Diretoria",
    nameEn: "Executive",
    icon: Briefcase,
    order: 5,
    layers: {
      op: {
        key: "operacional",
        titlePt: "Dashboards live",
        titleEn: "Live dashboards",
        descPt: "Métricas críticas em tempo real",
        descEn: "Critical KPIs in real time",
        resultPt: "10× decisão",
        resultEn: "10× decisions",
      },
      tat: {
        key: "tatico",
        titlePt: "Alertas de variância",
        titleEn: "Variance alerts",
        descPt: "Alertas de desvio com causa raiz",
        descEn: "Variance alerts with root cause",
        resultPt: "+R$ 88k/mês",
        resultEn: "+$15k/mo",
      },
      est: {
        key: "estrategico",
        titlePt: "Cenários macro",
        titleEn: "Macro scenarios",
        descPt: "Simulação de cenários com IA",
        descEn: "AI-driven scenario planning",
        resultPt: "+R$ 5M/ano",
        resultEn: "+$1M/yr",
      },
    },
  },
  {
    id: "operacoes",
    namePt: "Operações",
    nameEn: "Operations",
    icon: Cog,
    order: 6,
    layers: {
      op: {
        key: "operacional",
        titlePt: "Documentação automática",
        titleEn: "Auto documentation",
        descPt: "Mapeamento e SOPs gerados por IA",
        descEn: "AI-generated process mapping & SOPs",
        resultPt: "-50% onboarding",
        resultEn: "-50% onboarding",
      },
      tat: {
        key: "tatico",
        titlePt: "Otimização de fluxos",
        titleEn: "Workflow optimization",
        descPt: "Identificação de gargalos invisíveis",
        descEn: "Hidden bottleneck detection",
        resultPt: "+35% throughput",
        resultEn: "+35% throughput",
      },
      est: {
        key: "estrategico",
        titlePt: "Capacity planning",
        titleEn: "Capacity planning",
        descPt: "Simulação de capacidade futura",
        descEn: "Future capacity simulation",
        resultPt: "-25% CapEx",
        resultEn: "-25% CapEx",
      },
    },
  },
  {
    id: "rh",
    namePt: "RH",
    nameEn: "HR",
    icon: Users,
    order: 7,
    layers: {
      op: {
        key: "operacional",
        titlePt: "Triagem inteligente",
        titleEn: "Smart screening",
        descPt: "Triagem de currículos automatizada",
        descEn: "Automated resume screening",
        resultPt: "Semanas → horas",
        resultEn: "Weeks → hours",
      },
      tat: {
        key: "tatico",
        titlePt: "Predição de turnover",
        titleEn: "Turnover prediction",
        descPt: "Análise preditiva de risco de saída",
        descEn: "Predictive exit-risk analysis",
        resultPt: "-20% turnover",
        resultEn: "-20% turnover",
      },
      est: {
        key: "estrategico",
        titlePt: "Workforce planning",
        titleEn: "Workforce planning",
        descPt: "Planejamento de talento de longo prazo",
        descEn: "Long-term talent planning",
        resultPt: "-15% custo talento",
        resultEn: "-15% talent cost",
      },
    },
  },
  {
    id: "ti",
    namePt: "TI & Segurança",
    nameEn: "IT & Security",
    icon: ShieldCheck,
    order: 8,
    layers: {
      op: {
        key: "operacional",
        titlePt: "Automação de N1",
        titleEn: "L1 automation",
        descPt: "Resolução autônoma de chamados N1",
        descEn: "Autonomous L1 ticket resolution",
        resultPt: "80% sem humano",
        resultEn: "80% no-touch",
      },
      tat: {
        key: "tatico",
        titlePt: "Detecção de anomalia",
        titleEn: "Anomaly detection",
        descPt: "Detecção proativa de incidentes",
        descEn: "Proactive incident detection",
        resultPt: "-60% incidentes",
        resultEn: "-60% incidents",
      },
      est: {
        key: "estrategico",
        titlePt: "Zero-trust com IA",
        titleEn: "AI zero-trust",
        descPt: "Arquitetura adaptativa de segurança",
        descEn: "Adaptive security architecture",
        resultPt: "Compliance contínuo",
        resultEn: "Continuous compliance",
      },
    },
  },
];
