
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PuppyEmptyStateProps {
  hasActiveFilters: boolean;
  searchTerm: string;
  onClearFilters: () => void;
}

const PuppyEmptyState: React.FC<PuppyEmptyStateProps> = ({ 
  hasActiveFilters, 
  searchTerm, 
  onClearFilters 
}) => {
  return (
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
            onClick={onClearFilters}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3"
          >
            Clear All Filters
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PuppyEmptyState;
