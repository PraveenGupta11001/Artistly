"use client";

// Homepage with responsive hero and category cards
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function Home() {
  // Category data for cards
  const categories = [
    { name: 'Singers', icon: '🎤' },
    { name: 'Dancers', icon: '💃' },
    { name: 'Speakers', icon: '🎙️' },
    { name: 'DJs', icon: '🎧' },
  ];

  // Animation variants for page
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 sm:p-6 lg:p-8"
    >
      {/* Hero section */}
      <section className="text-center py-8 sm:py-12 lg:py-16">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
        >
          Welcome to Artistly
        </motion.h1>
        <p className="text-base sm:text-lg lg:text-xl mb-6 max-w-2xl mx-auto">
          Connect with top performing artists for your events.
        </p>
        <Link href="/artists">
          <Button size="lg"
          className="w-full sm:w-auto bg-gray-700 text-white hover:bg-gray-800 transition-colors duration-200">
            Explore Artists</Button>
        </Link>
      </section>
      {/* Category cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">
                  Book talented {category.name.toLowerCase()} for your event.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </motion.div>
  );
}