"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { personalInfo } from "@/data/portfolio";
import { staggerContainer, fadeUp } from "@/utils/animations";

const rotatingTitles = [
  "Full Stack Developer",
  "React Specialist",
  "Node.js Engineer",
  "System Architect",
  "UI/UX Enthusiast",
];

const socialLinks = [
  { label: "GitHub", href: personalInfo.github, icon: "GH" },
  { label: "LinkedIn", href: personalInfo.linkedin, icon: "LI" },
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [titleIndex, setTitleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((i) => (i + 1) % rotatingTitles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--primary-color)" }}
    >
      {/* Cinematic Grid Overlay with Mouse Parallax */}
      <motion.div 
        className="cinematic-grid" 
        style={{
          x: mousePos.x * 0.3,
          y: mousePos.y * 0.3,
        }}
      />

      {/* Left side glowing orb (Purple/Indigo) */}
      <motion.div
        className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-[0.12] blur-[130px]"
        style={{
          backgroundColor: "var(--left-color)",
          top: "-15%",
          left: "-10%",
          x: mousePos.x * 1.2,
          y: mousePos.y * 1.2,
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Right side glowing orb (Neon Cyan) */}
      <motion.div
        className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-[0.12] blur-[130px]"
        style={{
          backgroundColor: "var(--right-color)",
          bottom: "-15%",
          right: "-10%",
          x: -mousePos.x * 1.2,
          y: -mousePos.y * 1.2,
        }}
        animate={{ scale: [1.1, 0.95, 1.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 pt-24 w-full"
        style={{ y, opacity }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left content */}
          <motion.div
            style={{
              x: mousePos.x * 0.2,
              y: mousePos.y * 0.2,
            }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{
                  backgroundColor: "var(--left-color)",
                  boxShadow: "0 0 10px var(--left-color)",
                }}
              />
              <span
                className="text-xs font-mono tracking-widest uppercase font-semibold"
                style={{ color: "var(--left-color)" }}
              >
                Available for work
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              <span>Hi, I&apos;m{" "}</span>
              <span className="shimmer-text">{personalInfo.name}</span>
            </motion.h1>

            {/* Rotating title */}
            <motion.div variants={fadeUp} className="h-14 flex items-center mb-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={titleIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-2xl md:text-3xl font-light font-mono tracking-tight"
                  style={{ color: "var(--right-color)" }}
                >
                  {rotatingTitles[titleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg leading-relaxed mb-8 max-w-xl opacity-75 font-normal"
              style={{ color: "var(--third-color)" }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* Stats row */}
            <motion.div variants={fadeUp} className="grid grid-cols-4 gap-4 mb-8">
              {personalInfo.stats.map((stat, i) => (
                <div key={i} className="text-left border-l border-[var(--border-color)] pl-4">
                  <div
                    className="text-2xl md:text-3xl font-bold font-mono tracking-tighter"
                    style={{ color: "var(--left-color)" }}
                  >
                    {stat.value}{stat.suffix}
                  </div>
                  <div
                    className="text-[10px] uppercase font-mono tracking-wider mt-1 opacity-60 leading-tight"
                    style={{ color: "var(--third-color)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 mb-8">
              <motion.a
                href="#projects"
                className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 btn-gold-glow"
                style={{
                  backgroundColor: "var(--left-color)",
                  color: "var(--primary-color)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 btn-silver-glow bg-transparent"
                style={{
                  border: "1px solid var(--right-color)",
                  color: "var(--right-color)",
                }}
                whileHover={{
                  backgroundColor: "var(--right-color)",
                  color: "var(--primary-color)",
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.97 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold glass transition-all duration-300"
                  style={{ color: "var(--left-color)", border: "1px solid rgba(108, 99, 255, 0.2)" }}
                  whileHover={{ scale: 1.15, borderColor: "var(--left-color)", boxShadow: "0 0 15px rgba(108, 99, 255, 0.4)" }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
              <div className="w-16 h-px opacity-30 bg-gradient-to-r from-[var(--left-color)] to-[var(--right-color)]" />
              <span className="text-xs opacity-60 font-mono" style={{ color: "var(--third-color)" }}>
                {personalInfo.location}
              </span>
            </motion.div>
          </motion.div>

          {/* Right - Avatar & floating elements */}
          <motion.div
            variants={fadeUp}
            className="relative flex items-center justify-center"
            style={{
              x: -mousePos.x * 0.2,
              y: -mousePos.y * 0.2,
            }}
          >
            <div className="relative">
              {/* Conic Glow Outer Ring */}
              <motion.div
                className="absolute inset-[-15px] rounded-full opacity-40 blur-md"
                style={{
                  background: "conic-gradient(from 0deg, var(--left-color), var(--right-color), var(--left-color))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* Rotating Dashed Ring 1 */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "2px dashed var(--left-color)",
                  transform: "scale(1.08)",
                  opacity: 0.5,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Rotating Dashed Ring 2 */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px dashed var(--right-color)",
                  transform: "scale(1.18)",
                  opacity: 0.3,
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Avatar */}
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden"
                style={{
                  border: "2px solid var(--border-color)",
                  boxShadow: "0 0 40px rgba(0, 0, 0, 0.6)",
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Ali+Akram&background=6c63ff&color=fff&size=400`;
                  }}
                />
              </motion.div>

              {/* Floating tech badges */}
              {[
                { label: "React.js", pos: "top-0 -left-16", delay: 0, type: "left" },
                { label: "Node.js", pos: "top-1/2 -right-24", delay: 0.3, type: "right" },
                { label: "TypeScript", pos: "bottom-8 -left-24", delay: 0.6, type: "left" },
                { label: "PostgreSQL", pos: "bottom-0 -right-24", delay: 0.9, type: "right" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${badge.pos} ${badge.type === "left" ? "glass-card-gold" : "glass-card-silver"} px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap flex items-center gap-2`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -6, 0],
                  }}
                  transition={{
                    opacity: { delay: badge.delay + 1 },
                    scale: { delay: badge.delay + 1 },
                    y: { duration: 4, repeat: Infinity, delay: badge.delay, ease: "easeInOut" },
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      backgroundColor: badge.type === "left" ? "var(--left-color)" : "var(--right-color)",
                      boxShadow: badge.type === "left" ? "0 0 8px var(--left-color)" : "0 0 8px var(--right-color)",
                    }}
                  />
                  <span className="font-medium" style={{ color: "var(--third-color)" }}>{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span
          className="text-xs font-mono tracking-widest uppercase opacity-45"
          style={{ color: "var(--third-color)" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-10"
          style={{ backgroundColor: "var(--right-color)", transformOrigin: "top" }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
