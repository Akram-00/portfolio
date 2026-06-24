"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projects } from "@/data/portfolio";
import { fadeUp, staggerContainer, viewportOptions } from "@/utils/animations";

export function ProjectsSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedProject = projects.find((p) => p.id === selected);

  return (
    <section
      id="projects"
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
              Featured Work
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "var(--third-color)" }}
            >
              Project Case Studies
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                custom={i}
                className="group cursor-pointer glass rounded-2xl overflow-hidden"
                whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(108,99,255,0.15)" }}
                onClick={() => setSelected(project.id)}
                style={{ border: "1px solid rgba(108,99,255,0.1)" }}
              >
                {/* Card header */}
                <div
                  className="p-6 pb-4"
                  style={{
                    background: project.featured
                      ? "linear-gradient(135deg, rgba(108,99,255,0.12) 0%, transparent 70%)"
                      : undefined,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="text-xs font-mono px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(108,99,255,0.15)",
                        color: "var(--secondary-color)",
                        border: "1px solid rgba(108,99,255,0.2)",
                      }}
                    >
                      {project.category}
                    </span>
                    {project.featured && (
                      <span
                        className="text-xs font-mono opacity-60"
                        style={{ color: "var(--secondary-color)" }}
                      >
                        Featured ✦
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-2xl font-bold mb-1"
                    style={{ color: "var(--third-color)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm mb-4 opacity-60"
                    style={{ color: "var(--third-color)" }}
                  >
                    {project.subtitle}
                  </p>
                  <p
                    className="text-sm leading-relaxed opacity-70"
                    style={{ color: "var(--third-color)" }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="px-6 pb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-md font-mono"
                        style={{
                          backgroundColor: "rgba(108,99,255,0.08)",
                          color: "rgba(232,230,255,0.6)",
                          border: "1px solid rgba(108,99,255,0.1)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <motion.div
                    className="mt-4 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--secondary-color)" }}
                  >
                    View Case Study →
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && selectedProject && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed inset-4 md:inset-10 z-50 overflow-y-auto rounded-2xl glass-strong"
              style={{ border: "1px solid rgba(108,99,255,0.2)" }}
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-8 md:p-12 max-w-4xl mx-auto">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <span
                      className="text-xs font-mono px-3 py-1 rounded-full mb-4 inline-block"
                      style={{
                        backgroundColor: "rgba(108,99,255,0.15)",
                        color: "var(--secondary-color)",
                      }}
                    >
                      {selectedProject.category}
                    </span>
                    <h2
                      className="text-3xl md:text-4xl font-bold"
                      style={{ color: "var(--third-color)" }}
                    >
                      {selectedProject.title}
                    </h2>
                    <p className="opacity-60 mt-1" style={{ color: "var(--third-color)" }}>
                      {selectedProject.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-lg"
                    style={{ color: "var(--third-color)" }}
                  >
                    ×
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Section title="Overview" content={selectedProject.description} />
                    <Section title="The Problem" content={selectedProject.problem} />
                    <Section title="The Solution" content={selectedProject.solution} />
                  </div>
                  <div>
                    <div className="mb-6">
                      <h4
                        className="text-xs font-mono uppercase tracking-widest mb-3 opacity-50"
                        style={{ color: "var(--third-color)" }}
                      >
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-3 py-1 rounded-full font-mono"
                            style={{
                              backgroundColor: "rgba(108,99,255,0.15)",
                              color: "var(--secondary-color)",
                              border: "1px solid rgba(108,99,255,0.2)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4
                        className="text-xs font-mono uppercase tracking-widest mb-3 opacity-50"
                        style={{ color: "var(--third-color)" }}
                      >
                        Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {selectedProject.responsibilities.map((r, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "rgba(232,230,255,0.75)" }}
                          >
                            <span
                              className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                              style={{ backgroundColor: "var(--secondary-color)" }}
                            />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4
                        className="text-xs font-mono uppercase tracking-widest mb-3 opacity-50"
                        style={{ color: "var(--third-color)" }}
                      >
                        Outcomes
                      </h4>
                      <ul className="space-y-2">
                        {selectedProject.outcomes.map((o, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm"
                            style={{ color: "rgba(232,230,255,0.75)" }}
                          >
                            <span style={{ color: "var(--secondary-color)" }}>✓</span>
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div className="mb-6">
      <h4
        className="text-xs font-mono uppercase tracking-widest mb-2 opacity-50"
        style={{ color: "var(--third-color)" }}
      >
        {title}
      </h4>
      <p
        className="text-sm leading-relaxed opacity-80"
        style={{ color: "var(--third-color)" }}
      >
        {content}
      </p>
    </div>
  );
}
