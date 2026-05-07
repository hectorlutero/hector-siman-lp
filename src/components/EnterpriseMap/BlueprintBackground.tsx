"use client";

/**
 * Decorative blueprint sketch — uses the same L-shape outline as the original
 * floor plan, but rendered very faded as a backdrop behind the foreground cards.
 */
export function BlueprintBackground() {
  return (
    <svg
      viewBox="0 0 800 600"
      className="w-full max-w-5xl h-auto"
      aria-hidden="true"
    >
      <defs>
        <pattern id="bp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="0.4"
            opacity="0.3"
          />
        </pattern>
      </defs>

      {/* Background grid */}
      <rect width="800" height="600" fill="url(#bp-grid)" />

      {/* L-shape outer wall */}
      <path
        d="M 288 220 L 473 220 L 473 265 L 513 265 L 513 380 L 288 380 Z"
        fill="rgba(203, 213, 225, 0.03)"
        stroke="#cbd5e1"
        strokeWidth="1"
        strokeDasharray="6 4"
        opacity="0.45"
      />

      {/* Internal walls */}
      <line x1="383" y1="220" x2="383" y2="285" stroke="#cbd5e1" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.3" />
      <line x1="288" y1="285" x2="513" y2="285" stroke="#cbd5e1" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.3" />
      <line x1="383" y1="285" x2="383" y2="380" stroke="#cbd5e1" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.3" />

      {/* Reception area */}
      <rect x="473" y="265" width="40" height="23" fill="none" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.25" />

      {/* Corridor */}
      <rect x="288" y="288" width="225" height="10" fill="rgba(148, 163, 184, 0.04)" stroke="#94a3b8" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.3" />
      <rect x="378" y="220" width="10" height="68" fill="rgba(148, 163, 184, 0.04)" stroke="#94a3b8" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.3" />

      {/* Cota / dimension line */}
      <line x1="288" y1="395" x2="513" y2="395" stroke="#94a3b8" strokeWidth="0.3" opacity="0.2" />
      <text x="400" y="405" textAnchor="middle" fill="#94a3b8" fontSize="6" opacity="0.3" fontFamily="system-ui">22.5m</text>
    </svg>
  );
}
