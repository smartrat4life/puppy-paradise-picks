
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Heart, MapPin, Calendar, Shield, Award, CheckCircle, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { usePuppies } from '@/hooks/usePuppies';
import FavoriteButton from './FavoriteButton';

const AvailablePuppies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [breedFilter, setBreedFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  
  const { puppies, loading, error } = usePuppies();

  console.log('AvailablePuppies render:', { puppies, loading, error });

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return `${diffWeeks} weeks`;
  };

  const filteredPuppies = puppies.filter(puppy => {
    // Search filter
    if (searchTerm && !puppy.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !puppy.breed.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !puppy.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (breedFilter !== 'all' && puppy.breed !== breedFilter) return false;
    if (genderFilter !== 'all' && puppy.gender.toLowerCase() !== genderFilter) return false;
    if (ageFilter !== 'all') {
      const weeks = parseInt(calculateAge(puppy.birth_date));
      if (ageFilter === '6-8' && (weeks < 6 || weeks > 8)) return false;
      if (ageFilter === '9-12' && (weeks < 9 || weeks > 12)) return false;
      if (ageFilter === '13+' && weeks < 13) return false;
    }
    if (availabilityFilter !== 'all') {
      if (availabilityFilter === 'available' && puppy.status !== 'available') return false;
      if (availabilityFilter === 'reserved' && puppy.status === 'available') return false;
    }
    return true;
  });

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setBreedFilter('all');
    setGenderFilter('all');
    setAgeFilter('all');
    setAvailabilityFilter('all');
  };

  if (loading) {
    return (
      <section id="available-puppies" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Available Puppies
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Loading our adorable puppies...
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-64" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="available-puppies" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Available Puppies
            </h2>
            <div className="text-xl text-red-600 mb-4">
              Error loading puppies: {error}
            </div>
            <Button onClick={() => window.location.reload()} className="bg-teal-600 hover:bg-teal-700">
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="available-puppies" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Available Puppies
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Meet our adorable puppies who are ready to find their forever homes. 
            Each puppy comes with health certificates, AKC registration, and our lifetime support guarantee.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center items-center gap-4 md:gap-8 mb-12 flex-wrap">
          <div className="flex items-center gap-2 text-teal-600">
            <Shield className="w-5 h-5 md:w-6 md:h-6" />
            <span className="font-semibold text-sm md:text-base">Vet-Checked</span>
          </div>
          <div className="flex items-center gap-2 text-teal-600">
            <Heart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="font-semibold text-sm md:text-base">Health Guaranteed</span>
          </div>
          <div className="flex items-center gap-2 text-teal-600">
            <Award className="w-5 h-5 md:w-6 md:h-6" />
            <span className="font-semibold text-sm md:text-base">AKC Registered</span>
          </div>
          <div className="flex items-center gap-2 text-teal-600">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
            <span className="font-semibold text-sm md:text-base">13+ Years Experience</span>
          </div>
        </div>

        {/* Prominent Search Bar */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-600 h-5 w-5" />
              <Input
                type="text"
                placeholder="🔍 Search puppies by name, breed, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-teal-200 focus:border-teal-500 rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 bg-white p-4 md:p-6 rounded-xl shadow-lg border-2 border-amber-100">
          <h3 className="text-lg md:text-xl font-bold text-amber-900 mb-4 text-center">Filter Puppies</h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">Breed</label>
              <Select value={breedFilter} onValueChange={setBreedFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Breeds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Breeds</SelectItem>
                  <SelectItem value="Golden Doodle">Golden Doodle</SelectItem>
                  <SelectItem value="ShihTzu">ShihTzu</SelectItem>
                  <SelectItem value="Cavapoo">Cavapoo</SelectItem>
                  <SelectItem value="Dachshund">Dachshund</SelectItem>
                  <SelectItem value="Chihuahua">Chihuahua</SelectItem>
                  <SelectItem value="Doberman">Doberman</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">Gender</label>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Genders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">Age</label>
              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Ages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="6-8">6-8 weeks</SelectItem>
                  <SelectItem value="9-12">9-12 weeks</SelectItem>
                  <SelectItem value="13+">13+ weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">Status</label>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(searchTerm || breedFilter !== 'all' || genderFilter !== 'all' || ageFilter !== 'all' || availabilityFilter !== 'all') && (
            <div className="mt-6 text-center">
              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-100 px-6 py-2"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPuppies.map((puppy) => (
            <Card key={puppy.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 hover:border-teal-300">
              <div className="relative overflow-hidden">
                <img 
                  src={puppy.image_url || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80'} 
                  alt={puppy.name}
                  className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Badge className={puppy.status === 'available' ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                    {puppy.status === 'available' ? "Available" : "Reserved"}
                  </Badge>
                </div>
                <div className="absolute top-4 left-4 flex flex-col gap-1">
                  <Badge variant="secondary" className="bg-white/90 text-amber-800 font-bold">
                    ${puppy.price}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <FavoriteButton puppyId={puppy.id} />
                </div>
              </div>
              
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-amber-900 group-hover:text-teal-700 transition-colors duration-300">
                    {puppy.name}
                  </h3>
                </div>
                
                <p className="text-lg font-semibold text-teal-600 mb-2">{puppy.breed}</p>
                
                <div className="flex items-center gap-4 mb-3 text-sm text-amber-700">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {calculateAge(puppy.birth_date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {puppy.gender}
                  </div>
                </div>

                {/* Trust badges for each puppy */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Vet-Checked
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                    <Heart className="w-3 h-3 mr-1" />
                    Health Guaranteed
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                    <Award className="w-3 h-3 mr-1" />
                    AKC
                  </Badge>
                </div>
                
                <p className="text-amber-700 mb-4 leading-relaxed text-sm line-clamp-3">
                  {puppy.description}
                </p>
                
                <Button 
                  className={`w-full ${puppy.status === 'available' 
                    ? 'bg-teal-600 hover:bg-teal-700' 
                    : 'bg-gray-400 cursor-not-allowed'} 
                    text-white transition-all duration-300`}
                  onClick={puppy.status === 'available' ? scrollToContact : undefined}
                  disabled={puppy.status !== 'available'}
                >
                  {puppy.status === 'available' ? 'Inquire Now' : 'Reserved'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPuppies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-amber-700 mb-4">
              {searchTerm || breedFilter !== 'all' || genderFilter !== 'all' || ageFilter !== 'all' || availabilityFilter !== 'all'
                ? "No puppies match your current search and filters."
                : "No puppies available at the moment."
              }
            </p>
            <Button 
              onClick={clearAllFilters}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Clear All Filters
            </Button>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-amber-700 mb-6">
            Don't see the perfect puppy? We have more litters planned throughout the year.
          </p>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={scrollToContact}
          >
            Join Our Waiting List
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AvailablePuppies;
