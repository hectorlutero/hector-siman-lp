"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { SmartCountUp } from "./ui/SmartCountUp";

const testimonials = [
  {
    quotePt:
      "A gente achava que IA era coisa de empresa grande. Em 3 semanas já tinha automação rodando no financeiro e economizando 20 horas por mês.",
    quoteEn:
      "We thought AI was only for big companies. In 3 weeks we had automation running in finance, saving 20 hours a month.",
    name: "Mariana Costa",
    rolePt: "Diretora de Operações",
    roleEn: "Operations Director",
    company: "TechFlow Logística",
    initials: "MC",
  },
  {
    quotePt:
      "O Hector entendeu nossa operação rápido. Nada de enrolação, nada de jargão. Mostrou onde estava o gargalo e resolveu.",
    quoteEn:
      "Hector understood our operation fast. No fluff, no jargon. He showed us the bottleneck and fixed it.",
    name: "Rafael Mendes",
    rolePt: "CEO",
    roleEn: "CEO",
    company: "Grupo Vértice",
    initials: "RM",
  },
  {
    quotePt:
      "Nosso onboarding de clientes levava 3 dias. Agora leva 5 minutos. O time parou de reclamar e começou a vender mais.",
    quoteEn:
      "Our client onboarding took 3 days. Now it takes 5 minutes. The team stopped complaining and started selling more.",
    name: "Ana Luíza Ferreira",
    rolePt: "Gerente Comercial",
    roleEn: "Sales Manager",
    company: "Nova Era Digital",
    initials: "AF",
  },
  {
    quotePt:
      "Ele fez em 2 semanas o que nosso time de TI tentou por 6 meses. E ficou mais barato.",
    quoteEn:
      "He did in 2 weeks what our IT team tried for 6 months. And it cost less.",
    name: "Pedro Augusto Silva",
    rolePt: "CTO",
    roleEn: "CTO",
    company: "Innova Sistemas",
    initials: "PS",
  },
];

// Duplicate for seamless infinite loop
const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

export default function Testimonials() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("O que dizem", "What they say")}
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            {t(
              "Quem já passou pelo processo conta como foi.",
              "Those who've been through the process share their experience."
            )}
          </p>
        </motion.div>

        <div className="relative overflow-hidden -mx-6 px-6 py-4">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max">
            {allTestimonials.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="glass rounded-[2rem] p-8 md:p-10 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.15)] transition-all duration-500 w-[320px] md:w-[450px] shrink-0 border border-white/5 hover:border-accent/30 relative group overflow-hidden"
              >
                {/* Subtle Hover Glow */}
                <div className="absolute -inset-px bg-gradient-to-b from-accent/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10">
                  <Quote size={28} className="text-accent/30 mb-6 group-hover:text-accent/60 transition-colors duration-500" />
                  <p className="text-base md:text-lg leading-relaxed mb-8 text-foreground group-hover:text-white transition-colors duration-300 font-medium">
                    <SmartCountUp text={t(item.quotePt, item.quoteEn)} isVisible={isVisible} />
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-accent font-bold group-hover:bg-accent/20 transition-colors duration-500 shadow-md">
                      {item.initials}
                    </div>
                    <div>
                      <div className="text-base font-bold text-foreground group-hover:text-white transition-colors">
                        {item.name}
                      </div>
                      <div className="text-sm text-muted">
                        {t(item.rolePt, item.roleEn)} · {item.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted/40 mt-12 italic font-medium">
          {t(
            "* Depoimentos representativos baseados em projetos reais. Nomes alterados por confidencialidade.",
            "* Representative testimonials based on real projects. Names changed for confidentiality."
          )}
        </p>
      </div>
    </section>
  );
}
