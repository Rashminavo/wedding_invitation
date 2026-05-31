"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { fadeUp, stagger } from "@/components/motion";

export default function RSVPForm() {
  return (
    <motion.form
      className="glass mx-auto grid max-w-3xl gap-4 rounded-3xl p-5 sm:grid-cols-2 sm:p-8"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      onSubmit={(event) => event.preventDefault()}
    >
      {[
        ["Name", "text"],
        ["Phone Number", "tel"],
        ["Number of Guests", "number"]
      ].map(([label, type]) => (
        <motion.label key={label} variants={fadeUp} className="text-sm font-medium text-moss">
          {label}
          <input className="focus-ring mt-2 w-full rounded-2xl border border-sage/25 bg-white/80 px-4 py-3 text-ink" type={type} min={type === "number" ? 1 : undefined} required />
        </motion.label>
      ))}
      <motion.label variants={fadeUp} className="text-sm font-medium text-moss">
        Attendance Status
        <select className="focus-ring mt-2 w-full rounded-2xl border border-sage/25 bg-white/80 px-4 py-3 text-ink" required defaultValue="">
          <option value="" disabled>Select response</option>
          <option>Joyfully attending</option>
          <option>Unable to attend</option>
          <option>Will confirm soon</option>
        </select>
      </motion.label>
      <motion.label variants={fadeUp} className="text-sm font-medium text-moss sm:col-span-2">
        Message
        <textarea className="focus-ring mt-2 min-h-32 w-full resize-y rounded-2xl border border-sage/25 bg-white/80 px-4 py-3 text-ink" />
      </motion.label>
      <motion.div variants={fadeUp} className="sm:col-span-2">
        <button type="submit" className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-moss px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-luxury transition hover:bg-ink sm:w-auto">
          <Send className="h-4 w-4" aria-hidden="true" />
          Send RSVP
        </button>
      </motion.div>
    </motion.form>
  );
}
