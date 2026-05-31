"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { fadeUp, stagger } from "@/components/motion";

const contacts = [
  { label: "Groom's Dad", phone: "+94714273468" },
  { label: "Bride's Mom", phone: "+94772066314" }
];

export default function ContactDetails() {
  return (
    <motion.div
      className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {contacts.map((contact) => (
        <motion.a
          key={contact.phone}
          href={`tel:${contact.phone}`}
          variants={fadeUp}
          whileHover={{ y: -4 }}
          className="focus-ring glass flex items-center gap-4 rounded-3xl p-5 transition hover:bg-white/90"
          aria-label={`Call ${contact.label}`}
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage/20 text-moss">
            <Phone className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-heading text-2xl text-ink">{contact.label}</span>
            <span className="mt-1 block text-sm font-medium tracking-[0.08em] text-moss">{contact.phone}</span>
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
