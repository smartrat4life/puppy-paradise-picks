import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  onApply?: () => void;
  index?: number;
}

const PuppyCard: React.FC<PuppyCardProps> = ({
  puppy,
  ageInWeeks,
  onInquire,
  index = 0,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const goToDetails = () => navigate(`/puppy/${puppy.id}`);

  const descriptionLimit = 120;

  const shouldTruncate =
    puppy.description && puppy.description.length > descriptionLimit;

  const displayDescription =
    expanded || !shouldTruncate
      ? puppy.description
      : `${puppy.description?.substring(0, descriptionLimit)}...`;

  const handleReadMore = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -3,
        scale: 1.01,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
      layout
    >
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-amber-50 border border-amber-200 hover:border-teal-300 h-full flex flex-col">
        <motion.div
          className="relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <ImageWithFallback
            src={
              puppy.image_url ||
              'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80'
            }
            alt={`${puppy.name} - ${puppy.breed} puppy`}
            className="w-full h-32 sm:h-36 md:h-40 lg:h-44 object-cover object-center transition-transform duration-300"
            containerClassName="w-full h-32 sm:h-36 md:h-40 lg:h-44"
            style={{ aspectRatio: '4/3' }}
          />

          <div className="absolute top-2 right-2 flex gap-1 z-20">
            <div
              className="pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <FavoriteButton puppyId={puppy.id} />
            </div>

            <Badge
              className={`text-xs ${
                puppy.status === 'available'
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {puppy.status === 'available' ? 'Available' : 'Reserved'}
            </Badge>
          </div>

          <motion.div
            className="absolute top-2 left-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Badge
              variant="secondary"
              className="bg-white/90 text-amber-800 font-bold text-xs"
            >
              ${puppy.price}
            </Badge>
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <CardContent className="p-3 md:p-4 flex-1 flex flex-col">
          <motion.h3
            className="text-base md:text-lg font-bold text-amber-900 mb-1 group-hover:text-teal-700 transition-colors duration-300 line-clamp-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            {puppy.name}
          </motion.h3>

          <motion.p
            className="text-sm md:text-base font-semibold text-teal-600 mb-2 line-clamp-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            {puppy.breed}
          </motion.p>

          <motion.div
            className="flex items-center gap-2 mb-2 text-xs md:text-sm text-amber-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.6 }}
          >
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {ageInWeeks} week{ageInWeeks !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="capitalize">{puppy.gender}</span>
            </div>
          </motion.div>

          {puppy.description && (
            <motion.div
              className="text-amber-700 mb-3 leading-relaxed text-xs md:text-sm flex-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.7 }}
              layout
            >
              <motion.p layout>{displayDescription}</motion.p>

              {shouldTruncate && (
                <button
                  onClick={handleReadMore}
                  className="text-teal-600 hover:text-teal-700 font-medium text-xs mt-1 transition-colors duration-200"
                >
                  {expanded ? 'Show Less' : 'Read More'}
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
              className={`w-full ${
                puppy.status === 'available'
                  ? 'bg-teal-600 hover:bg-teal-700'
                  : 'bg-gray-400 cursor-not-allowed'
              } text-white transition-all duration-300`}
              onClick={puppy.status === 'available' ? goToDetails : undefined}
              disabled={puppy.status !== 'available'}
              aria-label={
                puppy.status === 'available'
                  ? `Inquire about ${puppy.name}`
                  : `${puppy.name} is reserved`
              }
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