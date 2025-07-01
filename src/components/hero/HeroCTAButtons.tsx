
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { containerVariants, itemVariants } from './heroAnimations';

interface HeroCTAButtonsProps {
  scrollToSection: (id: string) => void;
}

const HeroCTAButtons: React.FC<HeroCTAButtonsProps> = ({ scrollToSection }) => {
  const buttons = [
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
  ];

  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
      variants={containerVariants}
    >
      {buttons.map((button, index) => (
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
  );
};

export default HeroCTAButtons;
