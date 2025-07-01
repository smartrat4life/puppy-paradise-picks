
import React from 'react';
import { usePuppies } from '@/hooks/usePuppies';
import { Button } from '@/components/ui/button';
import PuppyFilters from './puppies/PuppyFilters';
import PuppyCard from './puppies/PuppyCard';
import { usePuppyFilters } from './puppies/usePuppyFilters';

const AvailablePuppies = () => {
  const { puppies, loading, error } = usePuppies();
  const {
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
    filteredPuppies,
    hasActiveFilters,
    clearAllFilters,
    calculateAgeInWeeks,
  } = usePuppyFilters(puppies);

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

        <PuppyFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minWeeks={minWeeks}
          setMinWeeks={setMinWeeks}
          maxWeeks={maxWeeks}
          setMaxWeeks={setMaxWeeks}
          breeds={breeds}
          genders={genders}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearAllFilters}
          resultsCount={filteredPuppies.length}
        />

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
                <PuppyCard
                  key={puppy.id}
                  puppy={puppy}
                  ageInWeeks={ageInWeeks}
                  onInquire={scrollToContact}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailablePuppies;
