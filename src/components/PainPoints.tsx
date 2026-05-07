"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { TrendingUp, UserX, RefreshCcw } from "lucide-react";

const cards = [
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
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function PainPoints() {
  const { t } = useLanguage();

  return (
    <section id="problema" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-4"
        >
          {t("Isso te soa familiar?", "Does this sound familiar?")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted text-center mb-16 max-w-xl mx-auto"
        >
          {t(
            "Se você se identificou com pelo menos um, a gente precisa conversar.",
            "If even one of these hits home, we should talk."
          )}
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.titlePt}
                variants={cardVariants}
                className="glass rounded-2xl p-8 hover:bg-card-hover transition-all duration-300 hover:-translate-y-1 group"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${card.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={24} className={card.color} />
                </div>
                <h3 className="text-lg font-bold mb-3">
                  {t(card.titlePt, card.titleEn)}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {t(card.descPt, card.descEn)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
