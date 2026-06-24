"use client";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { fadeUp, slideLeft, slideRight, staggerContainer, viewportOptions } from "@/utils/animations";
import { useCounter } from "@/hooks/useCounter";

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(value);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="glass rounded-2xl p-6 text-center"
    >
      <div
        className="text-4xl font-bold"
        style={{ color: "var(--secondary-color)" }}
      >
        {count}{suffix}
      </div>
      <div
        className="text-sm mt-2 opacity-60"
        style={{ color: "var(--third-color)" }}
      >
        {label}
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section-padding" style={{ backgroundColor: "var(--primary-color)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p
              className="text-sm font-mono tracking-widest uppercase mb-4"
              style={{ color: "var(--secondary-color)" }}
            >
              About Me
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "var(--third-color)" }}
            >
              Crafting Digital Solutions
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Visual */}
            <motion.div variants={slideLeft} className="relative">
              <div className="relative">
                {/* Code-like decoration */}
                <div className="glass rounded-2xl p-6 font-mono text-sm leading-loose">
                  <div style={{ color: "rgba(211,175,55,0.6)" }}>
                    <span style={{ color: "var(--secondary-color)" }}>const</span>{" "}
                    <span style={{ color: "var(--third-color)" }}>developer</span> = {"{"}
                  </div>
                  <div className="pl-4" style={{ color: "var(--third-color)" }}>
                    <div><span className="opacity-60">name:</span> <span style={{ color: "var(--secondary-color)" }}>&apos;Ali Akram&apos;</span>,</div>
                    <div><span className="opacity-60">role:</span> <span style={{ color: "var(--secondary-color)" }}>&apos;Lead Full Stack Engineer&apos;</span>,</div>
                    <div><span className="opacity-60">location:</span> <span style={{ color: "var(--secondary-color)" }}>&apos;Chennai, India&apos;</span>,</div>
                    <div><span className="opacity-60">experience:</span> <span style={{ color: "var(--secondary-color)" }}>&apos;2+ years&apos;</span>,</div>
                    <div><span className="opacity-60">passion:</span> [</div>
                    <div className="pl-4">
                      <div style={{ color: "var(--secondary-color)" }}>&apos;Clean Architecture&apos;,</div>
                      <div style={{ color: "var(--secondary-color)" }}>&apos;Scalable Systems&apos;,</div>
                      <div style={{ color: "var(--secondary-color)" }}>&apos;User Experience&apos;,</div>
                    </div>
                    <div>],</div>
                    <div><span className="opacity-60">available:</span> <span style={{ color: "#4ade80" }}>true</span></div>
                  </div>
                  <div style={{ color: "rgba(211,175,55,0.6)" }}>{"}"}</div>
                </div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20 blur-xl"
                  style={{ backgroundColor: "var(--secondary-color)" }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div variants={slideRight}>
              <p
                className="text-lg leading-relaxed mb-6 opacity-80"
                style={{ color: "var(--third-color)" }}
              >
                I&apos;m a passionate Full Stack Developer with hands-on experience building enterprise-grade
                platforms, multi-portal applications, and production systems for clients across Malta, Dubai, and India.
              </p>
              <p
                className="text-lg leading-relaxed mb-6 opacity-80"
                style={{ color: "var(--third-color)" }}
              >
                From architecting scalable multi-tenant platforms to managing cloud infrastructure and leading
                engineering teams, I bring both technical depth and leadership to every project.
              </p>
              <p
                className="text-lg leading-relaxed mb-10 opacity-80"
                style={{ color: "var(--third-color)" }}
              >
                My approach combines clean architecture principles with modern tools to deliver solutions that
                are not just functional — but built to last.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { label: "📍 Location", value: "Chennai, India" },
                  { label: "🎓 Education", value: "BCA — The New College" },
                  { label: "💼 Current Role", value: "Lead FSE @ A4 Services" },
                  { label: "📧 Email", value: "aliakram9789@gmail.com" },
                ].map((item, i) => (
                  <div key={i}>
                    <p
                      className="text-xs font-mono opacity-50 mb-1"
                      style={{ color: "var(--third-color)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--third-color)" }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <motion.a
                href={personalInfo.resumeUrl}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: "var(--secondary-color)",
                  color: "var(--primary-color)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Download Resume ↓
              </motion.a>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {personalInfo.stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp}>
                <StatCard value={stat.value} suffix={stat.suffix} label={stat.label} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
