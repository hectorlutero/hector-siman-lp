"use client";

/**
 * Wide organic blueprint backdrop — architectural drawing aesthetic with
 * blue glow, dual grid, 15 rooms tiled at 90° angles forming a stepped
 * organic perimeter, dimension lines, north compass, and CAD title block.
 */

type RoomTone = "blue" | "red" | "green";

interface Room {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  subLabel?: string;
  area?: string;
  tone?: RoomTone; // default "blue"
}

const TOP_ROOMS: Room[] = [
  { x: 80, y: 100, w: 140, h: 140, label: "S-01", subLabel: "RECEPÇÃO", tone: "green" },
  { x: 220, y: 80, w: 220, h: 160, label: "S-02", area: "13.2m²" },
  { x: 440, y: 80, w: 100, h: 90, label: "S-03", tone: "red" },
  { x: 440, y: 170, w: 100, h: 70, label: "S-04" },
  { x: 540, y: 100, w: 200, h: 140, label: "S-05", area: "11.2m²", tone: "green" },
  { x: 740, y: 80, w: 140, h: 160, label: "S-06", tone: "red" },
  { x: 880, y: 100, w: 200, h: 140, label: "S-07", area: "11.2m²" },
  { x: 1080, y: 80, w: 160, h: 160, label: "S-08", area: "12.8m²", tone: "green" },
  { x: 1240, y: 100, w: 80, h: 140, label: "S-09", tone: "red" },
];

const BOTTOM_ROOMS: Room[] = [
  { x: 80, y: 270, w: 180, h: 140, label: "S-10", area: "10.1m²" },
  { x: 260, y: 270, w: 180, h: 140, label: "S-11", tone: "green" },
  { x: 440, y: 270, w: 260, h: 140, label: "S-12", area: "14.6m²", tone: "red" },
  { x: 700, y: 270, w: 180, h: 140, label: "S-13" },
  { x: 880, y: 270, w: 220, h: 140, label: "S-14", area: "12.3m²", tone: "green" },
  { x: 1100, y: 270, w: 220, h: 140, label: "S-15" },
];

const TONE_COLORS: Record<RoomTone, { fill: string; stroke: string; label: string }> = {
  blue: { fill: "#3b82f6", stroke: "#60a5fa", label: "#60a5fa" },
  red: { fill: "#ef4444", stroke: "#f87171", label: "#fca5a5" },
  green: { fill: "#10b981", stroke: "#34d399", label: "#6ee7b7" },
};

// Organic stepped outer perimeter (clockwise from top-left of S-01)
const OUTER_WALL_PATH =
  "M 80 100 L 220 100 L 220 80 L 540 80 L 540 100 L 740 100 L 740 80 L 880 80 L 880 100 L 1080 100 L 1080 80 L 1240 80 L 1240 100 L 1320 100 L 1320 410 L 80 410 Z";

// Internal walls — top zone
const TOP_INTERNAL_WALLS = [
  { x1: 220, y1: 100, x2: 220, y2: 240 }, // S-01 / S-02
  { x1: 440, y1: 80, x2: 440, y2: 240 }, // S-02 / S-03+S-04
  { x1: 440, y1: 170, x2: 540, y2: 170 }, // S-03 / S-04 horizontal
  { x1: 540, y1: 100, x2: 540, y2: 240 }, // S-03+S-04 / S-05
  { x1: 740, y1: 100, x2: 740, y2: 240 }, // S-05 / S-06
  { x1: 880, y1: 100, x2: 880, y2: 240 }, // S-06 / S-07
  { x1: 1080, y1: 100, x2: 1080, y2: 240 }, // S-07 / S-08
  { x1: 1240, y1: 100, x2: 1240, y2: 240 }, // S-08 / S-09
];

// Internal walls — bottom zone
const BOTTOM_INTERNAL_WALLS = [
  { x1: 260, y1: 270, x2: 260, y2: 410 },
  { x1: 440, y1: 270, x2: 440, y2: 410 },
  { x1: 700, y1: 270, x2: 700, y2: 410 },
  { x1: 880, y1: 270, x2: 880, y2: 410 },
  { x1: 1100, y1: 270, x2: 1100, y2: 410 },
];

