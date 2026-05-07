// landing-page/src/components/EnterpriseMap/geometry.mobile.ts
// viewBox 160×640 (estendido pra caber container abaixo de cada sala)

export const MOBILE_VIEWBOX = { width: 160, height: 640 };

// Outer wall L-vertical (notch top-right)
export const MOBILE_OUTER_WALL_PATH =
  "M 10 10 L 100 10 L 100 50 L 145 50 L 145 305 L 10 305 Z";

export const MOBILE_RECEPTION = { x: 10, y: 10, w: 90, h: 40 };
export const MOBILE_ENTRANCE = { x: 55, y: 10, width: 10 };

type RoomEntry = {
  rect: { x: number; y: number; w: number; h: number };
  center: [number, number];
  containerPos: [number, number];
  tracePath: string;
  traceVias: Array<[number, number]>;
  chipsPos: [number, number];
  door: { wall: "n" | "s" | "e" | "w"; offset: number };
};

export const MOBILE_GEOMETRY: Record<
  "marketing" | "vendas" | "atendimento" | "financas",
  RoomEntry
> = {
  marketing: {
    rect: { x: 10, y: 60, w: 135, h: 58 },
    center: [77, 89],
    containerPos: [180, 60],
    tracePath: "M 145 89 L 165 89 L 165 89 L 180 89",
    traceVias: [[165, 89]],
    chipsPos: [120, 65],
    door: { wall: "e", offset: 30 },
  },
  vendas: {
    rect: { x: 10, y: 125, w: 135, h: 58 },
    center: [77, 154],
    containerPos: [180, 130],
    tracePath: "M 145 154 L 165 154 L 165 154 L 180 154",
    traceVias: [[165, 154]],
    chipsPos: [120, 130],
    door: { wall: "e", offset: 30 },
  },
  atendimento: {
    rect: { x: 10, y: 190, w: 135, h: 58 },
    center: [77, 219],
    containerPos: [180, 195],
    tracePath: "M 145 219 L 165 219 L 165 219 L 180 219",
    traceVias: [[165, 219]],
    chipsPos: [120, 195],
    door: { wall: "e", offset: 30 },
  },
  financas: {
    rect: { x: 10, y: 255, w: 135, h: 50 },
    center: [77, 280],
    containerPos: [180, 260],
    tracePath: "M 145 280 L 165 280 L 165 280 L 180 280",
    traceVias: [[165, 280]],
    chipsPos: [120, 258],
    door: { wall: "e", offset: 25 },
  },
};
