"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  const { t } = useLanguage();
  return (
    <section id="contato" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.04] via-accent/[0.08] to-background pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
          {t(
            "Enquanto você lê isso, um profissional caro na sua empresa está copiando dados de uma planilha para outra.",
            "While you read this, an expensive professional in your company is copying data from one spreadsheet to another."
          )}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-muted mb-10">
          {t("30 minutos. Sem compromisso. Sem enrolação.", "30 minutes. No commitment. No fluff.")}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://calendar.app.google/WQGLZTfmwWmbo5AP7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-accent-light text-white font-bold text-lg transition-all animate-pulse-glow">
            {t("Conversar com Especialista", "Talk to an Expert")}
            <ArrowRight size={20} />
          </a>
          <a href="mailto:hectorsimandev@gmail.com" className="text-sm text-muted hover:text-foreground transition-colors underline underline-offset-4">
            {t("ou mande um e-mail", "or send an email")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
