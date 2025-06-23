"use client";

import React, { createContext, useState, ReactNode } from 'react';
import artistsData from '@/app/data/artists.json';

interface Artist {
  id: number;
  name: string;
  category: string[];
  priceRange: string;
  location: string;
  bio: string;
  languages: string[];
  image: string;
}

interface ArtistContextType {
  artists: Artist[];
  addArtist: (artist: Omit<Artist, 'id' | 'image'> & { imageUrl?: string }) => void;
}

export const ArtistContext = createContext<ArtistContextType>({
  artists: [],
  addArtist: () => {},
});

export const ArtistProvider = ({ children }: { children: ReactNode }) => {
  const [artists, setArtists] = useState<Artist[]>(artistsData);

  const addArtist = (artist: Omit<Artist, 'id' | 'image'> & { imageUrl?: string }) => {
    const newArtist: Artist = {
      ...artist,
      id: artists.length + 1,
      image: artist.imageUrl && artist.imageUrl.trim() ? artist.imageUrl : '/file.svg',
    };
    setArtists([...artists, newArtist]);
  };

  return (
    <ArtistContext.Provider value={{ artists, addArtist }}>
      {children}
    </ArtistContext.Provider>
  );
};