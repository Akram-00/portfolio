"use client";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-12 relative overflow-hidden"
      style={{ backgroundColor: "var(--primary-color)" }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ backgroundColor: "var(--secondary-color)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div
              className="text-xl font-bold mb-1"
              style={{ color: "var(--secondary-color)" }}
            >
              Ali Akram
              <span style={{ color: "var(--third-color)" }}>.</span>
            </div>
            <p
              className="text-xs opacity-40"
              style={{ color: "var(--third-color)" }}
            >
              Full Stack Developer
            </p>
          </div>

          <div className="flex items-center gap-6">
            {[
              { label: "GitHub", href: personalInfo.github },
              { label: "LinkedIn", href: personalInfo.linkedin },
              { label: "Email", href: `mailto:${personalInfo.email}` },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm opacity-50 hover:opacity-100 transition-opacity"
                style={{ color: "var(--third-color)" }}
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <p
            className="text-xs opacity-30 text-center md:text-right"
            style={{ color: "var(--third-color)" }}
          >
            © {currentYear} Ali Akram. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
