"use client";

import { useState, useMemo } from 'react';
import { useContext } from 'react';
import { ArtistContext } from '@/app/context/ArtistContext';
import ArtistCard from '@/components/ArtistCard';
import FilterBar from '@/components/FilterBar';
import { motion } from 'framer-motion';

interface Artist {
  id: number;
  name: string;
  category: string[];
  priceRange: string;
  location: string;
  image: string;
}

export default function ArtistListing() {
  const { artists } = useContext(ArtistContext);

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');

  const filteredArtists = useMemo(() => {
    return artists.filter((artist: Artist) => {
      const categoryMatch =
        categoryFilter === 'All' || artist.category.includes(categoryFilter);
      const locationMatch =
        locationFilter === 'All' || artist.location === locationFilter;
      const priceMatch = priceFilter === 'All' || artist.priceRange === priceFilter;
      return categoryMatch && locationMatch && priceMatch;
    });
  }, [artists, categoryFilter, locationFilter, priceFilter]);

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
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Explore Artists</h1>
      <FilterBar
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist: Artist) => <ArtistCard key={artist.id} artist={artist} />)
        ) : (
          <p className="text-center col-span-full text-sm sm:text-base">
            No artists found.
          </p>
        )}
      </div>
    </motion.div>
  );
}