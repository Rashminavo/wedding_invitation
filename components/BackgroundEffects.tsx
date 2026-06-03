"use client";

import { motion } from "framer-motion";

// Rose: blush pink teardrops | Jasmine: ivory white ovals | Marigold: pale gold elongated
const petalTypes = [
  { w: 14, h: 20, borderRadius: "85% 15% 70% 30% / 60% 40% 80% 20%" }, // rose
  { w: 13, h: 19, borderRadius: "20% 80% 30% 70% / 60% 40% 80% 20%" }, // rose alt
  { w: 7,  h: 14, borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%" }, // jasmine
  { w: 6,  h: 12, borderRadius: "50% 50% 48% 52% / 60% 60% 40% 40%" }, // jasmine alt
  { w: 10, h: 19, borderRadius: "40% 60% 55% 45% / 70% 30% 70% 30%" }, // marigold
  { w: 9,  h: 16, borderRadius: "50% 50% 40% 60% / 55% 45% 65% 35%" }, // marigold alt
];

const colorByType = [
  // rose — blush pink
  ["linear-gradient(165deg,#fde8ec 0%,#f4a8bb 100%)",
   "linear-gradient(165deg,#ffd6e7 0%,#f08fad 100%)",
   "linear-gradient(165deg,#fff0f4 0%,#f9bece 100%)"],
  // jasmine — ivory white
  ["linear-gradient(165deg,#fffef9 0%,#f5efdf 100%)",
   "linear-gradient(165deg,#ffffff 0%,#faf4ec 100%)",
   "linear-gradient(165deg,#fdfaf3 0%,#ede5d4 100%)"],
  // marigold — pale gold
  ["linear-gradient(165deg,#fff8dc 0%,#f0d080 100%)",
   "linear-gradient(165deg,#fef5c4 0%,#e8c45a 100%)",
   "linear-gradient(165deg,#fffae8 0%,#f5de98 100%)"],
];

const petals = Array.from({ length: 48 }, (_, i) => {
  const typeIdx = i % petalTypes.length;
  const groupIdx = typeIdx < 2 ? 0 : typeIdx < 4 ? 1 : 2;
  const color = colorByType[groupIdx][i % 3];
  const type = petalTypes[typeIdx];

  const startX = (i * 7.3 + (i % 3) * 13) % 100;
  const swayX  = ((i % 9) - 4) * 24;         // -96 to +96 px horizontal sway
  const scale  = 0.6 + (i % 6) * 0.14;       // 0.6–1.4
  const duration = 13 + (i % 9) * 1.6;       // 13–27 s slow drift
  const delay  = -((i * duration) / 48);     // stagger: petals start mid-fall
  const rotEnd = (i % 2 === 0 ? 1 : -1) * (18 + (i % 7) * 10);
  const peakOpacity = 0.68 + (i % 4) * 0.08; // 0.68–0.92
  const blur   = i % 7 === 6 ? "blur(1.6px)" : i % 5 === 4 ? "blur(0.7px)" : "none";

  return { id: i, type, color, startX, swayX, scale, duration, delay, rotEnd, peakOpacity, blur };
});

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.startX}%`,
            top: 0,
            width:  p.type.w * p.scale,
            height: p.type.h * p.scale,
            borderRadius: p.type.borderRadius,
            background: p.color,
            filter: p.blur,
            willChange: "transform, opacity",
          }}
          animate={{
            y:       ["-8vh", "108vh"],
            x:       [0, p.swayX * 0.3, p.swayX, p.swayX * 0.5, 0],
            rotate:  [0, p.rotEnd * 0.2, p.rotEnd * 0.55, p.rotEnd * 0.85, p.rotEnd],
            opacity: [0, p.peakOpacity, p.peakOpacity, p.peakOpacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
            times: [0, 0.08, 0.5, 0.92, 1],
          }}
        />
      ))}
    </div>
  );
}
