"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MusicPlayerProps = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

export default function MusicPlayer({ audioRef }: MusicPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.muted = false;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause background music" : "Play background music"}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-sage/30 bg-pearl/80 text-moss shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          {playing && (
            <motion.span
              className="absolute inset-0 rounded-full border border-sage/40"
              animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
          )}

          {playing ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M9 3v12.17A3 3 0 1 0 11 18V7h6V3H9Z" />
            </svg>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
