"use client";

// Responsive navigation header with theme toggle
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/app/context/ThemeContext';
import { Sun, Moon, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation variants for header
  const variants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10"
    >
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl sm:text-2xl font-bold">
          Artistly
        </Link>
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/artists">
            <Button variant="ghost">Explore Artists</Button>
          </Link>
          <Link href="/onboarding">
            <Button variant="ghost">Onboard Artist</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">Manager Dashboard</Button>
          </Link>
          <Button
            variant="ghost"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </nav>
      {/* Mobile navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-800 px-4 pb-4 flex flex-col space-y-2"
        >
          <Link href="/artists" onClick={toggleMenu}>
            <Button variant="ghost" className="w-full text-left">
              Explore Artists
            </Button>
          </Link>
          <Link href="/onboarding" onClick={toggleMenu}>
            <Button variant="ghost" className="w-full text-left">
              Onboard Artist
            </Button>
          </Link>
          <Link href="/dashboard" onClick={toggleMenu}>
            <Button variant="outline" className="w-full text-left">
              Manager Dashboard
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={() => {
              toggleTheme();
              toggleMenu();
            }}
            className="w-full text-left flex items-center"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="h-5 w-5 mr-2" /> : <Sun className="h-5 w-5 mr-2" />}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </motion.div>
      )}
    </motion.header>
  );
}