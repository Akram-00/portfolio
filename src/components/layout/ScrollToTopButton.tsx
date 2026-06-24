"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronUp } from "@tabler/icons-react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 0 20px rgba(211, 175, 55, 0.5)",
            backgroundColor: "var(--secondary-color)",
          }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-[104px] right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer"
          style={{
            border: "1px solid var(--secondary-color)",
            backgroundColor: "var(--secondary-color)",
            color: "", // Dark high-contrast color against gold
          }}
          aria-label="Scroll to top"
        >
          <IconChevronUp className="w-7 h-7" stroke={2} color="white"/>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
