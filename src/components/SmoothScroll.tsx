
import { useEffect, ReactNode } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

type SmoothScrollProps = {
  children: ReactNode;
};

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Enhanced smooth scroll behavior for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Add smooth scroll with custom timing
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          
          // Add a gentle pulse animation to the target element
          targetElement.classList.add('animate-pulse');
          setTimeout(() => {
            targetElement.classList.remove('animate-pulse');
          }, 1000);
        }
      }
    };

    // Enhanced scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add click event listener to the document
    document.addEventListener('click', handleAnchorClick, true);

    // Clean up
    return () => {
      document.removeEventListener('click', handleAnchorClick, true);
    };
  }, []);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-amber-500 transform-gpu z-50"
        style={{ scaleX }}
        initial={{ transformOrigin: "0%" }}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SmoothScroll;
