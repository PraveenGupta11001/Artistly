"use client";

import { useContext } from 'react';
import { ArtistContext } from '@/app/context/ArtistContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

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

export default function ManagerDashboard() {
  const { artists } = useContext(ArtistContext);

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
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Manager Dashboard</h1>
      <div className="rounded-md border bg-white dark:bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">S.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">City</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artists.map((artist: Artist, index: number) => (
              <TableRow key={artist.id}>
                <TableCell className='text-center font-semibold'>{index + 1}</TableCell>
                <TableCell>{artist.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {artist.category.join(', ')}
                </TableCell>
                <TableCell className="hidden md:table-cell">{artist.location}</TableCell>
                <TableCell>{artist.priceRange}</TableCell>
                <TableCell>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="bg-gray-700 text-center text-white hover:bg-gray-800 transition-colors duration-200"
                  >
                    <Link href={`/artists/${artist.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}