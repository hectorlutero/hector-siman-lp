"use client";

/**
 * 8-room blueprint backdrop — one room per sector, 4 columns × 2 rows.
 * Each room column aligns with the corresponding card column above/below
 * so cards visually anchor to their sector's room.
 */

import { sectors } from "./data";

// Column boundaries (4 equal columns inside the building outer)
const COL_X = [60, 380, 700, 1020, 1340] as const;
const TOP_Y = [80, 230] as const; // [start, end]
const BOTTOM_Y = [270, 410] as const;

interface RoomEntry {
  id: string;
  numLabel: string;
  name: string;
  col: 0 | 1 | 2 | 3;
  row: 0 | 1; // 0 = top, 1 = bottom
}

// Map sectors (in display order) to room positions
const SECTOR_ROOMS: RoomEntry[] = [
  { id: sectors[0].id, numLabel: "01", name: sectors[0].namePt.toUpperCase(), col: 0, row: 0 },
  { id: sectors[1].id, numLabel: "02", name: sectors[1].namePt.toUpperCase(), col: 1, row: 0 },
  { id: sectors[2].id, numLabel: "03", name: sectors[2].namePt.toUpperCase(), col: 2, row: 0 },
  { id: sectors[3].id, numLabel: "04", name: sectors[3].namePt.toUpperCase(), col: 3, row: 0 },
  { id: sectors[4].id, numLabel: "05", name: sectors[4].namePt.toUpperCase(), col: 0, row: 1 },
  { id: sectors[5].id, numLabel: "06", name: sectors[5].namePt.toUpperCase(), col: 1, row: 1 },
  { id: sectors[6].id, numLabel: "07", name: sectors[6].namePt.toUpperCase(), col: 2, row: 1 },
  { id: sectors[7].id, numLabel: "08", name: sectors[7].namePt.toUpperCase(), col: 3, row: 1 },
];

function roomRect(room: RoomEntry) {
  const x1 = COL_X[room.col];
  const x2 = COL_X[room.col + 1];
  const [y1, y2] = room.row === 0 ? TOP_Y : BOTTOM_Y;
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1, cx: (x1 + x2) / 2, cy: (y1 + y2) / 2 };
}

// Organic stepped outer (corners step in)
const OUTER_PATH =
  "M 60 100 L 240 100 L 240 80 L 1100 80 L 1100 100 L 1340 100 L 1340 390 L 1240 390 L 1240 410 L 160 410 L 160 390 L 60 390 Z";

