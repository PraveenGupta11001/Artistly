"use client";

import { useContext } from 'react';
import { useParams, notFound } from 'next/navigation';
import { ArtistContext } from '@/app/context/ArtistContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Artist {
  id: number;
  name: string;
  bio: string;
  category: string[];
  languages: string[];
  priceRange: string;
  location: string;
  imageUrl: string;
}

export default function ArtistProfile() {
  const { artists } = useContext(ArtistContext);
  const { id } = useParams();
  const artistId = parseInt(id as string, 10);
  const artist = artists.find((a) => a.id === artistId);

  if (!artist) {
    notFound();
  }

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
      className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-lg sm:max-w-3xl"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">{artist.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <img
            src={artist.image}
            alt={`Profile of ${artist.name}`}
            className="w-full h-48 sm:h-64 object-cover rounded-md"
            onError={(e) => {
              e.currentTarget.src = '/file.svg';
            }}
          />
          <div className="space-y-2">
            <p className="text-sm sm:text-base"><strong>Bio:</strong> {artist.bio}</p>
            <p className="text-sm sm:text-base"><strong>Category:</strong> {artist.category.join(', ')}</p>
            <p className="text-sm sm:text-base"><strong>Languages:</strong> {artist.languages.join(', ')}</p>
            <p className="text-sm sm:text-base"><strong>Price Range:</strong> {artist.priceRange}</p>
            <p className="text-sm sm:text-base"><strong>Location:</strong> {artist.location}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline">
            <Link href="/artists"
            className="bg-gray-700 text-center text-white hover:bg-gray-800 transition-colors duration-200"
            >Back to Artists</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}