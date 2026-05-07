"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { efficiencyData, roiData } from "@/lib/chartData";
import { TrendingDown, TrendingUp, Zap } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export default function Charts() {
  const { t } = useLanguage();

  return (
    <section id="resultados" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("Resultados em números", "Results in numbers")}
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            {t(
              "Dados reais de como a IA muda a operação ao longo dos meses.",
              "Real data on how AI changes operations over the months."
            )}
          </p>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
        >
          <div className="glass rounded-2xl p-6 text-center">
            <Zap size={24} className="text-success mx-auto mb-3" />
            <div className="text-3xl font-extrabold text-success">
              <AnimatedCounter end={99} suffix="%" />
            </div>
            <div className="text-sm text-muted mt-1">
              {t("ganho em eficiência", "efficiency gain")}
            </div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <TrendingDown size={24} className="text-accent mx-auto mb-3" />
            <div className="text-3xl font-extrabold text-accent">12h → 5min</div>
            <div className="text-sm text-muted mt-1">
              {t("tempo semanal", "weekly time")}
            </div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <TrendingUp size={24} className="text-warning mx-auto mb-3" />
            <div className="text-3xl font-extrabold text-warning">
              R$ <AnimatedCounter end={19500} />
            </div>
            <div className="text-sm text-muted mt-1">
              {t("economia anual", "annual savings")}
            </div>
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Efficiency Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold mb-2">
              {t("Horas manuais vs. com IA", "Manual hours vs. with AI")}
            </h3>
            <p className="text-xs text-muted mb-6">
              {t("Horas por semana ao longo de 6 meses", "Hours per week over 6 months")}
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#f1f5f9",
                    fontSize: "13px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="manual"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="8 4"
                  dot={{ fill: "#ef4444", r: 4 }}
                  name={t("Manual", "Manual")}
                  animationDuration={2000}
                />
                <Line
                  type="monotone"
                  dataKey="withAI"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 4 }}
                  name={t("Com IA", "With AI")}
                  animationDuration={2000}
                  animationBegin={500}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* ROI Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold mb-2">
              {t("Curva de ROI", "ROI Curve")}
            </h3>
            <p className="text-xs text-muted mb-6">
              {t(
                "Investimento vs. economia acumulada (R$)",
                "Investment vs. cumulative savings (R$)"
              )}
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#f1f5f9",
                    fontSize: "13px",
                  }}
                  formatter={(value: number) =>
                    `R$ ${value.toLocaleString("pt-BR")}`
                  }
                />
                <ReferenceLine
                  y={8000}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  label={{
                    value: t("Investimento", "Investment"),
                    position: "right",
                    fill: "#ef4444",
                    fontSize: 11,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 4 }}
                  name={t("Economia", "Savings")}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
