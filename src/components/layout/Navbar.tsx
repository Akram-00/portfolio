"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { personalInfo } from "@/data/portfolio";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0 glass-strong"
        style={{ opacity: bgOpacity }}
      />
      <nav className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-xl font-bold tracking-tight"
          style={{ color: "var(--secondary-color)" }}
          whileHover={{ scale: 1.05 }}
        >
          AA<span style={{ color: "var(--third-color)" }}>.</span>
        </motion.a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium relative group transition-all duration-300"
                style={{
                  color: activeSection === link.href.replace("#", "")
                    ? "var(--secondary-color)"
                    : "rgba(232, 230, 255, 0.6)",
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    width: activeSection === link.href.replace("#", "") ? "100%" : "0%",
                  }}
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={personalInfo.resumeUrl}
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
          style={{
            border: "1px solid var(--secondary-color)",
            color: "var(--secondary-color)",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = "var(--secondary-color)";
            (e.target as HTMLElement).style.color = "var(--primary-color)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = "transparent";
            (e.target as HTMLElement).style.color = "var(--secondary-color)";
          }}
        >
          Resume
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-px"
            style={{ backgroundColor: "var(--third-color)" }}
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block w-6 h-px"
            style={{ backgroundColor: "var(--third-color)" }}
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block w-6 h-px"
            style={{ backgroundColor: "var(--third-color)" }}
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden glass-strong overflow-hidden"
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium"
              style={{ color: "var(--third-color)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}
