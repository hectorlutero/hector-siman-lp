"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { TrendingUp, UserX, RefreshCcw, DollarSign, Users } from "lucide-react";
import Image from "next/image";

const painCards = [
  {
    icon: TrendingUp,
    titlePt: "Você sabe que IA é o futuro",
    titleEn: "You know AI is the future",
    descPt:
      "Existe uma clareza no mercado: quem não automatizar operações eventualmente ficará para trás. A transição deixou de ser opcional.",
    descEn:
      "There is a clear consensus: those who don't automate operations will eventually fall behind. The transition is no longer optional.",
    color: "text-danger",
    bg: "bg-danger/10",
    borderColor: "border-danger/30",
  },
  {
    icon: UserX,
    titlePt: "Seu time tentou e travou",
    titleEn: "Your team tried and stalled",
    descPt:
      "Você delegou pro TI ou pra alguém do time. Testaram ferramentas, não chegou a lugar nenhum.",
    descEn:
      "You delegated to IT or someone on the team. They tried tools, went nowhere.",
    color: "text-warning",
    bg: "bg-warning/10",
    borderColor: "border-warning/30",
  },
  {
    icon: RefreshCcw,
    titlePt: "E o mercado não para",
    titleEn: "And the market keeps moving",
    descPt:
      "Enquanto você tenta descobrir, seus concorrentes já estão usando IA pra vender mais e operar melhor.",
    descEn:
      "While you're figuring it out, your competitors are already using AI to sell more and run leaner.",
    color: "text-accent",
    bg: "bg-accent/10",
    borderColor: "border-accent/30",
  },
];

const realityCards = [
  {
    icon: TrendingUp,
    titlePt: "IA ajuda a vender mais",
    titleEn: "AI helps you sell more",
    descPt:
      "Qualificação de leads automática, follow-up sem depender de memória humana, atendimento 24/7.",
    descEn:
      "Automatic lead qualification, follow-up without human memory, 24/7 support.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: DollarSign,
    titlePt: "Reduz custo operacional",
    titleEn: "Cuts operational cost",
    descPt:
      "Tarefas de horas viram segundos. Menos erro humano, menos retrabalho.",
    descEn:
      "Hours of tasks become seconds. Less human error, less rework.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Users,
    titlePt: "Escala sem contratar",
    titleEn: "Scales without hiring",
    descPt:
      "Volume dobra, custo fica o mesmo. Cresça sem inchar a folha de pagamento.",
    descEn:
      "Volume doubles, cost stays flat. Grow without bloating payroll.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
];

export default function RealityCheck() {
  const { t } = useLanguage();

  return (
    <section id="problema" className="py-24 px-6 relative max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Sticky Column: Graphic */}
        <div className="hidden lg:block sticky top-32 h-[calc(100vh-10rem)] rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl relative">
          <Image 
            src="/images/chaos_to_order.png" 
            alt="Business Chaos to AI Order" 
            fill
            className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 right-10">
            <h3 className="text-2xl font-bold mb-2">
              {t("Do Caos à Ordem.", "From Chaos to Order.")}
            </h3>
            <p className="text-muted text-sm">
              {t("Estruturando operações desorganizadas com IA inteligente.", "Structuring messy operations with intelligent AI.")}
            </p>
          </div>
        </div>

        {/* Right Scrolling Column: Content */}
        <div className="space-y-32">
          
          {/* Part 1: Pain Points */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {t("Isso te soa familiar?", "Does this sound familiar?")}
              </h2>
              <p className="text-muted text-lg">
                {t(
                  "Se você se identificou com pelo menos um, a gente precisa conversar.",
                  "If even one of these hits home, we should talk."
                )}
              </p>
            </motion.div>

            <div className="space-y-6">
              {painCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.titlePt}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`glass rounded-2xl p-6 border-l-4 ${card.borderColor} flex gap-6 hover:bg-white/[0.03] transition-colors`}
                  >
                    <div className={`shrink-0 w-14 h-14 rounded-xl ${card.bg} flex items-center justify-center`}>
                      <Icon size={24} className={card.color} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">
                        {t(card.titlePt, card.titleEn)}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">
                        {t(card.descPt, card.descEn)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Part 2: AI Reality */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {t("IA vende. Se alguém souber usar.", "AI sells. If someone knows how to use it.")}
              </h2>
              <p className="text-muted mb-6">
                {t(
                  "A maioria das empresas testa um chatbot e para por aí. O resultado real vem quando a IA entra na operação de verdade — no CRM, no financeiro, no atendimento.",
                  "Most companies test a chatbot and stop there. Real results come when AI enters the actual operation — CRM, finance, support."
                )}
              </p>
              
              <div className="glass rounded-xl p-5 border-l-4 border-success text-sm text-muted italic">
                {t(
                  '"IA não é mágica. É uma ferramenta — e como toda ferramenta, depende de quem usa."',
                  '"AI is not magic. It\'s a tool — and like every tool, it depends on who uses it."'
                )}
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {realityCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.titlePt}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`glass rounded-xl p-5 border border-white/5 hover:border-${card.color.split('-')[1]}/30 transition-colors`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mb-4`}>
                      <Icon size={20} className={card.color} />
                    </div>
                    <h3 className="text-base font-bold mb-2">
                      {t(card.titlePt, card.titleEn)}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed">
                      {t(card.descPt, card.descEn)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
