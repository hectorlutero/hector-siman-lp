"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Aura Orbs for Volumetric Lighting (toned down) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aura-orb aura-orb-1" />
        <div className="aura-orb aura-orb-2" />
      </div>

      {/* 3D animated grid backdrop */}
      <div className="hero-grid-3d" aria-hidden="true" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-accent/40 animate-float" />
        <div className="absolute top-[60%] right-[20%] w-3 h-3 rounded-full bg-success/30 animate-float-delay" />
        <div className="absolute top-[40%] left-[60%] w-1.5 h-1.5 rounded-full bg-accent/30 animate-float-slow" />
        <div className="absolute top-[70%] left-[30%] w-2.5 h-2.5 rounded-full bg-purple-500/25 animate-float" />
        <div className="absolute top-[15%] right-[35%] w-2 h-2 rounded-full bg-success/20 animate-float-delay" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 sm:mb-8"
        >
          {lang === "pt" ? (
            <>
              <span className="animate-text-shimmer">Todo mundo fala de IA.</span><br />
              Poucos sabem <span className="text-gradient-accent">implementar</span>.<br />
              Seu <span className="text-gradient-accent">concorrente</span> pode ser um deles.
            </>
          ) : (
            <>
              <span className="animate-text-shimmer">Everyone talks about AI.</span><br />
              Few know how to <span className="text-gradient-accent">deploy</span> it.<br />
              Your <span className="text-gradient-accent">competitor</span> might be one step ahead.
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted max-w-3xl mx-auto mb-8 sm:mb-12 font-medium"
        >
          {t(
            "Eu coloco IA pra rodar na sua empresa, treino seu time e acompanho até dar resultado.",
            "I deploy custom AI solutions for your business, train your team, and ensure measurable results."
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="https://calendar.app.google/WQGLZTfmwWmbo5AP7"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-white font-bold text-base sm:text-lg"
          >
            {t("Conversar com Especialista", "Talk to an Expert")}
          </a>

          <a
            href="#problema"
            className="flex items-center gap-2 text-muted hover:text-foreground transition-colors font-medium"
          >
            <ChevronDown size={20} className="animate-bounce text-accent" />
            {t("Veja como funciona", "See how it works")}
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
    </section>
  );
}
