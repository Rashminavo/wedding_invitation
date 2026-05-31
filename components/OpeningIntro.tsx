"use client";

import { AnimatePresence, motion } from "framer-motion";
import BackgroundEffects from "@/components/BackgroundEffects";

type OpeningIntroProps = {
  show: boolean;
};

export default function OpeningIntro({ show }: OpeningIntroProps) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(18px)", scale: 1.04 }}
          transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <BackgroundEffects />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.82)_68%)]"
            animate={{ opacity: [0.35, 0.85, 0.45] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
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
                  "0 0 18px rgba(168,181,162,0.2)",
                  "0 0 44px rgba(168,181,162,0.72)",
                  "0 0 18px rgba(168,181,162,0.2)"
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
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
