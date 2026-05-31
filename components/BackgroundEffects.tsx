"use client";

import { motion } from "framer-motion";

const petals = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: (index % 7) * 0.55,
  duration: 12 + (index % 5) * 2,
  size: 10 + (index % 4) * 5
}));

const particles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${(index * 19) % 100}%`,
  top: `${(index * 29) % 100}%`,
  delay: (index % 9) * 0.35
}));

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-sage/20 blur-3xl" />
      <div className="absolute bottom-10 right-[-9rem] h-96 w-96 rounded-full bg-champagne/20 blur-3xl" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-sage/40 shadow-glow"
          style={{ left: particle.left, top: particle.top }}
          animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.8, 1.8, 0.8] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className="absolute top-[-10%] rounded-full bg-white/80 shadow-[0_8px_20px_rgba(168,181,162,0.25)]"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.65,
            borderRadius: "70% 30% 70% 30%"
          }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, petal.id % 2 ? 45 : -35, 10],
            rotate: [0, 120, 260],
            opacity: [0, 0.75, 0]
          }}
          transition={{ duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}
