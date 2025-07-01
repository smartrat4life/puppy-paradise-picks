
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook } from 'lucide-react';
import { containerVariants, itemVariants } from './heroAnimations';

const HeroSocialLinks = () => {
  const socialLinks = [
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
  ];

  return (
    <motion.div 
      className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-8 md:mb-10 max-w-2xl mx-auto px-2"
      variants={containerVariants}
    >
      {socialLinks.map((social, index) => (
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
  );
};

export default HeroSocialLinks;
