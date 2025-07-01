
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface PuppyFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedBreed: string;
  setSelectedBreed: (value: string) => void;
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  minWeeks: string;
  setMinWeeks: (value: string) => void;
  maxWeeks: string;
  setMaxWeeks: (value: string) => void;
  breeds: string[];
  genders: string[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  resultsCount: number;
}

const PuppyFilters: React.FC<PuppyFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedBreed,
  setSelectedBreed,
  selectedGender,
  setSelectedGender,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minWeeks,
  setMinWeeks,
  maxWeeks,
  setMaxWeeks,
  breeds,
  genders,
  hasActiveFilters,
  onClearFilters,
  resultsCount,
}) => {
  return (
    <div className="mb-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
          <Input
            placeholder="Search by name, breed, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-amber-200 focus:border-teal-500 focus:ring-teal-200 text-amber-900 placeholder:text-amber-500"
            aria-label="Search puppies"
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-end">
        {/* Breed Filter */}
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Breed</label>
          <Select value={selectedBreed} onValueChange={setSelectedBreed}>
            <SelectTrigger className="bg-white border-amber-200 focus:border-teal-500 text-amber-900">
              <SelectValue placeholder="All Breeds" />
            </SelectTrigger>
            <SelectContent className="bg-white border-amber-200 z-50">
              <SelectItem value="all">All Breeds</SelectItem>
              {breeds.map(breed => (
                <SelectItem key={breed} value={breed}>{breed}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Gender Filter */}
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Gender</label>
          <Select value={selectedGender} onValueChange={setSelectedGender}>
            <SelectTrigger className="bg-white border-amber-200 focus:border-teal-500 text-amber-900">
              <SelectValue placeholder="All Genders" />
            </SelectTrigger>
            <SelectContent className="bg-white border-amber-200 z-50">
              <SelectItem value="all">All Genders</SelectItem>
              {genders.map(gender => (
                <SelectItem key={gender} value={gender}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Min Price ($)</label>
          <Input
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="bg-white border-amber-200 focus:border-teal-500 text-amber-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Max Price ($)</label>
          <Input
            type="number"
            placeholder="10000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="bg-white border-amber-200 focus:border-teal-500 text-amber-900"
          />
        </div>

        {/* Age Range in Weeks */}
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Min Age (weeks)</label>
          <Input
            type="number"
            placeholder="0"
            value={minWeeks}
            onChange={(e) => setMinWeeks(e.target.value)}
            className="bg-white border-amber-200 focus:border-teal-500 text-amber-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-800 mb-1">Max Age (weeks)</label>
          <Input
            type="number"
            placeholder="52"
            value={maxWeeks}
            onChange={(e) => setMaxWeeks(e.target.value)}
            className="bg-white border-amber-200 focus:border-teal-500 text-amber-900"
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-center">
          <Button 
            onClick={onClearFilters}
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-100"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All Filters
          </Button>
        </div>
      )}
      
      {/* Results Summary */}
      {(searchTerm || hasActiveFilters) && (
        <div className="mt-4 text-sm text-amber-700 text-center">
          Showing {resultsCount} result{resultsCount !== 1 ? 's' : ''} 
          {searchTerm && ` for "${searchTerm}"`}
          {hasActiveFilters && ` with applied filters`}
        </div>
      )}
    </div>
  );
};

export default PuppyFilters;
