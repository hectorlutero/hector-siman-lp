"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TraceProps {
  d: string;
  vias: Array<[number, number]>;
  startPoint: [number, number];
  endPoint: [number, number];
  sectorProgress: MotionValue<number>;
}

export function Trace({ d, vias, startPoint, endPoint, sectorProgress }: TraceProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(320);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [d]);

  const dashOffset = useTransform(sectorProgress, [0.15, 0.22], [pathLength, 0]);
  const opacity = useTransform(sectorProgress, [0.15, 0.20], [0, 0.85]);
  const viaOpacity = useTransform(sectorProgress, [0.20, 0.24], [0, 1]);

  return (
    <g>
      <motion.path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="#22c55e"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="miter"
        style={{ strokeDasharray: pathLength, strokeDashoffset: dashOffset, opacity }}
      />
      {vias.map(([cx, cy], i) => (
        <motion.circle
          key={`via-${i}`}
          cx={cx}
          cy={cy}
          r={3.5}
          fill="#0a0a1a"
          stroke="#22c55e"
          strokeWidth={1.5}
          style={{ opacity: viaOpacity }}
        />
      ))}
      <motion.rect
        x={startPoint[0] - 4}
        y={startPoint[1] - 3}
        width={8}
        height={6}
        rx={1}
        fill="#22c55e"
        style={{ opacity: viaOpacity }}
      />
      <motion.rect
        x={endPoint[0] - 4}
        y={endPoint[1] - 3}
        width={8}
        height={6}
        rx={1}
        fill="#22c55e"
        style={{ opacity: viaOpacity }}
      />
    </g>
  );
}
