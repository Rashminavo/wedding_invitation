"use client";

import { motion } from "framer-motion";

const petalShapes = [
  "70% 30% 70% 30% / 30% 70% 30% 70%",
  "85% 15% 70% 30% / 25% 75% 35% 65%",
  "60% 40% 55% 45% / 45% 55% 50% 50%",
];

const petals = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  left: `${(i * 41 + 3) % 100}%`,
  delay: (i % 9) * 0.65,
  duration: 13 + (i % 6) * 2.5,
  width: 10 + (i % 5) * 4,
  shape: petalShapes[i % 3],
  swayDir: i % 2 === 0 ? 1 : -1,
}));

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 19) % 100}%`,
  top: `${(i * 29) % 100}%`,
  delay: (i % 9) * 0.35,
}));

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute h-2 w-2 rounded-full bg-sage/20 shadow-glow"
          style={{ left: p.left, top: p.top }}
          animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.55, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          style={{
            left: petal.left,
            width: petal.width,
            height: petal.width * 1.6,
            borderRadius: petal.shape,
            background: "rgba(255, 255, 255, 0.92)",
            boxShadow: "0 4px 16px rgba(255, 140, 100, 0.25), 0 0 8px rgba(255, 210, 190, 0.35)",
          }}
          className="absolute top-[-10%]"
          animate={{
            y: ["0vh", "118vh"],
            x: [0, petal.swayDir * 45, petal.swayDir * -20, petal.swayDir * 38],
            rotate: [0, 130, 260, 360],
            opacity: [0, 0.9, 0.92, 0.08],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
