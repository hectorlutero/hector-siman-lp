"use client";

import { MotionValue } from "framer-motion";
import { sectors } from "./data";
import {
  DESKTOP_OUTER_WALL_PATH,
  DESKTOP_CORRIDOR,
  DESKTOP_RECEPTION,
  DESKTOP_ENTRANCE,
} from "./geometry.desktop";
import { Room } from "./components/Room";
import { ContainerBalloon } from "./components/ContainerBalloon";
import { Trace } from "./components/Trace";
import { ChipsCluster } from "./components/ChipsCluster";
import { DoorArc, computeHinge } from "./components/DoorArc";
import { useSectorPhase } from "./hooks/useSectorPhase";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const VIEWBOX = "-340 -40 920 380";

export function FloorPlanDesktop({ scrollYProgress }: Props) {
  const { t } = useLanguage();

  return (
    <svg viewBox={VIEWBOX} className="w-full h-auto" aria-hidden="true">
      <defs>
        <pattern id="ent-dotgrid-d" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.4" fill="#cbd5e1" opacity={0.10} />
        </pattern>
      </defs>

      <path d={DESKTOP_OUTER_WALL_PATH} fill="url(#ent-dotgrid-d)" />

      {/* Reception */}
      <rect
        x={DESKTOP_RECEPTION.x}
        y={DESKTOP_RECEPTION.y}
        width={DESKTOP_RECEPTION.w}
        height={DESKTOP_RECEPTION.h}
        fill="rgba(148,163,184,0.06)"
        stroke="#94a3b8"
        strokeWidth={1}
        strokeDasharray="2 2"
      />
      <text
        x={DESKTOP_RECEPTION.x + DESKTOP_RECEPTION.w / 2}
        y={DESKTOP_RECEPTION.y + DESKTOP_RECEPTION.h / 2 + 2}
        textAnchor="middle"
        fontSize={5}
        fill="#94a3b8"
        opacity={0.7}
        fontFamily="system-ui"
      >
        RECEPÇÃO
      </text>

      {/* Corridor T-shape */}
      <rect
        x={DESKTOP_CORRIDOR.horizontal.x}
        y={DESKTOP_CORRIDOR.horizontal.y}
        width={DESKTOP_CORRIDOR.horizontal.w}
        height={DESKTOP_CORRIDOR.horizontal.h}
        fill="rgba(148,163,184,0.10)"
        stroke="#94a3b8"
        strokeWidth={0.5}
        strokeDasharray="2 2"
      />
      <rect
        x={DESKTOP_CORRIDOR.verticalEntry.x}
        y={DESKTOP_CORRIDOR.verticalEntry.y}
        width={DESKTOP_CORRIDOR.verticalEntry.w}
        height={DESKTOP_CORRIDOR.verticalEntry.h}
        fill="rgba(148,163,184,0.10)"
        stroke="#94a3b8"
        strokeWidth={0.5}
        strokeDasharray="2 2"
      />

      <path d={DESKTOP_OUTER_WALL_PATH} fill="none" stroke="#cbd5e1" strokeWidth={2.5} />

      {/* Building entrance */}
      <line
        x1={DESKTOP_ENTRANCE.x}
        y1={15}
        x2={DESKTOP_ENTRANCE.x + DESKTOP_ENTRANCE.width}
        y2={15}
        stroke="#0a0a1a"
        strokeWidth={3}
      />
      <path
        d={`M ${DESKTOP_ENTRANCE.x + DESKTOP_ENTRANCE.width} 15 A 8 8 0 0 1 ${DESKTOP_ENTRANCE.x} 23`}
        fill="none"
        stroke="#22c55e"
        strokeWidth={1.2}
      />

      {sectors.slice(0, 4).map((sector, i) => (
        <SectorRender
          key={sector.id}
          sector={sector}
          sectorIndex={i}
          scrollYProgress={scrollYProgress}
          t={t}
        />
      ))}
    </svg>
  );
}

function SectorRender({
  sector,
  sectorIndex,
  scrollYProgress,
  t,
}: {
  sector: typeof sectors[number];
  sectorIndex: number;
  scrollYProgress: MotionValue<number>;
  t: (pt: string, en: string) => string;
}) {
  const sectorProgress = useSectorPhase(scrollYProgress, sectorIndex, 4);
  const door = computeHinge(
    sector.geometry.desktopRect,
    sector.geometry.desktopDoor.wall,
    sector.geometry.desktopDoor.offset,
  );
  const tracePath = sector.geometry.desktopTracePath;
  const matchStart = tracePath.match(/^M\s+([-\d.]+)\s+([-\d.]+)/);
  const startPoint: [number, number] = matchStart
    ? [parseFloat(matchStart[1]), parseFloat(matchStart[2])]
    : [0, 0];
  const matchEnd = [...tracePath.matchAll(/L\s+([-\d.]+)\s+([-\d.]+)/g)].pop();
  const endPoint: [number, number] = matchEnd
    ? [parseFloat(matchEnd[1]), parseFloat(matchEnd[2])]
    : startPoint;

  return (
    <g>
      <Room
        rect={sector.geometry.desktopRect}
        center={sector.geometry.desktopCenter}
        namePt={sector.namePt}
        nameEn={sector.nameEn}
        icon={sector.icon}
        sectorProgress={sectorProgress}
        t={t}
      />
      <DoorArc
        hingeX={door.hingeX}
        hingeY={door.hingeY}
        wall={sector.geometry.desktopDoor.wall}
        doorWidth={12}
        bgColor="#0a0a1a"
      />
      <Trace
        d={tracePath}
        vias={sector.geometry.desktopTraceVias}
        startPoint={startPoint}
        endPoint={endPoint}
        sectorProgress={sectorProgress}
      />
      <ContainerBalloon
        sector={sector}
        x={sector.geometry.desktopContainerPos[0]}
        y={sector.geometry.desktopContainerPos[1]}
        sectorProgress={sectorProgress}
        t={t}
      />
      <ChipsCluster
        x={sector.geometry.desktopChipsPos[0]}
        y={sector.geometry.desktopChipsPos[1]}
        sectorProgress={sectorProgress}
      />
    </g>
  );
}
