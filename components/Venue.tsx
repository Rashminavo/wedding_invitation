"use client";

import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/components/motion";

const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Taj%20Samudra%20Colombo";
const embedUrl = "https://maps.google.com/maps?q=Taj+Samudra,Colombo&output=embed";

export default function Venue() {
  return (
    <motion.div className="mx-auto w-full max-w-2xl" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <div className="glass rounded-3xl p-8">
        <MapPin className="h-8 w-8 text-moss" aria-hidden="true" />
        <h3 className="mt-5 font-heading text-3xl text-ink">Wedding Venue</h3>
        <p className="mt-3 text-lg font-semibold text-ink">Taj Samudra, Colombo</p>
        <a href={directionsUrl} target="_blank" rel="noreferrer" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-moss px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink">
          <Navigation className="h-4 w-4" aria-hidden="true" />
          Get Directions
        </a>
        <div className="mt-6 overflow-hidden rounded-2xl">
          <iframe
            src={embedUrl}
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Taj Samudra, Colombo location map"
          />
        </div>
      </div>
    </motion.div>
  );
}
