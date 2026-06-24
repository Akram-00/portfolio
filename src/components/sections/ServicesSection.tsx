"use client";
import { motion } from "framer-motion";
import { services } from "@/data/portfolio";
import { fadeUp, staggerContainer, viewportOptions } from "@/utils/animations";

export function ServicesSection() {
  return (
    <section
      id="services"
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
              What I Do
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "var(--third-color)" }}
            >
              Services Offered
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                custom={i}
                className="group glass rounded-2xl p-6 transition-all duration-500"
                style={{ border: "1px solid rgba(211,175,55,0.08)" }}
                whileHover={{
                  y: -8,
                  borderColor: "rgba(211,175,55,0.3)",
                  boxShadow: "0 20px 60px rgba(211,175,55,0.1)",
                }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: "var(--third-color)" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed opacity-70"
                  style={{ color: "var(--third-color)" }}
                >
                  {service.description}
                </p>
                <motion.div
                  className="mt-6 h-px"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  style={{ backgroundColor: "var(--secondary-color)", transformOrigin: "left" }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
