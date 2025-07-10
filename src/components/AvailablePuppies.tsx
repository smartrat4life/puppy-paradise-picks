
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePuppies } from '@/hooks/usePuppies';
import { usePagination } from '@/hooks/usePagination';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import PuppyFilters from './puppies/PuppyFilters';
import PuppyGrid from './puppies/PuppyGrid';
import PuppyLoadingState from './puppies/PuppyLoadingState';
import PuppyErrorState from './puppies/PuppyErrorState';
import PuppyEmptyState from './puppies/PuppyEmptyState';
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

  const {
    paginatedItems: displayedPuppies,
    hasMoreItems,
    loadMore,
    reset,
    showingItems,
    totalItems,
  } = usePagination({
    items: filteredPuppies,
    itemsPerPage: 12,
  });

  // Use a ref to track the previous filter state to avoid unnecessary resets
  const prevFiltersRef = useRef({
    searchTerm,
    selectedBreed,
    selectedGender,
    minPrice,
    maxPrice,
    minWeeks,
    maxWeeks,
  });

  // Reset pagination only when filters actually change, not when length changes
  useEffect(() => {
    const currentFilters = {
      searchTerm,
      selectedBreed,
      selectedGender,
      minPrice,
      maxPrice,
      minWeeks,
      maxWeeks,
    };

    const filtersChanged = JSON.stringify(prevFiltersRef.current) !== JSON.stringify(currentFilters);
    
    if (filtersChanged) {
      reset();
      prevFiltersRef.current = currentFilters;
    }
  }, [searchTerm, selectedBreed, selectedGender, minPrice, maxPrice, minWeeks, maxWeeks, reset]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      }
    }
  };

  if (loading) {
    return <PuppyLoadingState />;
  }

  if (error) {
    return <PuppyErrorState error={error} />;
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="available" className="py-16 bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
      {/* Animated background decorations */}
      <motion.div 
        className="absolute top-10 left-0 w-40 h-40 bg-gradient-to-r from-teal-200/10 to-amber-200/10 rounded-full blur-2xl"
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" as const 
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-0 w-32 h-32 bg-gradient-to-l from-orange-200/10 to-teal-200/10 rounded-full blur-2xl"
        animate={{ 
          x: [0, -40, 0],
          y: [0, 20, 0],
          rotate: [360, 180, 0],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" as const 
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-amber-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Available Puppies
          </motion.h2>
          <motion.p 
            className="text-lg text-amber-700 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Meet our adorable puppies looking for their forever homes. Each one has been lovingly raised and is ready to bring joy to your family.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
            resultsCount={totalItems}
          />
        </motion.div>

        {/* Results counter */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-amber-700 font-medium text-sm">
            Showing {showingItems} of {totalItems} puppies
          </p>
        </motion.div>

        {displayedPuppies.length === 0 ? (
          <PuppyEmptyState 
            hasActiveFilters={hasActiveFilters}
            searchTerm={searchTerm}
            onClearFilters={clearAllFilters}
          />
        ) : (
          <>
            <PuppyGrid 
              puppies={displayedPuppies}
              calculateAgeInWeeks={calculateAgeInWeeks}
              onInquire={scrollToContact}
            />

            {/* See More Button */}
            {hasMoreItems && (
              <motion.div 
                className="flex justify-center mt-8"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Button
                    onClick={loadMore}
                    className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <span className="flex items-center gap-3">
                      See More Puppies
                      <motion.div
                        animate={{ y: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronDown className="w-5 h-5 group-hover:animate-bounce" />
                      </motion.div>
                    </span>
                  </Button>
                  
                  {/* Glowing effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 rounded-full blur-lg opacity-30 -z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut" as const,
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AvailablePuppies;
