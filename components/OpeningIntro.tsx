"use client";

import { AnimatePresence, motion } from "framer-motion";
import BackgroundEffects from "@/components/BackgroundEffects";

type OpeningIntroProps = {
  show: boolean;
  onOpen: () => void;
};

export default function OpeningIntro({ show, onOpen }: OpeningIntroProps) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-50 flex touch-pan-y items-center justify-center overflow-hidden bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-12%", filter: "blur(22px)", scale: 1.08 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.22}
          onDragEnd={(_, info) => {
            if (info.offset.y < -70 || info.velocity.y < -420) {
              onOpen();
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " " || event.key === "ArrowUp") {
              onOpen();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Swipe up or press Enter to open the wedding invitation"
        >
          <BackgroundEffects />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.68)_58%,rgba(255,255,255,0.92)_100%)]"
            animate={{ opacity: [0.2, 0.62, 0.28] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-rose-100/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-sage/20 to-transparent" />
          <motion.div
            className="relative z-10 px-6 text-center"
            initial={{ opacity: 0, y: 22, scale: 0.96, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.34em] text-moss/70">
              The Wedding Of
            </p>
            <motion.h1
              className="font-script text-6xl leading-none text-ink sm:text-7xl md:text-8xl"
              animate={{
                textShadow: [
                  "0 0 20px rgba(244,194,194,0.38), 0 0 34px rgba(168,181,162,0.3)",
                  "0 0 54px rgba(168,181,162,0.78), 0 0 34px rgba(216,199,163,0.65)",
                  "0 0 20px rgba(244,194,194,0.38), 0 0 34px rgba(168,181,162,0.3)"
                ]
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
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
              onClick={onOpen}
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
