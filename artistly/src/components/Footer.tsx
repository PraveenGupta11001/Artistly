"use client";

// Responsive footer component
import { motion } from 'framer-motion';

export default function Footer() {
  // Animation variants for footer
  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 dark:bg-gray-950 text-white py-4"
    >
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <p className="text-sm sm:text-base">© 2025 Artistly. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}