export function BlueprintBackground() {
  return (
    <svg
      viewBox="0 0 1400 480"
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <pattern id="bp-grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.3" opacity="0.22" />
        </pattern>
        <pattern id="bp-grid-major" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#60a5fa" strokeWidth="0.55" opacity="0.4" />
        </pattern>
        <filter id="bp-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="bp-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* Background grids */}
      <rect width="1400" height="480" fill="url(#bp-grid-fine)" />
      <rect width="1400" height="480" fill="url(#bp-grid-major)" />

      {/* GLOW LAYER */}
      <g filter="url(#bp-glow)" opacity="0.7">
        {SECTOR_ROOMS.map((room) => {
          const r = roomRect(room);
          return (
            <rect
              key={`glow-${room.id}`}
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              fill="#3b82f6"
              opacity={0.16}
            />
          );
        })}
      </g>

      {/* OUTER WALL — strong glow */}
      <path
        d={OUTER_PATH}
        fill="none"
        stroke="#60a5fa"
        strokeWidth="3"
        opacity="0.4"
        filter="url(#bp-glow-strong)"
      />

      {/* CORRIDOR between rows */}
      <rect
        x="60"
        y={TOP_Y[1]}
        width="1280"
        height={BOTTOM_Y[0] - TOP_Y[1]}
        fill="rgba(96, 165, 250, 0.06)"
        stroke="#60a5fa"
        strokeWidth="0.5"
        strokeDasharray="3 3"
        opacity="0.55"
      />

      {/* CRISP OUTER WALL */}
      <path
        d={OUTER_PATH}
        fill="rgba(59,130,246,0.025)"
        stroke="#60a5fa"
        strokeWidth="1.4"
        opacity="0.85"
      />

      {/* Internal vertical walls (column dividers) */}
      <g stroke="#60a5fa" strokeWidth="0.8" opacity="0.55" fill="none">
        {[1, 2, 3].map((i) => (
          <g key={`vw-${i}`}>
            <line x1={COL_X[i]} y1={TOP_Y[0]} x2={COL_X[i]} y2={TOP_Y[1]} />
            <line x1={COL_X[i]} y1={BOTTOM_Y[0]} x2={COL_X[i]} y2={BOTTOM_Y[1]} />
          </g>
        ))}
      </g>

      {/* Door arcs at corridor */}
      <g stroke="#60a5fa" strokeWidth="0.6" fill="none" opacity="0.45">
        {SECTOR_ROOMS.map((room) => {
          const r = roomRect(room);
          const doorX = r.cx - 30;
          const fromTop = room.row === 0;
          const y = fromTop ? TOP_Y[1] : BOTTOM_Y[0];
          if (fromTop) {
            return <path key={`door-${room.id}`} d={`M ${doorX} ${y} A 8 8 0 0 1 ${doorX + 8} ${y - 8}`} />;
          }
          return <path key={`door-${room.id}`} d={`M ${doorX} ${y} A 8 8 0 0 0 ${doorX + 8} ${y + 8}`} />;
        })}
      </g>

      {/* ROOM LABELS — sector name + number */}
      <g
        fontFamily="ui-monospace, monospace"
        fill="#60a5fa"
        textAnchor="middle"
        opacity="0.7"
      >
        {SECTOR_ROOMS.map((room) => {
          const r = roomRect(room);
          return (
            <g key={`lbl-${room.id}`}>
              <text x={r.cx} y={r.cy - 8} fontSize="9" fontWeight="bold" letterSpacing="2">
                {room.numLabel}
              </text>
              <text x={r.cx} y={r.cy + 8} fontSize="8" letterSpacing="1.5">
                {room.name}
              </text>
            </g>
          );
        })}
      </g>

      {/* DIMENSION — bottom horizontal */}
      <g
        stroke="#60a5fa"
        strokeWidth="0.4"
        opacity="0.5"
        fill="#60a5fa"
        fontFamily="ui-monospace, monospace"
      >
        <line x1="60" y1="430" x2="1340" y2="430" />
        <line x1="60" y1="427" x2="60" y2="433" />
        <line x1="1340" y1="427" x2="1340" y2="433" />
        <text x="700" y="442" textAnchor="middle" fontSize="6.5" opacity="0.85">
          128.00m
        </text>
      </g>

      {/* DIMENSION — left vertical */}
      <g
        stroke="#60a5fa"
        strokeWidth="0.4"
        opacity="0.5"
        fill="#60a5fa"
        fontFamily="ui-monospace, monospace"
      >
        <line x1="38" y1="80" x2="38" y2="410" />
        <line x1="35" y1="80" x2="41" y2="80" />
        <line x1="35" y1="410" x2="41" y2="410" />
        <text x="28" y="245" textAnchor="middle" fontSize="6.5" opacity="0.85" transform="rotate(-90 28 245)">
          33.00m
        </text>
      </g>

      {/* NORTH COMPASS */}
      <g transform="translate(80, 50)" stroke="#60a5fa" fill="none" opacity="0.5">
        <circle cx="0" cy="0" r="16" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="11" strokeWidth="0.4" opacity="0.5" />
        <path d="M 0 -16 L 0 16" strokeWidth="0.5" />
        <path d="M -16 0 L 16 0" strokeWidth="0.4" opacity="0.6" />
        <path d="M 0 -13 L 3 0 L 0 -2 L -3 0 Z" fill="#60a5fa" stroke="none" opacity="0.75" />
        <text
          x="0"
          y="-20"
          textAnchor="middle"
          fill="#60a5fa"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          opacity="0.75"
        >
          N
        </text>
      </g>

      {/* TITLE BLOCK */}
      <g
        transform="translate(1180, 440)"
        stroke="#60a5fa"
        fill="#60a5fa"
        fontFamily="ui-monospace, monospace"
        opacity="0.5"
      >
        <rect x="0" y="0" width="160" height="28" fill="rgba(15,23,42,0.4)" strokeWidth="0.5" />
        <line x1="0" y1="13" x2="160" y2="13" strokeWidth="0.35" />
        <line x1="100" y1="13" x2="100" y2="28" strokeWidth="0.35" />
        <text x="6" y="9" fontSize="5.5" letterSpacing="1.5">PROJETO ENTERPRISE MAP · 8 SETORES</text>
        <text x="6" y="22" fontSize="5.5" fontWeight="bold">A-001 / 2026-05</text>
        <text x="104" y="22" fontSize="5">REV.04</text>
      </g>

      {/* TITLE — top center watermark */}
      <text
        x="700"
        y="36"
        textAnchor="middle"
        fill="#60a5fa"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        fontWeight="bold"
        letterSpacing="6"
        opacity="0.4"
      >
        PLANTA BAIXA · NÍVEL 01 · ESC. 1:100
      </text>
    </svg>
  );
}
