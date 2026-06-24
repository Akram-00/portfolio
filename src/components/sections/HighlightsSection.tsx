"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOptions } from "@/utils/animations";

const highlights = [
  {
    year: "2025",
    title: "Promoted to Lead Engineer",
    description: "Elevated to Lead Full Stack Engineer at A4 Services, Malta — leading architecture and delivery of enterprise platforms.",
    icon: "🚀",
  },
  {
    year: "2025",
    title: "Multi-Country Client Base",
    description: "Delivered production systems for clients across Malta, Dubai, and India — managing full lifecycle from requirements to deployment.",
    icon: "🌍",
  },
  {
    year: "2024",
    title: "15+ Projects Shipped",
    description: "Successfully delivered over 15 production-grade projects spanning e-commerce, healthcare, real estate, and financial services.",
    icon: "⚡",
  },
  {
    year: "2024",
    title: "Full-Stack Architecture",
    description: "Architected scalable multi-portal systems with complex RBAC, document management workflows, and third-party integrations.",
    icon: "🏗️",
  },
];

export function HighlightsSection() {
  return (
    <section
      className="section-padding"
      style={{
        backgroundColor: "var(--primary-color)",
        background: "linear-gradient(180deg, var(--primary-color) 0%, rgba(108,99,255,0.04) 50%, var(--primary-color) 100%)",
      }}
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
              Milestones
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "var(--third-color)" }}
            >
              Career Highlights
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="glass rounded-2xl p-6 flex gap-5 group"
                style={{ border: "1px solid rgba(108,99,255,0.08)" }}
                whileHover={{
                  borderColor: "rgba(108,99,255,0.25)",
                  y: -4,
                }}
              >
                <div className="shrink-0">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: "rgba(108,99,255,0.12)" }}
                  >
                    {item.icon}
                  </div>
                </div>
                <div>
                  <p
                    className="text-xs font-mono mb-1"
                    style={{ color: "var(--secondary-color)" }}
                  >
                    {item.year}
                  </p>
                  <h3
                    className="font-bold mb-2"
                    style={{ color: "var(--third-color)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed opacity-70"
                    style={{ color: "var(--third-color)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
