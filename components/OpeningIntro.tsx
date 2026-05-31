"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundEffects from "@/components/BackgroundEffects";

type OpeningIntroProps = {
  show: boolean;
  onOpen: () => void;
};

export default function OpeningIntro({ show, onOpen }: OpeningIntroProps) {
  const touchStartY = useRef<number | null>(null);

  const openOnce = () => {
    if (show) {
      onOpen();
    }
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-50 flex touch-none select-none items-center justify-center overflow-hidden bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-6%", scale: 1.02 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          onTouchStart={(event) => {
            touchStartY.current = event.touches[0]?.clientY ?? null;
          }}
          onTouchEnd={(event) => {
            const startY = touchStartY.current;
            const endY = event.changedTouches[0]?.clientY;
            touchStartY.current = null;

            if (startY !== null && endY !== undefined && startY - endY > 48) {
              openOnce();
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " " || event.key === "ArrowUp") {
              openOnce();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Swipe up or press Enter to open the wedding invitation"
        >
          <BackgroundEffects />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.58)_58%,rgba(255,255,255,0.9)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-rose-100/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-sage/20 to-transparent" />
          <motion.div
            className="relative z-10 px-6 text-center"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.34em] text-moss/70">
              The Wedding Of
            </p>
            <motion.h1
              className="font-script text-6xl leading-none text-ink drop-shadow-[0_0_24px_rgba(168,181,162,0.55)] sm:text-7xl md:text-8xl"
            >
              Dhananjaya & Tharanya
            </motion.h1>
            <motion.div
              className="mx-auto mt-8 h-px w-48 bg-gradient-to-r from-transparent via-sage to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            />
            <motion.button
              type="button"
              onClick={openOnce}
              className="focus-ring mx-auto mt-12 flex flex-col items-center gap-3 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-moss"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{ opacity: { delay: 1.1 }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
            >
              <span className="h-12 w-px bg-gradient-to-b from-transparent via-moss/60 to-transparent" />
              Swipe Up To Open
            </motion.button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
