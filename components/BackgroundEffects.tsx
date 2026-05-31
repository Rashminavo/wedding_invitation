"use client";

import { motion } from "framer-motion";

const petals = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: (index % 7) * 0.55,
  duration: 12 + (index % 5) * 2,
  size: 16 + (index % 5) * 6,
  color: [
    "bg-rose-200/85",
    "bg-pink-100/90",
    "bg-amber-100/90",
    "bg-sage/80",
    "bg-white/95"
  ][index % 5]
}));

const leaves = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${(index * 53) % 100}%`,
  delay: (index % 6) * 0.75,
  duration: 14 + (index % 4) * 2,
  size: 18 + (index % 4) * 5
}));

const particles = Array.from({ length: 38 }, (_, index) => ({
  id: index,
  left: `${(index * 19) % 100}%`,
  top: `${(index * 29) % 100}%`,
  delay: (index % 9) * 0.35,
  color: [
    "bg-sage/65",
    "bg-champagne/70",
    "bg-rose-200/70",
    "bg-amber-100/80"
  ][index % 4]
}));

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-sage/30 blur-3xl" />
      <div className="absolute right-[-7rem] top-16 h-72 w-72 rounded-full bg-rose-200/35 blur-3xl" />
      <div className="absolute bottom-10 right-[-9rem] h-96 w-96 rounded-full bg-champagne/35 blur-3xl" />
      <div className="absolute bottom-24 left-1/4 h-64 w-64 rounded-full bg-amber-100/30 blur-3xl" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className={`absolute h-2 w-2 rounded-full ${particle.color} shadow-glow`}
          style={{ left: particle.left, top: particle.top }}
          animate={{ opacity: [0.25, 0.95, 0.25], scale: [0.8, 2.2, 0.8] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className={`absolute top-[-12%] rounded-full ${petal.color} shadow-[0_10px_26px_rgba(168,181,162,0.35)]`}
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.65,
            borderRadius: "70% 30% 70% 30%"
          }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, petal.id % 2 ? 65 : -55, 18],
            rotate: [0, 140, 300],
            opacity: [0, 0.95, 0.15]
          }}
          transition={{ duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: "linear" }}
        />
      ))}
      {leaves.map((leaf) => (
        <motion.span
          key={leaf.id}
          className="absolute top-[-12%] rounded-full bg-moss/55 shadow-[0_10px_24px_rgba(111,127,105,0.28)]"
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size * 2.1,
            borderRadius: "85% 15% 85% 15%"
          }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, leaf.id % 2 ? -70 : 58, -12],
            rotate: [25, 190, 360],
            opacity: [0, 0.75, 0.08]
          }}
          transition={{ duration: leaf.duration, repeat: Infinity, delay: leaf.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}
