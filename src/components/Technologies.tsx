"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

// Simple Icons CDN for colored logos
const techCategories = [
  {
    titlePt: "Núcleo de Inteligência Artificial",
    titleEn: "Artificial Intelligence Core",
    descPt: "Modelos fundacionais para raciocínio complexo e geração de alto nível.",
    descEn: "Foundational models for complex reasoning and high-level generation.",
    className: "col-span-1 lg:col-span-2 row-span-1 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent border-accent/30 relative overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.5)]",
    internalClassName: "flex flex-wrap gap-6 md:gap-8 justify-start content-start mt-auto pt-6",
    big: true,
    items: [
      { name: "OpenAI", slug: "openai", iconUrl: "https://api.iconify.design/simple-icons/openai.svg?color=white" },
      { name: "Anthropic", slug: "anthropic/white" },
      { name: "Google", slug: "google" },
      { name: "Meta", slug: "meta/0668E1" }
    ],
  },
  {
    titlePt: "Orquestração Multiagente",
    titleEn: "Multiagent Orchestration",
    descPt: "Sistemas autônomos que colaboram para resolver problemas complexos.",
    descEn: "Autonomous systems that collaborate to solve complex problems.",
    className: "col-span-1 lg:col-span-1 row-span-1 relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent",
    internalClassName: "flex flex-wrap gap-4 justify-start mt-auto pt-6",
    big: false,
    items: [
      { name: "LangChain", slug: "langchain/white" },
      { name: "CrewAI", slug: "crewai" },
      { name: "PydanticAI", slug: "pydantic" },
      { name: "Pi", slug: "pi", iconUrl: "https://api.iconify.design/tabler/math-pi.svg?color=white" },
    ],
  },
  {
    titlePt: "Linguagens de Programação",
    titleEn: "Programming Languages",
    descPt: "A base técnica sólida para sistemas escaláveis e ultra-rápidos.",
    descEn: "The solid technical foundation for scalable and ultra-fast systems.",
    className: "col-span-1 lg:col-span-2 row-span-1 relative overflow-hidden",
    internalClassName: "flex flex-wrap gap-5 justify-start content-start mt-auto pt-6",
    big: false,
    items: [
      { name: "Python", slug: "python" },
      { name: "JavaScript", slug: "javascript" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "C#", slug: "csharp", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/C_Sharp_Logo_2023.svg" },
      { name: "PHP", slug: "php" },
      { name: "SQL", slug: "sql", iconUrl: "https://api.iconify.design/tabler/sql.svg?color=white" },
    ],
  },
  {
    titlePt: "Automação & Integração",
    titleEn: "Automation & Integration",
    descPt: "Conectando o seu ecossistema sem atritos e sem código morto.",
    descEn: "Connecting your ecosystem frictionlessly without dead code.",
    className: "col-span-1 lg:col-span-1 row-span-1 relative overflow-hidden",
    internalClassName: "flex flex-wrap gap-4 justify-start mt-auto pt-6",
    big: false,
    items: [
      { name: "n8n", slug: "n8n" },
      { name: "Make", slug: "make/white" },
      { name: "Zapier", slug: "zapier" }
    ],
  },
  {
    titlePt: "Frameworks & Bibliotecas",
    titleEn: "Frameworks & Libraries",
    descPt: "Arquiteturas modernas para interfaces rápidas e fluidas.",
    descEn: "Modern architectures for fast and fluid interfaces.",
    className: "col-span-1 lg:col-span-1 row-span-1 relative overflow-hidden",
    internalClassName: "flex flex-wrap gap-4 justify-start mt-auto pt-6",
    big: false,
    items: [
      { name: "Next.js", slug: "nextdotjs/white" },
      { name: "React Native", slug: "react" },
      { name: "Laravel", slug: "laravel" },
      { name: "WordPress", slug: "wordpress/white" },
    ],
  },
  {
    titlePt: "Bancos de Dados",
    titleEn: "Databases",
    descPt: "Armazenamento estruturado, seguro e otimizado para vetores de IA.",
    descEn: "Structured, secure, and AI-vector optimized storage.",
    className: "col-span-1 lg:col-span-1 row-span-1 relative overflow-hidden",
    internalClassName: "flex flex-wrap gap-4 justify-start mt-auto pt-6",
    big: false,
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Supabase", slug: "supabase" },
      { name: "Redis", slug: "redis" },
    ],
  },
  {
    titlePt: "Cloud & DevOps",
    titleEn: "Cloud & DevOps",
    descPt: "Infraestrutura elástica que cresce junto com a sua operação.",
    descEn: "Elastic infrastructure that scales alongside your operation.",
    className: "col-span-1 lg:col-span-1 row-span-1 relative overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent",
    internalClassName: "flex flex-wrap gap-4 justify-start mt-auto pt-6",
    big: false,
    items: [
      { name: "AWS", slug: "amazonaws", iconUrl: "https://api.iconify.design/simple-icons/amazonaws.svg?color=white" },
      { name: "Google Cloud", slug: "googlecloud" },
      { name: "Vercel", slug: "vercel/white" },
      { name: "Docker", slug: "docker" },
    ],
  },
];

function TechLogo({ slug, name, big = false, iconUrl }: { slug: string; name: string; big?: boolean; iconUrl?: string }) {
  const cdnUrl = iconUrl || `https://cdn.simpleicons.org/${slug}`;
  return (
    <div className="flex flex-col items-center gap-3 group">
      <div className={`${big ? 'w-16 h-16 rounded-2xl p-3' : 'w-12 h-12 rounded-xl p-2.5'} bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-white/10 group-hover:bg-white/[0.08] group-hover:-translate-y-1 group-hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] transition-all duration-300`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cdnUrl}
          alt={name}
          width={big ? 32 : 24}
          height={big ? 32 : 24}
          className={`w-full h-full opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-md`}
        />
      </div>
      <span className={`${big ? 'text-xs md:text-sm font-semibold' : 'text-[10px] md:text-xs font-medium'} text-muted group-hover:text-foreground transition-colors text-center leading-tight`}>
        {name}
      </span>
    </div>
  );
}

export default function Technologies() {
  const { t } = useLanguage();

  return (
    <section id="tecnologias" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("Tecnologias", "Technologies")}
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            {t(
              "As ferramentas que uso pra montar cada solução. Tudo adaptado ao que sua empresa já tem.",
              "The tools I use to build each solution. All adapted to what your company already has."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-min gap-6">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.titlePt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-colors duration-500 flex flex-col relative overflow-hidden ${cat.className || ''}`}
            >
              {/* Highlight AI Section specifically */}
              {cat.big && (
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[100px] pointer-events-none -z-10 rounded-full" />
              )}
              
              <div className="mb-4">
                <h3 className={`font-bold uppercase tracking-widest mb-3 ${cat.big ? 'text-accent text-sm' : 'text-muted text-xs'}`}>
                  {t(cat.titlePt, cat.titleEn)}
                </h3>
                {(cat as any).descPt && (
                  <p className="text-muted/80 text-xs leading-relaxed max-w-[85%]">
                    {t((cat as any).descPt, (cat as any).descEn)}
                  </p>
                )}
              </div>
              
              <div className={(cat as any).internalClassName || "flex flex-wrap gap-6 md:gap-8 justify-start content-start mt-auto pt-6"}>
                {cat.items.map((item) => (
                  <TechLogo key={item.slug} slug={item.slug} name={item.name} big={cat.big} iconUrl={item.iconUrl} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
