
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Award } from 'lucide-react';
import { containerVariants, itemVariants } from './heroAnimations';

const HeroTrustBadges = () => {
  const trustItems = [
    { icon: Award, text: "13+ Years Experience", color: "text-teal-400" },
    { icon: Heart, text: "Health Guaranteed", color: "text-red-400" },
    { icon: Star, text: "Premium Bloodlines", color: "text-yellow-500" }
  ];

  return (
    <motion.div 
      className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-8 mb-8 md:mb-10 flex-wrap px-2"
      variants={containerVariants}
    >
      {trustItems.map((item, index) => (
        <motion.div
          key={item.text}
          className="w-full sm:w-auto flex items-center justify-center gap-2 text-white/90 bg-black/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "rgba(0,0,0,0.5)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} />
          <span className="text-sm sm:text-base font-semibold">{item.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HeroTrustBadges;
