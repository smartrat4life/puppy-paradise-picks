
import React from 'react';
import { motion } from 'framer-motion';
import HeroDecorations from './hero/HeroDecorations';
import HeroContent from './hero/HeroContent';

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24 lg:pt-28">
      {/* Background Image with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/2dfe2e53-b4b0-40be-a1d0-80e6a5782e20.png')`,
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </motion.div>

      {/* Animated decorative elements */}
      <HeroDecorations />

      {/* Hero Content */}
      <HeroContent scrollToSection={scrollToSection} />
    </section>
  );
};

export default Hero;
