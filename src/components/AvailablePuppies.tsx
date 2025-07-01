
import React from 'react';
import { motion } from 'framer-motion';
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
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p 
              className="mt-4 text-amber-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Loading our adorable puppies...
            </motion.p>
          </motion.div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="available" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p 
              className="text-red-600"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Error loading puppies: {error}
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-teal-600 hover:bg-teal-700"
              >
                Try Again
              </Button>
            </motion.div>
          </motion.div>
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
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-amber-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Available Puppies
          </motion.h2>
          <motion.p 
            className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Meet our adorable puppies looking for their forever homes. Each one has been lovingly raised and is ready to bring joy to your family.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
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
        </motion.div>

        {filteredPuppies.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p 
              className="text-xl text-amber-700 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {hasActiveFilters || searchTerm
                ? "No puppies found matching your search criteria." 
                : "No puppies available at the moment."}
            </motion.p>
            {(hasActiveFilters || searchTerm) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={clearAllFilters}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {filteredPuppies.map((puppy, index) => {
              const ageInWeeks = calculateAgeInWeeks(puppy.birth_date);
              return (
                <PuppyCard
                  key={puppy.id}
                  puppy={puppy}
                  ageInWeeks={ageInWeeks}
                  onInquire={scrollToContact}
                  index={index}
                />
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AvailablePuppies;
