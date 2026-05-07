"use client";

import { sectors } from "./data";
import { MOBILE_OUTER_WALL_PATH, MOBILE_RECEPTION, MOBILE_ENTRANCE } from "./geometry.mobile";
import { Room } from "./components/Room";
import { ContainerBalloon } from "./components/ContainerBalloon";
import { Trace } from "./components/Trace";
import { ChipsCluster } from "./components/ChipsCluster";
import { DoorArc, computeHinge } from "./components/DoorArc";
import { useSectorAnimation } from "./hooks/useSectorAnimation";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  inView: boolean;
}

const VIEWBOX_MOBILE = "-30 0 540 320";

export function FloorPlanMobile({ inView }: Props) {
  const { t } = useLanguage();

  return (
    <svg viewBox={VIEWBOX_MOBILE} className="w-full h-auto" aria-hidden="true">
      <defs>
        <pattern id="ent-dotgrid-m" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.3" fill="#cbd5e1" opacity={0.10} />
        </pattern>
      </defs>

      <path d={MOBILE_OUTER_WALL_PATH} fill="url(#ent-dotgrid-m)" />

      <rect
        x={MOBILE_RECEPTION.x}
        y={MOBILE_RECEPTION.y}
        width={MOBILE_RECEPTION.w}
        height={MOBILE_RECEPTION.h}
        fill="rgba(148,163,184,0.06)"
        stroke="#94a3b8"
        strokeWidth={0.8}
        strokeDasharray="2 2"
      />
      <text
        x={MOBILE_RECEPTION.x + MOBILE_RECEPTION.w / 2}
        y={MOBILE_RECEPTION.y + MOBILE_RECEPTION.h / 2 + 2}
        textAnchor="middle"
        fontSize={6}
        fill="#94a3b8"
        opacity={0.7}
        fontFamily="system-ui"
      >
        RECEPÇÃO
      </text>

      <path d={MOBILE_OUTER_WALL_PATH} fill="none" stroke="#cbd5e1" strokeWidth={2} />

      <line x1={MOBILE_ENTRANCE.x} y1={10} x2={MOBILE_ENTRANCE.x + MOBILE_ENTRANCE.width} y2={10} stroke="#0a0a1a" strokeWidth={2.5} />
      <path
        d={`M ${MOBILE_ENTRANCE.x + MOBILE_ENTRANCE.width} 10 A 8 8 0 0 1 ${MOBILE_ENTRANCE.x} 18`}
        fill="none"
        stroke="#22c55e"
        strokeWidth={1}
      />

      {sectors.slice(0, 4).map((sector, i) => (
        <SectorRender
          key={sector.id}
          sector={sector}
          sectorIndex={i}
          inView={inView}
          t={t}
        />
      ))}
    </svg>
  );
}

function SectorRender({
  sector,
  sectorIndex,
  inView,
  t,
}: {
  sector: typeof sectors[number];
  sectorIndex: number;
  inView: boolean;
  t: (pt: string, en: string) => string;
}) {
  const sectorProgress = useSectorAnimation(inView, sectorIndex);
  const door = computeHinge(
    sector.geometry.mobileRect,
    sector.geometry.mobileDoor.wall,
    sector.geometry.mobileDoor.offset,
  );
  const tracePath = sector.geometry.mobileTracePath;
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
        rect={sector.geometry.mobileRect}
        center={sector.geometry.mobileCenter}
        namePt={sector.namePt}
        nameEn={sector.nameEn}
        icon={sector.icon}
        sectorProgress={sectorProgress}
        t={t}
      />
      <DoorArc
        hingeX={door.hingeX}
        hingeY={door.hingeY}
        wall={sector.geometry.mobileDoor.wall}
        doorWidth={10}
        bgColor="#0a0a1a"
      />
      <Trace
        d={tracePath}
        vias={sector.geometry.mobileTraceVias}
        startPoint={startPoint}
        endPoint={endPoint}
        sectorProgress={sectorProgress}
      />
      <ContainerBalloon
        sector={sector}
        x={sector.geometry.mobileContainerPos[0]}
        y={sector.geometry.mobileContainerPos[1]}
        sectorProgress={sectorProgress}
        t={t}
      />
      <ChipsCluster
        x={sector.geometry.mobileChipsPos[0]}
        y={sector.geometry.mobileChipsPos[1]}
        sectorProgress={sectorProgress}
      />
    </g>
  );
}
