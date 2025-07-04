
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePuppies } from '@/hooks/usePuppies';
import { Puppy } from '@/services/puppyService';

const PuppySpotlight = () => {
  const { puppies, loading, error } = usePuppies();
  const [currentPuppyIndex, setCurrentPuppyIndex] = useState(0);
  const [featuredPuppy, setFeaturedPuppy] = useState<Puppy | null>(null);

  // Filter available puppies
  const availablePuppies = puppies.filter(puppy => puppy.status === 'available');

  // Set up rotation every 5 seconds
  useEffect(() => {
    if (availablePuppies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentPuppyIndex(prev => (prev + 1) % availablePuppies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [availablePuppies.length]);

  // Update featured puppy when index changes
  useEffect(() => {
    if (availablePuppies.length > 0) {
      setFeaturedPuppy(availablePuppies[currentPuppyIndex]);
    }
  }, [currentPuppyIndex, availablePuppies]);

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const now = new Date();
    const ageInMs = now.getTime() - birth.getTime();
    const ageInWeeks = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 7));
    return ageInWeeks;
  };

  const scrollToAvailable = () => {
    const element = document.getElementById('available');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading || !featuredPuppy || availablePuppies.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-amber-700">Unable to load puppy spotlight at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  const ageInWeeks = calculateAge(featuredPuppy.birth_date);
  const highlights = [
    'AKC Registered',
    'Health Guarantee', 
    'Fully Vaccinated',
    'Microchipped'
  ];
  const personality = ['Playful', 'Gentle', 'Intelligent', 'Loyal'];

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50 relative overflow-hidden">
      {/* Background decorations */}
      <motion.div 
        className="absolute top-10 right-10 w-32 h-32 bg-teal-200/20 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-24 h-24 bg-amber-200/20 rounded-full blur-xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Star className="w-4 h-4 fill-current" />
            <span className="font-semibold">Puppy Spotlight</span>
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-amber-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Featured Puppy of the Week
          </motion.h2>
          <motion.p 
            className="text-xl text-amber-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Meet our special featured puppy, carefully selected for their exceptional temperament and charm
          </motion.p>
          
          {/* Rotation indicator */}
          {availablePuppies.length > 1 && (
            <motion.div 
              className="flex justify-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {availablePuppies.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentPuppyIndex ? 'bg-teal-600' : 'bg-teal-300'
                  }`}
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
          key={featuredPuppy.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <motion.div 
              className="relative h-96 lg:h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={featuredPuppy.image_url || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80'} 
                alt={featuredPuppy.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80';
                }}
              />
              <motion.div 
                className="absolute top-4 left-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Badge className="bg-teal-600 text-white px-3 py-1 text-sm font-semibold">
                  Featured
                </Badge>
              </motion.div>
              <motion.div 
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="w-5 h-5 text-red-500" />
              </motion.div>
            </motion.div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-3xl font-bold text-amber-900">{featuredPuppy.name}</h3>
                  <Badge variant="outline" className="text-teal-700 border-teal-300">
                    {featuredPuppy.breed}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mb-6 text-amber-700">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{ageInWeeks} week{ageInWeeks !== 1 ? 's' : ''} old</span>
                  </div>
                  <div className="text-2xl font-bold text-teal-600">
                    ${featuredPuppy.price.toLocaleString()}
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPuppy.description || `Meet ${featuredPuppy.name}, our adorable ${featuredPuppy.breed} puppy! ${featuredPuppy.gender === 'male' ? 'He' : 'She'}'s playful, loving, and ready to become your best friend. ${featuredPuppy.name} has been health checked, vaccinated, and comes with full care documentation.`}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    What Makes {featuredPuppy.name} Special
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {highlights.map((highlight, index) => (
                      <motion.div
                        key={highlight}
                        className="flex items-center gap-2 text-sm text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        {highlight}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Personality Traits */}
                <div className="mb-8">
                  <h4 className="font-semibold text-amber-900 mb-3">Personality</h4>
                  <div className="flex flex-wrap gap-2">
                    {personality.map((trait, index) => (
                      <motion.span
                        key={trait}
                        className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                      >
                        {trait}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Button 
                    onClick={scrollToContact}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 text-lg font-semibold flex-1"
                  >
                    Inquire About {featuredPuppy.name}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={scrollToAvailable}
                    className="border-amber-300 text-amber-700 hover:bg-amber-50 px-6 py-3 text-lg font-semibold flex-1"
                  >
                    See All Puppies
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PuppySpotlight;
