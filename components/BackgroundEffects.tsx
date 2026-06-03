"use client";

import { motion } from "framer-motion";

// SVG gradient colour pairs
const gradients = [
  // blush pink — rose
  { id: "gp0", a: "#fde8ec", b: "#f4a8bb" },
  { id: "gp1", a: "#ffd6e7", b: "#f08fad" },
  { id: "gp2", a: "#fff0f4", b: "#f9bece" },
  // ivory white — jasmine
  { id: "gj0", a: "#fffef9", b: "#ede0cc" },
  { id: "gj1", a: "#ffffff", b: "#f0e6d4" },
  { id: "gj2", a: "#fdfaf3", b: "#e0d0ba" },
  // pale gold — marigold
  { id: "gm0", a: "#fff8dc", b: "#e8c050" },
  { id: "gm1", a: "#fef5c4", b: "#ddb840" },
  { id: "gm2", a: "#fffae8", b: "#f0d070" },
];

// Realistic SVG petal paths
const shapes = {
  // Rose: classic teardrop — narrow tip at top, full rounded body below
  rose: {
    d: "M25 0C33 5 40 16 38 28C36 40 30 48 25 50C20 48 14 40 12 28C10 16 17 5 25 0Z",
    vw: 50, vh: 50, w: 16, h: 16,
    grads: ["gp0", "gp1", "gp2"] as const,
  },
  // Jasmine: narrow elongated oval, pointed at both ends
  jasmine: {
    d: "M8 0C12 5 14 14 14 24C14 34 12 40 8 44C4 40 2 34 2 24C2 14 4 5 8 0Z",
    vw: 16, vh: 44, w: 7, h: 19,
    grads: ["gj0", "gj1", "gj2"] as const,
  },
  // Marigold: rounded body with two soft shoulder bumps at the top (ruffled edge)
  marigold: {
    d: "M16 1C19 0 23 3 21 9C27 9 30 18 29 28C28 38 23 45 16 47C9 45 4 38 3 28C2 18 5 9 11 9C9 3 13 0 16 1Z",
    vw: 32, vh: 47, w: 13, h: 19,
    grads: ["gm0", "gm1", "gm2"] as const,
  },
};

type ShapeKey = keyof typeof shapes;
const cycle: ShapeKey[] = ["rose", "rose", "jasmine", "jasmine", "marigold", "marigold"];

const petals = Array.from({ length: 48 }, (_, i) => {
  const key   = cycle[i % cycle.length];
  const shape = shapes[key];
  const gradId = shape.grads[i % 3];

  const startX   = (i * 7.3 + (i % 3) * 13) % 100;
  const swayX    = ((i % 9) - 4) * 22;
  const scale    = 0.6 + (i % 6) * 0.14;
  const duration = 13 + (i % 9) * 1.7;
  const delay    = -((i * duration) / 48);
  const rotEnd   = (i % 2 === 0 ? 1 : -1) * (18 + (i % 7) * 10);
  const peakOp   = 0.65 + (i % 4) * 0.1;
  const blurPx   = i % 7 === 6 ? 1.6 : i % 5 === 4 ? 0.7 : 0;

  return { id: i, shape, gradId, startX, swayX, scale, duration, delay, rotEnd, peakOp, blurPx };
});

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Shared gradient defs — referenced by all petal SVGs */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          {gradients.map((g) => (
            <linearGradient key={g.id} id={g.id} x1="0.3" y1="0" x2="0.6" y2="1">
              <stop offset="0%" stopColor={g.a} />
              <stop offset="100%" stopColor={g.b} />
            </linearGradient>
          ))}
        </defs>
      </svg>

      {petals.map((p) => (
        <motion.svg
          key={p.id}
          viewBox={`0 0 ${p.shape.vw} ${p.shape.vh}`}
          width={p.shape.w * p.scale}
          height={p.shape.h * p.scale}
          style={{
            position: "absolute",
            left: `${p.startX}%`,
            top: 0,
            overflow: "visible",
            filter: p.blurPx > 0 ? `blur(${p.blurPx}px)` : "none",
            willChange: "transform, opacity",
          }}
          animate={{
            y:       ["-8vh", "108vh"],
            x:       [0, p.swayX * 0.3, p.swayX, p.swayX * 0.5, 0],
            rotate:  [0, p.rotEnd * 0.2, p.rotEnd * 0.55, p.rotEnd * 0.85, p.rotEnd],
            opacity: [0, p.peakOp, p.peakOp, p.peakOp, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
            times: [0, 0.08, 0.5, 0.92, 1],
          }}
        >
          <path d={p.shape.d} fill={`url(#${p.gradId})`} />
        </motion.svg>
      ))}
    </div>
  );
}
