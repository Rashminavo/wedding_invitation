"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { galleryImages } from "@/components/data";
import { fadeUp, stagger } from "@/components/motion";

export default function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <motion.div className="grid grid-cols-2 gap-3 sm:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {galleryImages.map((src, index) => (
          <motion.button
            key={src}
            type="button"
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => setActive(src)}
            className={`focus-ring group relative overflow-hidden rounded-2xl bg-mist ${index === 0 || index === 5 ? "aspect-[4/5]" : "aspect-square"}`}
            aria-label={`Open gallery image ${index + 1}`}
          >
            <Image
              src={src}
              alt={`Wedding gallery moment ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition group-hover:opacity-100" />
          </motion.button>
        ))}
      </motion.div>
      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="focus-ring absolute right-5 top-5 rounded-full bg-white/90 p-3 text-ink"
              aria-label="Close gallery preview"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <motion.div className="relative h-[78vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white" initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}>
              <Image src={active} alt="Selected wedding gallery preview" fill sizes="90vw" className="object-cover" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
