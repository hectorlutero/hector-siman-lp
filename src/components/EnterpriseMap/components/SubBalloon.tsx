"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { LAYER_STYLE, type Layer } from "../data";

interface SubBalloonProps {
  layer: Layer;
  x: number;
  y: number;
  width: number;
  height: number;
  sectorProgress: MotionValue<number>;
  startProgress: number;
  endProgress: number;
  t: (pt: string, en: string) => string;
}

/**
 * Triple-nested groups: outer (SVG transform for position) → middle (motion opacity) →
 * inner (motion translateX). CSS transform on SVG overrides attribute, so this
 * separation prevents conflict.
 */
export function SubBalloon({
  layer,
  x,
  y,
  width,
  height,
  sectorProgress,
  startProgress,
  endProgress,
  t,
}: SubBalloonProps) {
  const style = LAYER_STYLE[layer.key];

  const opacity = useTransform(
    sectorProgress,
    [startProgress, startProgress + 0.04, endProgress, 1],
    [0, 1, 1, 1],
  );
  const slideX = useTransform(
    sectorProgress,
    [startProgress, startProgress + 0.04],
    [-12, 0],
  );

  return (
    <g transform={`translate(${x}, ${y})`}>
      <motion.g style={{ opacity }}>
        <motion.g style={{ x: slideX }}>
          <rect width={width} height={height} rx={8} fill={style.fill} stroke={style.stroke} strokeWidth={1.2} />
          <rect width={width} height={24} rx={8} fill={style.headerBg} />
          <rect y={18} width={width} height={6} fill={style.headerBg} />
          <text x={14} y={17} fill={style.stroke} fontSize={13} fontWeight="bold" fontFamily="system-ui">
            {style.iconUnicode} {style.label}
          </text>
          <text x={12} y={44} fill="#e2e8f0" fontSize={12} fontFamily="system-ui">
            {t(layer.descPt, layer.descEn)}
          </text>
          <text
            x={width - 12}
            y={height - 10}
            fill="#22c55e"
            fontSize={20}
            fontWeight="bold"
            fontFamily="system-ui"
            textAnchor="end"
          >
            {t(layer.resultPt, layer.resultEn)}
          </text>
        </motion.g>
      </motion.g>
    </g>
  );
}
