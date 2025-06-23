"use client";

// Reusable, responsive ArtistCard component
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
            className="w-full h-32 sm:h-40 object-cover mb-2 rounded"
          />
          <p className="text-sm sm:text-base">Category: {artist.category.join(', ')}</p>
          <p className="text-sm sm:text-base">Location: {artist.location}</p>
          <p className="text-sm sm:text-base">Price: {artist.priceRange}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Ask for Quote</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}