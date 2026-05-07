"use client";

interface DoorArcProps {
  hingeX: number;
  hingeY: number;
  wall: "n" | "s" | "e" | "w";
  doorWidth?: number;
  bgColor?: string;
}

/**
 * Renders an architectural door with swing INTO the room.
 *
 * Hinge convention per wall:
 * - n (room to south of wall): hinge top-left, slab points east, swing arcs SE into room
 * - s (room to north of wall): hinge bottom-left, slab points east, swing arcs NE into room
 * - e (room to west of wall): hinge top-right, slab points south, swing arcs SW into room
 * - w (room to east of wall): hinge top-left, slab points south, swing arcs SE into room
 *
 * Sweep flag chosen so arc bulges into the served room (always).
 */
export function DoorArc({ hingeX, hingeY, wall, doorWidth = 12, bgColor = "#0a0a1a" }: DoorArcProps) {
  let slabX2 = hingeX;
  let slabY2 = hingeY;
  let openX = hingeX;
  let openY = hingeY;
  let sweepFlag: 0 | 1 = 0;
  let openingX1 = hingeX;
  let openingY1 = hingeY;
  let openingX2 = hingeX;
  let openingY2 = hingeY;

  switch (wall) {
    case "n":
      slabX2 = hingeX + doorWidth;
      slabY2 = hingeY;
      openX = hingeX;
      openY = hingeY + doorWidth;
      openingX1 = hingeX;
      openingY1 = hingeY;
      openingX2 = hingeX + doorWidth;
      openingY2 = hingeY;
      sweepFlag = 0;
      break;
    case "s":
      slabX2 = hingeX + doorWidth;
      slabY2 = hingeY;
      openX = hingeX;
      openY = hingeY - doorWidth;
      openingX1 = hingeX;
      openingY1 = hingeY;
      openingX2 = hingeX + doorWidth;
      openingY2 = hingeY;
      sweepFlag = 1;
      break;
    case "e":
      slabX2 = hingeX;
      slabY2 = hingeY + doorWidth;
      openX = hingeX - doorWidth;
      openY = hingeY;
      openingX1 = hingeX;
      openingY1 = hingeY;
      openingX2 = hingeX;
      openingY2 = hingeY + doorWidth;
      sweepFlag = 0;
      break;
    case "w":
      slabX2 = hingeX;
      slabY2 = hingeY + doorWidth;
      openX = hingeX + doorWidth;
      openY = hingeY;
      openingX1 = hingeX;
      openingY1 = hingeY;
      openingX2 = hingeX;
      openingY2 = hingeY + doorWidth;
      sweepFlag = 1;
      break;
  }

  return (
    <g>
      <line
        x1={openingX1}
        y1={openingY1}
        x2={openingX2}
        y2={openingY2}
        stroke={bgColor}
        strokeWidth={3.5}
      />
      <line
        x1={hingeX}
        y1={hingeY}
        x2={openX}
        y2={openY}
        stroke="#cbd5e1"
        strokeWidth={1.4}
      />
      <path
        d={`M ${slabX2} ${slabY2} A ${doorWidth} ${doorWidth} 0 0 ${sweepFlag} ${openX} ${openY}`}
        fill="none"
        stroke="#cbd5e1"
        strokeWidth={1}
      />
    </g>
  );
}

/**
 * Helper: computes hinge position from room rect + wall + offset.
 */
export function computeHinge(
  rect: { x: number; y: number; w: number; h: number },
  wall: "n" | "s" | "e" | "w",
  offset: number,
): { hingeX: number; hingeY: number } {
  switch (wall) {
    case "n":
      return { hingeX: rect.x + offset, hingeY: rect.y };
    case "s":
      return { hingeX: rect.x + offset, hingeY: rect.y + rect.h };
    case "e":
      return { hingeX: rect.x + rect.w, hingeY: rect.y + offset };
    case "w":
      return { hingeX: rect.x, hingeY: rect.y + offset };
  }
}
