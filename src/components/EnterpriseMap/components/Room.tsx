"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface RoomProps {
  rect: { x: number; y: number; w: number; h: number };
  center: [number, number];
  namePt: string;
  nameEn: string;
  icon: LucideIcon;
  // sectorProgress: 0..1 within this sector's scroll window
  sectorProgress: MotionValue<number>;
  t: (pt: string, en: string) => string;
}

export function Room({ rect, center, namePt, nameEn, icon: Icon, sectorProgress, t }: RoomProps) {
  const fillColor = useTransform(sectorProgress, [0, 0.05, 0.10],
    ["rgba(239,68,68,0.10)", "rgba(239,68,68,0.10)", "rgba(34,197,94,0.14)"]);
  const strokeColor = useTransform(sectorProgress, [0, 0.05, 0.10],
    ["#ef4444", "#ef4444", "#22c55e"]);
  const labelColor = useTransform(sectorProgress, [0, 0.05, 0.10],
    ["#ef4444", "#ef4444", "#22c55e"]);
  const statusOpacity = useTransform(sectorProgress, [0, 0.05, 0.10], [1, 1, 0]);
  const glow = useTransform(sectorProgress, [0.05, 0.10, 0.20],
    ["drop-shadow(0 0 0 transparent)", "drop-shadow(0 0 8px rgba(34,197,94,0.7))", "drop-shadow(0 0 0 transparent)"]);

  return (
    <g role="img" aria-label={`${t(namePt, nameEn)} — ${t("setor com 3 camadas de automação IA", "sector with 3 layers of AI automation")}`}>
      <motion.rect
        x={rect.x}
        y={rect.y}
        width={rect.w}
        height={rect.h}
        style={{
          fill: fillColor,
          stroke: strokeColor,
          filter: glow,
        }}
        strokeWidth={2}
      />
      {/* Sector icon top-left of room */}
      <g transform={`translate(${rect.x + 6}, ${rect.y + 6})`} opacity={0.5}>
        <Icon size={12} stroke="#cbd5e1" strokeWidth={1.5} />
      </g>
      {/* Room label centered */}
      <motion.text
        x={center[0]}
        y={center[1]}
        textAnchor="middle"
        fontSize={9}
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        style={{ fill: labelColor }}
      >
        {t(namePt, nameEn)}
      </motion.text>
      <motion.text
        x={center[0]}
        y={center[1] + 9}
        textAnchor="middle"
        fontSize={4.5}
        fontFamily="system-ui, sans-serif"
        fill="#ef4444"
        opacity={0.75}
        style={{ opacity: statusOpacity }}
      >
        sem automação
      </motion.text>
    </g>
  );
}
