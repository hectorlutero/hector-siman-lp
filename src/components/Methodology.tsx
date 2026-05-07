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
                  className="w-full lg:w-1/2"
                >
                  <div className="relative aspect-square md:aspect-[4/3] rounded-3xl glass border border-white/10 overflow-hidden group">
                    {/* Abstract CSS Wireframes based on step */}
                    <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center p-8">
                      {i === 0 && (
                        // Step 1: Standardization (Flow map & SOP fill)
                        <div className="w-full h-full flex items-center justify-between p-4 opacity-100 gap-6">
                          {/* Flow Mapping (Left) */}
                          <div className="relative flex-1 h-full border border-white/10 rounded-xl bg-black/20 overflow-hidden">
                            {/* Nodes */}
                            {/* Start (Input) */}
                            <div className="absolute left-[10%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-accent/80 bg-accent/20 z-10 shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
                            {/* Fork (Decision) */}
                            <div className="absolute left-[30%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 rotate-45 border-2 border-warning/80 bg-warning/20 z-10" />
                            {/* Top Process */}
                            <div className="absolute left-[50%] top-[25%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-md border-2 border-accent/60 bg-accent/10 z-10" />
                            {/* Bottom Process */}
                            <div className="absolute left-[50%] top-[75%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-md border-2 border-accent/60 bg-accent/10 z-10" />
                            {/* Merge */}
                            <div className="absolute left-[70%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 rotate-45 border-2 border-warning/80 bg-warning/20 z-10" />
                            {/* End (Conclusion) */}
                            <div className="absolute left-[90%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-success/80 bg-success/20 z-10 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                              <div className="w-1.5 h-1.5 bg-success rounded-full" />
                            </div>

                            {/* SVG Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                              <line x1="10%" y1="50%" x2="30%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />
                              <line x1="30%" y1="50%" x2="50%" y2="25%" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />
                              <line x1="30%" y1="50%" x2="50%" y2="75%" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />
                              <line x1="50%" y1="25%" x2="70%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />
                              <line x1="50%" y1="75%" x2="70%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />
                              <line x1="70%" y1="50%" x2="90%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />
                            </svg>

                            {/* Mapping Light */}
                            <motion.div
                              animate={{
                                left: ["10%", "30%", "50%", "30%", "50%", "70%", "90%", "90%", "10%", "10%"],
                                top: ["50%", "50%", "25%", "50%", "75%", "50%", "50%", "50%", "50%", "50%"],
                                opacity: [1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
                                scale: [1, 1, 1.5, 1, 1, 1, 1.5, 0, 0, 1]
                              }}
                              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 0.95, 0.99, 1] }}
                              className="absolute w-3 h-3 -ml-1.5 -mt-1.5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)] z-20"
                            />
                          </div>

                          {/* POP Document (Right) */}
                          <div className="w-[45%] h-full border-2 border-white/10 rounded-xl bg-white/5 p-4 flex flex-col gap-4 relative overflow-hidden">
                            <div className="w-1/2 h-3 bg-white/20 rounded mb-2" />
                            {/* Document lines filling */}
                            <motion.div animate={{ scaleX: [0, 1, 1, 0] }} style={{ originX: 0 }} transition={{ duration: 4, repeat: Infinity, ease: "circInOut" }} className="h-2.5 bg-accent/80 rounded w-full" />
                            <motion.div animate={{ scaleX: [0, 1, 1, 0] }} style={{ originX: 0 }} transition={{ duration: 4, delay: 0.3, repeat: Infinity, ease: "circInOut" }} className="h-2.5 bg-accent/80 rounded w-[85%]" />
                            <motion.div animate={{ scaleX: [0, 1, 1, 0] }} style={{ originX: 0 }} transition={{ duration: 4, delay: 0.6, repeat: Infinity, ease: "circInOut" }} className="h-2.5 bg-accent/80 rounded w-[70%]" />
                            <motion.div animate={{ scaleX: [0, 1, 1, 0] }} style={{ originX: 0 }} transition={{ duration: 4, delay: 0.9, repeat: Infinity, ease: "circInOut" }} className="h-2.5 bg-accent/80 rounded w-[90%]" />
                            <motion.div animate={{ scaleX: [0, 1, 1, 0] }} style={{ originX: 0 }} transition={{ duration: 4, delay: 1.2, repeat: Infinity, ease: "circInOut" }} className="h-2.5 bg-accent/80 rounded w-[60%]" />
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
                              
                              {/* Core element */}
                              <motion.div 
                                animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-[35%] h-[35%] border-2 border-success rotate-45 flex items-center justify-center bg-success/10 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                              >
                                <motion.div 
                                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                  className="w-[40%] h-[40%] bg-success/80 shadow-[0_0_10px_#10b981]" 
                                />
                              </motion.div>
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
