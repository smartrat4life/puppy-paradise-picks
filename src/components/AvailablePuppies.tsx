
import React, { useState, useEffect } from 'react';
import { usePuppies } from '@/hooks/usePuppies';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Search, Filter, X } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const AvailablePuppies = () => {
  const { puppies, loading, error } = usePuppies();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minWeeks, setMinWeeks] = useState('');
  const [maxWeeks, setMaxWeeks] = useState('');

  // Listen for search events from header
  useEffect(() => {
    const handleHeaderSearch = (event: CustomEvent) => {
      setSearchTerm(event.detail);
    };

    window.addEventListener('headerSearch', handleHeaderSearch as EventListener);
    return () => window.removeEventListener('headerSearch', handleHeaderSearch as EventListener);
  }, []);

  // Calculate age in weeks
  const calculateAgeInWeeks = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks;
  };

  if (loading) {
    return (
      <section id="available" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-amber-700">Loading our adorable puppies...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="available" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-red-600">Error loading puppies: {error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-teal-600 hover:bg-teal-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const breeds = [...new Set(puppies.map(puppy => puppy.breed))];
  const genders = [...new Set(puppies.map(puppy => puppy.gender))];

  const filteredPuppies = puppies.filter(puppy => {
    const matchesSearch = searchTerm === '' || 
      puppy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      puppy.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      puppy.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBreed = selectedBreed === 'all' || puppy.breed === selectedBreed;
    const matchesGender = selectedGender === 'all' || puppy.gender === selectedGender;
    
    const puppyPrice = Number(puppy.price);
    const matchesMinPrice = minPrice === '' || puppyPrice >= Number(minPrice);
    const matchesMaxPrice = maxPrice === '' || puppyPrice <= Number(maxPrice);
    
    const puppyWeeks = calculateAgeInWeeks(puppy.birth_date);
    const matchesMinWeeks = minWeeks === '' || puppyWeeks >= Number(minWeeks);
    const matchesMaxWeeks = maxWeeks === '' || puppyWeeks <= Number(maxWeeks);
    
    return matchesSearch && matchesBreed && matchesGender && matchesMinPrice && matchesMaxPrice && matchesMinWeeks && matchesMaxWeeks;
  });

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedBreed('all');
    setSelectedGender('all');
    setMinPrice('');
    setMaxPrice('');
    setMinWeeks('');
    setMaxWeeks('');
  };

  const hasActiveFilters = searchTerm || selectedBreed !== 'all' || selectedGender !== 'all' || minPrice || maxPrice || minWeeks || maxWeeks;

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="available" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Available Puppies
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
            Meet our adorable puppies looking for their forever homes. Each one has been lovingly raised and is ready to bring joy to your family.
          </p>
        </div>

        {/* Enhanced Search and Filter Controls */}
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
                onClick={clearAllFilters}
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
              Showing {filteredPuppies.length} result{filteredPuppies.length !== 1 ? 's' : ''} 
              {searchTerm && ` for "${searchTerm}"`}
              {hasActiveFilters && ` with applied filters`}
            </div>
          )}
        </div>

        {filteredPuppies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-amber-700 mb-4">
              {hasActiveFilters || searchTerm
                ? "No puppies found matching your search criteria." 
                : "No puppies available at the moment."}
            </p>
            {(hasActiveFilters || searchTerm) && (
              <Button 
                onClick={clearAllFilters}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPuppies.map((puppy) => {
              const ageInWeeks = calculateAgeInWeeks(puppy.birth_date);
              return (
                <Card key={puppy.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 hover:border-teal-300">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback 
                      src={puppy.image_url || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80'}
                      alt={`${puppy.name} - ${puppy.breed} puppy`}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      containerClassName="w-full h-64"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <FavoriteButton puppyId={puppy.id} />
                      <Badge className={puppy.status === 'available' ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                        {puppy.status === 'available' ? 'Available' : 'Reserved'}
                      </Badge>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-amber-800">
                        ${puppy.price}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-amber-900 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                      {puppy.name}
                    </h3>
                    
                    <p className="text-lg font-semibold text-teal-600 mb-3">{puppy.breed}</p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-amber-700">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{ageInWeeks} week{ageInWeeks !== 1 ? 's' : ''} old</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="capitalize">{puppy.gender}</span>
                      </div>
                    </div>
                    
                    <p className="text-amber-700 mb-6 leading-relaxed text-sm">
                      {puppy.description}
                    </p>
                    
                    <Button 
                      className={`w-full ${puppy.status === 'available' 
                        ? 'bg-teal-600 hover:bg-teal-700' 
                        : 'bg-gray-400 cursor-not-allowed'} 
                        text-white transition-all duration-300`}
                      onClick={puppy.status === 'available' ? scrollToContact : undefined}
                      disabled={puppy.status !== 'available'}
                      aria-label={puppy.status === 'available' ? `Inquire about ${puppy.name}` : `${puppy.name} is reserved`}
                    >
                      {puppy.status === 'available' ? 'Inquire Now' : 'Reserved'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailablePuppies;
