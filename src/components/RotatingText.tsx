import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type RotatingTextProps = {
  phrases: string[];
  intervalMs: number;
};

export default function RotatingText({ phrases, intervalMs }: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (phrases.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [phrases, intervalMs]);

  const currentPhrase = phrases[index] ?? "";

  return (
    <span className="relative inline-flex min-h-[1.15em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentPhrase}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="inline-block"
        >
          {currentPhrase}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
