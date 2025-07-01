
import React from 'react';
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
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 hover:border-teal-300 h-full">
        <motion.div 
          className="relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <ImageWithFallback 
            src={puppy.image_url || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80'}
            alt={`${puppy.name} - ${puppy.breed} puppy`}
            className="w-full h-64 object-cover transition-transform duration-500"
            containerClassName="w-full h-64"
          />
          
          {/* Floating elements with stagger animation */}
          <motion.div 
            className="absolute top-4 right-4 flex gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FavoriteButton puppyId={puppy.id} />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge className={puppy.status === 'available' ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                {puppy.status === 'available' ? 'Available' : 'Reserved'}
              </Badge>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="absolute top-4 left-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge variant="secondary" className="bg-white/90 text-amber-800 font-bold">
                ${puppy.price}
              </Badge>
            </motion.div>
          </motion.div>

          {/* Hover overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        <CardContent className="p-6">
          <motion.h3 
            className="text-2xl font-bold text-amber-900 mb-2 group-hover:text-teal-700 transition-colors duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            whileHover={{ x: 5 }}
          >
            {puppy.name}
          </motion.h3>
          
          <motion.p 
            className="text-lg font-semibold text-teal-600 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            {puppy.breed}
          </motion.p>
          
          <motion.div 
            className="flex items-center gap-4 mb-4 text-sm text-amber-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.6 }}
          >
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05, x: 2 }}
            >
              <Calendar className="w-4 h-4" />
              <span>{ageInWeeks} week{ageInWeeks !== 1 ? 's' : ''} old</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05, x: 2 }}
            >
              <MapPin className="w-4 h-4" />
              <span className="capitalize">{puppy.gender}</span>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-amber-700 mb-6 leading-relaxed text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.7 }}
          >
            {puppy.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
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
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PuppyCard;
