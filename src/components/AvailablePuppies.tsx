import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePuppies } from '@/hooks/usePuppies';
import { usePagination } from '@/hooks/usePagination';
import { Button } from '@/components/ui/button';
import { ChevronDown, Loader2 } from 'lucide-react';
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

  const {
    paginatedItems: displayedPuppies,
    hasMoreItems,
    loadMore,
    reset,
    showingItems,
    totalItems,
  } = usePagination({
    items: filteredPuppies,
    itemsPerPage: 6,
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

  // Enhanced animation variants
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

  const gridVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.1,
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
    return (
      <section id="available" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-teal-200/20 rounded-full blur-xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" as const 
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-24 h-24 bg-orange-200/20 rounded-full blur-xl"
          animate={{ 
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" as const,
            delay: 2,
          }}
        />
        
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="relative inline-flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" as const }}
            >
              <div className="w-16 h-16 border-4 border-teal-600/30 rounded-full"></div>
              <div className="absolute w-16 h-16 border-4 border-t-teal-600 rounded-full animate-spin"></div>
            </motion.div>
            <motion.p 
              className="mt-6 text-xl font-medium text-amber-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Loading our adorable puppies...
            </motion.p>
            <motion.div
              className="mt-4 flex justify-center space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-teal-600 rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
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
            <motion.div
              className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" as const, stiffness: 200 }}
            >
              <span className="text-2xl">😞</span>
            </motion.div>
            <motion.p 
              className="text-red-600 text-lg mb-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Error loading puppies: {error}
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3"
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
    <section id="available" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
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

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-amber-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Available Puppies
          </motion.h2>
          <motion.p 
            className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed"
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
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-amber-700 font-medium">
            Showing {showingItems} of {totalItems} puppies
          </p>
        </motion.div>

        {displayedPuppies.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="mx-auto w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" as const, stiffness: 200 }}
            >
              <span className="text-3xl">🔍</span>
            </motion.div>
            <motion.p 
              className="text-xl text-amber-700 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {displayedPuppies.map((puppy, index) => {
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
              </AnimatePresence>
            </motion.div>

            {/* See More Button */}
            {hasMoreItems && (
              <motion.div 
                className="flex justify-center mt-12"
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
                    className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
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
