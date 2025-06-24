
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 hover:border-teal-300">
      <div className="relative overflow-hidden">
        <img 
          src={breed.image} 
          alt={breed.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-amber-900 mb-3 group-hover:text-teal-700 transition-colors duration-300">
          {breed.name}
        </h3>
        
        <p className="text-amber-700 mb-4 leading-relaxed">
          {breed.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {breed.traits.map((trait, traitIndex) => (
            <Badge 
              key={trait} 
              variant="secondary" 
              className="bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors duration-200"
            >
              {trait}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BreedCard;
