"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ClipboardList, Users, Bot, ArrowRight } from "lucide-react";
import { SmartCountUp } from "./ui/SmartCountUp";
import { useRef } from "react";
import { useInView } from "framer-motion";

const phases = [
  {
    num: "01",
    icon: ClipboardList,
    titlePt: "Padronização",
    titleEn: "Standardization",
    descPt:
      "A IA não salva processos caóticos. Primeiro, organizamos a casa. Mapeamos fluxos, documentamos o que está na cabeça das pessoas e eliminamos gargalos invisíveis.",
    descEn:
      "AI cannot fix broken processes. First, we establish structure. We map workflows, capture institutional knowledge, and eliminate hidden bottlenecks.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
    alignment: "image-left",
  },
  {
    num: "02",
    icon: Users,
    titlePt: "Operação Assistida",
    titleEn: "Augmented Operations",
    descPt:
      "Não tiramos o humano da jogada. Colocamos a IA lado a lado com seu time. Eles tomam as decisões críticas, a IA acelera a execução mecânica.",
    descEn:
      "We keep the human in the loop. AI works alongside your team, handling the mechanical execution while they focus on critical decision-making.",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
    alignment: "image-right",
  },
  {
    num: "03",
    icon: Bot,
    titlePt: "Automação 24/7",
    titleEn: "Autonomous Systems",
    descPt:
      "Com o processo maduro e a IA treinada, viramos a chave. Tarefas repetitivas rodam sem supervisão, liberando seu time para pensar em estratégia.",
    descEn:
      "Once processes are optimized and the AI is trained, we shift to full automation. Repetitive tasks run autonomously, freeing your team for strategy.",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/30",
    alignment: "image-left",
  },
];

