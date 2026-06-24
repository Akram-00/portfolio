"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/data/portfolio";
import { fadeUp, slideLeft, slideRight, staggerContainer, viewportOptions } from "@/utils/animations";

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="section-padding"
      style={{ backgroundColor: "var(--primary-color)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
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
              Work Experience
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "var(--third-color)" }}
            >
              Career Journey
            </h2>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px opacity-20"
            style={{ backgroundColor: "var(--secondary-color)" }}
          />
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 w-px"
            style={{
              backgroundColor: "var(--secondary-color)",
              height: lineHeight,
            }}
          />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                variants={index % 2 === 0 ? slideLeft : slideRight}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? "" : "md:direction-rtl"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 top-8 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-4 h-4 rounded-full border-2 relative"
                    style={{
                      backgroundColor: exp.current ? "var(--secondary-color)" : "var(--primary-color)",
                      borderColor: "var(--secondary-color)",
                    }}
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {exp.current && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: "var(--secondary-color)" }}
                        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </div>

                {/* Content card - alternate sides on desktop */}
                <div
                  className={`pl-14 md:pl-0 ${
                    index % 2 === 0
                      ? "md:col-start-1 md:pr-16 md:text-right"
                      : "md:col-start-2 md:pl-16"
                  }`}
                >
                  {/* Period badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4`}
                    style={{
                      backgroundColor: "rgba(211,175,55,0.1)",
                      border: "1px solid rgba(211,175,55,0.2)",
                      color: "var(--secondary-color)",
                    }}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${exp.current ? "animate-pulse" : ""}`}
                      style={{ backgroundColor: "var(--secondary-color)" }}
                    />
                    {exp.period}
                  </div>

                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: "var(--third-color)" }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    className="font-semibold mb-1"
                    style={{ color: "var(--secondary-color)" }}
                  >
                    {exp.company}
                  </p>
                  <p
                    className="text-sm opacity-50 mb-6"
                    style={{ color: "var(--third-color)" }}
                  >
                    {exp.location} · {exp.type}
                  </p>

                  <div className="glass-card-gold rounded-xl p-6 text-left relative overflow-hidden">
                    {/* Subtle backdrop overlay for premium touch */}
                    <div className="absolute inset-0 bg-[var(--primary-color)]/10 -z-10" />
                    
                    <ul className="space-y-3">
                      {exp.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm leading-relaxed transition-colors duration-300"
                          style={{ color: "var(--third-color)", opacity: 0.85 }}
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: "var(--secondary-color)", boxShadow: "0 0 8px var(--secondary-color)" }}
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                {index % 2 === 0 ? (
                  <div className="hidden md:block md:col-start-2" />
                ) : (
                  <div className="hidden md:block md:col-start-1 md:row-start-1" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
