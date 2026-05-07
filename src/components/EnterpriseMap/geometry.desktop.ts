// landing-page/src/components/EnterpriseMap/geometry.desktop.ts
// Centered floor plan in 800×600 viewBox. Containers at 4 corners.

export const DESKTOP_VIEWBOX = { width: 800, height: 600 };

// Outer wall path (L-shape, shifted by translate (273, 205) from original)
export const DESKTOP_OUTER_WALL_PATH =
  "M 288 220 L 473 220 L 473 265 L 513 265 L 513 380 L 288 380 Z";

export const DESKTOP_CORRIDOR = {
  horizontal: { x: 288, y: 288, w: 225, h: 10 },
  verticalEntry: { x: 378, y: 220, w: 10, h: 68 },
};

export const DESKTOP_RECEPTION = { x: 473, y: 265, w: 40, h: 23 };

export const DESKTOP_ENTRANCE = { x: 379, y: 220, width: 8 };

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
    rect: { x: 288, y: 220, w: 95, h: 65 },
    center: [335, 252],
    containerPos: [20, 20],
    tracePath: "M 288 252 L 270 252 L 270 150 L 260 150",
    traceVias: [
      [270, 252],
      [270, 150],
    ],
    chipsPos: [383, 224],
    door: { wall: "s", offset: 30 },
  },
  vendas: {
    rect: { x: 393, y: 220, w: 80, h: 65 },
    center: [433, 252],
    containerPos: [540, 20],
    tracePath: "M 473 252 L 530 252 L 530 150 L 540 150",
    traceVias: [
      [530, 252],
      [530, 150],
    ],
    chipsPos: [395, 224],
    door: { wall: "w", offset: 35 },
  },
  atendimento: {
    rect: { x: 288, y: 298, w: 95, h: 82 },
    center: [335, 339],
    containerPos: [20, 320],
    tracePath: "M 288 339 L 270 339 L 270 450 L 260 450",
    traceVias: [
      [270, 339],
      [270, 450],
    ],
    chipsPos: [383, 302],
    door: { wall: "n", offset: 45 },
  },
  financas: {
    rect: { x: 393, y: 298, w: 120, h: 82 },
    center: [453, 339],
    containerPos: [540, 320],
    tracePath: "M 513 339 L 530 339 L 530 450 L 540 450",
    traceVias: [
      [530, 339],
      [530, 450],
    ],
    chipsPos: [395, 302],
    door: { wall: "n", offset: 30 },
  },
};
