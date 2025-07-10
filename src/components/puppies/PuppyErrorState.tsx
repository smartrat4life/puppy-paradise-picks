
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PuppyErrorStateProps {
  error: string;
}

const PuppyErrorState: React.FC<PuppyErrorStateProps> = ({ error }) => {
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
};

export default PuppyErrorState;
