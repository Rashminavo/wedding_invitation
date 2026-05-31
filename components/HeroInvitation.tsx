"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroInvitation() {
  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
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
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-sage/20" />
          <div className="relative overflow-hidden rounded-[1.45rem] bg-pearl">
            <Image
              src="/invitation-card.jpg"
              alt="Wedding invitation card for Dhananjaya and Tharanya"
              width={900}
              height={1280}
              priority
              className="h-auto w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <div className="flex min-h-[620px] flex-col items-center justify-center px-8 py-16 text-center">
              <p className="text-xs uppercase tracking-[0.34em] text-moss/70">Together With Their Families</p>
              <h2 className="mt-8 font-script text-6xl leading-none text-ink">Dhananjaya & Tharanya</h2>
              <p className="mt-8 font-heading text-xl text-moss">Joyfully invite you to celebrate their wedding</p>
              <div className="my-10 h-px w-36 bg-gradient-to-r from-transparent via-sage to-transparent" />
              <p className="font-heading text-3xl text-ink">Friday, December 11, 2026</p>
              <p className="mt-3 text-sm uppercase tracking-[0.24em] text-moss/80">Taj Samudra, Colombo</p>
            </div>
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
