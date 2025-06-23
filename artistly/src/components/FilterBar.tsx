"use client";

// Reusable, responsive filter bar for artist listing
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterBarProps {
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  priceFilter: string;
  setPriceFilter: (value: string) => void;
}

export default function FilterBar({
  categoryFilter,
  setCategoryFilter,
  locationFilter,
  setLocationFilter,
  priceFilter,
  setPriceFilter,
}: FilterBarProps) {
  // Filter options
  const categories = ['All', 'Singer', 'Dancer', 'Speaker', 'DJ'];
  const locations = ['All', 'Mumbai', 'Delhi', 'Bangalore'];
  const priceRanges = ['All', '₹20,000 - ₹50,000', '₹30,000 - ₹80,000', '₹50,000 - ₹1,00,000'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Category filter */}
      <Select onValueChange={setCategoryFilter} value={categoryFilter}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Location filter */}
      <Select onValueChange={setLocationFilter} value={locationFilter}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Price range filter */}
      <Select onValueChange={setPriceFilter} value={priceFilter}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Price Range" />
        </SelectTrigger>
        <SelectContent>
          {priceRanges.map((price) => (
            <SelectItem key={price} value={price}>
              {price}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}