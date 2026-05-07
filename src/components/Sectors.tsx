"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Truck,
  BarChart3,
  Megaphone,
  Code,
  Landmark,
  Building,
  HardHat,
  HeartPulse,
  Ticket,
  Share2,
  MonitorPlay,
  FileText,
  Mic,
} from "lucide-react";

const sectors = [
  {
    icon: ShoppingCart,
    titlePt: "Varejo",
    titleEn: "Retail",
    descPt: "Gestão de estoque, atendimento ao cliente, precificação dinâmica.",
    descEn: "Inventory management, customer support, dynamic pricing.",
  },
  {
    icon: Truck,
    titlePt: "Transportes",
    titleEn: "Transport",
    descPt: "Roteirização, rastreamento, gestão de frotas.",
    descEn: "Route planning, tracking, fleet management.",
  },
  {
    icon: BarChart3,
    titlePt: "Business Intelligence",
    titleEn: "Business Intelligence",
    descPt: "Dashboards, relatórios automatizados, governança de dados ponta a ponta.",
    descEn: "Dashboards, automated reports, end-to-end data governance.",
  },
  {
    icon: Megaphone,
    titlePt: "Agências de Marketing",
    titleEn: "Marketing Agencies",
    descPt: "Geração de conteúdo, qualificação de leads, automação de campanhas em massa.",
    descEn: "Content generation, lead qualification, mass campaign automation.",
  },
  {
    icon: Code,
    titlePt: "Software Houses",
    titleEn: "Software Houses",
    descPt: "Integração de IA, automação de QA, DevOps.",
    descEn: "AI integration, QA automation, DevOps.",
  },
  {
    icon: Landmark,
    titlePt: "Finanças",
    titleEn: "Finance",
    descPt: "Auditoria fiscal, contas a receber, compliance.",
    descEn: "Tax auditing, accounts receivable, compliance.",
  },
  {
    icon: Building,
    titlePt: "Mercado Imobiliário",
    titleEn: "Real Estate",
    descPt: "Qualificação de leads imobiliários, automação de contratos, CRM inteligente.",
    descEn: "Real estate lead qualification, contract automation, smart CRM.",
  },
  {
    icon: HardHat,
    titlePt: "Construção",
    titleEn: "Construction",
    descPt: "Gestão de projetos, controle de suprimentos, relatórios de obra automatizados.",
    descEn: "Project management, supply control, automated site reports.",
  },
  {
    icon: HeartPulse,
    titlePt: "Saúde",
    titleEn: "Health",
    descPt: "Agendamento inteligente, triagem de pacientes, gestão de prontuários.",
    descEn: "Smart scheduling, patient triage, medical records management.",
  },
  {
    icon: Ticket,
    titlePt: "Eventos",
    titleEn: "Events",
    descPt: "Gestão de inscrições, suporte aos participantes, automação de check-in.",
    descEn: "Registration management, attendee support, check-in automation.",
  },
  {
    icon: Share2,
    titlePt: "Mídias Sociais",
    titleEn: "Social Media",
    descPt: "Curadoria de conteúdo, moderação de comentários, agendamento automatizado.",
    descEn: "Content curation, comment moderation, automated scheduling.",
  },
  {
    icon: MonitorPlay,
    titlePt: "YouTube",
    titleEn: "YouTube",
    descPt: "Geração de roteiros, análise de métricas, otimização de títulos e thumbnails.",
    descEn: "Script generation, metrics analysis, title and thumbnail optimization.",
  },
  {
    icon: FileText,
    titlePt: "Blogs",
    titleEn: "Blogs",
    descPt: "Otimização SEO avançada, criação de rascunhos, distribuição de conteúdo.",
    descEn: "Advanced SEO optimization, draft creation, content distribution.",
  },
  {
    icon: Mic,
    titlePt: "Podcasts",
    titleEn: "Podcasts",
    descPt: "Transcrição automatizada, geração de cortes (clips), notas de episódios.",
    descEn: "Automated transcription, clip generation, episode show notes.",
  },
];

export default function Sectors() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-[90rem] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("Setores que atendemos", "Industry Expertise")}
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            {t(
              "Já passei por cada um desses setores. Conheço os gargalos de perto.",
              "With deep experience across these industries, I understand their unique operational bottlenecks firsthand."
            )}
          </p>
        </motion.div>

        {/* Modern Floating Cards Grid */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {sectors.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.titlePt}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-1.125rem)] group relative glass rounded-3xl p-6 lg:p-8 border border-white/5 hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.15)]"
              >
                {/* Neon Top Border highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Radial Glow on Hover */}
                <div className="absolute -inset-px bg-gradient-to-b from-accent/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent/20 group-hover:border-accent/30 transition-all duration-500 shadow-lg">
                    <Icon size={24} className="text-muted group-hover:text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.0)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-500" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-foreground group-hover:text-white transition-colors duration-300">
                    {t(sector.titlePt, sector.titleEn)}
                  </h3>
                  
                  <p className="text-sm text-muted leading-relaxed font-medium group-hover:text-muted/90 transition-colors duration-300">
                    {t(sector.descPt, sector.descEn)}
                  </p>
                </div>

                {/* Decorative Giant Background Icon */}
                <div className="absolute -bottom-8 -right-8 opacity-[0.02] group-hover:opacity-[0.06] group-hover:-translate-y-4 group-hover:-rotate-12 transition-all duration-700 pointer-events-none rotate-12">
                  <Icon size={160} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
