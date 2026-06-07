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

  // Sync playing state with the actual audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [audioRef]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.muted = false;
      audio.play().catch(() => {});
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause background music" : "Play background music"}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-moss text-white shadow-[0_4px_24px_rgba(0,0,0,0.18)] border-2 border-white/30"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          {/* Outer slow pulse — always visible so button stands out */}
          <motion.span
            className="absolute inset-0 rounded-full bg-moss"
            animate={{ scale: [1, 1.45], opacity: [0.45, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          {/* Second ring when playing */}
          {playing && (
            <motion.span
              className="absolute inset-0 rounded-full bg-moss"
              animate={{ scale: [1, 1.7], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            />
          )}

          {playing ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative h-6 w-6">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative h-6 w-6">
              <path d="M9 3v12.17A3 3 0 1 0 11 18V7h6V3H9Z" />
            </svg>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
