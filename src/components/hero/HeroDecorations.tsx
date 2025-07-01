
import React from 'react';
import { motion } from 'framer-motion';
import { floatingAnimation } from './heroAnimations';

const HeroDecorations = () => {
  return (
    <>
      <motion.div 
        className="hidden md:block absolute top-10 left-10 text-teal-300 opacity-60"
        animate={floatingAnimation}
        transition={{ delay: 0 }}
      >
        <div className="w-6 h-6 md:w-8 md:h-8 bg-teal-200 rounded-full"></div>
      </motion.div>
      <motion.div 
        className="hidden md:block absolute top-20 right-8 text-orange-300 opacity-60"
        animate={floatingAnimation}
        transition={{ delay: 1 }}
      >
        <div className="w-4 h-4 md:w-6 md:h-6 bg-orange-200 rounded-full"></div>
      </motion.div>
      <motion.div 
        className="hidden md:block absolute bottom-20 left-10 text-amber-300 opacity-60"
        animate={floatingAnimation}
        transition={{ delay: 2 }}
      >
        <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-200 rounded-full"></div>
      </motion.div>
    </>
  );
};

export default HeroDecorations;
