"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { personalInfo } from "@/data/portfolio";
import { fadeUp, slideLeft, slideRight, staggerContainer, viewportOptions } from "@/utils/animations";

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

  const contactDetails = [
    { icon: "📧", label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: "📱", label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: "📍", label: "Location", value: personalInfo.location, href: "#" },
    { icon: "💼", label: "LinkedIn", value: "ali-akram-2729ba282", href: personalInfo.linkedin },
  ];

  return (
    <section
      id="contact"
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
              Get In Touch
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "var(--third-color)" }}
            >
              Let&apos;s Work Together
            </h2>
            <p
              className="text-lg opacity-60 max-w-lg mx-auto"
              style={{ color: "var(--third-color)" }}
            >
              Have a project in mind? I&apos;d love to hear about it and discuss how I can help.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Contact info */}
            <motion.div variants={slideLeft}>
              <div className="space-y-4 mb-10">
                {contactDetails.map((detail, i) => (
                  <motion.a
                    key={i}
                    href={detail.href}
                    target={detail.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 glass rounded-xl group transition-all duration-300"
                    whileHover={{ x: 6, borderColor: "rgba(108,99,255,0.3)" }}
                    style={{ border: "1px solid rgba(108,99,255,0.08)" }}
                  >
                    <span className="text-2xl">{detail.icon}</span>
                    <div>
                      <p
                        className="text-xs font-mono opacity-50"
                        style={{ color: "var(--third-color)" }}
                      >
                        {detail.label}
                      </p>
                      <p
                        className="text-sm font-medium group-hover:text-[var(--secondary-color)] transition-colors"
                        style={{ color: "var(--third-color)" }}
                      >
                        {detail.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Availability banner */}
              <div
                className="glass rounded-xl p-5"
                style={{ border: "1px solid rgba(108,99,255,0.2)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: "#4ade80" }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#4ade80" }}
                  >
                    Available for new projects
                  </span>
                </div>
                <p
                  className="text-sm opacity-60"
                  style={{ color: "var(--third-color)" }}
                >
                  Currently open to full-time roles, freelance projects, and remote collaborations.
                </p>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div variants={slideRight}>
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { key: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label
                      className="block text-xs font-mono mb-2 opacity-60"
                      style={{ color: "var(--third-color)" }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={formState[field.key as keyof typeof formState]}
                      onChange={(e) =>
                        setFormState({ ...formState, [field.key]: e.target.value })
                      }
                      placeholder={field.placeholder}
                      required
                      className="w-full glass rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-[var(--secondary-color)]"
                      style={{
                        color: "var(--third-color)",
                        border: "1px solid rgba(108,99,255,0.15)",
                        backgroundColor: "transparent",
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    className="block text-xs font-mono mb-2 opacity-60"
                    style={{ color: "var(--third-color)" }}
                  >
                    Message
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="w-full glass rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 resize-none focus:border-[var(--secondary-color)]"
                    style={{
                      color: "var(--third-color)",
                      border: "1px solid rgba(108,99,255,0.15)",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden"
                  style={{
                    backgroundColor: sent ? "rgba(74,222,128,0.2)" : "var(--secondary-color)",
                    color: sent ? "#4ade80" : "var(--primary-color)",
                    border: sent ? "1px solid #4ade80" : "none",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {sent ? "✓ Message Sent!" : "Send Message →"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
