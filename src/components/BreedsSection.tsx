import React, { useRef, useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BreedCard from './BreedCard';

const BreedsSection = () => {
  const breeds = [
    {
      name: "ShihTzu",
      description: "Friendly, outgoing, and affectionate companions known for their beautiful coats and loving nature.",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80",
      traits: ["Friendly", "Outgoing", "Low Shedding"]
    },
    {
      name: "Doberman",
      description: "Intelligent, loyal, and fearless protectors with elegant athleticism and unwavering devotion.",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&q=80",
      traits: ["Intelligent", "Loyal", "Protective"]
    },
    {
      name: "Cavapoo",
      description: "Sweet-natured, intelligent, and hypoallergenic crosses that make perfect family companions.",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
      traits: ["Sweet", "Hypoallergenic", "Family-Friendly"]
    },
    {
      name: "GoldenDoodle",
      description: "Gentle, intelligent, and playful hybrids combining the best of Golden Retrievers and Poodles.",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
      traits: ["Gentle", "Intelligent", "Playful"]
    },
    {
      name: "Chihuahua",
      description: "Bold, confident, and charming small dogs with big personalities and fierce loyalty.",
      image: "https://images.unsplash.com/photo-1444212477490-ca407925329e?w=800&q=80",
      traits: ["Bold", "Confident", "Loyal"]
    },
    {
      name: "Dachshund",
      description: "Clever, lively, and courageous with distinctive long bodies and playful personalities.",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80",
      traits: ["Clever", "Lively", "Courageous"]
    }
  ];

  const [displayedBreeds, setDisplayedBreeds] = useState([...breeds]);
  const loader = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMoreBreeds = useCallback(() => {
    setDisplayedBreeds(prev => [...prev, ...breeds]);
  }, [breeds]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMoreBreeds();
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 0.1
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loadMoreBreeds]);

  return (
    <section id="breeds" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Our Premium Breeds
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Each breed is carefully selected and bred with love, ensuring healthy, happy puppies 
            that will bring joy to your family for years to come.
          </p>
        </motion.div>

        <div 
          ref={containerRef}
          className="flex overflow-x-auto pb-8 -mx-6 px-6 scrollbar-hide scroll-smooth"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="flex space-x-8 items-stretch py-4">
            <AnimatePresence>
              {displayedBreeds.map((breed, index) => (
                <motion.div
                  key={`${breed.name}-${index}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.05
                  }}
                  className="flex-shrink-0 w-80"
                >
                  <BreedCard breed={breed} index={index % breeds.length} />
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={loader} className="w-1 h-1 flex-shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreedsSection;
