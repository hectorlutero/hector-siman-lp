"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Users } from "lucide-react";

const blocks = [
  {
    icon: TrendingUp,
    titlePt: "IA ajuda a vender mais",
    titleEn: "AI helps you sell more",
    descPt:
      "Qualificação de leads automática, follow-up sem depender de memória humana, atendimento rodando enquanto seu time dorme.",
    descEn:
      "Automatic lead qualification, follow-up that doesn't rely on human memory, support running while your team sleeps.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: DollarSign,
    titlePt: "IA reduz custo operacional",
    titleEn: "AI cuts operational cost",
    descPt:
      "Tarefas que tomam horas por dia viram segundos. Menos erro humano, menos retrabalho, menos custo com hora de profissional caro.",
    descEn:
      "Tasks that take hours a day become seconds. Less human error, less rework, less spend on expensive professional time.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Users,
    titlePt: "IA escala sem contratar",
    titleEn: "AI scales without hiring",
    descPt:
      "Volume dobra, custo fica o mesmo. Você cresce sem precisar dobrar o time — e sem perder qualidade.",
    descEn:
      "Volume doubles, cost stays flat. You grow without doubling headcount — and without losing quality.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
];

export default function AIReality() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-success/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t(
              "IA vende. Se alguém souber usar.",
              "AI sells. If someone knows how to use it."
            )}
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            {t(
              "A maioria das empresas testa um chatbot, brinca com o ChatGPT e para por aí. O resultado real vem quando IA entra na operação de verdade — no CRM, no financeiro, no atendimento. Pra isso, precisa de alguém que sabe programar, conhece as limitações dos modelos e já fez isso antes.",
              "Most companies test a chatbot, play with ChatGPT, and stop there. Real results come when AI enters the actual operation — CRM, finance, support. For that, you need someone who can code, knows model limitations, and has done it before."
            )}
          </p>
        </motion.div>

        {/* Anti-hype callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-16 glass rounded-xl p-5 border-l-4 border-success text-sm text-muted italic text-center"
        >
          {t(
            '"IA não é mágica. É uma ferramenta — e como toda ferramenta, depende de quem usa."',
            '"AI is not magic. It\'s a tool — and like every tool, it depends on who uses it."'
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {blocks.map((block, i) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={block.titlePt}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glass rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${block.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={24} className={block.color} />
                </div>
                <h3 className="text-lg font-bold mb-3">
                  {t(block.titlePt, block.titleEn)}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {t(block.descPt, block.descEn)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
