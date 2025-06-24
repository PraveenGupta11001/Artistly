"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Artist {
  id: number;
  name: string;
  category: string[];
  priceRange: string;
  location: string;
  image: string;
}

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">{artist.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <img
            src={artist.image}
            alt={`Profile of ${artist.name}`}
            className="w-full h-32 sm:h-40 object-cover mb-3 rounded-md"
          />
          <p className="text-sm sm:text-base mb-2">Category: {artist.category.join(', ')}</p>
          <p className="text-sm sm:text-base mb-2">Location: {artist.location}</p>
          <p className="text-sm sm:text-base">Price Range: {artist.priceRange}</p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={`/artists/${artist.id}`}
            className=" bg-gray-700 text-center text-white hover:bg-gray-800 transition-colors duration-200"
            >
              View Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}