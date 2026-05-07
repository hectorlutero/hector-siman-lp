"use client";

import { useEffect } from "react";
import { useMotionValue, useReducedMotion, animate, MotionValue } from "framer-motion";

const SECTOR_DURATION_S = 4.5;

const SECTOR_DELAYS_S: number[] = [0, 0.4, 4.5, 4.9];

/**
 * Returns a MotionValue<number> 0..1 that animates from 0 to 1 over SECTOR_DURATION_S
 * after `inView` becomes true, with a per-sector delay (hybrid choreography:
 * sectors 0+1 in parallel, then sectors 2+3 in parallel).
 *
 * If user prefers reduced motion, the value snaps to 1 immediately when inView fires.
 */
export function useSectorAnimation(
  inView: boolean,
  sectorIndex: number,
): MotionValue<number> {
  const value = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      value.set(1);
      return;
    }

    const delay = SECTOR_DELAYS_S[sectorIndex] ?? 0;
    const controls = animate(value, 1, {
      duration: SECTOR_DURATION_S,
      delay,
      ease: "easeInOut",
    });

    return () => controls.stop();
  }, [inView, sectorIndex, prefersReducedMotion, value]);

  return value;
}

export const TOTAL_ANIMATION_DURATION_S =
  Math.max(...SECTOR_DELAYS_S) + SECTOR_DURATION_S;

export const AGGREGATE_DELAY_S = TOTAL_ANIMATION_DURATION_S + 0.5;
