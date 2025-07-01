
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import FavoriteButton from '@/components/FavoriteButton';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Puppy } from '@/services/puppyService';

interface PuppyCardProps {
  puppy: Puppy;
  ageInWeeks: number;
  onInquire: () => void;
}

const PuppyCard: React.FC<PuppyCardProps> = ({ puppy, ageInWeeks, onInquire }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 hover:border-teal-300">
      <div className="relative overflow-hidden">
        <ImageWithFallback 
          src={puppy.image_url || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80'}
          alt={`${puppy.name} - ${puppy.breed} puppy`}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          containerClassName="w-full h-64"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <FavoriteButton puppyId={puppy.id} />
          <Badge className={puppy.status === 'available' ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
            {puppy.status === 'available' ? 'Available' : 'Reserved'}
          </Badge>
        </div>
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-amber-800">
            ${puppy.price}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-amber-900 mb-2 group-hover:text-teal-700 transition-colors duration-300">
          {puppy.name}
        </h3>
        
        <p className="text-lg font-semibold text-teal-600 mb-3">{puppy.breed}</p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-amber-700">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{ageInWeeks} week{ageInWeeks !== 1 ? 's' : ''} old</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="capitalize">{puppy.gender}</span>
          </div>
        </div>
        
        <p className="text-amber-700 mb-6 leading-relaxed text-sm">
          {puppy.description}
        </p>
        
        <Button 
          className={`w-full ${puppy.status === 'available' 
            ? 'bg-teal-600 hover:bg-teal-700' 
            : 'bg-gray-400 cursor-not-allowed'} 
            text-white transition-all duration-300`}
          onClick={puppy.status === 'available' ? onInquire : undefined}
          disabled={puppy.status !== 'available'}
          aria-label={puppy.status === 'available' ? `Inquire about ${puppy.name}` : `${puppy.name} is reserved`}
        >
          {puppy.status === 'available' ? 'Inquire Now' : 'Reserved'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PuppyCard;
