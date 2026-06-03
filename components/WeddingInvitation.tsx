"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import BackgroundEffects from "@/components/BackgroundEffects";
import ContactDetails from "@/components/ContactDetails";
import Countdown from "@/components/Countdown";
import HeroInvitation from "@/components/HeroInvitation";
import OpeningIntro from "@/components/OpeningIntro";
import RSVPForm from "@/components/RSVPForm";
import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import Venue from "@/components/Venue";
import { loveStory, schedule } from "@/components/data";

export default function WeddingInvitation() {
  const [introVisible, setIntroVisible] = useState(true);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <OpeningIntro show={introVisible} onOpen={() => setIntroVisible(false)} />
      <BackgroundEffects />
      <HeroInvitation />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <AnimatedSection id="story" className="py-16">
          <SectionHeading
            eyebrow="Love Story"
            title="A story that was never thought to happen"
            description="Two strangers. One classroom. Ten years in the making."
          />
          <Timeline items={loveStory} equalHeight />
        </AnimatedSection>

        <AnimatedSection id="countdown" className="py-16">
          <SectionHeading
            eyebrow="Counting Down"
            title="Until Our Forever Begins"
            description="Every passing moment brings us closer to the day we say yes to a lifetime together."
          />
          <Countdown />
        </AnimatedSection>

        <AnimatedSection id="schedule" className="py-16">
          <SectionHeading
            eyebrow="Wedding Day"
            title="Celebration Schedule"
            description="A graceful flow of ceremony, blessings, dinner, and dancing."
          />
          <Timeline items={schedule} />
        </AnimatedSection>

        <AnimatedSection id="venue" className="py-16">
          <SectionHeading
            eyebrow="Venue"
            title="Where Love Gathers"
            description="A serene destination for family, friends, and the beginning of our next chapter."
          />
          <Venue />
        </AnimatedSection>

        <AnimatedSection id="rsvp" className="py-16">
          <SectionHeading
            eyebrow="RSVP"
            title="Share Your Reply"
            description="Your presence would mean the world to us."
          />
          <RSVPForm />
        </AnimatedSection>

        <AnimatedSection id="contact" className="py-16">
          <SectionHeading
            eyebrow="Contact"
            title="For Any Details"
            description="Please feel welcome to contact our families for wedding day information."
          />
          <ContactDetails />
        </AnimatedSection>
      </div>

      <motion.footer
        className="relative z-10 border-t border-sage/20 px-4 py-10 text-center text-sm text-ink/60"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-script text-4xl text-moss">Dhananjaya & Tharanya</p>
        <p className="mt-2">11 December 2026</p>
      </motion.footer>
    </main>
  );
}