export default function Methodology() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="metodo" className="py-24 px-6 relative" ref={sectionRef}>
      {/* Background line connecting the steps visually */}
      <div className="absolute left-1/2 top-40 bottom-40 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            {t("O Método de Implementação", "The Implementation Method")}
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            <SmartCountUp 
              text={t(
                "Automatizar o caos só gera um caos mais rápido. Construímos sua operação baseada em IA em 3 etapas sólidas.",
                "Automating chaos only accelerates inefficiency. We build your AI-driven operation through three solid phases.",
              )}
              isVisible={isVisible}
            />
          </p>
        </motion.div>

        <div className="space-y-24 lg:space-y-32">
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            const isImageLeft = phase.alignment === "image-left";

            return (
              <div
                key={phase.num}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isImageLeft ? '' : 'lg:flex-row-reverse'}`}
              >

                {/* Visual/Image Placeholder Column */}
                <motion.div
                  initial={{ opacity: 0, x: isImageLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full max-w-md lg:w-2/5 lg:max-w-md mx-auto lg:mx-0"
                >
                  <div className="relative aspect-[4/3] rounded-2xl glass border border-white/10 overflow-hidden group">
                    {/* Abstract CSS Wireframes — fills the card */}
                    <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6">
                      <div className="w-full h-full">
                      {i === 0 && (
                        // Step 1: Standardization — git tree exploration + sync'd auto-writing SOP
                        <div className="w-full h-full flex items-stretch gap-2 sm:gap-3 md:gap-4">
                          {/* Flow Mapping (LEFT — 2/3) */}
                          <div className="relative basis-2/3 h-full border border-accent/20 rounded-xl bg-accent/[0.03] overflow-hidden">
                            {/* Visible blue grid bg */}
                            <div className="absolute inset-0" style={{
                              backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.16) 1px, transparent 1px)',
                              backgroundSize: '16px 16px'
                            }} />

                            {/* Tree topology — sigmoidal sprouts, branches end at unique tips, no merge-back */}
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                              {/* MAIN TRUNK — always visible */}
                              <path d="M 5 50 L 95 50" fill="none" stroke="rgba(59,130,246,0.45)" strokeWidth="1" strokeLinecap="round" />

                              {/* SEGMENT BASE TRACES + REVEAL OVERLAYS — line traces FAST (~half the pulse window) then stays bright */}
                              {[
                                // Branch 1 — pulse 0.04-0.22, line traces 0.06-0.13
                                { d: "M 15 50 C 30 50 35 20 50 20 L 88 20", revealStart: 0.06, traceEnd: 0.13 },
                                // Branch 2 — pulse 0.30-0.54, line traces 0.34-0.43
                                { d: "M 22 50 C 37 50 37 70 52 70 L 88 70", revealStart: 0.34, traceEnd: 0.43 },
                                // Branch 3 — pulse 0.62-0.88, line traces 0.77-0.82
                                { d: "M 55 70 C 62 70 62 88 70 88 L 88 88", revealStart: 0.77, traceEnd: 0.82 },
                              ].map((seg, idx) => (
                                <g key={`seg-${idx}`}>
                                  <path d={seg.d} fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="0.6" />
                                  <motion.path
                                    d={seg.d}
                                    fill="none"
                                    stroke="#3b82f6"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    pathLength={1}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{
                                      pathLength: [0, 0, 1, 1, 1, 0],
                                      opacity: [0, 0.9, 0.9, 0.9, 0, 0],
                                    }}
                                    transition={{
                                      duration: 12,
                                      repeat: Infinity,
                                      ease: "linear",
                                      times: [0, seg.revealStart, seg.traceEnd, 0.95, 0.96, 1],
                                    }}
                                  />
                                </g>
                              ))}

                              {/* PULSES — P3 retraces trunk + B2 sigmoid + B2 plateau partial, then sub-branches to B3 tip */}
                              {[
                                // Pulse 1: trunk → fork@15 → sigmoid up → plateau y=20 → tip1
                                { d: "M 5 50 L 15 50 C 30 50 35 20 50 20 L 88 20", pulseStart: 0.04, pulseEnd: 0.22 },
                                // Pulse 2: trunk → fork@22 → symmetric sigmoid → plateau y=70 → tip2
                                { d: "M 5 50 L 22 50 C 37 50 37 70 52 70 L 88 70", pulseStart: 0.30, pulseEnd: 0.54 },
                                // Pulse 3: trunk → fork@22 → B2 sigmoid → B2 plateau (to x=55) → sub-fork → sigmoid down → plateau y=88 → tip3
                                { d: "M 5 50 L 22 50 C 37 50 37 70 52 70 L 55 70 C 62 70 62 88 70 88 L 88 88", pulseStart: 0.62, pulseEnd: 0.88 },
                              ].map((p, idx) => (
                                <motion.path
                                  key={`pulse-${idx}`}
                                  d={p.d}
                                  fill="none"
                                  stroke="#93c5fd"
                                  strokeWidth="2"
                                  strokeDasharray="20 350"
                                  strokeLinecap="round"
                                  initial={{ opacity: 0 }}
                                  animate={{
                                    opacity: [0, 0, 1, 1, 0, 0],
                                    strokeDashoffset: [50, 50, 50, -340, -340, -340],
                                  }}
                                  transition={{
                                    duration: 12,
                                    repeat: Infinity,
                                    times: [0, p.pulseStart - 0.005, p.pulseStart, p.pulseEnd, p.pulseEnd + 0.005, 1],
                                    ease: "linear",
                                  }}
                                />
                              ))}
                            </svg>

                            {/* TRUNK COMMITS — always visible (start, 2 fork points, end) */}
                            {[
                              { left: "5%", top: "50%", endpoint: true },
                              { left: "15%", top: "50%" },
                              { left: "22%", top: "50%" },
                              { left: "95%", top: "50%", endpoint: true },
                            ].map((node, idx) => (
                              <div
                                key={`trunk-${idx}`}
                                className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 ${node.endpoint ? "w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_rgba(59,130,246,0.7)]" : "w-1.5 h-1.5 rounded-full bg-accent/80 border border-accent"}`}
                                style={{ left: node.left, top: node.top }}
                              />
                            ))}

                            {/* BRANCH 1 COMMITS — curve + plateau y=20, revealed by pulse 1 */}
                            {[
                              { left: "35%", top: "30%", revealAt: 0.10 },
                              { left: "55%", top: "20%", revealAt: 0.14 },
                              { left: "70%", top: "20%", revealAt: 0.18 },
                            ].map((node, idx) => (
                              <motion.div
                                key={`b1-${idx}`}
                                className="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/80 border border-accent z-10"
                                style={{ left: node.left, top: node.top }}
                                initial={{ opacity: 0.12 }}
                                animate={{ opacity: [0.12, 0.12, 1, 1, 0.12, 0.12] }}
                                transition={{
                                  duration: 12,
                                  repeat: Infinity,
                                  times: [0, Math.max(0, node.revealAt - 0.02), node.revealAt, 0.96, 0.99, 1],
                                }}
                              />
                            ))}

                            {/* BRANCH 2 COMMITS — symmetric sigmoid then plateau y=70 from x=52 */}
                            {[
                              { left: "37%", top: "60%", revealAt: 0.39 },
                              { left: "75%", top: "70%", revealAt: 0.50 },
                              { left: "85%", top: "70%", revealAt: 0.53 },
                            ].map((node, idx) => (
                              <motion.div
                                key={`b2-${idx}`}
                                className="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/80 border border-accent z-10"
                                style={{ left: node.left, top: node.top }}
                                initial={{ opacity: 0.12 }}
                                animate={{ opacity: [0.12, 0.12, 1, 1, 0.12, 0.12] }}
                                transition={{
                                  duration: 12,
                                  repeat: Infinity,
                                  times: [0, Math.max(0, node.revealAt - 0.02), node.revealAt, 0.96, 0.99, 1],
                                }}
                              />
                            ))}

                            {/* SUB-FORK DIAMOND — at (55, 70), revealed when B2 line passes through it (~0.44) */}
                            <motion.div
                              className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border border-accent bg-accent/30 z-10"
                              style={{ left: "55%", top: "70%" }}
                              initial={{ opacity: 0.12 }}
                              animate={{ opacity: [0.12, 0.12, 1, 1, 0.12, 0.12] }}
                              transition={{
                                duration: 12,
                                repeat: Infinity,
                                times: [0, 0.42, 0.44, 0.96, 0.99, 1],
                              }}
                            />

                            {/* BRANCH 3 COMMITS — sub-sigmoid then plateau y=88 from x=70 */}
                            {[
                              { left: "62%", top: "79%", revealAt: 0.80 },
                              { left: "78%", top: "88%", revealAt: 0.85 },
                            ].map((node, idx) => (
                              <motion.div
                                key={`b3-${idx}`}
                                className="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/80 border border-accent z-10"
                                style={{ left: node.left, top: node.top }}
                                initial={{ opacity: 0.12 }}
                                animate={{ opacity: [0.12, 0.12, 1, 1, 0.12, 0.12] }}
                                transition={{
                                  duration: 12,
                                  repeat: Infinity,
                                  times: [0, Math.max(0, node.revealAt - 0.02), node.revealAt, 0.96, 0.99, 1],
                                }}
                              />
                            ))}

                            {/* DESTINATION TIPS — at end of each plateau, revealed when pulse arrives */}
                            {[
                              { left: "88%", top: "20%", revealAt: 0.22 },
                              { left: "88%", top: "70%", revealAt: 0.54 },
                              { left: "88%", top: "88%", revealAt: 0.88 },
                            ].map((tip, idx) => (
                              <motion.div
                                key={`tip-${idx}`}
                                className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-accent bg-accent/30 z-10 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                                style={{ left: tip.left, top: tip.top }}
                                initial={{ opacity: 0.12 }}
                                animate={{ opacity: [0.12, 0.12, 1, 1, 0.12, 0.12] }}
                                transition={{
                                  duration: 12,
                                  repeat: Infinity,
                                  times: [0, Math.max(0, tip.revealAt - 0.02), tip.revealAt, 0.96, 0.99, 1],
                                }}
                              />
                            ))}

                          </div>

                          {/* POP Document (RIGHT — 1/3) — each pulse triggers 4 lines */}
                          <div className="basis-1/3 shrink-0 h-full border border-accent/20 rounded-xl bg-accent/[0.02] p-3 flex flex-col gap-2 relative overflow-hidden">
                            <div className="flex items-center gap-1.5 mb-1">
                              <ClipboardList size={11} className="text-accent/70 shrink-0" strokeWidth={2} />
                              <div className="flex-1 h-px bg-accent/30" />
                            </div>
                            {([
                              // Pulse 1 — 4 lines during 0.04-0.22, check after pulse ends
                              { width: "100%", revealAt: 0.08, checkbox: true, checkAt: 0.24 },
                              { width: "82%", revealAt: 0.13 },
                              { width: "70%", revealAt: 0.17 },
                              { width: "90%", revealAt: 0.22 },
                              // Pulse 2 — 4 lines during 0.30-0.54, check after pulse ends
                              { width: "75%", revealAt: 0.34, checkbox: true, checkAt: 0.56 },
                              { width: "92%", revealAt: 0.40 },
                              { width: "60%", revealAt: 0.47 },
                              { width: "78%", revealAt: 0.54 },
                              // Pulse 3 — 4 lines during 0.62-0.88, check after pulse ends
                              { width: "85%", revealAt: 0.66, checkbox: true, checkAt: 0.90 },
                              { width: "65%", revealAt: 0.73 },
                              { width: "95%", revealAt: 0.80 },
                              { width: "55%", revealAt: 0.88 },
                            ] as { width: string; revealAt: number; checkbox?: boolean; checkAt?: number }[]).map((line, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                {line.checkbox && line.checkAt !== undefined ? (
                                  <motion.div
                                    className="relative w-2 h-2 border border-accent/55 rounded-[2px] shrink-0 flex items-center justify-center"
                                    animate={{ backgroundColor: ["rgba(59,130,246,0)", "rgba(59,130,246,0)", "rgba(59,130,246,0.7)", "rgba(59,130,246,0.7)", "rgba(59,130,246,0)"] }}
                                    transition={{
                                      duration: 12,
                                      repeat: Infinity,
                                      times: [0, Math.max(0, line.checkAt - 0.01), line.checkAt, 0.96, 1],
                                    }}
                                  >
                                    <motion.svg
                                      viewBox="0 0 8 8"
                                      className="absolute inset-0 w-full h-full"
                                      animate={{ opacity: [0, 0, 1, 1, 0] }}
                                      transition={{
                                        duration: 12,
                                        repeat: Infinity,
                                        times: [0, Math.max(0, line.checkAt - 0.01), line.checkAt, 0.96, 1],
                                      }}
                                    >
                                      <path d="M 1.5 4 L 3.5 6 L 6.5 2.5" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </motion.svg>
                                  </motion.div>
                                ) : (
                                  <div className="w-1 h-1 rounded-full bg-accent/45 shrink-0 ml-0.5" />
                                )}
                                <motion.div
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: [0, 0, 1, 1, 0] }}
                                  style={{ originX: 0, width: line.width }}
                                  transition={{
                                    duration: 12,
                                    repeat: Infinity,
                                    ease: [0.25, 0.8, 0.25, 1],
                                    times: [0, Math.max(0, line.revealAt - 0.01), Math.min(0.95, line.revealAt + 0.025), 0.96, 1],
                                  }}
                                  className="h-1.5 bg-accent/60 rounded-full"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {i === 1 && (
                        // Step 2: Dashboard (Play/Pause, BI, Scene change)
                        <div className="w-full h-full border-2 border-warning/30 bg-warning/5 rounded-xl flex flex-col opacity-100 relative overflow-hidden">

                          {/* Layer 1: Scene 1 (Big Central Play Button) */}
                          <motion.div
                            // Opacity: [0-0.22] Visible | [0.26] Fades out | [0.92] Hidden | [0.96] Fades back in
                            animate={{ opacity: [1, 1, 0, 0, 1, 1] }}
                            transition={{ duration: 12, repeat: Infinity, times: [0, 0.22, 0.26, 0.92, 0.96, 1] }}
                            className="absolute inset-0 flex items-center justify-center z-20 bg-warning/5 backdrop-blur-[2px]"
                          >
                            <div className="w-20 h-20 rounded-full border-2 border-warning/50 flex items-center justify-center bg-warning/20 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-warning border-b-[12px] border-b-transparent ml-2" />
                            </div>
                          </motion.div>

                          {/* Layer 2: Dashboard Scene (Data 1 & 2) */}
                          <motion.div
                            // Opacity: [0-0.22] Hidden | [0.26] Fades in | [0.92] Visible | [0.96] Fades out
                            animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                            transition={{ duration: 12, repeat: Infinity, times: [0, 0.22, 0.26, 0.92, 0.96, 1] }}
                            className="absolute inset-0 p-5 flex flex-col gap-4 z-10"
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-warning/20 pb-3">
                              <div className="flex items-center gap-4">
                                {/* Dashboard Play/Pause Button (Target for mouse click at 85%) */}
                                <div className="w-10 h-10 rounded-full border border-warning/50 flex items-center justify-center bg-warning/10 relative shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                                  {/* Pause Icon. Starts fading in at 0.25. Toggles instantly to 0 at 0.82 (after click down at 0.81) */}
                                  <motion.div animate={{ opacity: [0, 0, 1, 1, 0, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "linear", times: [0, 0.25, 0.26, 0.71, 0.72, 1] }} className="flex gap-1">
                                    <div className="w-1 h-3 bg-warning" />
                                    <div className="w-1 h-3 bg-warning" />
                                  </motion.div>
                                  {/* Play Icon. Toggles instantly to 1 at 0.72 */}
                                  <motion.div animate={{ opacity: [1, 1, 0, 0, 1, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "linear", times: [0, 0.25, 0.26, 0.71, 0.72, 1] }} className="absolute w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-warning border-b-[6px] border-b-transparent ml-1" />
                                </div>
                                <div className="h-3 w-24 bg-warning/20 rounded" />
                              </div>
                              <div className="text-xs text-warning/70 font-mono tracking-widest relative w-16 h-4">
                                {/* DATA_01 Text: Fades in at 0.26, Fades out at 0.60 */}
                                <motion.span animate={{ opacity: [0, 0, 1, 1, 0, 0] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.25, 0.26, 0.55, 0.60, 1] }} className="absolute right-0">DATA_01</motion.span>
                                {/* DATA_02 Text: Fades in at 0.60, Fades out at 0.96 */}
                                <motion.span animate={{ opacity: [0, 0, 0, 1, 1, 0] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.55, 0.60, 0.65, 0.92, 0.96] }} className="absolute right-0 text-warning font-bold">DATA_02</motion.span>
                              </div>
                            </div>

                            {/* Body Container */}
                            <div className="flex-1 relative">
                              {/* Body 1: Donut and BI */}
                              <motion.div
                                // Fades in at 0.26, stays until 0.55, fully fades out at 0.60
                                animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                                transition={{ duration: 12, repeat: Infinity, times: [0, 0.25, 0.26, 0.55, 0.60, 1] }}
                                className="absolute inset-0 flex gap-6 items-center"
                              >
                                {/* Donut Chart */}
                                <div className="w-24 h-24 relative flex items-center justify-center shrink-0">
                                  <svg className="w-full h-full -rotate-90">
                                    <circle cx="48" cy="48" r="36" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none" />
                                    <motion.circle cx="48" cy="48" r="36" stroke="#f59e0b" strokeWidth="12" fill="none" strokeDasharray="226" animate={{ strokeDashoffset: [226, 226, 60, 60, 226, 226] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.26, 0.32, 0.90, 0.92, 1], ease: "easeInOut" }} />
                                  </svg>
                                  <div className="absolute text-warning font-bold text-sm">75%</div>
                                </div>

                                {/* BI Bars */}
                                <div className="flex-1 h-24 flex items-end justify-around gap-2">
                                  <motion.div animate={{ height: ["0%", "0%", "80%", "80%", "0%", "0%"] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.26, 0.32, 0.90, 0.92, 1] }} className="w-full bg-warning/60 rounded-t-sm" />
                                  <motion.div animate={{ height: ["0%", "0%", "60%", "60%", "0%", "0%"] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.26, 0.32, 0.90, 0.92, 1] }} className="w-full bg-warning/80 rounded-t-sm" />
                                  <motion.div animate={{ height: ["0%", "0%", "100%", "100%", "0%", "0%"] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.26, 0.32, 0.90, 0.92, 1] }} className="w-full bg-warning rounded-t-sm shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                                  <motion.div animate={{ height: ["0%", "0%", "40%", "40%", "0%", "0%"] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.26, 0.32, 0.90, 0.92, 1] }} className="w-full bg-warning/40 rounded-t-sm" />
                                </div>
                              </motion.div>

                              {/* Body 2: Area Chart & Progress Bars */}
                              <motion.div
                                // Fades in starting at 0.55, fully visible at 0.60
                                animate={{ opacity: [0, 0, 0, 1, 1, 0, 0] }}
                                transition={{ duration: 12, repeat: Infinity, times: [0, 0.55, 0.60, 0.65, 0.92, 0.96, 1] }}
                                className="absolute inset-0 flex gap-6 items-center"
                              >
                                {/* Area Chart */}
                                <div className="flex-[1.2] h-24 border border-warning/20 rounded-lg bg-warning/5 relative overflow-hidden flex items-end">
                                  <div className="absolute inset-0 flex flex-col justify-between p-2 opacity-20">
                                    <div className="border-b border-warning w-full h-px" />
                                    <div className="border-b border-warning w-full h-px" />
                                    <div className="border-b border-warning w-full h-px" />
                                  </div>
                                  <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full pt-4">
                                    <motion.path
                                      d="M 0 50 L 0 30 Q 25 10 50 35 T 100 15 L 100 50 Z"
                                      fill="rgba(245,158,11,0.2)"
                                      animate={{ opacity: [0, 0, 0, 1, 1, 0, 0] }}
                                      transition={{ duration: 12, repeat: Infinity, times: [0, 0.50, 0.55, 0.65, 0.90, 0.92, 1] }}
                                    />
                                    <motion.path
                                      d="M 0 30 Q 25 10 50 35 T 100 15"
                                      fill="none"
                                      stroke="#f59e0b"
                                      strokeWidth="3"
                                      initial={{ pathLength: 0 }}
                                      animate={{ pathLength: [0, 0, 0, 1, 1, 0, 0] }}
                                      transition={{ duration: 12, repeat: Infinity, times: [0, 0.50, 0.55, 0.65, 0.90, 0.92, 1] }}
                                    />
                                  </svg>
                                </div>

                                {/* Horizontal Progress Bars */}
                                <div className="flex-[0.8] h-20 flex flex-col justify-around gap-2">
                                  <div className="w-full h-3 bg-warning/20 rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-warning shadow-[0_0_10px_rgba(245,158,11,0.5)]" animate={{ width: ["0%", "0%", "0%", "85%", "85%", "0%", "0%"] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.50, 0.55, 0.65, 0.90, 0.92, 1] }} />
                                  </div>
                                  <div className="w-full h-3 bg-warning/20 rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-warning/70" animate={{ width: ["0%", "0%", "0%", "45%", "45%", "0%", "0%"] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.50, 0.55, 0.65, 0.90, 0.92, 1] }} />
                                  </div>
                                  <div className="w-full h-3 bg-warning/20 rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-warning/40" animate={{ width: ["0%", "0%", "0%", "65%", "65%", "0%", "0%"] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.50, 0.55, 0.65, 0.90, 0.92, 1] }} />
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          </motion.div>

                          {/* Layer 3: Mouse Cursor */}
                          <motion.div
                            animate={{
                              left: [
                                "120%", "120%", // [0, 1] Idle offscreen right
                                "50%", // [2] Arrive at Center Play button
                                "50%", "50%", // [3, 4] Click down and up
                                "80%", "80%", // [5, 6] Move to bottom right and idle
                                "10%", // [7] Arrive at top-left Pause button
                                "10%", "10%", // [8, 9] Click down and up
                                "120%", "120%" // [10, 11] Leave offscreen right
                              ],
                              top: [
                                "120%", "120%", // [0, 1] Idle offscreen bottom
                                "50%", // [2] Arrive at Center Play button
                                "50%", "50%", // [3, 4] Click down and up
                                "80%", "80%", // [5, 6] Move to bottom right and idle
                                "12%", // [7] Arrive at top-left Pause button
                                "12%", "12%", // [8, 9] Click down and up
                                "120%", "120%" // [10, 11] Leave offscreen bottom
                              ],
                              scale: [
                                1, 1, // [0, 1] Normal
                                1, // [2] Normal
                                0.7, 1, // [3, 4] Click down, click up
                                1, 1, // [5, 6] Normal
                                1, // [7] Normal
                                0.7, 1, // [8, 9] Click down, click up
                                1, 1 // [10, 11] Normal
                              ]
                            }}
                            transition={{
                              duration: 12,
                              repeat: Infinity,
                              ease: "easeInOut",
                              times: [
                                0, 0.05, // [0, 1] Start loop, wait before first movement
                                0.12, 0.15, 0.18, // [2, 3, 4] Arrive center, wait, click down, click up
                                0.22, 0.63, // [5, 6] Arrive bottom-right, wait while dashboard & data plays
                                0.70, 0.71, 0.73, // [7, 8, 9] Arrive top-left, click down, click up
                                0.86, 1 // [10, 11] Leave screen, end loop
                              ]
                            }}
                            className="absolute w-7 h-7 z-50 pointer-events-none origin-top-left drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                          >
                            <svg viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1.5" className="w-full h-full">
                              <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L5.5 3.21z" />
                            </svg>
                          </motion.div>
                        </div>
                      )}

                      {i === 2 && (
                        // Step 3: Automation / Motherboard
                        <div className="w-full h-full bg-black/60 border-2 border-success/30 rounded-xl relative overflow-hidden flex items-center justify-center opacity-100 p-4 lg:p-8">
                          {/* Grid Background */}
                          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                          
                          {/* Perfect Square Wrapper for Responsive SVG Alignment */}
                          <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
                            
                            {/* SVG Circuit Lines */}
                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible z-0">
                              {[
                                { d: "M -10 20 L 20 20 L 35 35 L 35 50", delay: 0, duration: 2 },
                                { d: "M 110 80 L 80 80 L 65 65 L 65 50", delay: 0.5, duration: 2.2 },
                                { d: "M 20 -10 L 20 20 L 35 35 L 50 35", delay: 1, duration: 1.8 },
                                { d: "M 80 110 L 80 80 L 65 65 L 50 65", delay: 0.2, duration: 2.5 },
                                { d: "M -10 80 L 20 80 L 35 65 L 50 65", delay: 1.2, duration: 2.1 },
                                { d: "M 110 20 L 80 20 L 65 35 L 50 35", delay: 0.8, duration: 1.9 },
                                { d: "M -10 50 L 35 50", delay: 0.4, duration: 1.5 },
                                { d: "M 110 50 L 65 50", delay: 1.5, duration: 1.6 }
                              ].map((path, idx) => (
                                <g key={idx}>
                                  {/* Base Dim Trace */}
                                  <path d={path.d} fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
                                  {/* Animated Bright Packet */}
                                  <motion.path 
                                    d={path.d} 
                                    fill="none" 
                                    stroke="#10b981" 
                                    strokeWidth="2" 
                                    strokeLinecap="round"
                                    strokeDasharray="15 100"
                                    animate={{ strokeDashoffset: [25, -100] }}
                                    transition={{ duration: path.duration, repeat: Infinity, ease: "linear", delay: path.delay }}
                                  />
                                </g>
                              ))}
                            </svg>

                            {/* Central Processor */}
                            <div className="absolute w-[40%] h-[40%] max-w-[120px] max-h-[120px] bg-[#05150d] border border-success/40 rounded-xl z-10 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3),inset_0_0_15px_rgba(16,185,129,0.2)] backdrop-blur-md overflow-hidden">
                              {/* Corner Accents */}
                              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-success/40 rounded-tl-sm" />
                              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-success/40 rounded-tr-sm" />
                              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-success/40 rounded-bl-sm" />
                              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-success/40 rounded-br-sm" />

                              {/* Background scanning line */}
                              <motion.div 
                                animate={{ top: ["-10%", "110%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute w-full h-[2px] bg-success/50 shadow-[0_0_15px_#10b981]"
                              />
                              
                              {/* Infinity core — pulse travels along the lemniscate forever */}
                              <motion.svg
                                viewBox="0 0 100 40"
                                className="w-[88%] h-auto overflow-visible drop-shadow-[0_0_8px_rgba(16,185,129,0.55)]"
                                animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                              >
                                {/* Base dim trace */}
                                <path
                                  d="M 50 20 C 38 2, 12 2, 8 20 C 4 38, 38 38, 50 20 C 62 2, 96 2, 92 20 C 88 38, 62 38, 50 20 Z"
                                  fill="none"
                                  stroke="rgba(16,185,129,0.35)"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                />
                                {/* Bright glow stroke (steady) */}
                                <path
                                  d="M 50 20 C 38 2, 12 2, 8 20 C 4 38, 38 38, 50 20 C 62 2, 96 2, 92 20 C 88 38, 62 38, 50 20 Z"
                                  fill="none"
                                  stroke="#10b981"
                                  strokeWidth="1.6"
                                  strokeOpacity="0.6"
                                  strokeLinecap="round"
                                />
                                {/* Traveling pulse — strokeDashoffset loop */}
                                <motion.path
                                  d="M 50 20 C 38 2, 12 2, 8 20 C 4 38, 38 38, 50 20 C 62 2, 96 2, 92 20 C 88 38, 62 38, 50 20 Z"
                                  fill="none"
                                  stroke="#a7f3d0"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeDasharray="22 240"
                                  animate={{ strokeDashoffset: [262, 0] }}
                                  transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
                                  style={{ filter: "drop-shadow(0 0 4px #10b981)" }}
                                />
                              </motion.svg>
                            </div>

                            {/* Decorative Nodes on Traces */}
                            <div className="absolute top-[20%] left-[20%] w-2 h-2 rounded-full border border-success/60 bg-[#05150d] z-10" />
                            <div className="absolute bottom-[20%] right-[20%] w-2 h-2 rounded-full border border-success/60 bg-[#05150d] z-10" />
                            <div className="absolute top-[20%] right-[20%] w-2.5 h-2.5 bg-success/30 z-10 rotate-45 border border-success/50" />
                            <div className="absolute bottom-[20%] left-[20%] w-2.5 h-2.5 bg-success/30 z-10 rotate-45 border border-success/50" />
                          </div>
                        </div>
                      )}
                      </div>
                    </div>

                    {/* Overlay Glow */}
                    <div className={`absolute -inset-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-${phase.color.split('-')[1]}/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl`} />
                  </div>
                </motion.div>

                {/* Text Content Column */}
                <motion.div
                  initial={{ opacity: 0, x: isImageLeft ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2 space-y-6"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-6xl font-black text-white/5 select-none tracking-tighter">
                      {phase.num}
                    </span>
                    <div className={`w-12 h-12 rounded-xl ${phase.bg} flex items-center justify-center border ${phase.border}`}>
                      <Icon size={24} className={phase.color} />
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold">
                    {t(phase.titlePt, phase.titleEn)}
                  </h3>

                  <p className="text-lg text-muted leading-relaxed">
                    <SmartCountUp text={t(phase.descPt, phase.descEn)} isVisible={isVisible} />
                  </p>

                  <div className="pt-4 flex items-center gap-2 text-sm font-semibold text-white/40 group cursor-default">
                    {t("Fase", "Phase")} {phase.num} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
