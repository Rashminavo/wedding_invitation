"use client";

import { motion } from "framer-motion";

const petals = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: (index % 7) * 0.55,
  duration: 12 + (index % 5) * 2,
  size: 7 + (index % 4) * 3
}));

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 19) % 100}%`,
  top: `${(index * 29) % 100}%`,
  delay: (index % 9) * 0.35,
  color: "bg-sage/20"
}));

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className={`absolute h-2 w-2 rounded-full ${particle.color} shadow-glow`}
          style={{ left: particle.left, top: particle.top }}
          animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.55, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className="absolute top-[-12%] rounded-full bg-white/85 shadow-[0_6px_18px_rgba(255,187,163,0.28)]"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.65,
            borderRadius: "70% 30% 70% 30%"
          }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, petal.id % 2 ? 36 : -32, 8],
            rotate: [0, 90, 180],
            opacity: [0, 0.68, 0.14]
          }}
          transition={{ duration: petal.duration + 3, repeat: Infinity, delay: petal.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}
