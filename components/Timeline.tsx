"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";

type TimelineItem = {
  time?: string;
  year?: string;
  title: string;
  detail: string;
  bg?: string;
};

export default function Timeline({ items, equalHeight }: { items: TimelineItem[]; equalHeight?: boolean }) {
  return (
    <motion.div className="relative mx-auto max-w-3xl" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <div className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-sage/10 via-sage to-sage/10 sm:left-1/2" />
      {items.map((item, index) => (
        <motion.div
          key={`${item.title}-${index}`}
          variants={fadeUp}
          className={`relative mb-8 flex gap-6 sm:w-1/2 ${index % 2 ? "sm:ml-auto sm:pl-10" : "sm:pr-10"}`}
        >
          <span
            className={`mt-2 h-8 w-8 shrink-0 rounded-full border border-sage/50 bg-white shadow-glow sm:absolute sm:mt-0 sm:translate-y-2 ${
              index % 2 ? "sm:-left-4" : "sm:-right-4"
            }`}
          />
          <div className={`glass w-full rounded-2xl p-6 relative overflow-hidden ${equalHeight ? "h-[300px]" : ""}`}>
            {item.bg && (
              <div
                className="absolute inset-0 bg-cover opacity-[0.28]"
                style={{ backgroundImage: `url(${item.bg})`, backgroundPosition: "center 12%" }}
              />
            )}
            <div className={`relative z-10 ${equalHeight ? "h-full overflow-hidden" : ""}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-moss">{item.time ?? item.year}</p>
              <h3 className="mt-2 font-heading text-2xl text-ink">{item.title}</h3>
              <p className="mt-2 text-xs leading-6 text-ink/70">{item.detail}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
