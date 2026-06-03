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
            width: petal.width * 1.5,
            height: petal.width * 1.5 * 1.6,
            borderRadius: petal.shape,
            background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,224,210,0.95) 100%)",
            boxShadow: "0 4px 20px rgba(220, 100, 60, 0.35), 0 0 12px rgba(255, 180, 150, 0.5), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
          className="absolute top-[-10%]"
          animate={{
            y: ["0vh", "118vh"],
            x: [0, petal.swayDir * 45, petal.swayDir * -20, petal.swayDir * 38],
            rotate: [0, 130, 260, 360],
            opacity: [0, 1, 1, 0.12],
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
