
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowUp } from 'lucide-react';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    
    // Show toast message
    toast({
      title: "Woof! 🐾",
      description: "Taking you back to the top!",
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-6 right-6 z-50"
          initial={{ 
            opacity: 0, 
            scale: 0,
            rotate: -180,
            y: 100
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: 0,
            y: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0,
            rotate: 180,
            y: 100
          }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.2 }
          }}
          whileTap={{ 
            scale: 0.9,
            rotate: -5
          }}
        >
          <Button
            onClick={scrollToTop}
            className="rounded-full w-14 h-14 p-0 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg relative overflow-hidden group"
            aria-label="Go to top"
          >
            {/* Animated background pulse */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ 
                scale: 1.2, 
                opacity: 0.3,
                transition: { duration: 0.3 }
              }}
            />
            
            {/* Puppy head SVG with animation */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                <path d="M12 2v6" />
                <path d="M15 5l-3 3" />
                <path d="M9 9l-3-3" />
                <circle cx="8.5" cy="8.5" r=".5" fill="currentColor" />
                <circle cx="15.5" cy="8.5" r=".5" fill="currentColor" />
                <path d="M9 14s.5 1 3 1 3-1 3-1" />
              </svg>
            </motion.div>
            
            <motion.div
              className="absolute bottom-1 right-1"
              animate={{ 
                y: [0, -3, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowUp className="h-3 w-3 text-white/70" />
            </motion.div>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GoToTopButton;
