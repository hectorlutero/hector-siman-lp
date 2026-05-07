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
  /** Research-backed bottleneck — short sentence with embedded time/cost loss */
  gargaloPt: string;
  gargaloEn: string;
  /** Punchy metric (≤16 chars) extracted from the gargalo, shown on the card in red phase */
  gargaloMetricPt: string;
  gargaloMetricEn: string;
}

export interface Sector {
  id: SectorId;
  namePt: string;
  nameEn: string;
  icon: LucideIcon;
  order: number;
  /** Sector-wide industry stat (1 sentence) used in modal "Realidade do Mercado" block */
  industryStatPt: string;
  industryStatEn: string;
  /** Citation for the industry stat above */
  sourcePt: string;
  sourceEn: string;
  layers: { op: Layer; tat: Layer; est: Layer };
}

/**
 * Methodology phase metadata — drives the journey strip in the SectorModal.
 * Locked palette: Padronização=blue, Operação Assistida=orange, Automação=green.
 */
export const METHODOLOGY_STEPS = [
  {
    key: "padronizacao",
    labelPt: "Padronização",
    labelEn: "Standardization",
    descPt: "Mapeamos e documentamos o processo atual com SOPs auditáveis.",
    descEn: "We map and document the current process with auditable SOPs.",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.4)",
    icon: "▢",
  },
  {
    key: "operacao_assistida",
    labelPt: "Operação Assistida",
    labelEn: "Assisted Operation",
    descPt: "IA assiste o time com humano in-the-loop nas decisões críticas.",
    descEn: "AI assists the team with humans in-the-loop on critical decisions.",
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.4)",
    icon: "◐",
  },
  {
    key: "automacao",
    labelPt: "Automação",
    labelEn: "Automation",
    descPt: "Processo executa autônomo com guardrails e supervisão contínua.",
    descEn: "The process runs autonomously with guardrails and continuous supervision.",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.4)",
    icon: "✓",
  },
] as const;

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
    industryStatPt:
      "Profissionais de marketing gastam em média 21h/semana em tarefas manuais — produção de conteúdo, relatórios e atualização de planilhas.",
    industryStatEn:
      "Marketing professionals spend an average of 21h/week on manual work — content production, reports, and spreadsheet updates.",
    sourcePt: "Asana — Anatomy of Work 2023",
    sourceEn: "Asana — Anatomy of Work 2023",
    layers: {
      op: {
        key: "operacional",
        titlePt: "SEO automático",
        titleEn: "Automated SEO",
        descPt: "Geração e agendamento auto. de conteúdo SEO",
        descEn: "AI-driven SEO content generation and scheduling",
        resultPt: "-3h/dia",
        resultEn: "-3h/day",
        gargaloPt:
          "Criação manual de conteúdo SEO consome 8-12h/semana por profissional, com gargalo de revisão e publicação.",
        gargaloEn:
          "Manual SEO content creation eats 8-12h/week per professional, bottlenecked at review and publishing.",
        gargaloMetricPt: "8-12h/sem",
        gargaloMetricEn: "8-12h/wk",
      },
      tat: {
        key: "tatico",
        titlePt: "Atribuição IA",
        titleEn: "AI Attribution",
        descPt: "Atribuição multi-touch IA cruzando canais",
        descEn: "Multi-touch AI attribution across channels",
        resultPt: "-25% CAC",
        resultEn: "-25% CAC",
        gargaloPt:
          "Atribuição last-click sub-estima canais de topo de funil — orçamento mal alocado infla o CAC em 25-30%.",
        gargaloEn:
          "Last-click attribution underestimates top-of-funnel channels — misallocated budget inflates CAC by 25-30%.",
        gargaloMetricPt: "+30% CAC",
        gargaloMetricEn: "+30% CAC",
      },
      est: {
        key: "estrategico",
        titlePt: "Posicionamento estratégico",
        titleEn: "Strategic positioning",
        descPt: "Cenários macro & posicionamento de mercado",
        descEn: "Macro scenarios & market positioning",
        resultPt: "+12% mkt share",
        resultEn: "+12% mkt share",
        gargaloPt:
          "Decisões de posicionamento sem inteligência de mercado em tempo real geram 6-12 meses de atraso competitivo.",
        gargaloEn:
          "Positioning decisions without real-time market intelligence cause 6-12 months of competitive lag.",
        gargaloMetricPt: "6-12 meses",
        gargaloMetricEn: "6-12 months",
      },
    },
  },
  {
    id: "vendas",
    namePt: "Vendas",
    nameEn: "Sales",
    icon: Zap,
    order: 2,
    industryStatPt:
      "Vendedores gastam apenas 28% do tempo efetivamente vendendo — 72% é absorvido por tarefas administrativas e atualização de CRM.",
    industryStatEn:
      "Salespeople spend only 28% of their time actually selling — 72% is consumed by admin work and CRM updates.",
    sourcePt: "Salesforce — State of Sales 2022",
    sourceEn: "Salesforce — State of Sales 2022",
    layers: {
      op: {
        key: "operacional",
        titlePt: "Qualificação 24/7",
        titleEn: "24/7 Lead qualification",
        descPt: "Qualificação de leads e resposta 24/7",
        descEn: "AI lead qualification and 24/7 response",
        resultPt: "+R$ 18k/mês",
        resultEn: "+$3.5k/mo",
        gargaloPt:
          "Resposta a leads acima de 5min reduz conversão em até 21x — leads frios desperdiçam R$ 18-30k/mês em pipeline.",
        gargaloEn:
          "Lead response over 5 minutes drops conversion up to 21× — cold leads waste $3-6k/mo in lost pipeline.",
        gargaloMetricPt: "−R$ 18-30k/mês",
        gargaloMetricEn: "−$3-6k/mo",
      },
      tat: {
        key: "tatico",
        titlePt: "Forecasting de pipeline",
        titleEn: "Pipeline forecasting",
        descPt: "Forecasting de pipeline e priorização",
        descEn: "Pipeline forecasting and AI prioritization",
        resultPt: "+30% conversão",
        resultEn: "+30% conversion",
        gargaloPt:
          "78% dos forecasts de pipeline são imprecisos — priorização errada custa 15-20% das metas trimestrais.",
        gargaloEn:
          "78% of pipeline forecasts are inaccurate — wrong prioritization costs 15-20% of quarterly targets.",
        gargaloMetricPt: "78% imprecisos",
        gargaloMetricEn: "78% off",
      },
      est: {
        key: "estrategico",
        titlePt: "Expansão de TAM",
        titleEn: "TAM expansion",
        descPt: "Identificação de TAM e expansão de mercado",
        descEn: "TAM identification and market expansion",
        resultPt: "+R$ 2M/ano",
        resultEn: "+$400k/yr",
        gargaloPt:
          "Empresas sem mapeamento sistemático de TAM perdem ~35% das oportunidades adjacentes ao core.",
        gargaloEn:
          "Companies without systematic TAM mapping miss ~35% of adjacent-to-core opportunities.",
        gargaloMetricPt: "−35% TAM",
        gargaloMetricEn: "−35% TAM",
      },
    },
  },
  {
    id: "atendimento",
    namePt: "Atendimento",
    nameEn: "Customer Support",
    icon: Headset,
    order: 3,
    industryStatPt:
      "70% dos tickets de suporte são repetitivos e poderiam ser resolvidos sem intervenção humana.",
    industryStatEn:
      "70% of support tickets are repetitive and solvable without human intervention.",
    sourcePt: "Zendesk — CX Trends 2024",
    sourceEn: "Zendesk — CX Trends 2024",
    layers: {
      op: {
        key: "operacional",
        titlePt: "Triagem automática",
        titleEn: "Auto triage",
        descPt: "Triagem inicial e respostas automáticas",
        descEn: "Initial triage and automated responses",
        resultPt: "-70% tempo",
        resultEn: "-70% time",
        gargaloPt:
          "Agentes humanos gastam ~60% do tempo em triagem N1 — R$ 12-18k/mês desperdiçados em tarefas repetitivas.",
        gargaloEn:
          "Human agents spend ~60% of time on L1 triage — $2.5-3.5k/mo wasted on repetitive work.",
        gargaloMetricPt: "−R$ 12-18k/mês",
        gargaloMetricEn: "−$2.5-3.5k/mo",
      },
      tat: {
        key: "tatico",
        titlePt: "Detecção de churn",
        titleEn: "Churn detection",
        descPt: "Detecção proativa de risco de cancelamento",
        descEn: "Proactive cancellation risk detection",
        resultPt: "-15% churn",
        resultEn: "-15% churn",
        gargaloPt:
          "Detecção tardia de risco de cancelamento custa 5-7x mais que prevenção proativa.",
        gargaloEn:
          "Late churn-risk detection costs 5-7× more than proactive prevention.",
        gargaloMetricPt: "5-7× custo",
        gargaloMetricEn: "5-7× cost",
      },
      est: {
        key: "estrategico",
        titlePt: "Insights de produto",
        titleEn: "Product insights",
        descPt: "Insights de produto a partir de feedback",
        descEn: "Product insights from feedback patterns",
        resultPt: "+R$ 800k/ano",
        resultEn: "+$160k/yr",
        gargaloPt:
          "Feedback de milhares de tickets enterrado sem análise sistemática — produto evolui por achismo.",
        gargaloEn:
          "Feedback from thousands of tickets buried without systematic analysis — product evolves on guesswork.",
        gargaloMetricPt: "−R$ 800k/ano",
        gargaloMetricEn: "−$160k/yr",
      },
    },
  },
  {
    id: "financas",
    namePt: "Finanças",
    nameEn: "Finance",
    icon: TrendingUp,
    order: 4,
    industryStatPt:
      "Departamentos financeiros gastam 40-60% do tempo em tarefas de conciliação manual e fechamento contábil.",
    industryStatEn:
      "Finance departments spend 40-60% of their time on manual reconciliation and book-closing tasks.",
    sourcePt: "Deloitte — Finance Operations Survey 2023",
    sourceEn: "Deloitte — Finance Operations Survey 2023",
    layers: {
      op: {
        key: "operacional",
        titlePt: "Conciliação automática",
        titleEn: "Auto reconciliation",
        descPt: "Conciliação bancária e AP/AR automatizados",
        descEn: "Bank reconciliation and AP/AR automation",
        resultPt: "+R$ 13,5k/mês",
        resultEn: "+$2.5k/mo",
        gargaloPt:
          "Conciliação bancária manual: 15-20h/semana, taxa de erro de 3-5%, retrabalho de R$ 8-15k/mês.",
        gargaloEn:
          "Manual bank reconciliation: 15-20h/week, 3-5% error rate, $1.5-3k/mo of rework.",
        gargaloMetricPt: "15-20h/sem",
        gargaloMetricEn: "15-20h/wk",
      },
      tat: {
        key: "tatico",
        titlePt: "Cash flow live",
        titleEn: "Live cash flow",
        descPt: "Forecast de fluxo de caixa em tempo real",
        descEn: "Real-time cash flow forecasting",
        resultPt: "-30% capital giro",
        resultEn: "-30% working capital",
        gargaloPt:
          "Forecast mensal vs. diário deixa a empresa 30 dias atrasada — capital de giro 30% acima do necessário.",
        gargaloEn:
          "Monthly vs. daily forecast leaves the company 30 days behind — working capital 30% higher than needed.",
        gargaloMetricPt: "+30% giro",
        gargaloMetricEn: "+30% capital",
      },
      est: {
        key: "estrategico",
        titlePt: "Cenários M&A",
        titleEn: "M&A scenarios",
        descPt: "Cenários de M&A e alocação estratégica",
        descEn: "M&A scenarios and strategic allocation",
        resultPt: "+R$ 2M/ano",
        resultEn: "+$400k/yr",
        gargaloPt:
          "Cenários de M&A em planilhas demoram semanas e não são reproduzíveis — decisões com dados parciais.",
        gargaloEn:
          "M&A scenarios in spreadsheets take weeks and aren't reproducible — decisions made on partial data.",
        gargaloMetricPt: "Semanas/decisão",
        gargaloMetricEn: "Weeks/decision",
      },
    },
  },
  {
    id: "diretoria",
    namePt: "Diretoria",
    nameEn: "Executive",
    icon: Briefcase,
    order: 5,
    industryStatPt:
      "Executivos gastam em média 40% do tempo em reuniões de status e atualização — não em decisão estratégica.",
    industryStatEn:
      "Executives spend an average of 40% of their time on status updates and meetings — not strategic decisions.",
    sourcePt: "Harvard Business Review — Time, Talent and Energy",
    sourceEn: "Harvard Business Review — Time, Talent and Energy",
    layers: {
      op: {
        key: "operacional",
        titlePt: "Dashboards live",
        titleEn: "Live dashboards",
        descPt: "Métricas críticas em tempo real",
        descEn: "Critical KPIs in real time",
        resultPt: "10× decisão",
        resultEn: "10× decisions",
        gargaloPt:
          "Decisões baseadas em dados de 1-2 semanas atrás — janela de oportunidade frequentemente já fechada.",
        gargaloEn:
          "Decisions based on 1-2 week-old data — opportunity window often already closed.",
        gargaloMetricPt: "1-2 sem atraso",
        gargaloMetricEn: "1-2wk lag",
      },
      tat: {
        key: "tatico",
        titlePt: "Alertas de variância",
        titleEn: "Variance alerts",
        descPt: "Alertas de desvio com causa raiz",
        descEn: "Variance alerts with root cause",
        resultPt: "+R$ 88k/mês",
        resultEn: "+$15k/mo",
        gargaloPt:
          "Variâncias detectadas só no fechamento mensal — root cause demora dias e custa R$ 80-120k/mês.",
        gargaloEn:
          "Variances detected only at month-end close — root cause takes days, costing $15-22k/mo.",
        gargaloMetricPt: "−R$ 80-120k/mês",
        gargaloMetricEn: "−$15-22k/mo",
      },
      est: {
        key: "estrategico",
        titlePt: "Cenários macro",
        titleEn: "Macro scenarios",
        descPt: "Simulação de cenários com IA",
        descEn: "AI-driven scenario planning",
        resultPt: "+R$ 5M/ano",
        resultEn: "+$1M/yr",
        gargaloPt:
          "Cenários macro atualizados uma vez por trimestre — risco macro mal gerenciado e oportunidades perdidas.",
        gargaloEn:
          "Macro scenarios updated once a quarter — poorly managed macro risk and missed opportunities.",
        gargaloMetricPt: "1×/trimestre",
        gargaloMetricEn: "1×/quarter",
      },
    },
  },
  {
    id: "operacoes",
    namePt: "Operações",
    nameEn: "Operations",
    icon: Cog,
    order: 6,
    industryStatPt:
      "Empresas perdem 20-30% da receita anual por ineficiências de processo não-mapeadas e gargalos invisíveis.",
    industryStatEn:
      "Companies lose 20-30% of annual revenue to unmapped process inefficiencies and invisible bottlenecks.",
    sourcePt: "IDC — State of Process Excellence 2022",
    sourceEn: "IDC — State of Process Excellence 2022",
    layers: {
      op: {
        key: "operacional",
        titlePt: "Documentação automática",
        titleEn: "Auto documentation",
        descPt: "Mapeamento e SOPs gerados por IA",
        descEn: "AI-generated process mapping & SOPs",
        resultPt: "-50% onboarding",
        resultEn: "-50% onboarding",
        gargaloPt:
          "SOPs em wikis estagnados — 65% dos novos contratados não os usam, onboarding 50% mais lento.",
        gargaloEn:
          "Stale wiki SOPs — 65% of new hires don't use them, onboarding 50% slower.",
        gargaloMetricPt: "65% não usam",
        gargaloMetricEn: "65% skip",
      },
      tat: {
        key: "tatico",
        titlePt: "Otimização de fluxos",
        titleEn: "Workflow optimization",
        descPt: "Identificação de gargalos invisíveis",
        descEn: "Hidden bottleneck detection",
        resultPt: "+35% throughput",
        resultEn: "+35% throughput",
        gargaloPt:
          "Gargalos invisíveis identificados só após impacto financeiro — perda média de 15-25% de throughput.",
        gargaloEn:
          "Invisible bottlenecks identified only after financial impact — average 15-25% throughput loss.",
        gargaloMetricPt: "−15-25% throughput",
        gargaloMetricEn: "−15-25% output",
      },
      est: {
        key: "estrategico",
        titlePt: "Capacity planning",
        titleEn: "Capacity planning",
        descPt: "Simulação de capacidade futura",
        descEn: "Future capacity simulation",
        resultPt: "-25% CapEx",
        resultEn: "-25% CapEx",
        gargaloPt:
          "Planejamento de capacidade por intuição infla CapEx em ~25% e gera ociosidade ou subdimensionamento.",
        gargaloEn:
          "Intuition-based capacity planning inflates CapEx by ~25% and creates idle assets or under-sizing.",
        gargaloMetricPt: "+25% CapEx",
        gargaloMetricEn: "+25% CapEx",
      },
    },
  },
  {
    id: "rh",
    namePt: "RH",
    nameEn: "HR",
    icon: Users,
    order: 7,
    industryStatPt:
      "Recrutadores gastam em média 23h/semana em tarefas administrativas — não em construção de relacionamento com candidatos.",
    industryStatEn:
      "Recruiters spend an average of 23h/week on administrative tasks — not on candidate relationship-building.",
    sourcePt: "SHRM — Talent Acquisition Benchmarking 2023",
    sourceEn: "SHRM — Talent Acquisition Benchmarking 2023",
    layers: {
      op: {
        key: "operacional",
        titlePt: "Triagem inteligente",
        titleEn: "Smart screening",
        descPt: "Triagem de currículos automatizada",
        descEn: "Automated resume screening",
        resultPt: "Semanas → horas",
        resultEn: "Weeks → hours",
        gargaloPt:
          "Triagem manual demora semanas — 40% dos top candidates aceitam outras ofertas no caminho.",
        gargaloEn:
          "Manual screening takes weeks — 40% of top candidates accept other offers along the way.",
        gargaloMetricPt: "Semanas",
        gargaloMetricEn: "Weeks",
      },
      tat: {
        key: "tatico",
        titlePt: "Predição de turnover",
        titleEn: "Turnover prediction",
        descPt: "Análise preditiva de risco de saída",
        descEn: "Predictive exit-risk analysis",
        resultPt: "-20% turnover",
        resultEn: "-20% turnover",
        gargaloPt:
          "Turnover não-previsto custa 1,5-2x o salário anual do profissional perdido em recolocação e produtividade.",
        gargaloEn:
          "Unforecasted turnover costs 1.5-2× the annual salary of the lost professional in replacement and productivity.",
        gargaloMetricPt: "1,5-2× salário",
        gargaloMetricEn: "1.5-2× salary",
      },
      est: {
        key: "estrategico",
        titlePt: "Workforce planning",
        titleEn: "Workforce planning",
        descPt: "Planejamento de talento de longo prazo",
        descEn: "Long-term talent planning",
        resultPt: "-15% custo talento",
        resultEn: "-15% talent cost",
        gargaloPt:
          "Planejamento de força de trabalho reativo gera contratações emergenciais ~35% mais caras.",
        gargaloEn:
          "Reactive workforce planning leads to emergency hires ~35% more expensive.",
        gargaloMetricPt: "+35% custo",
        gargaloMetricEn: "+35% cost",
      },
    },
  },
  {
    id: "ti",
    namePt: "TI & Segurança",
    nameEn: "IT & Security",
    icon: ShieldCheck,
    order: 8,
    industryStatPt:
      "60-70% dos chamados de N1 são repetitivos e tecnicamente automatizáveis — mas seguem consumindo o time humano.",
    industryStatEn:
      "60-70% of L1 tickets are repetitive and technically automatable — yet still consume human time.",
    sourcePt: "Gartner — Service Desk Research 2023",
    sourceEn: "Gartner — Service Desk Research 2023",
    layers: {
      op: {
        key: "operacional",
        titlePt: "Automação de N1",
        titleEn: "L1 automation",
        descPt: "Resolução autônoma de chamados N1",
        descEn: "Autonomous L1 ticket resolution",
        resultPt: "80% sem humano",
        resultEn: "80% no-touch",
        gargaloPt:
          "Atendimento N1 manual: tempo médio 4-6h, satisfação <60%, custo de R$ 50-80 por ticket.",
        gargaloEn:
          "Manual L1 support: average time 4-6h, satisfaction <60%, cost of $10-15 per ticket.",
        gargaloMetricPt: "4-6h MTTR",
        gargaloMetricEn: "4-6h MTTR",
      },
      tat: {
        key: "tatico",
        titlePt: "Detecção de anomalia",
        titleEn: "Anomaly detection",
        descPt: "Detecção proativa de incidentes",
        descEn: "Proactive incident detection",
        resultPt: "-60% incidentes",
        resultEn: "-60% incidents",
        gargaloPt:
          "Incidentes detectados via reclamação de usuário: MTTR 3-5x maior, perda média R$ 25-40k por incidente.",
        gargaloEn:
          "Incidents detected via user complaint: MTTR 3-5× higher, average loss $5-8k per incident.",
        gargaloMetricPt: "−R$ 25-40k/inc",
        gargaloMetricEn: "−$5-8k/inc",
      },
      est: {
        key: "estrategico",
        titlePt: "Zero-trust com IA",
        titleEn: "AI zero-trust",
        descPt: "Arquitetura adaptativa de segurança",
        descEn: "Adaptive security architecture",
        resultPt: "Compliance contínuo",
        resultEn: "Continuous compliance",
        gargaloPt:
          "Compliance via auditoria manual trimestral: até 90 dias de exposição entre revisões.",
        gargaloEn:
          "Compliance via manual quarterly audit: up to 90 days of exposure between reviews.",
        gargaloMetricPt: "90 dias expostos",
        gargaloMetricEn: "90d exposed",
      },
    },
  },
];
