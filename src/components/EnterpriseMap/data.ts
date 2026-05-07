// landing-page/src/components/EnterpriseMap/data.ts
import type { LucideIcon } from "lucide-react";

export type LayerKey = "operacional" | "tatico" | "estrategico";

export type SectorId =
  | "marketing"
  | "vendas"
  | "atendimento"
  | "financas"
  // Fase 2 (não implementados nesta iteração mas tipados pra evolução):
  | "diretoria"
  | "operacoes"
  | "rh"
  | "ti";

export interface Layer {
  key: LayerKey;
  titlePt: string;
  titleEn: string;
  descPt: string;
  descEn: string;
  resultPt: string;
  resultEn: string;
}

export interface RoomGeometry {
  desktopRect: { x: number; y: number; w: number; h: number };
  mobileRect: { x: number; y: number; w: number; h: number };
  desktopCenter: [number, number];
  mobileCenter: [number, number];
  desktopContainerPos: [number, number];
  mobileContainerPos: [number, number];
  desktopTracePath: string;
  mobileTracePath: string;
  desktopTraceVias: Array<[number, number]>;
  mobileTraceVias: Array<[number, number]>;
  desktopChipsPos: [number, number];
  mobileChipsPos: [number, number];
  desktopDoor: { wall: "n" | "s" | "e" | "w"; offset: number };
  mobileDoor: { wall: "n" | "s" | "e" | "w"; offset: number };
}

export interface Sector {
  id: SectorId;
  namePt: string;
  nameEn: string;
  icon: LucideIcon;
  order: number;
  geometry: RoomGeometry;
  layers: { op: Layer; tat: Layer; est: Layer };
}

export const LAYER_STYLE: Record<
  LayerKey,
  {
    stroke: string;
    fill: string;
    headerBg: string;
    label: string;
    iconUnicode: string;
  }
> = {
  operacional: {
    stroke: "var(--color-bronze)",
    fill: "rgba(205,127,50,0.06)",
    headerBg: "rgba(205,127,50,0.18)",
    label: "OPERACIONAL",
    iconUnicode: "⚙",
  },
  tatico: {
    stroke: "var(--color-silver)",
    fill: "rgba(192,200,208,0.06)",
    headerBg: "rgba(192,200,208,0.18)",
    label: "TÁTICO",
    iconUnicode: "◆",
  },
  estrategico: {
    stroke: "var(--color-gold)",
    fill: "rgba(212,175,55,0.06)",
    headerBg: "rgba(212,175,55,0.18)",
    label: "ESTRATÉGICO",
    iconUnicode: "★",
  },
};
