"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { personalInfo } from "@/data/portfolio";
import { fadeUp, slideLeft, slideRight, staggerContainer, viewportOptions } from "@/utils/animations";

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    const lastSubmission = localStorage.getItem("contact_last_submit_time");
    if (lastSubmission) {
      const timeElapsed = Date.now() - Number(lastSubmission);
      const limit = 60000;
      if (timeElapsed < limit) {
        const remaining = Math.ceil((limit - timeElapsed) / 1000);
        setCountdown(remaining);
      }
    }
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (formState.name.trim().length < 2) {
      setStatus({ type: "error", message: "Please enter a valid name (minimum 2 characters)." });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    if (formState.message.trim().length < 10) {
      setStatus({ type: "error", message: "Please enter a longer message (minimum 10 characters)." });
      return;
    }

    // Client-side rate limiting check
    const lastSubmission = localStorage.getItem("contact_last_submit_time");
    if (lastSubmission) {
      const timeElapsed = Date.now() - Number(lastSubmission);
      const limit = 60000;
      if (timeElapsed < limit) {
        const remaining = Math.ceil((limit - timeElapsed) / 1000);
        setCountdown(remaining);
        setStatus({
          type: "error",
          message: `Spam protection: Please wait ${remaining} seconds before sending another message.`
        });
        return;
      }
    }

    setLoading(true);
    setStatus({ type: null, message: null });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data || data.success === false) {
        throw new Error(data?.error || "Failed to send message. Please try again.");
      }

      setStatus({
        type: "success",
        message: data.message || "Your message has been sent successfully!"
      });
      setFormState({ name: "", email: "", message: "" });
      localStorage.setItem("contact_last_submit_time", Date.now().toString());
      setCountdown(60);

      // Auto clear success message after 7 seconds
      setTimeout(() => {
        setStatus((prev) => prev.type === "success" ? { type: null, message: null } : prev);
      }, 7000);

    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Something went wrong. Please check your connection and try again."
      });
    } finally {
      setLoading(false);
    }
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
                    whileHover={{ x: 6, borderColor: "rgba(211,175,55,0.3)" }}
                    style={{ border: "1px solid rgba(211,175,55,0.08)" }}
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
                style={{ border: "1px solid rgba(211,175,55,0.2)" }}
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
                {status.message && (
                  <div
                    className={`p-4 rounded-xl text-sm border font-medium mb-4 flex items-center gap-3 transition-all duration-300 ${
                      status.type === "success"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
                    }`}
                  >
                    <span className="text-lg leading-none">{status.type === "success" ? "✓" : "⚠"}</span>
                    <p>{status.message}</p>
                  </div>
                )}

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
                      disabled={loading || countdown > 0}
                      className="w-full glass rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-[var(--secondary-color)] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        color: "var(--third-color)",
                        border: "1px solid rgba(211,175,55,0.15)",
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
                    disabled={loading || countdown > 0}
                    rows={5}
                    className="w-full glass rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 resize-none focus:border-[var(--secondary-color)] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      color: "var(--third-color)",
                      border: "1px solid rgba(211,175,55,0.15)",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading || countdown > 0}
                  className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    color: "var(--primary-color)",
                  }}
                  whileHover={loading || countdown > 0 ? {} : { scale: 1.02 }}
                  whileTap={loading || countdown > 0 ? {} : { scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : countdown > 0 ? (
                    `Retry in ${countdown}s`
                  ) : (
                    "Send Message →"
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
