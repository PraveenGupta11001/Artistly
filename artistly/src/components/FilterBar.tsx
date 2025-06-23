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
  const locations = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur'];
  const priceRanges = ['All', '₹20,000 - ₹50,000', '₹30,000 - ₹80,000', '₹50,000 - ₹1,00,000'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Category filter */}
      <Select onValueChange={setCategoryFilter} value={categoryFilter}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto bg-gray-100 text-gray-900 dark:bg-gray-800">
          {categories.map((cat) => (
            <SelectItem
            className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md my-0.5 px-3 transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            key={cat}
            value={cat}
          >
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
        <SelectContent  className="max-h-60 overflow-y-auto bg-gray-100 text-gray-900 dark:bg-gray-800">
          {locations.map((loc) => (
            <SelectItem key={loc} value={loc}
            className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md my-0.5 px-3 transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
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
        <SelectContent  className="max-h-60 overflow-y-auto bg-gray-100 text-gray-900 dark:bg-gray-800">
          {priceRanges.map((price) => (
            <SelectItem key={price} value={price}
            className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md my-0.5 px-3 transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {price}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}