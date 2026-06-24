"use client";
import { useState } from "react";
import { IntroAnimation } from "@/components/animations/IntroAnimation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { HighlightsSection } from "@/components/sections/HighlightsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <IntroAnimation onComplete={() => setIntroComplete(true)} />
      <AnimatePresence>
        {introComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar />
            <main>
              <HeroSection />
              <AboutSection />
              <ExperienceSection />
              <ProjectsSection />
              <SkillsSection />
              <HighlightsSection />
              <ServicesSection />
              <ContactSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
