import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface Breed {
  name: string;
  description: string;
  image: string;
  traits: string[];
}

interface BreedCardProps {
  breed: Breed;
  index: number;
}

const BreedCard = ({ breed, index }: BreedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 hover:border-teal-300 h-full flex flex-col">
        <motion.div 
          className="relative overflow-hidden flex-shrink-0" 
          style={{ height: '256px' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <ImageWithFallback 
            src={breed.image} 
            alt={breed.name}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
        
        <CardContent className="p-6 flex-1 flex flex-col">
          <motion.h3 
            className="text-2xl font-bold text-amber-900 mb-3 group-hover:text-teal-700 transition-colors duration-300"
            whileHover={{ x: 5 }}
          >
            {breed.name}
          </motion.h3>
          
          <motion.p 
            className="text-amber-700 mb-4 leading-relaxed flex-1"
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
          >
            {breed.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {breed.traits.map((trait, traitIndex) => (
              <motion.div
                key={trait}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  variant="secondary" 
                  className="bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors duration-200"
                >
                  {trait}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BreedCard;
