"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroInvitation() {
  return (
    <section className="relative z-10 flex min-h-screen items-start justify-center px-4 pt-16 pb-12 sm:px-6">
      <motion.div
        className="w-full max-w-[460px]"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="glass relative overflow-hidden rounded-[2rem] p-3"
          animate={{ y: 0 }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-white/35" />
          <div className="relative overflow-hidden rounded-[1.45rem] bg-pearl">
            <Image
              src="/invitation-card.jpg"
              alt="Wedding invitation card for Dhananjaya and Tharanya"
              width={900}
              height={1280}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
      <motion.a
        href="#countdown"
        className="focus-ring absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-moss"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 0.9 }, y: { duration: 1.8, repeat: Infinity } }}
      >
        Scroll to Explore
        <ChevronDown className="h-5 w-5" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
