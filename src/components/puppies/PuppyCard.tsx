
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Heart } from 'lucide-react';
import FavoriteButton from '@/components/FavoriteButton';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Puppy } from '@/services/puppyService';

interface PuppyCardProps {
  puppy: Puppy;
  ageInWeeks: number;
  onInquire: () => void;
  index?: number;
}

const PuppyCard: React.FC<PuppyCardProps> = ({ puppy, ageInWeeks, onInquire, index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_DESCRIPTION_LENGTH = 100;
  
  const shouldTruncate = puppy.description && puppy.description.length > MAX_DESCRIPTION_LENGTH;
  const displayDescription = shouldTruncate && !isExpanded 
    ? puppy.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
    : puppy.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -5,
        scale: 1.01,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 transform bg-gradient-to-br from-white to-amber-50 border border-amber-200 hover:border-teal-300 h-full">
        <motion.div 
          className="relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <ImageWithFallback 
            src={puppy.image_url || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80'}
            alt={`${puppy.name} - ${puppy.breed} puppy`}
            className="w-full h-48 object-cover transition-transform duration-300"
            containerClassName="w-full h-48"
          />
          
          {/* Floating elements */}
          <div 
            className="absolute top-3 right-3 flex gap-2 z-20"
            style={{ pointerEvents: 'auto' }}
          >
            <div
              className="pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <FavoriteButton puppyId={puppy.id} />
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto"
            >
              <Badge className={`text-xs ${puppy.status === 'available' ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}>
                {puppy.status === 'available' ? 'Available' : 'Reserved'}
              </Badge>
            </motion.div>
          </div>
          
          <motion.div 
            className="absolute top-3 left-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Badge variant="secondary" className="bg-white/90 text-amber-800 font-bold text-sm">
              ${puppy.price}
            </Badge>
          </motion.div>

          {/* Hover overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        <CardContent className="p-4">
          <motion.h3 
            className="text-xl font-bold text-amber-900 mb-1 group-hover:text-teal-700 transition-colors duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            {puppy.name}
          </motion.h3>
          
          <motion.p 
            className="text-base font-semibold text-teal-600 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            {puppy.breed}
          </motion.p>
          
          <motion.div 
            className="flex items-center gap-3 mb-3 text-sm text-amber-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.6 }}
          >
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{ageInWeeks} week{ageInWeeks !== 1 ? 's' : ''} old</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="capitalize">{puppy.gender}</span>
            </div>
          </motion.div>
          
          {puppy.description && (
            <motion.div 
              className="text-amber-700 mb-4 leading-relaxed text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.7 }}
            >
              <p>{displayDescription}</p>
              {shouldTruncate && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                  className="text-teal-600 hover:text-teal-700 font-medium text-sm mt-1 transition-colors duration-200"
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              className={`w-full text-sm ${puppy.status === 'available' 
                ? 'bg-teal-600 hover:bg-teal-700' 
                : 'bg-gray-400 cursor-not-allowed'} 
                text-white transition-all duration-300`}
              onClick={puppy.status === 'available' ? onInquire : undefined}
              disabled={puppy.status !== 'available'}
              aria-label={puppy.status === 'available' ? `Inquire about ${puppy.name}` : `${puppy.name} is reserved`}
            >
              {puppy.status === 'available' ? 'Inquire Now' : 'Reserved'}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PuppyCard;
