"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface ChipsClusterProps {
  x: number;
  y: number;
  sectorProgress: MotionValue<number>;
}

/**
 * 3 chips stacked vertically (bronze/silver/gold) representing collapsed state
 * after container fades out. Triple-nested for outer SVG transform + scale animation.
 */
export function ChipsCluster({ x, y, sectorProgress }: ChipsClusterProps) {
  const opacity = useTransform(sectorProgress, [0.88, 0.92], [0, 1]);
  const scale = useTransform(sectorProgress, [0.88, 0.92], [0, 1]);

  const chips = [
    { color: "#cd7f32", icon: "⚙" },
    { color: "#c0c8d0", icon: "◆" },
    { color: "#d4af37", icon: "★" },
  ];

  return (
    <motion.g style={{ opacity }}>
      {chips.map((chip, i) => (
        <g key={i} transform={`translate(${x}, ${y + i * 22})`}>
          <motion.g style={{ scale, transformOrigin: "center" }}>
            <circle r={9} fill={chip.color} />
            <text
              y={3.5}
              fontSize={10}
              textAnchor="middle"
              fill="#0a0a1a"
              fontWeight="bold"
              fontFamily="system-ui"
            >
              {chip.icon}
            </text>
          </motion.g>
        </g>
      ))}
    </motion.g>
  );
}
