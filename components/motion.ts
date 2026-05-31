"use client";

import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(14px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
  }
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};