// Decorative door arcs (room → corridor)
const DOORS: Array<{ x: number; y: number; r: number; from: "top" | "bottom" }> = [
  { x: 150, y: 240, r: 8, from: "top" },
  { x: 320, y: 240, r: 8, from: "top" },
  { x: 640, y: 240, r: 8, from: "top" },
  { x: 800, y: 240, r: 8, from: "top" },
  { x: 980, y: 240, r: 8, from: "top" },
  { x: 1150, y: 240, r: 8, from: "top" },
  { x: 170, y: 270, r: 8, from: "bottom" },
  { x: 350, y: 270, r: 8, from: "bottom" },
  { x: 570, y: 270, r: 8, from: "bottom" },
  { x: 790, y: 270, r: 8, from: "bottom" },
  { x: 990, y: 270, r: 8, from: "bottom" },
  { x: 1210, y: 270, r: 8, from: "bottom" },
];

export function BlueprintBackground() {
  return (
    <svg
      viewBox="0 0 1400 450"
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        {/* Fine grid (1m units) */}
        <pattern id="bp-grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.3" opacity="0.22" />
        </pattern>
        {/* Major grid (5m units) */}
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
      <rect width="1400" height="450" fill="url(#bp-grid-fine)" />
      <rect width="1400" height="450" fill="url(#bp-grid-major)" />

      {/* GLOW LAYER — blurred room fills (tinted per tone) */}
      <g filter="url(#bp-glow)" opacity="0.75">
        {[...TOP_ROOMS, ...BOTTOM_ROOMS].map((room, i) => {
          const tone = TONE_COLORS[room.tone ?? "blue"];
          const baseOpacity = room.tone === "blue" || !room.tone ? 0.14 : 0.22;
          return (
            <rect
              key={`glow-${i}`}
              x={room.x}
              y={room.y}
              width={room.w}
              height={room.h}
              fill={tone.fill}
              opacity={baseOpacity + (i % 3) * 0.02}
            />
          );
        })}
      </g>

      {/* OUTER WALL — strong glow */}
      <path
        d={OUTER_WALL_PATH}
        fill="none"
        stroke="#60a5fa"
        strokeWidth="3"
        opacity="0.4"
        filter="url(#bp-glow-strong)"
      />

      {/* CORRIDOR — light fill between zones */}
      <rect
        x="80"
        y="240"
        width="1240"
        height="30"
        fill="rgba(96, 165, 250, 0.06)"
        stroke="#60a5fa"
        strokeWidth="0.5"
        strokeDasharray="3 3"
        opacity="0.55"
      />

      {/* CRISP OUTER WALL */}
      <path
        d={OUTER_WALL_PATH}
        fill="rgba(59,130,246,0.025)"
        stroke="#60a5fa"
        strokeWidth="1.4"
        opacity="0.85"
      />

      {/* CRISP INTERNAL WALLS */}
      <g stroke="#60a5fa" strokeWidth="0.8" opacity="0.55" fill="none">
        {[...TOP_INTERNAL_WALLS, ...BOTTOM_INTERNAL_WALLS].map((w, i) => (
          <line key={`w-${i}`} x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2} />
        ))}
      </g>

      {/* DOOR ARCS — decorative */}
      <g stroke="#60a5fa" strokeWidth="0.6" fill="none" opacity="0.45">
        {DOORS.map((d, i) => {
          if (d.from === "top") {
            return <path key={`door-${i}`} d={`M ${d.x} ${d.y} A ${d.r} ${d.r} 0 0 1 ${d.x + d.r} ${d.y - d.r}`} />;
          }
          return <path key={`door-${i}`} d={`M ${d.x} ${d.y} A ${d.r} ${d.r} 0 0 0 ${d.x + d.r} ${d.y + d.r}`} />;
        })}
      </g>

      {/* ROOM POLYGON OUTLINES — tinted strokes per tone */}
      <g fill="none" opacity="0.5">
        {[...TOP_ROOMS, ...BOTTOM_ROOMS].map((room, i) => {
          const tone = TONE_COLORS[room.tone ?? "blue"];
          return (
            <rect
              key={`poly-${i}`}
              x={room.x}
              y={room.y}
              width={room.w}
              height={room.h}
              stroke={tone.stroke}
              strokeWidth="0.6"
            />
          );
        })}
      </g>

      {/* ROOM LABELS */}
      <g
        fontFamily="ui-monospace, monospace"
        fontSize="7"
        textAnchor="middle"
        opacity="0.7"
      >
        {[...TOP_ROOMS, ...BOTTOM_ROOMS].map((room, i) => {
          const cx = room.x + room.w / 2;
          const cy = room.y + room.h / 2;
          const tone = TONE_COLORS[room.tone ?? "blue"];
          return (
            <g key={`lbl-${i}`} fill={tone.label}>
              <text x={cx} y={cy - 2}>{room.label}</text>
              {room.subLabel && (
                <text x={cx} y={cy + 7} fontSize="5.5" opacity="0.85" letterSpacing="1">
                  {room.subLabel}
                </text>
              )}
              {room.area && (
                <text x={cx} y={cy + 9} fontSize="5" opacity="0.7">
                  {room.area}
                </text>
              )}
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
        <line x1="80" y1="425" x2="1320" y2="425" />
        <line x1="80" y1="422" x2="80" y2="428" />
        <line x1="1320" y1="422" x2="1320" y2="428" />
        <text x="700" y="436" textAnchor="middle" fontSize="6.5" opacity="0.85">
          124.00m
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
        <line x1="58" y1="80" x2="58" y2="410" />
        <line x1="55" y1="80" x2="61" y2="80" />
        <line x1="55" y1="410" x2="61" y2="410" />
        <text x="48" y="245" textAnchor="middle" fontSize="6.5" opacity="0.85" transform="rotate(-90 48 245)">
          33.00m
        </text>
      </g>

      {/* DIMENSION — top segments cota detail */}
      <g
        stroke="#60a5fa"
        strokeWidth="0.3"
        opacity="0.4"
        fill="#60a5fa"
        fontFamily="ui-monospace, monospace"
      >
        <line x1="80" y1="65" x2="220" y2="65" />
        <line x1="80" y1="62" x2="80" y2="68" />
        <line x1="220" y1="62" x2="220" y2="68" />
        <text x="150" y="60" textAnchor="middle" fontSize="5">14.0</text>

        <line x1="220" y1="55" x2="540" y2="55" />
        <line x1="220" y1="52" x2="220" y2="58" />
        <line x1="540" y1="52" x2="540" y2="58" />
        <text x="380" y="50" textAnchor="middle" fontSize="5">32.0</text>

        <line x1="540" y1="65" x2="740" y2="65" />
        <text x="640" y="60" textAnchor="middle" fontSize="5">20.0</text>

        <line x1="740" y1="55" x2="880" y2="55" />
        <text x="810" y="50" textAnchor="middle" fontSize="5">14.0</text>

        <line x1="880" y1="65" x2="1080" y2="65" />
        <text x="980" y="60" textAnchor="middle" fontSize="5">20.0</text>

        <line x1="1080" y1="55" x2="1240" y2="55" />
        <text x="1160" y="50" textAnchor="middle" fontSize="5">16.0</text>

        <line x1="1240" y1="65" x2="1320" y2="65" />
        <text x="1280" y="60" textAnchor="middle" fontSize="5">8.0</text>
      </g>

      {/* NORTH COMPASS */}
      <g transform="translate(80, 50)" stroke="#60a5fa" fill="none" opacity="0.5">
        <circle cx="0" cy="0" r="18" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="13" strokeWidth="0.4" opacity="0.5" />
        <path d="M 0 -18 L 0 18" strokeWidth="0.5" />
        <path d="M -18 0 L 18 0" strokeWidth="0.4" opacity="0.6" />
        <path d="M 0 -15 L 4 0 L 0 -3 L -4 0 Z" fill="#60a5fa" stroke="none" opacity="0.75" />
        <text
          x="0"
          y="-22"
          textAnchor="middle"
          fill="#60a5fa"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          opacity="0.75"
        >
          N
        </text>
      </g>

      {/* TITLE BLOCK — bottom-right */}
      <g
        transform="translate(1180, 420)"
        stroke="#60a5fa"
        fill="#60a5fa"
        fontFamily="ui-monospace, monospace"
        opacity="0.5"
      >
        <rect x="0" y="0" width="140" height="24" fill="rgba(15,23,42,0.4)" strokeWidth="0.5" />
        <line x1="0" y1="11" x2="140" y2="11" strokeWidth="0.35" />
        <line x1="80" y1="11" x2="80" y2="24" strokeWidth="0.35" />
        <text x="6" y="8" fontSize="5" letterSpacing="1.5">PROJETO ENTERPRISE MAP</text>
        <text x="6" y="20" fontSize="5.5" fontWeight="bold">A-001 / 2026-05</text>
        <text x="84" y="20" fontSize="5">REV.03</text>
      </g>

      {/* TITLE — top center watermark */}
      <text
        x="700"
        y="30"
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
