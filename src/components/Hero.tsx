
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Star, Award, Instagram, Facebook } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
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

        {/* Trust indicators with staggered animations */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-8 mb-8 md:mb-10 flex-wrap px-2"
          variants={containerVariants}
        >
          {[
            { icon: Award, text: "13+ Years Experience", color: "text-teal-400" },
            { icon: Heart, text: "Health Guaranteed", color: "text-red-400" },
            { icon: Star, text: "Premium Bloodlines", color: "text-yellow-500" }
          ].map((item, index) => (
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

        {/* Social Media Links */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-8 md:mb-10 max-w-2xl mx-auto px-2"
          variants={containerVariants}
        >
          {[
            { 
              icon: Instagram, 
              text: "Follow on Instagram", 
              href: "https://www.instagram.com/pickapuppyplus?igsh=MTJ1OTZsbzc4cjhjZw==",
              hoverColor: "hover:text-pink-400"
            },
            { 
              icon: Facebook, 
              text: "Like on Facebook", 
              href: "https://www.facebook.com/profile.php?id=100088549120878",
              hoverColor: "hover:text-blue-400"
            }
          ].map((social, index) => (
            <motion.a
              key={social.text}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto flex items-center justify-center gap-2 text-white/90 ${social.hoverColor} transition-colors duration-300 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-black/50`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">{social.text}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
          variants={containerVariants}
        >
          {[
            {
              text: "See Available Puppies",
              onClick: () => scrollToSection('available'),
              variant: "primary"
            },
            {
              text: "Explore Our Breeds",
              onClick: () => scrollToSection('breeds'),
              variant: "outline"
            }
          ].map((button, index) => (
            <motion.div
              key={button.text}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -3,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant={button.variant === "outline" ? "outline" : "default"}
                className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 ${
                  button.variant === "outline" 
                    ? "border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white" 
                    : "bg-teal-600 hover:bg-teal-700 text-white border-2 border-teal-500"
                }`}
                onClick={button.onClick}
              >
                {button.text}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
