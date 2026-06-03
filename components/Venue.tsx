"use client";

import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/components/motion";

const mapUrl = "https://www.google.com/maps?q=Taj%20Samudra%20Colombo&output=embed";
const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Taj%20Samudra%20Colombo";

export default function Venue() {
  return (
    <motion.div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <div className="glass flex flex-col justify-center rounded-3xl p-8">
        <MapPin className="h-8 w-8 text-moss" aria-hidden="true" />
        <h3 className="mt-5 font-heading text-3xl text-ink">Wedding Venue</h3>
        <p className="mt-3 text-lg font-semibold text-ink">Taj Samudra, Colombo</p>
        <a href={directionsUrl} target="_blank" rel="noreferrer" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-moss px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink">
          <Navigation className="h-4 w-4" aria-hidden="true" />
          Get Directions
        </a>
      </div>
      <div className="overflow-hidden rounded-3xl border border-white/70 shadow-luxury">
        <iframe
          title="Wedding venue map"
          src={mapUrl}
          className="h-[360px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </motion.div>
  );
}
