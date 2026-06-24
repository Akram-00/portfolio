"use client";
import { motion } from "framer-motion";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export function WhatsAppButton() {
  const phoneNumber = "918438807386"; // WhatsApp number (with India country code 91)
  const message = encodeURIComponent("Hi Ali, I visited your portfolio and would like to get in touch!");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: "#25D366", // WhatsApp Brand Green
        boxShadow: "0 4px 15px rgba(37, 211, 102, 0.4)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ 
        scale: 1.1, 
        boxShadow: "0 0 30px rgba(37, 211, 102, 0.7)",
      }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contact on WhatsApp"
    >
      <IconBrandWhatsapp className="w-8 h-8 text-white" stroke={1.5} />
    </motion.a>
  );
}
