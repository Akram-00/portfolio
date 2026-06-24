"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--secondary-color)] z-[100] origin-[0%] pointer-events-none"
      style={{ 
        scaleX,
        boxShadow: "0 0 8px var(--secondary-color), 0 0 4px var(--secondary-color)"
      }}
    />
  );
}
