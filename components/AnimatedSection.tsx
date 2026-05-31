"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/components/motion";

type AnimatedSectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function AnimatedSection({ id, className = "", children }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.section>
  );
}
