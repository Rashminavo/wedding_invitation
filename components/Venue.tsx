"use client";

import { Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/components/motion";

const mapUrl = "https://www.google.com/maps?q=Taj%20Samudra%20Colombo&output=embed";
const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Taj%20Samudra%20Colombo";

export default function Venue() {
  return (
    <motion.div className="flex flex-col gap-4" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <div className="overflow-hidden rounded-3xl border border-white/70 shadow-luxury">
        <iframe
          title="Wedding venue map"
          src={mapUrl}
          className="h-[420px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="flex justify-center">
        <a href={directionsUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full bg-moss px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink">
          <Navigation className="h-4 w-4" aria-hidden="true" />
          Get Directions
        </a>
      </div>
    </motion.div>
  );
}
