"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { SubBalloon } from "./SubBalloon";
import type { Sector } from "../data";

interface ContainerBalloonProps {
  sector: Sector;
  x: number;
  y: number;
  sectorProgress: MotionValue<number>;
  t: (pt: string, en: string) => string;
}

const CONTAINER_W = 320;
const CONTAINER_H = 340;
const HEADER_H = 40;
const SUB_W = 280;
const SUB_H = 90;
const SUB_GAP = 10;

export function ContainerBalloon({ sector, x, y, sectorProgress, t }: ContainerBalloonProps) {
  const containerOpacity = useTransform(
    sectorProgress,
    [0.15, 0.18, 0.88, 0.95],
    [0, 1, 1, 0],
  );

  const subStartY = HEADER_H + 16;
  const sub1Y = y + subStartY;
  const sub2Y = sub1Y + SUB_H + SUB_GAP;
  const sub3Y = sub2Y + SUB_H + SUB_GAP;
  const subX = x + (CONTAINER_W - SUB_W) / 2;

  return (
    <g>
      <motion.g style={{ opacity: containerOpacity }}>
        <rect
          x={x}
          y={y}
          width={CONTAINER_W}
          height={CONTAINER_H}
          rx={14}
          fill="rgba(15,23,42,0.95)"
          stroke="#cbd5e1"
          strokeWidth={1.5}
        />
        <rect x={x} y={y} width={CONTAINER_W} height={HEADER_H} rx={14} fill="rgba(34,197,94,0.10)" />
        <rect x={x} y={y + 22} width={CONTAINER_W} height={18} fill="rgba(34,197,94,0.10)" />
        <text
          x={x + 18}
          y={y + 24}
          fill="#22c55e"
          fontSize={13}
          fontWeight="bold"
          fontFamily="system-ui"
          letterSpacing={2}
        >
          IMPACTO IA · {t(sector.namePt, sector.nameEn).toUpperCase()}
        </text>
        <circle cx={x + CONTAINER_W - 18} cy={y + 18} r={3.5} fill="#22c55e" />
        <line
          x1={x + 20}
          y1={y + HEADER_H + 6}
          x2={x + CONTAINER_W - 20}
          y2={y + HEADER_H + 6}
          stroke="#cbd5e1"
          strokeWidth={0.4}
          opacity={0.3}
        />
      </motion.g>

      <SubBalloon
        layer={sector.layers.op}
        x={subX}
        y={sub1Y}
        width={SUB_W}
        height={SUB_H}
        sectorProgress={sectorProgress}
        startProgress={0.25}
        endProgress={0.88}
        t={t}
      />
      <SubBalloon
        layer={sector.layers.tat}
        x={subX}
        y={sub2Y}
        width={SUB_W}
        height={SUB_H}
        sectorProgress={sectorProgress}
        startProgress={0.45}
        endProgress={0.88}
        t={t}
      />
      <SubBalloon
        layer={sector.layers.est}
        x={subX}
        y={sub3Y}
        width={SUB_W}
        height={SUB_H}
        sectorProgress={sectorProgress}
        startProgress={0.65}
        endProgress={0.88}
        t={t}
      />
    </g>
  );
}
