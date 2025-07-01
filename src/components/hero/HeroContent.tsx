
import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from './heroAnimations';
import HeroTrustBadges from './HeroTrustBadges';
import HeroSocialLinks from './HeroSocialLinks';
import HeroCTAButtons from './HeroCTAButtons';

interface HeroContentProps {
  scrollToSection: (id: string) => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ scrollToSection }) => {
  return (
    <motion.div 
      className="container mx-auto px-4 sm:px-6 text-center relative z-10 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main heading with staggered animation */}
      <motion.h1 
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl"
        variants={itemVariants}
      >
        Find Your Perfect
        <motion.span 
          className="block text-teal-300 mt-2"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        >
          Furry Companion
        </motion.span>
      </motion.h1>

      {/* Subheading */}
      <motion.p 
        className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto drop-shadow-lg px-2"
        variants={itemVariants}
      >
        Premium puppies from a trusted breeder with 13 years of experience. 
        Specializing in ShihTzu, Doberman, Cavapoo, GoldenDoodle, Chihuahua, and Dachshund breeds.
      </motion.p>

      {/* Trust indicators */}
      <HeroTrustBadges />

      {/* Social Media Links */}
      <HeroSocialLinks />

      {/* CTA buttons */}
      <HeroCTAButtons scrollToSection={scrollToSection} />
    </motion.div>
  );
};

export default HeroContent;
