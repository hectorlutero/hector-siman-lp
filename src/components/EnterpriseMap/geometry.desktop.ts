// landing-page/src/components/EnterpriseMap/geometry.desktop.ts
// Coordenadas em viewBox 260×200. Outline L-shape per spec §4.3.

export const DESKTOP_VIEWBOX = { width: 260, height: 200 };

// Outer wall path (clockwise from top-left)
export const DESKTOP_OUTER_WALL_PATH =
  "M 15 15 L 200 15 L 200 60 L 240 60 L 240 175 L 15 175 Z";

// Corridor T-shape rectangles
export const DESKTOP_CORRIDOR = {
  horizontal: { x: 15, y: 83, w: 225, h: 10 },
  verticalEntry: { x: 105, y: 15, w: 10, h: 68 },
};

// Reception (área de apoio neutra)
export const DESKTOP_RECEPTION = { x: 200, y: 60, w: 40, h: 23 };

// Building entrance
export const DESKTOP_ENTRANCE = { x: 106, y: 15, width: 8 };

type RoomEntry = {
  rect: { x: number; y: number; w: number; h: number };
  center: [number, number];
  containerPos: [number, number];
  tracePath: string;
  traceVias: Array<[number, number]>;
  chipsPos: [number, number];
  door: { wall: "n" | "s" | "e" | "w"; offset: number };
};

export const DESKTOP_GEOMETRY: Record<
  "marketing" | "vendas" | "atendimento" | "financas",
  RoomEntry
> = {
  marketing: {
    rect: { x: 15, y: 15, w: 95, h: 65 },
    center: [62, 47],
    containerPos: [-330, -10],
    tracePath: "M 15 47 L -10 47 L -10 90 L -30 90 L -30 30 L -50 30",
    traceVias: [
      [-10, 47],
      [-10, 90],
      [-30, 90],
      [-30, 30],
    ],
    chipsPos: [85, 18],
    door: { wall: "s", offset: 30 },
  },
  vendas: {
    rect: { x: 120, y: 15, w: 80, h: 65 },
    center: [160, 47],
    containerPos: [-330, 80],
    tracePath: "M 120 47 L 60 47 L 60 130 L 0 130 L 0 120 L -50 120",
    traceVias: [
      [60, 47],
      [60, 130],
      [0, 130],
      [0, 120],
    ],
    chipsPos: [180, 18],
    door: { wall: "w", offset: 35 },
  },
  atendimento: {
    rect: { x: 15, y: 93, w: 95, h: 82 },
    center: [62, 134],
    containerPos: [-330, 180],
    tracePath: "M 15 134 L -10 134 L -10 220 L -30 220 L -30 220 L -50 220",
    traceVias: [
      [-10, 134],
      [-10, 220],
      [-30, 220],
    ],
    chipsPos: [85, 100],
    door: { wall: "n", offset: 45 },
  },
  financas: {
    rect: { x: 120, y: 93, w: 120, h: 82 },
    center: [180, 134],
    containerPos: [260, 180],
    tracePath: "M 240 134 L 280 134 L 280 200 L 260 200 L 260 320 L 280 320",
    traceVias: [
      [280, 134],
      [280, 200],
      [260, 200],
      [260, 320],
    ],
    chipsPos: [220, 100],
    door: { wall: "n", offset: 30 },
  },
};
