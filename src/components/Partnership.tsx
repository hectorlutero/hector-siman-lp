"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Handshake, RefreshCcw, Trophy, Shield, Star } from "lucide-react";

const pillars = [
  {
    icon: Handshake,
    titlePt: "Diagnóstico & Implementação",
    titleEn: "Diagnostic & Implementation",
    descPt: "Mapeamos seus gargalos e entregamos a primeira automação em menos de 30 dias.",
    descEn: "We map your bottlenecks and deliver the first automation in under 30 days.",
    color: "border-accent", iconColor: "text-accent", iconBg: "bg-accent/10",
  },
  {
    icon: RefreshCcw,
    titlePt: "Otimização Contínua",
    titleEn: "Continuous Optimization",
    descPt: "Automação precisa de manutenção. APIs mudam, regras mudam. Eu acompanho mês a mês.",
    descEn: "Automation needs maintenance. APIs change, rules change. I follow up month by month.",
    color: "border-warning", iconColor: "text-warning", iconBg: "bg-warning/10",
  },
  {
    icon: Trophy,
    titlePt: "Sucesso Compartilhado",
    titleEn: "Shared Success",
    descPt: "Parte do pagamento atrelado ao resultado que a automação gera. Quando você ganha, eu ganho.",
    descEn: "Part of the payment tied to results. When you win, I win.",
    color: "border-success", iconColor: "text-success", iconBg: "bg-success/10",
  },
];

export default function Partnership() {
  const { t } = useLanguage();
  return (
    <section id="parceria" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("Construímos juntos. A longo prazo.", "We build together. Long term.")}</h2>
          <p className="text-muted max-w-2xl mx-auto">{t("Meu trabalho só acaba quando o resultado aparece — e depois, a gente melhora.", "My work only ends when results show up — and then, we improve.")}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.titlePt} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className={`glass rounded-2xl p-8 text-center border-t-4 ${p.color} hover:-translate-y-1 transition-all duration-300`}>
                <div className={`w-14 h-14 rounded-full ${p.iconBg} flex items-center justify-center mx-auto mb-5`}><Icon size={24} className={p.iconColor} /></div>
                <h3 className="font-bold mb-3">{t(p.titlePt, p.titleEn)}</h3>
                <p className="text-sm text-muted leading-relaxed">{t(p.descPt, p.descEn)}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-xl border-2 border-dashed border-warning/40 bg-warning/[0.05] p-6 text-center">
            <Star size={20} className="text-warning mx-auto mb-3" />
            <p className="text-sm font-bold mb-1">{t("Garantia de Primeiro Impacto", "First Impact Guarantee")}</p>
            <p className="text-xs text-muted">{t("Sua primeira automação entregue e funcionando em menos de 30 dias.", "Your first automation delivered and running in under 30 days.")}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-xl border border-success/30 bg-success/[0.05] p-6 flex items-start gap-4">
            <Shield size={22} className="text-success shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold mb-1">{t("Segurança & Confidencialidade", "Security & Confidentiality")}</p>
              <p className="text-xs text-muted leading-relaxed">{t("Seus dados são protegidos e nunca usados para treinar modelos públicos. Todo o código é propriedade da sua empresa.", "Your data is protected and never used to train public models. All code is your company's property.")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
