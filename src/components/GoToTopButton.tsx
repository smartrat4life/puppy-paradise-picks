import { useEffect, useState } from 'react';
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
    <div className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <Button
        onClick={scrollToTop}
        className="rounded-full w-14 h-14 p-0 bg-amber-500 hover:bg-amber-600 text-white shadow-lg relative overflow-hidden group"
        aria-label="Go to top"
      >
        {/* Puppy head SVG */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-white transform group-hover:scale-110 transition-transform"
          >
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
            <path d="M12 2v6" />
            <path d="M15 5l-3 3" />
            <path d="M9 9l-3-3" />
            <circle cx="8.5" cy="8.5" r=".5" fill="currentColor" />
            <circle cx="15.5" cy="8.5" r=".5" fill="currentColor" />
            <path d="M9 14s.5 1 3 1 3-1 3-1" />
          </svg>
        </div>
        <ArrowUp className="absolute bottom-1 right-1 h-3 w-3 text-white/70" />
      </Button>
    </div>
  );
};

export default GoToTopButton;
