"use client";

/**
 * Decorative blueprint backdrop — classic architectural drawing aesthetic
 * with blue glow, grid, interlocked room polygons (90° puzzle tiling),
 * dimension lines, north indicator, and title block.
 */
export function BlueprintBackground() {
  return (
    <svg
      viewBox="0 0 800 600"
      className="w-full max-w-5xl h-auto"
      aria-hidden="true"
    >
      <defs>
        {/* Fine grid (1m units) */}
        <pattern id="bp-grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="0.3"
            opacity="0.22"
          />
        </pattern>
        {/* Major grid (5m units) */}
        <pattern id="bp-grid-major" width="100" height="100" patternUnits="userSpaceOnUse">
          <path
            d="M 100 0 L 0 0 0 100"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="0.55"
            opacity="0.4"
          />
        </pattern>
        {/* Blueprint glow filter */}
        <filter id="bp-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        {/* Strong glow for outer wall */}
        <filter id="bp-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* Background grids */}
      <rect width="800" height="600" fill="url(#bp-grid-fine)" />
      <rect width="800" height="600" fill="url(#bp-grid-major)" />

      {/* GLOW LAYER — blurred fills behind */}
      <g filter="url(#bp-glow)" opacity="0.7">
        {/* Room polygons interlocked (90° puzzle pieces) */}
        <polygon points="288,220 383,220 383,298 288,298" fill="#3b82f6" opacity="0.16" />
        <polygon points="383,220 473,220 473,298 383,298" fill="#3b82f6" opacity="0.14" />
        <polygon points="473,265 513,265 513,298 473,298" fill="#3b82f6" opacity="0.12" />
        <polygon points="288,298 383,298 383,380 288,380" fill="#3b82f6" opacity="0.14" />
        <polygon points="383,298 513,298 513,380 383,380" fill="#3b82f6" opacity="0.16" />
      </g>

      {/* OUTER WALL — strong glow */}
      <path
        d="M 288 220 L 473 220 L 473 265 L 513 265 L 513 380 L 288 380 Z"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="3"
        opacity="0.35"
        filter="url(#bp-glow-strong)"
      />

      {/* CRISP LAYER — sharp edges on top */}
      <g>
        {/* Outer wall sharp */}
        <path
          d="M 288 220 L 473 220 L 473 265 L 513 265 L 513 380 L 288 380 Z"
          fill="rgba(59,130,246,0.025)"
          stroke="#60a5fa"
          strokeWidth="1.4"
          opacity="0.85"
        />
        {/* Internal walls (room divisions, all 90°) */}
        <line x1="383" y1="220" x2="383" y2="380" stroke="#60a5fa" strokeWidth="0.8" opacity="0.55" />
        <line x1="288" y1="298" x2="513" y2="298" stroke="#60a5fa" strokeWidth="0.8" opacity="0.55" />
        <line x1="473" y1="220" x2="473" y2="265" stroke="#60a5fa" strokeWidth="0.7" opacity="0.5" />
      </g>

      {/* Room labels — technical/CAD style */}
      <g fontFamily="ui-monospace, monospace" fontSize="7" fill="#60a5fa" textAnchor="middle" opacity="0.55">
        <text x="335.5" y="262">SALA 01</text>
        <text x="335.5" y="271" fontSize="5" opacity="0.7">7.4m²</text>
        <text x="428" y="262">SALA 02</text>
        <text x="428" y="271" fontSize="5" opacity="0.7">7.0m²</text>
        <text x="493" y="285">REC.</text>
        <text x="335.5" y="343">SALA 03</text>
        <text x="335.5" y="352" fontSize="5" opacity="0.7">7.8m²</text>
        <text x="448" y="343">SALA 04</text>
        <text x="448" y="352" fontSize="5" opacity="0.7">10.7m²</text>
      </g>

      {/* Dimension lines — bottom horizontal */}
      <g stroke="#60a5fa" strokeWidth="0.4" opacity="0.5" fill="#60a5fa" fontFamily="ui-monospace, monospace">
        <line x1="288" y1="395" x2="513" y2="395" />
        <line x1="288" y1="392" x2="288" y2="398" />
        <line x1="513" y1="392" x2="513" y2="398" />
        <text x="400" y="406" textAnchor="middle" fontSize="6" opacity="0.85">22.50m</text>
      </g>

      {/* Dimension lines — left vertical */}
      <g stroke="#60a5fa" strokeWidth="0.4" opacity="0.5" fill="#60a5fa" fontFamily="ui-monospace, monospace">
        <line x1="270" y1="220" x2="270" y2="380" />
        <line x1="267" y1="220" x2="273" y2="220" />
        <line x1="267" y1="380" x2="273" y2="380" />
        <text
          x="263"
          y="305"
          textAnchor="middle"
          fontSize="6"
          opacity="0.85"
          transform="rotate(-90 263 305)"
        >
          16.00m
        </text>
      </g>

      {/* North compass — top-left */}
      <g transform="translate(70, 80)" stroke="#60a5fa" fill="none" opacity="0.45">
        <circle cx="0" cy="0" r="20" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="14" strokeWidth="0.4" opacity="0.5" />
        <path d="M 0 -20 L 0 20" strokeWidth="0.5" />
        <path d="M -20 0 L 20 0" strokeWidth="0.4" opacity="0.6" />
        {/* North arrow filled */}
        <path d="M 0 -16 L 4 0 L 0 -3 L -4 0 Z" fill="#60a5fa" stroke="none" opacity="0.7" />
        <text
          x="0"
          y="-24"
          textAnchor="middle"
          fill="#60a5fa"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          opacity="0.7"
        >
          N
        </text>
      </g>

      {/* Title block — bottom-right (CAD-style) */}
      <g
        transform="translate(640, 530)"
        stroke="#60a5fa"
        fill="#60a5fa"
        fontFamily="ui-monospace, monospace"
        opacity="0.45"
      >
        <rect x="0" y="0" width="140" height="50" fill="none" strokeWidth="0.5" />
        <line x1="0" y1="16" x2="140" y2="16" strokeWidth="0.35" />
        <line x1="0" y1="34" x2="140" y2="34" strokeWidth="0.35" />
        <line x1="70" y1="16" x2="70" y2="50" strokeWidth="0.35" />
        <text x="6" y="11" fontSize="5.5" letterSpacing="1">PROJETO</text>
        <text x="6" y="28" fontSize="7" fontWeight="bold">ENTERPRISE MAP</text>
        <text x="6" y="46" fontSize="5">PLANTA · A-001</text>
        <text x="76" y="28" fontSize="5">REV.</text>
        <text x="76" y="46" fontSize="6">2026-05</text>
      </g>

      {/* Door arcs (small architectural touches) */}
      <g stroke="#60a5fa" fill="none" strokeWidth="0.5" opacity="0.4">
        <path d="M 360 220 A 8 8 0 0 0 368 228" />
        <path d="M 410 220 A 8 8 0 0 0 418 228" />
        <path d="M 320 298 A 8 8 0 0 0 328 290" />
        <path d="M 420 298 A 8 8 0 0 0 428 290" />
      </g>
    </svg>
  );
}
