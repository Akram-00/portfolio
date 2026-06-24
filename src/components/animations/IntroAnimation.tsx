"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const phases = [
  "Welcome",
  "Building Digital Experiences",
  "Ali Akram",
];

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timings = [900, 1600, 1200];
    let total = 0;
    timings.forEach((t, i) => {
      total += t;
      setTimeout(() => {
        if (i < timings.length - 1) setPhase(i + 1);
        else {
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 800);
          }, 600);
        }
      }, total);
    });
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "var(--primary-color)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--secondary-color)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-px opacity-30"
            style={{ backgroundColor: "var(--secondary-color)" }}
            initial={{ top: "-2px" }}
            animate={{ top: "100%" }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
          />

          {/* Corner decorations */}
          {[
            "top-8 left-8 border-t border-l",
            "top-8 right-8 border-t border-r",
            "bottom-8 left-8 border-b border-l",
            "bottom-8 right-8 border-b border-r",
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute w-10 h-10 ${cls}`}
              style={{ borderColor: "var(--secondary-color)" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            />
          ))}

          {/* Loading bar */}
          <div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-px opacity-30"
            style={{ backgroundColor: "var(--third-color)" }}
          >
            <motion.div
              className="h-full"
              style={{ backgroundColor: "var(--secondary-color)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.3, ease: "linear" }}
            />
          </div>

          {/* Phase text */}
          <div className="relative text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {phase === 2 ? (
                  <div>
                    <p
                      className="text-sm font-mono tracking-[0.4em] uppercase mb-4 opacity-60"
                      style={{ color: "var(--secondary-color)" }}
                    >
                      Portfolio of
                    </p>
                    <h1
                      className="text-5xl md:text-7xl font-bold tracking-tight"
                      style={{ color: "var(--third-color)" }}
                    >
                      {phases[phase].split("").map((char, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.4 }}
                          style={{ display: "inline-block" }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 text-sm tracking-widest font-mono opacity-50"
                      style={{ color: "var(--third-color)" }}
                    >
                      FULL STACK DEVELOPER
                    </motion.p>
                  </div>
                ) : (
                  <p
                    className="text-3xl md:text-5xl font-light tracking-wider"
                    style={{ color: "var(--third-color)" }}
                  >
                    {phases[phase]}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Orbiting dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--secondary-color)" }}
              animate={{
                x: [0, Math.cos((i * 2 * Math.PI) / 3) * 120, 0],
                y: [0, Math.sin((i * 2 * Math.PI) / 3) * 120, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
