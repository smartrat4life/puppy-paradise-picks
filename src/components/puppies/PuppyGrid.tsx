
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PuppyCard from './PuppyCard';
import { Puppy } from '@/services/puppyService';

interface PuppyGridProps {
  puppies: Puppy[];
  calculateAgeInWeeks: (birthDate: string, referenceDate?: string) => number;
  onInquire: () => void;
}

const PuppyGrid: React.FC<PuppyGridProps> = ({ puppies, calculateAgeInWeeks, onInquire }) => {
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

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {puppies.map((puppy, index) => {
          const ageInWeeks = calculateAgeInWeeks(puppy.birth_date, puppy.created_at);
          return (
            <PuppyCard
              key={puppy.id}
              puppy={puppy}
              ageInWeeks={ageInWeeks}
              onInquire={onInquire}
              index={index}
            />
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default PuppyGrid;
