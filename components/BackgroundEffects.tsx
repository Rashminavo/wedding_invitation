"use client";

import { motion } from "framer-motion";

const petalShapes = [
  "70% 30% 70% 30% / 30% 70% 30% 70%",
  "85% 15% 70% 30% / 25% 75% 35% 65%",
  "60% 40% 55% 45% / 45% 55% 50% 50%",
];

const petalColors = [
  "linear-gradient(135deg, #fff0f5 0%, #ffb6c8 100%)",
  "linear-gradient(135deg, #ffffff 0%, #ff9ab8 100%)",
  "linear-gradient(135deg, #fff5f7 0%, #ffc0d0 100%)",
];

const petals = Array.from({ length: 32 }, (_, i) => {
  const angleDeg = (i / 32) * 360 + (i % 5) * 7;
  const angleRad = (angleDeg * Math.PI) / 180;
  const radius = 220 + (i % 6) * 80;
  return {
    id: i,
    endX: Math.cos(angleRad) * radius,
    endY: Math.sin(angleRad) * radius + radius * 0.18,
    delay: (i % 9) * 0.42,
    duration: 5.5 + (i % 5) * 1.4,
    size: 18 + (i % 5) * 6,
    shape: petalShapes[i % 3],
    color: petalColors[i % 3],
    spin: i % 2 === 0 ? 300 : -300,
    blurred: i % 3 === 2,
  };
});

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
          animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.6, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: petal.size,
            height: petal.size * 1.6,
            marginLeft: -petal.size / 2,
            marginTop: -(petal.size * 0.8),
            borderRadius: petal.shape,
            background: petal.color,
            boxShadow: "0 4px 22px rgba(230, 80, 120, 0.32), 0 0 16px rgba(255, 140, 170, 0.48), inset 0 1px 0 rgba(255,255,255,0.85)",
            filter: petal.blurred ? "blur(0.8px)" : "none",
          }}
          animate={{
            x: [0, petal.endX * 0.42, petal.endX],
            y: [0, petal.endY * 0.42 - 65, petal.endY],
            rotate: [0, petal.spin / 2, petal.spin],
            opacity: [0, 1, 0],
            scale: [0.25, 1.1, 0.9],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
