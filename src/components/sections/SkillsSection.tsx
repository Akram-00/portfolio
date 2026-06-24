"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { skills, techStack } from "@/data/portfolio";
import { fadeUp, staggerContainer, staggerFast, scaleIn, viewportOptions } from "@/utils/animations";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="section-padding"
      style={{ backgroundColor: "var(--primary-color)" }}
    >
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
              Technical Expertise
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "var(--third-color)" }}
            >
              Skills & Technologies
            </h2>
          </motion.div>

          {/* Skill category cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {skills.map((skillGroup, i) => (
              <motion.div
                key={skillGroup.category}
                variants={scaleIn}
                custom={i}
                className="glass rounded-2xl p-5 cursor-pointer transition-all duration-300"
                style={{
                  border: activeCategory === skillGroup.category
                    ? "1px solid var(--secondary-color)"
                    : "1px solid rgba(211,175,55,0.1)",
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === skillGroup.category ? null : skillGroup.category
                  )
                }
              >
                <div className="text-3xl mb-3">{skillGroup.icon}</div>
                <h3
                  className="font-semibold mb-3"
                  style={{ color: "var(--third-color)" }}
                >
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2 py-0.5 rounded-md font-mono transition-all duration-300"
                      style={{
                        backgroundColor: "rgba(211,175,55,0.06)",
                        color: "var(--third-color)",
                        opacity: 0.8,
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech cloud */}
          <motion.div variants={fadeUp}>
            <p
              className="text-center text-xs font-mono tracking-widest uppercase mb-8 opacity-50"
              style={{ color: "var(--third-color)" }}
            >
              Technologies & Tools
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
            >
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{
                    scale: 1.12,
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  animate={{
                    y: [0, Math.sin(i * 0.8) * 6, 0],
                  }}
                  transition={{
                    y: {
                      duration: 3 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    },
                  }}
                  className="cursor-default"
                >
                  <div
                    className="px-4 py-2 rounded-full text-sm font-mono glass transition-all duration-300 hover:border-[var(--secondary-color)] hover:shadow-[0_0_12px_rgba(211,175,55,0.2)]"
                    style={{
                      color:
                        i % 4 === 0
                          ? "var(--secondary-color)"
                          : "var(--third-color)",
                      opacity: i % 4 === 0 ? 1 : 0.85,
                      border: i % 4 === 0
                        ? "1px solid var(--secondary-color)"
                        : "1px solid var(--border-color)",
                      fontSize: i % 5 === 0 ? "0.9rem" : "0.75rem",
                    }}
                  >
                    {tech.name}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
