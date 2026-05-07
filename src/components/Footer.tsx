"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Mail, Calendar, MessageCircle } from "lucide-react";

export default function Footer() {
  const { t, lang, toggle } = useLanguage();
  return (
    <footer className="border-t border-card-border py-12 px-6">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8">
        <div>
          <div className="text-lg font-bold mb-3"><span className="text-accent">Hector</span> Siman</div>
          <p className="text-xs text-muted leading-relaxed">{t("Consultoria em IA & Automação para empresas que querem escalar.", "Strategic AI & Automation for businesses focused on scale.")}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-3">{t("Links", "Links")}</h4>
          <div className="space-y-2 text-sm text-muted">
            <a href="#metodo" className="block hover:text-foreground transition-colors">{t("Método", "Method")}</a>
            <a href="#resultados" className="block hover:text-foreground transition-colors">{t("Resultados", "Results")}</a>
            <a href="#tecnologias" className="block hover:text-foreground transition-colors">{t("Tecnologias", "Technologies")}</a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-3">{t("Contato", "Contact")}</h4>
          <div className="space-y-2 text-sm text-muted">
            <a href="https://calendar.app.google/WQGLZTfmwWmbo5AP7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors"><Calendar size={14} />{t("Conversar com Especialista", "Talk to an Expert")}</a>
            <a href="https://wa.me/5531993443134" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors"><MessageCircle size={14} />WhatsApp</a>
            <a href="mailto:hectorsimandev@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors"><Mail size={14} />hectorsimandev@gmail.com</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted">© 2026 Hector Siman. {t("Todos os direitos reservados.", "All rights reserved.")}</p>
        <button onClick={toggle} className="text-xs text-muted hover:text-foreground transition-colors">{lang === "pt" ? "🇺🇸 English" : "🇧🇷 Português"}</button>
      </div>
    </footer>
  );
}
