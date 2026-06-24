"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { skills, techStack } from "@/data/portfolio";
import { fadeUp, staggerContainer, staggerFast, scaleIn, viewportOptions } from "@/utils/animations";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const isTechInActiveCategory = (techName: string) => {
    if (!activeCategory) return true;
    const group = skills.find((s) => s.category === activeCategory);
    if (!group) return false;
    return group.items.some(
      (item) =>
        item.toLowerCase().includes(techName.toLowerCase()) ||
        techName.toLowerCase().includes(item.toLowerCase())
    );
  };

  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--primary-color)" }}
    >
      {/* Cinematic Grid Overlay with Mouse Parallax */}
      <div
        className="cinematic-grid"
        style={{
          transform: "translate3d(calc(var(--mouse-x) * 0.35), calc(var(--mouse-y) * 0.35), 0)",
          transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)"
        }}
      />
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
              {techStack.map((tech, i) => {
                const isHighlighted = isTechInActiveCategory(tech.name);
                return (
                  <motion.div
                    key={tech.name}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    whileHover={{
                      scale: 1.15,
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    animate={{
                      y: [0, Math.sin(i * 0.8) * 6, 0],
                      opacity: activeCategory ? (isHighlighted ? 1 : 0.25) : 1,
                      scale: activeCategory ? (isHighlighted ? 1.08 : 0.9) : 1,
                    }}
                    transition={{
                      y: {
                        duration: 3 + (i % 3),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.1,
                      },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 }
                    }}
                    className="cursor-default"
                  >
                    <div
                      className="px-4 py-2 rounded-full text-sm font-mono glass transition-all duration-300 hover:border-[var(--secondary-color)] hover:shadow-[0_0_12px_rgba(211,175,55,0.3)]"
                      style={{
                        color: activeCategory
                          ? (isHighlighted ? "var(--secondary-color)" : "var(--third-color)")
                          : (i % 4 === 0 ? "var(--secondary-color)" : "var(--third-color)"),
                        opacity: activeCategory ? (isHighlighted ? 1 : 0.6) : (i % 4 === 0 ? 1 : 0.85),
                        border: activeCategory
                          ? (isHighlighted ? "1px solid var(--secondary-color)" : "1px solid var(--border-color)")
                          : (i % 4 === 0 ? "1px solid var(--secondary-color)" : "1px solid var(--border-color)"),
                        boxShadow: activeCategory && isHighlighted
                          ? "0 0 15px rgba(211,175,55,0.4)"
                          : undefined,
                        fontSize: i % 5 === 0 ? "0.9rem" : "0.75rem",
                      }}
                    >
                      {tech.name}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
