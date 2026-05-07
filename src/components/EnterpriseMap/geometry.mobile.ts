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
    containerPos: [10, 320],
    tracePath: "M 77 118 L 77 130 L 50 130 L 50 320",
    traceVias: [[77, 130], [50, 130]],
    chipsPos: [120, 65],
    door: { wall: "e", offset: 30 },
  },
  vendas: {
    rect: { x: 10, y: 125, w: 135, h: 58 },
    center: [77, 154],
    containerPos: [10, 320],
    tracePath: "M 77 183 L 77 200 L 100 200 L 100 320",
    traceVias: [[77, 200], [100, 200]],
    chipsPos: [120, 130],
    door: { wall: "e", offset: 30 },
  },
  atendimento: {
    rect: { x: 10, y: 190, w: 135, h: 58 },
    center: [77, 219],
    containerPos: [10, 320],
    tracePath: "M 77 248 L 77 280 L 50 280 L 50 320",
    traceVias: [[77, 280], [50, 280]],
    chipsPos: [120, 195],
    door: { wall: "e", offset: 30 },
  },
  financas: {
    rect: { x: 10, y: 255, w: 135, h: 50 },
    center: [77, 280],
    containerPos: [10, 320],
    tracePath: "M 77 305 L 100 305 L 100 320",
    traceVias: [[100, 305]],
    chipsPos: [120, 258],
    door: { wall: "e", offset: 25 },
  },
};
