"use client";

import { MotionValue, useTransform } from "framer-motion";

/**
 * Maps global scrollYProgress (0..1) to local sectorProgress (0..1) for a specific sector.
 *
 * Global scroll is divided as:
 * - 0..0.05 — idle
 * - 0.05..(0.05 + sectorWindow * N) — sector N active
 * - last 0.05 — aggregate window
 *
 * For 4 sectors: each sector window = (1 - 0.05 - 0.05) / 4 = 22.5%.
 */
export function useSectorPhase(
  scrollYProgress: MotionValue<number>,
  sectorIndex: number,
  totalSectors: number,
): MotionValue<number> {
  const startIdle = 0.05;
  const aggregateWindow = 0.05;
  const sectorWindow = (1 - startIdle - aggregateWindow) / totalSectors;
  const sectorStart = startIdle + sectorIndex * sectorWindow;
  const sectorEnd = sectorStart + sectorWindow;

  return useTransform(
    scrollYProgress,
    [0, sectorStart, sectorEnd, 1],
    [0, 0, 1, 1],
    { clamp: true },
  );
}
