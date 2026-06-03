"use client";

import { motion } from "framer-motion";

// Strictly white & pink only — [highlight, base]
const colorPairs: [string, string][] = [
  ["#ffffff", "#f9bece"],  // white → light pink
  ["#fff0f4", "#f4a8bb"],  // blush white → medium pink
  ["#fde8ec", "#f08fad"],  // pale blush → deep pink
  ["#ffffff", "#fadadd"],  // pure white → soft pink
  ["#fff5f7", "#f9c6cf"],  // near white → rose pink
  ["#fffbfc", "#fce4e8"],  // white → barely pink
];

const shapes = {
  rose: {
    d: "M25 0C33 5 40 16 38 28C36 40 30 48 25 50C20 48 14 40 12 28C10 16 17 5 25 0Z",
    vw: 50, vh: 50, w: 16, h: 16,
  },
  jasmine: {
    d: "M8 0C12 5 14 14 14 24C14 34 12 40 8 44C4 40 2 34 2 24C2 14 4 5 8 0Z",
    vw: 16, vh: 44, w: 7, h: 19,
  },
  marigold: {
    d: "M16 1C19 0 23 3 21 9C27 9 30 18 29 28C28 38 23 45 16 47C9 45 4 38 3 28C2 18 5 9 11 9C9 3 13 0 16 1Z",
    vw: 32, vh: 47, w: 13, h: 19,
  },
};

type ShapeKey = keyof typeof shapes;
const cycle: ShapeKey[] = ["rose", "rose", "jasmine", "jasmine", "marigold", "marigold"];

const petals = Array.from({ length: 48 }, (_, i) => {
  const key     = cycle[i % cycle.length];
  const shape   = shapes[key];
  const [colorA, colorB] = colorPairs[i % colorPairs.length];

  const startX   = (i * 7.3 + (i % 3) * 13) % 100;
  const swayX    = ((i % 9) - 4) * 22;
  const scale    = 0.6 + (i % 6) * 0.14;
  const duration = 13 + (i % 9) * 1.7;
  const delay    = -((i * duration) / 48);
  const rotEnd   = (i % 2 === 0 ? 1 : -1) * (18 + (i % 7) * 10);
  const peakOp   = 0.65 + (i % 4) * 0.1;
  const blurPx   = i % 7 === 6 ? 1.6 : i % 5 === 4 ? 0.7 : 0;

  return { id: i, shape, colorA, colorB, startX, swayX, scale, duration, delay, rotEnd, peakOp, blurPx };
});

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
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
          {/* Inline gradient — avoids cross-SVG reference failures */}
          <defs>
            <linearGradient id={`g${p.id}`} x1="0.3" y1="0" x2="0.6" y2="1">
              <stop offset="0%" stopColor={p.colorA} />
              <stop offset="100%" stopColor={p.colorB} />
            </linearGradient>
          </defs>
          <path d={p.shape.d} fill={`url(#g${p.id})`} />
        </motion.svg>
      ))}
    </div>
  );
}
