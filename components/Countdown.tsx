"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { weddingDate } from "@/components/data";
import { fadeUp, stagger } from "@/components/motion";

function getRemaining() {
  const diff = Math.max(new Date(weddingDate).getTime() - Date.now(), 0);
  return {
    Days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    Hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    Minutes: Math.floor((diff / (1000 * 60)) % 60),
    Seconds: Math.floor((diff / 1000) % 60)
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.div className="grid grid-cols-4 gap-2 sm:gap-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {Object.entries(time).map(([label, value]) => (
        <motion.div
          key={label}
          variants={fadeUp}
          whileHover={{ y: -4, scale: 1.02 }}
          className="glass rounded-2xl px-2 py-5 text-center sm:px-4 sm:py-6"
        >
          <div className="font-heading text-2xl text-ink sm:text-5xl">{String(value).padStart(2, "0")}</div>
          <div className="mt-2 text-[9px] font-medium uppercase tracking-[0.18em] text-moss sm:text-xs sm:tracking-[0.24em]">{label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
